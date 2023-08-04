import { useEffect } from 'react';
import { Analysis } from '../../fixtures/generated/articles/Analysis.ts';
import { Audio } from '../../fixtures/generated/articles/Audio.ts';
import { Comment } from '../../fixtures/generated/articles/Comment.ts';
import { Editorial } from '../../fixtures/generated/articles/Editorial.ts';
import { Explainer } from '../../fixtures/generated/articles/Explainer.ts';
import { Feature } from '../../fixtures/generated/articles/Feature.ts';
import { Gallery } from '../../fixtures/generated/articles/Gallery.ts';
import { Interview } from '../../fixtures/generated/articles/Interview.ts';
import { Labs } from '../../fixtures/generated/articles/Labs.ts';
import { Letter } from '../../fixtures/generated/articles/Letter.ts';
import { Live } from '../../fixtures/generated/articles/Live.ts';
import { MatchReport } from '../../fixtures/generated/articles/MatchReport.ts';
import { NewsletterSignup } from '../../fixtures/generated/articles/NewsletterSignup.ts';
import { NumberedList } from '../../fixtures/generated/articles/NumberedList.ts';
import { PhotoEssay } from '../../fixtures/generated/articles/PhotoEssay.ts';
import { PrintShop } from '../../fixtures/generated/articles/PrintShop.ts';
import { Quiz } from '../../fixtures/generated/articles/Quiz.ts';
import { Recipe } from '../../fixtures/generated/articles/Recipe.ts';
import { Review } from '../../fixtures/generated/articles/Review.ts';
import { SpecialReport } from '../../fixtures/generated/articles/SpecialReport.ts';
import { Standard } from '../../fixtures/generated/articles/Standard.ts';
import { Video } from '../../fixtures/generated/articles/Video.ts';
import { embedIframe } from '../client/embedIframe.ts';
import { doStorybookHydration } from '../client/islands/doStorybookHydration.js';
import { decideFormat } from '../lib/decideFormat.ts';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink.ts';
import { getCurrentPillar } from '../lib/layoutHelpers.ts';
import { mockRESTCalls } from '../lib/mockRESTCalls.ts';
import { extractNAV } from '../model/extract-nav.ts';
import type { FEArticleType } from '../types/frontend.ts';
import type { RenderingTarget } from '../types/renderingTarget.ts';
import { DecideLayout } from './DecideLayout.tsx';

const Fixtures: { [key: string]: FEArticleType } = {
	Standard,
	Gallery,
	Audio,
	Video,
	PhotoEssay,
	Review,
	PrintShop,
	Analysis,
	Feature,
	LiveBlog: Live,
	DeadBlog: Live,
	Editorial,
	Letter,
	Interview,
	Quiz,
	Recipe,
	Comment,
	MatchReport,
	Labs,
	SpecialReport,
	NumberedList,
	NewsletterSignup,
	Explainer,
};

mockRESTCalls();

const HydratedLayout = ({
	serverArticle,
	renderingTarget,
}: {
	serverArticle: FEArticleType;
	renderingTarget: RenderingTarget;
}) => {
	const NAV = {
		...extractNAV(serverArticle.nav),
		selectedPillar: getCurrentPillar(serverArticle),
	};
	const format: ArticleFormat = decideFormat(serverArticle.format);
	useEffect(() => {
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${String(e)}`),
		);
		// Manually updates the footer DOM because it's not hydrated
		injectPrivacySettingsLink();
		doStorybookHydration();
	}, [serverArticle]);

	return (
		<DecideLayout
			article={serverArticle}
			NAV={NAV}
			format={format}
			renderingTarget={renderingTarget}
		/>
	);
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
export const HydratedLayoutWrapper = ({
	displayName,
	designName,
	theme,
	renderingTarget,
}: {
	displayName: string;
	designName: string;
	theme: string;
	renderingTarget: RenderingTarget;
}) => {
	const fixture = Fixtures[designName] ?? Standard;

	const serverArticle = {
		...fixture,
		format: {
			display: `${displayName}Display` as FEDisplay,
			design: `${designName}Design` as FEDesign,
			theme: theme as FETheme,
		},
	};

	return (
		<HydratedLayout
			serverArticle={serverArticle}
			renderingTarget={renderingTarget}
		/>
	);
};

export default {
	title: 'Components/Layout',
	component: HydratedLayout,
	// Export used by dotcom-rendering/stories/Card.stories.tsx
	excludeStories: ['HydratedLayoutWrapper'],
	parameters: {
		chromatic: {
			diffThreshold: 0.2,
			pauseAnimationAtEnd: true,
		},
	},
};

export const Liveblog = () => {
	return (
		<HydratedLayout
			serverArticle={{
				...Live,
				keyEvents: [],
			}}
			renderingTarget="Web"
		/>
	);
};
