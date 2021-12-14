import { useState, useEffect } from 'react';
import { useOnce } from '@root/src/web/lib/useOnce';
import { getLocaleCode } from '@root/src/web/lib/getCountryCode';
import { getCookie } from '@guardian/libs';

import {
	pickMessage,
	SlotConfig,
	MaybeFC,
	CandidateConfig,
} from '@root/src/web/lib/messagePicker';

import type {
	BrazeMessagesInterface,
	BrazeArticleContext,
} from '@guardian/braze-components/logic';
import { WeeklyArticleHistory } from '@guardian/automat-contributions/dist/lib/types';
import {
	ReaderRevenueEpic,
	canShowReaderRevenueEpic,
	CanShowData as RRCanShowData,
	EpicConfig as RREpicConfig,
} from './ReaderRevenueEpic';
import { MaybeBrazeEpic, canShowBrazeEpic } from './BrazeEpic';

type Props = {
	contentType: string;
	sectionName?: string;
	sectionId: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	brazeMessages?: Promise<BrazeMessagesInterface>;
	idApiUrl: string;
	stage: string;
	asyncArticleCount?: Promise<WeeklyArticleHistory | undefined>;
};

const buildReaderRevenueEpicConfig = (
	canShowData: RRCanShowData,
): CandidateConfig<RREpicConfig> => {
	return {
		candidate: {
			id: 'reader-revenue-banner',
			canShow: () => canShowReaderRevenueEpic(canShowData),
			show: (meta: RREpicConfig) => () => {
				/* eslint-disable-next-line react/jsx-props-no-spreading */
				return <ReaderRevenueEpic {...meta} />;
			},
		},
		timeoutMillis: null,
	};
};

const buildBrazeEpicConfig = (
	brazeMessages: Promise<BrazeMessagesInterface>,
	countryCode: string,
	idApiUrl: string,
	brazeArticleContext: BrazeArticleContext,
): CandidateConfig<any> => {
	return {
		candidate: {
			id: 'braze-epic',
			canShow: () => canShowBrazeEpic(brazeMessages, brazeArticleContext),
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
	brazeMessages,
	idApiUrl,
	stage,
	asyncArticleCount,
}: Props) => {
	const [countryCode, setCountryCode] = useState<string>();
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const [SelectedEpic, setSelectedEpic] = useState<React.FC | null>(null);

	useEffect(() => {
		const callFetch = () => {
			getLocaleCode()
				.then((cc) => {
					setCountryCode(cc || '');
				})
				.catch((e) =>
					console.error(`countryCodePromise - error: ${e}`),
				);
		};
		callFetch();
	}, []);

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
			brazeMessages as Promise<BrazeMessagesInterface>,
			countryCode as string,
			idApiUrl,
			brazeArticleContext,
		);
		const epicConfig: SlotConfig = {
			candidates: [brazeEpic, readerRevenueEpic],
			name: 'slotBodyEnd',
		};

		pickMessage(epicConfig)
			.then((PickedEpic: () => MaybeFC) => setSelectedEpic(PickedEpic))
			.catch((e) =>
				console.error(`SlotBodyEnd pickMessage - error: ${e}`),
			);
	}, [isSignedIn, countryCode, brazeMessages, asyncArticleCount]);

	if (SelectedEpic) {
		return <SelectedEpic />;
	}

	return null;
};
