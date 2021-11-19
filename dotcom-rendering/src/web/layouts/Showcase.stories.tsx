import { useEffect } from 'react';

import {
	makeGuardianBrowserCAPI,
	makeGuardianBrowserNav,
} from '@root/src/model/window-guardian';
import { Article } from '@root/fixtures/generated/articles/Article';
import { PhotoEssay } from '@root/fixtures/generated/articles/PhotoEssay';
import { Review } from '@root/fixtures/generated/articles/Review';
import { Analysis } from '@root/fixtures/generated/articles/Analysis';
import { Feature } from '@root/fixtures/generated/articles/Feature';
import { Live } from '@root/fixtures/generated/articles/Live';
import { Editorial } from '@root/fixtures/generated/articles/Editorial';
import { Letter } from '@root/fixtures/generated/articles/Letter';
import { Interview } from '@root/fixtures/generated/articles/Interview';
import { Quiz } from '@root/fixtures/generated/articles/Quiz';
import { Recipe } from '@root/fixtures/generated/articles/Recipe';
import { Comment } from '@root/fixtures/generated/articles/Comment';
import { MatchReport } from '@root/fixtures/generated/articles/MatchReport';
import { Labs } from '@root/fixtures/generated/articles/Labs';
import { SpecialReport } from '@root/fixtures/generated/articles/SpecialReport';
import { NumberedList } from '@root/fixtures/generated/articles/NumberedList';

import { BootReact } from '@root/src/web/components/BootReact';
import { embedIframe } from '@root/src/web/browser/embedIframe/embedIframe';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';
import { injectPrivacySettingsLink } from '@root/src/web/lib/injectPrivacySettingsLink';

import { extractNAV } from '@root/src/model/extract-nav';
import { fireAndResetHydrationState } from '@root/src/web/components/HydrateOnce';
import { DecideLayout } from './DecideLayout';

mockRESTCalls();

export default {
	title: 'Layouts/Showcase',
	parameters: {
		chromatic: { viewports: [1300], delay: 800, diffThreshold: 0.2 },
	},
};

const convertToShowcase = (CAPI: CAPIType) => {
	return {
		...CAPI,
		format: {
			...CAPI.format,
			display: 'ShowcaseDisplay' as CAPIDisplay,
		},
	};
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ ServerCAPI }: { ServerCAPI: CAPIType }) => {
	fireAndResetHydrationState();
	const NAV = extractNAV(ServerCAPI.nav);

	useEffect(() => {
		const CAPI = makeGuardianBrowserCAPI(ServerCAPI);
		BootReact({ CAPI, NAV: makeGuardianBrowserNav(NAV) });
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${e}`),
		);
		// Manually updates the footer DOM because it's not hydrated
		injectPrivacySettingsLink();
	}, [ServerCAPI, NAV]);
	return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};

export const ArticleStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Article);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ArticleStory.story = { name: 'Article' };

export const ReviewStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Review);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ReviewStory.story = { name: 'Review' };

export const CommentStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Comment);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
CommentStory.story = { name: 'Comment' };

export const PhotoEssayStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(PhotoEssay);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
PhotoEssayStory.story = { name: 'PhotoEssay' };

export const AnalysisStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Analysis);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
AnalysisStory.story = { name: 'Analysis' };

export const FeatureStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Feature);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
FeatureStory.story = { name: 'Feature' };

export const LiveStory = (): React.ReactNode => {
	const LiveBlog = {
		...Live,
		config: {
			...Live.config,
			isLive: true,
		},
	};
	const ServerCAPI = convertToShowcase(LiveBlog);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LiveStory.story = { name: 'LiveBlog' };

export const DeadStory = (): React.ReactNode => {
	const DeadBlog = {
		...Live,
		config: {
			...Live.config,
			isLive: false,
		},
	};
	const ServerCAPI = convertToShowcase(DeadBlog);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
DeadStory.story = { name: 'DeadBlog' };

export const EditorialStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Editorial);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
EditorialStory.story = { name: 'Editorial' };

export const LetterStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Letter);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LetterStory.story = { name: 'Letter' };

export const InterviewStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Interview);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
InterviewStory.story = {
	name: 'Interview',
	parameters: {
		viewport: { defaultViewport: 'leftCol' },
		chromatic: { viewports: [1140] },
	},
};

export const QuizStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Quiz);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
QuizStory.story = {
	name: 'Quiz',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};

export const RecipeStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Recipe);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
RecipeStory.story = {
	name: 'Recipe',
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [480] },
	},
};

export const MatchReportStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(MatchReport);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
MatchReportStory.story = { name: 'MatchReport' };

export const LabsStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(Labs);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LabsStory.story = {
	name: 'Labs',
};

export const SpecialReportStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(SpecialReport);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
SpecialReportStory.story = {
	name: 'SpecialReport',
};

export const NumberedListStory = (): React.ReactNode => {
	const ServerCAPI = convertToShowcase(NumberedList);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
NumberedListStory.story = {
	name: 'NumberedList',
};
