/**
 * @jest-environment node
 */

import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { renderToString } from 'react-dom/server';
import { CardCommentCount } from './CardCommentCount.importable';
import { ConfigProvider } from './ConfigContext';
import { EnhancePinnedPost } from './EnhancePinnedPost.importable';
import { InteractiveSupportButton } from './InteractiveSupportButton.importable';
import { Island } from './Island';
import { LiveBlogEpic } from './LiveBlogEpic.importable';
import { Liveness } from './Liveness.importable';
import { OnwardsUpper } from './OnwardsUpper.importable';
import { SetABTests } from './SetABTests.importable';
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
				<ConfigProvider value={{ renderingTarget: 'Web' }}>
					<EnhancePinnedPost />
				</ConfigProvider>,
			),
		).not.toThrow();
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

	test('StickyBottomBanner', () => {
		expect(() =>
			renderToString(
				<ConfigProvider value={{ renderingTarget: 'Web' }}>
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
