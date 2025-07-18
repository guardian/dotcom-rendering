/**
 * @jest-environment node
 */

import type { PropsWithChildren } from 'react';
import { renderToString } from 'react-dom/server';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { AdPortals } from './AdPortals.importable';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { AppsEpic } from './AppsEpic.importable';
import { BrazeMessaging } from './BrazeMessaging.importable';
import { CardCommentCount } from './CardCommentCount.importable';
import { CommentCount } from './CommentCount.importable';
import { ConfigProvider } from './ConfigContext';
import { DiscussionLayout } from './DiscussionLayout';
import { DiscussionMeta } from './DiscussionMeta.importable';
import { EnhanceAffiliateLinks } from './EnhanceAffiliateLinks.importable';
import { EnhancePinnedPost } from './EnhancePinnedPost.importable';
import { FocusStyles } from './FocusStyles.importable';
import { FooterReaderRevenueLinks } from './FooterReaderRevenueLinks.importable';
import { Island } from './Island';
import { LightboxHash } from './LightboxHash.importable';
import { LightboxJavascript } from './LightboxJavascript';
import { LiveBlogEpic } from './LiveBlogEpic.importable';
import { Liveness } from './Liveness.importable';
import { Metrics } from './Metrics.importable';
import { MostViewedFooterData } from './MostViewedFooterData.importable';
import { MostViewedRightWithAd } from './MostViewedRightWithAd.importable';
import { OnwardsUpper } from './OnwardsUpper.importable';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { SendTargetingParams } from './SendTargetingParams.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
import { ShareButton } from './ShareButton.importable';
import { ShowHideContainers } from './ShowHideContainers.importable';
import { SignInGateSelector } from './SignInGateSelector.importable';
import { SlotBodyEnd } from './SlotBodyEnd.importable';
import { StickyBottomBanner } from './StickyBottomBanner.importable';

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
	/** Helper to provide config for islands */
	const WithConfig = ({ children }: PropsWithChildren) => (
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			{children}
		</ConfigProvider>
	);

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
				<WithConfig>
					<BrazeMessaging idApiUrl={''} />
				</WithConfig>,
			),
		).not.toThrow();
	});

	test('CardCommentCount', () => {
		expect(() =>
			renderToString(
				<WithConfig>
					<CardCommentCount discussionApiUrl="" discussionId="" />
				</WithConfig>,
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
				<WithConfig>
					<DiscussionMeta
						discussionApiUrl={''}
						shortUrlId={''}
						enableDiscussionSwitch={false}
					/>
				</WithConfig>,
			),
		).not.toThrow();
	});

	test('Discussion', () => {
		expect(() =>
			renderToString(
				<WithConfig>
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
				</WithConfig>,
			),
		).not.toThrow();
	});

	test('EnhanceAffiliateLinks', () => {
		expect(() =>
			renderToString(
				<WithConfig>
					<EnhanceAffiliateLinks />
				</WithConfig>,
			),
		).not.toThrow();
	});

	test('EnhancePinnedPost', () => {
		expect(() =>
			renderToString(
				<WithConfig>
					<EnhancePinnedPost />
				</WithConfig>,
			),
		).not.toThrow();
	});

	test('FocusStyles', () => {
		expect(() => renderToString(<FocusStyles />)).not.toThrow();
	});

	test('OnwardsUpper', () => {
		expect(() =>
			renderToString(
				<WithConfig>
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
						renderingTarget="Web"
					/>
				</WithConfig>,
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
					renderingTarget={'Web'}
				/>,
			),
		).not.toThrow();
	});

	test('Metrics', () => {
		expect(() =>
			renderToString(
				<WithConfig>
					<Metrics commercialMetricsEnabled={true} tests={{}} />
				</WithConfig>,
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

	test('MostViewedRightWithAd', () => {
		expect(() =>
			renderToString(
				<WithConfig>
					<MostViewedRightWithAd
						format={{
							theme: Pillar.News,
							design: ArticleDesign.Standard,
							display: ArticleDisplay.Standard,
						}}
						isPaidContent={false}
						renderAds={false}
						shouldHideReaderRevenue={false}
					/>
					,
				</WithConfig>,
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

	test('FooterReaderRevenueLinks', () => {
		expect(() =>
			renderToString(
				<WithConfig>
					<FooterReaderRevenueLinks
						dataLinkNamePrefix={''}
						urls={{
							subscribe: '',
							support: '',
							contribute: '',
						}}
					/>
				</WithConfig>,
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
				<WithConfig>
					<SetABTests
						isDev={false}
						pageIsSensitive={false}
						abTestSwitches={{}}
						serverSideTests={{}}
					/>
					,
				</WithConfig>,
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
				<WithConfig>
					<SignInGateSelector
						contentType={''}
						tags={[]}
						isPaidContent={false}
						isPreview={false}
						pageId={''}
						contributionsServiceUrl={''}
						editionId="UK"
					/>
				</WithConfig>,
			),
		).not.toThrow();
	});

	test('SlotBodyEnd', () => {
		expect(() =>
			renderToString(
				<WithConfig>
					<SlotBodyEnd
						contentType={''}
						sectionId={''}
						shouldHideReaderRevenue={false}
						isMinuteArticle={false}
						isPaidContent={false}
						tags={[]}
						contributionsServiceUrl={''}
						idApiUrl={''}
						pageId={''}
						renderAds={true}
						isLabs={false}
						articleEndSlot={true}
					/>
				</WithConfig>,
			),
		).not.toThrow();
	});

	test('StickyBottomBanner', () => {
		expect(() =>
			renderToString(
				<WithConfig>
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
				</WithConfig>,
			),
		).not.toThrow();
	});

	test('ShareButton', () => {
		expect(() =>
			renderToString(
				<WithConfig>
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
				</WithConfig>,
			),
		).not.toThrow();
	});
});
