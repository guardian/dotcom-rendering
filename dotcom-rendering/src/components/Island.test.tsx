/**
 * @jest-environment node
 */

import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { renderToString } from 'react-dom/server';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { BrazeMessaging } from './BrazeMessaging.importable';
import { CardCommentCount } from './CardCommentCount.importable';
import { ConfigProvider } from './ConfigContext';
import { EnhancePinnedPost } from './EnhancePinnedPost.importable';
import { FocusStyles } from './FocusStyles.importable';
import { InteractiveSupportButton } from './InteractiveSupportButton.importable';
import { Island } from './Island';
import { LightboxHash } from './LightboxHash.importable';
import { LightboxJavascript } from './LightboxJavascript.importable';
import { LiveBlogEpic } from './LiveBlogEpic.importable';
import { Liveness } from './Liveness.importable';
import { Metrics } from './Metrics.importable';
import { OnwardsUpper } from './OnwardsUpper.importable';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { SetABTests } from './SetABTests.importable';
import { SignInGateSelector } from './SignInGateSelector.importable';
import { SlotBodyEnd } from './SlotBodyEnd.importable';
import { Snow } from './Snow.importable';
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
	// @ts-expect-error -- critical island be deferred until idle
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

() => (
	<Island
		priority="enhancement"
		defer={{ until: 'visible' }}
		clientOnly={true}
	>
		<Mock />
	</Island>
);

() => (
	// @ts-expect-error -- until interaction must have server-rendered fallback
	<Island
		priority="enhancement"
		defer={{ until: 'interaction' }}
		clientOnly={true}
	>
		<Mock />
	</Island>
);

// Jest tests

describe('Island: server-side rendering', () => {
	test('AlreadyVisited', () => {
		expect(() => renderToString(<AlreadyVisited />)).not.toThrow();
	});

	test('BrazeMessaging', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{ renderingTarget: 'Web', darkModeAvailable: false }}
				>
					<BrazeMessaging idApiUrl={''} />
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('CardCommentCount', () => {
		expect(() =>
			renderToString(
				<CardCommentCount
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					discussionApiUrl=""
					discussionId=""
				/>,
			),
		).not.toThrow();
	});

	test('EnhancePinnedPost', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{ renderingTarget: 'Web', darkModeAvailable: false }}
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
				<InteractiveSupportButton editionId="UK" subscribeUrl="" />,
			),
		).not.toThrow();
	});

	test('Snow', () => {
		expect(() => renderToString(<Snow />)).not.toThrow();
	});

	test('OnwardsUpper', () => {
		expect(() =>
			renderToString(
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
					editionId="UK"
					shortUrlId=""
					discussionApiUrl=""
				/>,
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
					value={{ renderingTarget: 'Web', darkModeAvailable: false }}
				>
					<Metrics commercialMetricsEnabled={true} tests={{}} />
				</ConfigProvider>,
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

	test('SetABTests', () => {
		expect(() =>
			renderToString(
				<SetABTests
					isDev={false}
					pageIsSensitive={false}
					abTestSwitches={{}}
				/>,
			),
		).not.toThrow();
	});

	test('SignInGateSelector', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{ renderingTarget: 'Web', darkModeAvailable: false }}
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
					value={{ renderingTarget: 'Web', darkModeAvailable: false }}
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
						keywordIds={''}
						renderAds={false}
						isLabs={false}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});

	test('StickyBottomBanner', () => {
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{ renderingTarget: 'Web', darkModeAvailable: false }}
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
						keywordIds=""
						remoteBannerSwitch={true}
						puzzleBannerSwitch={false}
						isSensitive={false}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});
});
