/**
 * @jest-environment node
 */

import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { renderToString } from 'react-dom/server';
import { AdPortals } from './AdPortals.importable';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { AppsEpic } from './AppsEpic.importable';
import { BrazeMessaging } from './BrazeMessaging.importable';
import { CardCommentCount } from './CardCommentCount.importable';
import { CommentCount } from './CommentCount.importable';
import { ConfigProvider } from './ConfigContext';
import { DiscussionLayout } from './DiscussionLayout';
import { DiscussionMeta } from './DiscussionMeta.importable';
import { EnhancePinnedPost } from './EnhancePinnedPost.importable';
import { FocusStyles } from './FocusStyles.importable';
import { InteractiveSupportButton } from './InteractiveSupportButton.importable';
import { Island } from './Island';
import { LightboxHash } from './LightboxHash.importable';
import { LightboxJavascript } from './LightboxJavascript';
import { LiveBlogEpic } from './LiveBlogEpic.importable';
import { Liveness } from './Liveness.importable';
import { Metrics } from './Metrics.importable';
import { MostViewedFooterData } from './MostViewedFooterData.importable';
import { MostViewedRightWrapper } from './MostViewedRightWrapper.importable';
import { OnwardsUpper } from './OnwardsUpper.importable';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { ReaderRevenueLinks } from './ReaderRevenueLinks.importable';
import { SendTargetingParams } from './SendTargetingParams.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
import { ShareButton } from './ShareButton.importable';
import { ShowHideContainers } from './ShowHideContainers.importable';
import { SignInGateSelector } from './SignInGateSelector.importable';
import { SlotBodyEnd } from './SlotBodyEnd.importable';
import { StickyBottomBanner } from './StickyBottomBanner.importable';
import { SupportTheG } from './SupportTheG.importable';

// Type tests
// Test that impossible prop combinations are caught by TypeScript.
// What we're really testing is that this file compiles.

const Mock = () => <>🏝️</>;

() => (
	<Island priority="critical">
		<Mock />
	</Island>
);

() => (
	<Island priority="critical" defer={{ until: 'visible' }}>
		<Mock />
	</Island>
);

() => (
	<Island priority="critical" defer={{ until: 'idle' }}>
		<Mock />
	</Island>
);

() => (
	<Island priority="feature" defer={{ until: 'interaction' }}>
		<Mock />
	</Island>
);

() => (
	// @ts-expect-error -- non-critical island must be deferred
	<Island priority="feature">
		<Mock />
	</Island>
);

// Jest tests

describe('Island: server-side rendering', () => {
	test('AdPortals', () => {
		expect(() => renderToString(<AdPortals />)).not.toThrow();
	});

	test('AlreadyVisited', () => {
		expect(() => renderToString(<AlreadyVisited />)).not.toThrow();
	});

	test('AppsEpic', () => {
		expect(() => renderToString(<AppsEpic />)).not.toThrow();
	});

	test('BrazeMessaging', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<BrazeMessaging idApiUrl={''} />
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('CardCommentCount', () => {
		expect(() =>
			renderToString(
				<CardCommentCount discussionApiUrl="" discussionId="" />,
			),
		).not.toThrow();
	});

	test('CommentCount', () => {
		expect(() =>
			renderToString(<CommentCount discussionApiUrl="" shortUrlId="" />),
		).not.toThrow();
	});

	test('DiscussionMeta', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<DiscussionMeta
						discussionApiUrl={''}
						shortUrlId={''}
						enableDiscussionSwitch={false}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('Discussion', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<DiscussionLayout
						discussionApiUrl="https://discussion.theguardian.com/discussion-api"
						shortUrlId="p/39f5z"
						discussionD2Uid="testD2Header"
						discussionApiClientHeader="testClientHeader"
						enableDiscussionSwitch={true}
						idApiUrl="https://idapi.theguardian.com"
						format={{
							theme: Pillar.News,
							design: ArticleDesign.Standard,
							display: ArticleDisplay.Standard,
						}}
						isAdFreeUser={false}
						shouldHideAds={false}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('EnhancePinnedPost', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<EnhancePinnedPost />
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('FocusStyles', () => {
		expect(() => renderToString(<FocusStyles />)).not.toThrow();
	});

	test('InteractiveSupportButton', () => {
		expect(() =>
			renderToString(
				<InteractiveSupportButton editionId={'UK'} subscribeUrl="" />,
			),
		).not.toThrow();
	});

	test('OnwardsUpper', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<OnwardsUpper
						contentType=""
						tags={[]}
						isPaidContent={false}
						pageId=""
						keywordIds=""
						ajaxUrl=""
						hasRelated={true}
						hasStoryPackage={true}
						isAdFreeUser={false}
						showRelatedContent={true}
						format={{
							theme: Pillar.News,
							design: ArticleDesign.Standard,
							display: ArticleDisplay.Standard,
						}}
						pillar={Pillar.News}
						editionId={'UK'}
						shortUrlId=""
						discussionApiUrl=""
						absoluteServerTimes={true}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('LightboxHash', () => {
		expect(() => renderToString(<LightboxHash />)).not.toThrow();
	});

	test('LightboxJavascript', () => {
		expect(() =>
			renderToString(
				<LightboxJavascript
					format={{
						theme: Pillar.Culture,
						design: ArticleDesign.PhotoEssay,
						display: ArticleDisplay.Showcase,
					}}
					images={[]}
				/>,
			),
		).not.toThrow();
	});
	test('Liveness', () => {
		expect(() =>
			renderToString(
				<Liveness
					webTitle=""
					ajaxUrl=""
					pageId=""
					filterKeyEvents={false}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					enhanceTweetsSwitch={false}
					onFirstPage={true}
					webURL=""
					mostRecentBlockId=""
					hasPinnedPost={false}
				/>,
			),
		).not.toThrow();
	});

	test('LiveBlogEpic', () => {
		expect(() =>
			renderToString(
				<LiveBlogEpic
					sectionId={''}
					shouldHideReaderRevenue={false}
					isPaidContent={false}
					tags={[]}
					contributionsServiceUrl={''}
					pageId={''}
					keywordIds={''}
				/>,
			),
		).not.toThrow();
	});

	test('Metrics', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<Metrics commercialMetricsEnabled={true} tests={{}} />
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('MostViewedFooterData', () => {
		expect(() =>
			renderToString(
				<MostViewedFooterData ajaxUrl={''} edition={'UK'} />,
			),
		).not.toThrow();
	});

	test('MostViewedRightWrapper', () => {
		expect(() =>
			renderToString(
				<MostViewedRightWrapper
					componentDataAttribute={''}
					maxHeightPx={0}
					renderAds={false}
				/>,
			),
		).not.toThrow();
	});

	test('ReaderRevenueDev', () => {
		expect(() =>
			renderToString(
				<ReaderRevenueDev shouldHideReaderRevenue={false} />,
			),
		).not.toThrow();
	});

	test('ReaderRevenueLinks', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<ReaderRevenueLinks
						editionId={'UK'}
						dataLinkNamePrefix={''}
						inHeader={false}
						remoteHeader={false}
						contributionsServiceUrl={''}
						urls={{
							subscribe: '',
							support: '',
							contribute: '',
						}}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('SendTargetingParams', () => {
		expect(() =>
			renderToString(
				<SendTargetingParams
					editionCommercialProperties={{ adTargeting: [] }}
				/>,
			),
		).not.toThrow();
	});

	test('SetABTests', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<SetABTests
						isDev={false}
						pageIsSensitive={false}
						abTestSwitches={{}}
						serverSideTests={{}}
					/>
					,
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('SetAdTargeting', () => {
		expect(() =>
			renderToString(
				<SetAdTargeting
					adTargeting={{
						disableAds: true,
					}}
				/>,
			),
		).not.toThrow();
	});

	test('ShowHideContainers', () => {
		expect(() => renderToString(<ShowHideContainers />)).not.toThrow();
	});

	test('SignInGateSelector', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<SignInGateSelector
						contentType={''}
						tags={[]}
						isPaidContent={false}
						isPreview={false}
						pageId={''}
						switches={{}}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('SlotBodyEnd', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<SlotBodyEnd
						contentType={''}
						sectionId={''}
						shouldHideReaderRevenue={false}
						isMinuteArticle={false}
						isPaidContent={false}
						tags={[]}
						contributionsServiceUrl={''}
						idApiUrl={''}
						stage={''}
						pageId={''}
						renderAds={true}
						isLabs={false}
						articleEndSlot={true}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('StickyBottomBanner', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<StickyBottomBanner
						contentType=""
						tags={[]}
						sectionId=""
						isPaidContent={false}
						isPreview={false}
						shouldHideReaderRevenue={false}
						isMinuteArticle={false}
						contributionsServiceUrl=""
						idApiUrl=""
						pageId=""
						remoteBannerSwitch={true}
						isSensitive={false}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('SupportTheG', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<SupportTheG
						editionId={'UK'}
						dataLinkNamePrefix={''}
						inHeader={false}
						remoteHeader={false}
						contributionsServiceUrl={''}
						urls={{
							subscribe: '',
							support: '',
							contribute: '',
						}}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('ShareButton', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						inAdvertisingPartnerABTest: false,
						assetOrigin: '/',
					}}
				>
					<ShareButton
						pageId={'123'}
						webTitle={'The the'}
						format={{
							display: ArticleDisplay.Standard,
							theme: Pillar.News,
							design: ArticleDesign.Standard,
						}}
						context="ArticleMeta"
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});
});
