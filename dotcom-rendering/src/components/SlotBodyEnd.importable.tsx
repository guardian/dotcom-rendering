import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { adSizes, type SizeMapping } from '@guardian/commercial';
import type { CountryCode } from '@guardian/libs';
import { getCookie, isString, isUndefined } from '@guardian/libs';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { useEffect, useState } from 'react';
import { getArticleCounts } from '../lib/articleCount';
import type { AuthStatus } from '../lib/identity';
import type {
	CandidateConfig,
	MaybeFC,
	SlotConfig,
} from '../lib/messagePicker';
import { pickMessage } from '../lib/messagePicker';
import { useAB } from '../lib/useAB';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useBraze } from '../lib/useBraze';
import { useCountryCode } from '../lib/useCountryCode';
import { useOnce } from '../lib/useOnce';
import type { TagType } from '../types/tag';
import { AdSlot } from './AdSlot.web';
import { useConfig } from './ConfigContext';
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
	sectionId: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	idApiUrl: string;
	stage: string;
	pageId: string;
	renderAds: boolean;
	isLabs: boolean;
	articleEndSlot: boolean;
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

function getIsSignedIn(authStatus: AuthStatus): boolean | undefined {
	switch (authStatus.kind) {
		case 'Pending':
			return undefined;
		case 'SignedInWithCookies':
		case 'SignedInWithOkta':
			return true;
		case 'SignedOutWithCookies':
		case 'SignedOutWithOkta':
			return false;
	}
}

const useBrowserId = () => {
	const [browserId, setBrowserId] = useState<string>();

	useEffect(() => {
		const cookie = getCookie({ name: 'bwid', shouldMemoize: true });

		const id = isString(cookie) ? cookie : 'no-browser-id-available';

		setBrowserId(id);
	}, []);

	return browserId;
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
	stage,
	pageId,
	renderAds,
	isLabs,
	articleEndSlot,
}: Props) => {
	const { renderingTarget } = useConfig();
	const { brazeMessages } = useBraze(idApiUrl, renderingTarget);
	const countryCode = useCountryCode('slot-body-end');
	const isSignedIn = getIsSignedIn(useAuthStatus());
	const browserId = useBrowserId();
	const [SelectedEpic, setSelectedEpic] = useState<
		React.ElementType | null | undefined
	>();
	const [asyncArticleCount, setAsyncArticleCount] =
		useState<Promise<WeeklyArticleHistory | undefined>>();

	const showPublicGood = countryCode === 'US';

	const abTests = useAB();
	const abTestsApi = abTests?.api;
	const mpuWhenNoEpicEnabled =
		(abTestsApi?.isUserInVariant('MpuWhenNoEpic', 'variant') &&
			countryCode === 'GB') ??
		false;

	const showArticleEndSlot =
		renderAds &&
		!isLabs &&
		(showPublicGood || mpuWhenNoEpicEnabled) &&
		articleEndSlot;

	useEffect(() => {
		setAsyncArticleCount(
			getArticleCounts(pageId, tags, contentType).then(
				(counts) => counts?.weeklyArticleHistory,
			),
		);
	}, [contentType, tags, pageId]);

	useOnce(() => {
		if (isUndefined(countryCode)) return;

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
			browserId,
		});
		const brazeArticleContext: BrazeArticleContext = {
			section: sectionId,
		};
		const brazeEpic = buildBrazeEpicConfig(
			brazeMessages as BrazeMessagesInterface,
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
	}, [isSignedIn, countryCode, brazeMessages, asyncArticleCount, browserId]);

	useEffect(() => {
		if (SelectedEpic === null && showArticleEndSlot) {
			const additionalSizes = (): SizeMapping => {
				if (mpuWhenNoEpicEnabled) {
					return {
						desktop: [
							adSizes.outstreamDesktop,
							adSizes.outstreamGoogleDesktop,
						],
					};
				} else if (showPublicGood) {
					return { mobile: [adSizes.fluid] };
				}
				return {};
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
	}, [
		SelectedEpic,
		showArticleEndSlot,
		mpuWhenNoEpicEnabled,
		showPublicGood,
	]);

	if (SelectedEpic !== null && SelectedEpic !== undefined) {
		return (
			<div id="slot-body-end">
				<SelectedEpic />
			</div>
		);
	} else if (SelectedEpic === null && showArticleEndSlot) {
		return (
			<div id="slot-body-end">
				<AdSlot data-print-layout="hide" position="article-end" />
			</div>
		);
	}

	return null;
};
