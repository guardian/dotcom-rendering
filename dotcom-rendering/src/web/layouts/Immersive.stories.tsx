import { useEffect } from 'react';

import { breakpoints } from '@guardian/source-foundations';

import { makeGuardianBrowserCAPI } from '../../model/window-guardian';

import { decideTheme } from '../lib/decideTheme';
import { decideDisplay } from '../lib/decideDisplay';
import { decideDesign } from '../lib/decideDesign';

import { Article } from '../../../fixtures/generated/articles/Article';
import { PhotoEssay } from '../../../fixtures/generated/articles/PhotoEssay';
import { Review } from '../../../fixtures/generated/articles/Review';
import { Analysis } from '../../../fixtures/generated/articles/Analysis';
import { Feature } from '../../../fixtures/generated/articles/Feature';
import { Live } from '../../../fixtures/generated/articles/Live';
import { Editorial } from '../../../fixtures/generated/articles/Editorial';
import { Letter } from '../../../fixtures/generated/articles/Letter';
import { SpecialReport } from '../../../fixtures/generated/articles/SpecialReport';
import { Interview } from '../../../fixtures/generated/articles/Interview';
import { Quiz } from '../../../fixtures/generated/articles/Quiz';
import { Recipe } from '../../../fixtures/generated/articles/Recipe';
import { Comment } from '../../../fixtures/generated/articles/Comment';
import { MatchReport } from '../../../fixtures/generated/articles/MatchReport';
import { PrintShop } from '../../../fixtures/generated/articles/PrintShop';
import { Labs } from '../../../fixtures/generated/articles/Labs';
import { NumberedList } from '../../../fixtures/generated/articles/NumberedList';

import { BootReact } from '../components/BootReact';
import { embedIframe } from '../browser/embedIframe/embedIframe';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';

import { extractNAV } from '../../model/extract-nav';
import { fireAndResetHydrationState } from '../components/HydrateOnce';
import { DecideLayout } from './DecideLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';

mockRESTCalls();

export default {
	title: 'Layouts/Immersive',
	parameters: {
		chromatic: { viewports: [1300], delay: 800, diffThreshold: 0.2 },
	},
};

function isImageBlockElement(block: CAPIElement): block is ImageBlockElement {
	return (
		block._type === 'model.dotcomrendering.pageElements.ImageBlockElement'
	);
}

const convertToImmersive = (CAPI: CAPIType) => ({
	...CAPI,
	format: {
		...CAPI.format,
		display: 'ImmersiveDisplay' as CAPIDisplay,
	},
	mainMediaElements: CAPI.mainMediaElements.map((el) => {
		if (isImageBlockElement(el)) {
			return {
				...el,
				role: 'immersive' as RoleType,
			};
		}
		return el;
	}),
});

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ ServerCAPI }: { ServerCAPI: CAPIType }) => {
	fireAndResetHydrationState();
	const NAV = extractNAV(ServerCAPI.nav);
	const format: ArticleFormat = {
		display: decideDisplay(ServerCAPI.format),
		design: decideDesign(ServerCAPI.format),
		theme: decideTheme(ServerCAPI.format),
	};
	useEffect(() => {
		const CAPI = makeGuardianBrowserCAPI(ServerCAPI);
		BootReact({ CAPI });
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${e}`),
		);
		// Manually updates the footer DOM because it's not hydrated
		injectPrivacySettingsLink();
		doStorybookHydration();
	}, [ServerCAPI]);
	return <DecideLayout CAPI={ServerCAPI} NAV={NAV} format={format} />;
};

export const ArticleStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Article);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ArticleStory.story = {
	name: 'Article',
	// Set the viewports in Chromatic to capture this story at each breakpoint
	chromatic: {
		viewports: [
			breakpoints.mobile,
			breakpoints.mobileMedium,
			breakpoints.phablet,
			breakpoints.tablet,
			breakpoints.desktop,
			breakpoints.leftCol,
			breakpoints.wide,
		],
	},
};

export const ReviewStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Review);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ReviewStory.story = {
	name: 'Review',
	parameters: {
		viewport: { defaultViewport: 'phablet' },
		chromatic: { viewports: [660] },
	},
};

export const CommentStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Comment);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
CommentStory.story = { name: 'Comment' };

export const PhotoEssayStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(PhotoEssay);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
PhotoEssayStory.story = {
	name: 'PhotoEssay',
};

export const MobilePhotoEssay = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(PhotoEssay);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
MobilePhotoEssay.story = {
	name: 'MobilePhotoEssay',
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};

export const AnalysisStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Analysis);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
AnalysisStory.story = {
	name: 'Analysis',
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: { viewports: [740] },
	},
};

export const SpecialReportStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(SpecialReport);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
SpecialReportStory.story = {
	name: 'SpecialReport',
};
SpecialReportStory.parameters = {
	// Wait for the interactives to load
	chromatic: { delay: 1000 },
};

export const FeatureStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Feature);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
FeatureStory.story = {
	name: 'Feature',
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};

export const LiveStory = (): React.ReactNode => {
	const LiveBlog = {
		...Live,
	};
	const ServerCAPI = convertToImmersive(LiveBlog);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LiveStory.story = { name: 'LiveBlog' };

export const DeadStory = (): React.ReactNode => {
	const DeadBlog = {
		...Live,
	};
	const ServerCAPI = convertToImmersive(DeadBlog);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
DeadStory.story = { name: 'DeadBlog' };

export const EditorialStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Editorial);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
EditorialStory.story = {
	name: 'Editorial',
	parameters: {
		viewport: { defaultViewport: 'leftCol' },
		chromatic: { viewports: [1140] },
	},
};

export const LetterStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Letter);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LetterStory.story = {
	name: 'Letter',
};

export const InterviewStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Interview);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
InterviewStory.story = { name: 'Interview' };

export const QuizStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Quiz);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
QuizStory.story = { name: 'Quiz' };

export const RecipeStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Recipe);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
RecipeStory.story = { name: 'Recipe' };

export const MatchReportStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(MatchReport);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
MatchReportStory.story = { name: 'MatchReport' };

export const PrintShopStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(PrintShop);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
PrintShopStory.story = { name: 'PrintShop' };

export const LabsStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(Labs);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LabsStory.story = {
	name: 'Labs',
};

export const NumberedListStory = (): React.ReactNode => {
	const ServerCAPI = convertToImmersive(NumberedList);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
NumberedListStory.story = {
	name: 'NumberedList',
};
