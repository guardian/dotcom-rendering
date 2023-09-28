import { useEffect } from 'react';
import { Analysis } from '../../fixtures/generated/articles/Analysis';
import { Audio } from '../../fixtures/generated/articles/Audio';
import { Comment } from '../../fixtures/generated/articles/Comment';
import { Editorial } from '../../fixtures/generated/articles/Editorial';
import { Explainer } from '../../fixtures/generated/articles/Explainer';
import { Feature } from '../../fixtures/generated/articles/Feature';
import { Gallery } from '../../fixtures/generated/articles/Gallery';
import { Interview } from '../../fixtures/generated/articles/Interview';
import { Labs } from '../../fixtures/generated/articles/Labs';
import { Letter } from '../../fixtures/generated/articles/Letter';
import { Live } from '../../fixtures/generated/articles/Live';
import { MatchReport } from '../../fixtures/generated/articles/MatchReport';
import { NewsletterSignup } from '../../fixtures/generated/articles/NewsletterSignup';
import { NumberedList } from '../../fixtures/generated/articles/NumberedList';
import { PhotoEssay } from '../../fixtures/generated/articles/PhotoEssay';
import { Picture } from '../../fixtures/generated/articles/Picture';
import { PrintShop } from '../../fixtures/generated/articles/PrintShop';
import { Quiz } from '../../fixtures/generated/articles/Quiz';
import { Recipe } from '../../fixtures/generated/articles/Recipe';
import { Review } from '../../fixtures/generated/articles/Review';
import { SpecialReport } from '../../fixtures/generated/articles/SpecialReport';
import { Standard } from '../../fixtures/generated/articles/Standard';
import { Video } from '../../fixtures/generated/articles/Video';
import { embedIframe } from '../client/embedIframe';
import { doStorybookHydration } from '../client/islands/doStorybookHydration';
import { decideFormat } from '../lib/decideFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { extractNAV } from '../model/extract-nav';
import type { DCRArticle, FEArticleType } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import { DecideLayout } from './DecideLayout';

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
	Picture,
};

mockRESTCalls();

const HydratedLayout = ({
	serverArticle,
	renderingTarget,
}: {
	serverArticle: DCRArticle;
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
