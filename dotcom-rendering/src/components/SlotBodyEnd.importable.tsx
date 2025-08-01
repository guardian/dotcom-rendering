import { css } from '@emotion/react';
import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { adSizes, type SizeMapping } from '@guardian/commercial-core';
import type { CountryCode } from '@guardian/libs';
import { isUndefined } from '@guardian/libs';
import { palette } from '@guardian/source/foundations';
import type {
	ModuleData,
	WeeklyArticleHistory,
} from '@guardian/support-dotcom-components/dist/dotcom/types';
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect, useState } from 'react';
import { getArticleCounts } from '../lib/articleCount';
import type {
	CandidateConfig,
	MaybeFC,
	SlotConfig,
} from '../lib/messagePicker';
import { pickMessage } from '../lib/messagePicker';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useBraze } from '../lib/useBraze';
import { useCountryCode } from '../lib/useCountryCode';
import { usePageViewId } from '../lib/usePageViewId';
import type { TagType } from '../types/tag';
import { AdSlot } from './AdSlot.web';
import { useConfig } from './ConfigContext';
import { canShowBrazeEpic, MaybeBrazeEpic } from './SlotBodyEnd/BrazeEpic';
import {
	canShowReaderRevenueEpic,
	ReaderRevenueEpic,
} from './SlotBodyEnd/ReaderRevenueEpic';
import type { CanShowData as RRCanShowData } from './SlotBodyEnd/ReaderRevenueEpic';

type Props = {
	contentType: string;
	sectionId: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	idApiUrl: string;
	pageId: string;
	renderAds: boolean;
	isLabs: boolean;
	articleEndSlot: boolean;
};

const slotStyles = css`
	color: ${palette.neutral[7]};
`;

const buildReaderRevenueEpicConfig = (
	canShowData: RRCanShowData,
): CandidateConfig<ModuleData<EpicProps>> => {
	return {
		candidate: {
			id: 'reader-revenue-banner',
			canShow: () => canShowReaderRevenueEpic(canShowData),
			show: (data: ModuleData<EpicProps>) => () => {
				return <ReaderRevenueEpic {...data} />;
			},
		},
		timeoutMillis: null,
	};
};

const buildBrazeEpicConfig = (
	brazeMessages: BrazeMessagesInterface,
	countryCode: CountryCode,
	idApiUrl: string,
	contentType: string,
	brazeArticleContext: BrazeArticleContext,
	tags: TagType[],
	shouldHideReaderRevenue: boolean,
): CandidateConfig<any> => {
	return {
		candidate: {
			id: 'braze-epic',
			canShow: () =>
				canShowBrazeEpic(
					brazeMessages,
					brazeArticleContext,
					contentType,
					tags,
					shouldHideReaderRevenue,
				),
			show: (meta: any) => () => (
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
	sectionId,
	shouldHideReaderRevenue,
	isMinuteArticle,
	isPaidContent,
	tags,
	contributionsServiceUrl,
	idApiUrl,
	pageId,
	renderAds,
	isLabs,
	articleEndSlot,
}: Props) => {
	const { renderingTarget } = useConfig();
	const { brazeMessages } = useBraze(idApiUrl, renderingTarget);
	const countryCode = useCountryCode('slot-body-end');
	const isSignedIn = useIsSignedIn();
	const ophanPageViewId = usePageViewId(renderingTarget);
	const [SelectedEpic, setSelectedEpic] = useState<
		React.ElementType | null | undefined
	>();
	const [asyncArticleCount, setAsyncArticleCount] =
		useState<Promise<WeeklyArticleHistory | undefined>>();

	const showPublicGood = countryCode === 'US';

	const showArticleEndSlot =
		renderAds && !isLabs && showPublicGood && articleEndSlot;

	useEffect(() => {
		setAsyncArticleCount(
			getArticleCounts(pageId, tags, contentType).then(
				(counts) => counts?.weeklyArticleHistory,
			),
		);
	}, [contentType, tags, pageId]);

	useEffect(() => {
		// Wait for the following dependencies before checking for Braze + RRCP messages
		if (
			isUndefined(countryCode) ||
			isUndefined(brazeMessages) ||
			isUndefined(asyncArticleCount) ||
			isUndefined(ophanPageViewId) ||
			isSignedIn === 'Pending'
		) {
			return;
		}

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
			asyncArticleCount,
			renderingTarget,
			ophanPageViewId,
			pageId,
		});
		const brazeArticleContext: BrazeArticleContext = {
			section: sectionId,
		};
		const brazeEpic = buildBrazeEpicConfig(
			brazeMessages,
			countryCode,
			idApiUrl,
			contentType,
			brazeArticleContext,
			tags,
			shouldHideReaderRevenue,
		);
		const epicConfig: SlotConfig = {
			candidates: [brazeEpic, readerRevenueEpic],
			name: 'slotBodyEnd',
		};
		pickMessage(epicConfig, renderingTarget)
			.then((PickedEpic: () => MaybeFC) => setSelectedEpic(PickedEpic))
			.catch((e) =>
				console.error(`SlotBodyEnd pickMessage - error: ${String(e)}`),
			);
	}, [
		isSignedIn,
		countryCode,
		brazeMessages,
		asyncArticleCount,
		contentType,
		contributionsServiceUrl,
		idApiUrl,
		isMinuteArticle,
		isPaidContent,
		renderingTarget,
		sectionId,
		shouldHideReaderRevenue,
		tags,
		ophanPageViewId,
		pageId,
	]);

	useEffect(() => {
		if (SelectedEpic === null && showArticleEndSlot) {
			const additionalSizes = (): SizeMapping => {
				return { mobile: [adSizes.fluid] }; // Public Good additional ad slot sizes
			};
			document.dispatchEvent(
				new CustomEvent('gu.commercial.slot.fill', {
					detail: {
						slotId: 'dfp-ad--article-end',
						additionalSizes: additionalSizes(),
					},
				}),
			);
		}
	}, [SelectedEpic, showArticleEndSlot]);

	if (SelectedEpic !== null && !isUndefined(SelectedEpic)) {
		return (
			<div id="slot-body-end" css={slotStyles}>
				<SelectedEpic />
			</div>
		);
	} else if (SelectedEpic === null && showArticleEndSlot) {
		return (
			<div id="slot-body-end" css={slotStyles}>
				<AdSlot data-print-layout="hide" position="article-end" />
			</div>
		);
	}

	return null;
};
