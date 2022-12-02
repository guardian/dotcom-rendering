import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { getCookie } from '@guardian/libs';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { useEffect, useState } from 'react';
import { getArticleCounts } from '../../lib/articleCount';
import type { TagType } from '../../types/tag';
import { getLocaleCode } from '../lib/getCountryCode';
import type {
	CandidateConfig,
	MaybeFC,
	SlotConfig,
} from '../lib/messagePicker';
import { pickMessage } from '../lib/messagePicker';
import { useBraze } from '../lib/useBraze';
import { useOnce } from '../lib/useOnce';
import { canShowBrazeEpic, MaybeBrazeEpic } from './SlotBodyEnd/BrazeEpic';
import {
	canShowReaderRevenueEpic,
	ReaderRevenueEpic,
} from './SlotBodyEnd/ReaderRevenueEpic';
import type {
	CanShowData as RRCanShowData,
	EpicConfig as RREpicConfig,
} from './SlotBodyEnd/ReaderRevenueEpic';

type Props = {
	contentType: string;
	sectionName?: string;
	sectionId: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	idApiUrl: string;
	stage: string;
	pageId: string;
	keywordIds: string;
};

const buildReaderRevenueEpicConfig = (
	canShowData: RRCanShowData,
): CandidateConfig<RREpicConfig> => {
	return {
		candidate: {
			id: 'reader-revenue-banner',
			canShow: () => canShowReaderRevenueEpic(canShowData),
			show: (meta: RREpicConfig) => () => {
				return <ReaderRevenueEpic {...meta} />;
			},
		},
		timeoutMillis: null,
	};
};

const buildBrazeEpicConfig = (
	brazeMessages: BrazeMessagesInterface,
	countryCode: string,
	idApiUrl: string,
	contentType: string,
	brazeArticleContext: BrazeArticleContext,
): CandidateConfig<any> => {
	return {
		candidate: {
			id: 'braze-epic',
			canShow: () =>
				canShowBrazeEpic(
					brazeMessages,
					brazeArticleContext,
					contentType,
				),
			show: (meta: any) => () =>
				(
					<MaybeBrazeEpic
						meta={meta}
						countryCode={countryCode}
						idApiUrl={idApiUrl}
					/>
				),
		},
		timeoutMillis: 2000,
	};
};

export const SlotBodyEnd = ({
	contentType,
	sectionName,
	sectionId,
	shouldHideReaderRevenue,
	isMinuteArticle,
	isPaidContent,
	tags,
	contributionsServiceUrl,
	idApiUrl,
	stage,
	pageId,
	keywordIds,
}: Props) => {
	const { brazeMessages } = useBraze(idApiUrl);

	const [countryCode, setCountryCode] = useState<string>();
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const [SelectedEpic, setSelectedEpic] = useState<React.ElementType | null>(
		null,
	);
	const [asyncArticleCount, setAsyncArticleCount] =
		useState<Promise<WeeklyArticleHistory | undefined>>();

	useEffect(() => {
		const callFetch = () => {
			getLocaleCode()
				.then((cc) => {
					setCountryCode(cc || '');
				})
				.catch((e) =>
					console.error(`countryCodePromise - error: ${String(e)}`),
				);
		};
		callFetch();
	}, []);

	useEffect(() => {
		setAsyncArticleCount(
			getArticleCounts(pageId, keywordIds).then(
				(counts) => counts?.weeklyArticleHistory,
			),
		);
	}, [pageId, keywordIds]);

	useOnce(() => {
		const readerRevenueEpic = buildReaderRevenueEpicConfig({
			isSignedIn,
			countryCode,
			contentType,
			sectionId,
			shouldHideReaderRevenue,
			isMinuteArticle,
			isPaidContent,
			tags,
			contributionsServiceUrl,
			idApiUrl,
			stage,
			asyncArticleCount: asyncArticleCount as Promise<
				WeeklyArticleHistory | undefined
			>,
			browserId: browserId || undefined,
		});
		const brazeArticleContext: BrazeArticleContext = {
			section: sectionName,
		};
		const brazeEpic = buildBrazeEpicConfig(
			brazeMessages as BrazeMessagesInterface,
			countryCode as string,
			idApiUrl,
			contentType,
			brazeArticleContext,
		);
		const epicConfig: SlotConfig = {
			candidates: [brazeEpic, readerRevenueEpic],
			name: 'slotBodyEnd',
		};

		pickMessage(epicConfig)
			.then((PickedEpic: () => MaybeFC) => setSelectedEpic(PickedEpic))
			.catch((e) =>
				console.error(`SlotBodyEnd pickMessage - error: ${String(e)}`),
			);
	}, [isSignedIn, countryCode, brazeMessages, asyncArticleCount]);

	if (SelectedEpic) {
		return (
			<div id="slot-body-end">
				<SelectedEpic />
			</div>
		);
	}

	return null;
};
