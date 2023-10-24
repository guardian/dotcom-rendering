// ----- Imports ----- //

import { Edition } from '@guardian/apps-rendering-api-models/edition';
import { ArticleSpecial } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { StoryFn } from '@storybook/react';
import { formatToString } from 'articleFormat';
import {
	analysis,
	article,
	articleNoComments,
	articleNoJobTitle,
	comment,
	commentImmersive,
	editorial,
	explainer,
	feature,
	gallery,
	interview,
	letter,
	matchReport,
	newsletterSignUp,
	obituary,
	photoEssay,
	printShop,
	quiz,
	recipe,
	review,
	setEdition,
	setTheme,
	standardImmersive,
} from 'fixtures/item';
import { deadBlog, live } from 'fixtures/live';
import type { Item, NewsletterSignup } from 'item';
import { compose, pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import AnalysisLayout from './AnalysisLayout';
import CommentLayout from './CommentLayout';
import GalleryLayout from './GalleryLayout';
import ImmersiveLayout from './ImmersiveLayout';
import LetterLayout from './LetterLayout';
import LiveLayout from './LiveLayout';
import NewsletterSignUpLayout from './NewsletterSignUpLayout';
import StandardLayout from './StandardLayout';

// ----- Helpers ----- //

/**
 * Updates an instance of `Item`, setting the `theme` to `SpecialReportAlt`.
 */
const setSpecialReportAlt = setTheme(ArticleSpecial.SpecialReportAlt);

/**
 * Helper for generating layout stories. It takes a test instance of `Item`
 * (a fixture) and applies it to a given layout component. It also generates
 * a name for the story based on the `ArticleFormat` of the fixture.
 *
 * @param Layout A layout component
 * @returns A story created from a layout component and an `Item` fixture
 */
const createLayoutStory =
	<Fixture extends Item>(Layout: FC<{ item: Fixture }>) =>
	(fixture: Fixture): StoryFn<typeof Layout> => {
		const story = (): ReactElement => <Layout item={fixture} />;
		story.storyName = formatToString(fixture);

		return story;
	};

// ----- Story Helpers ----- //

/*
These can be used to generate stories for different layouts when provided with
a fixture. They're here for convenience to avoid repetition in the main story
code below.
*/

const standardLayoutStory = createLayoutStory(StandardLayout);
const standardLayoutStoryWithSpecialReportAlt: typeof standardLayoutStory =
	compose(standardLayoutStory, setSpecialReportAlt);
const commentLayoutStory = createLayoutStory(CommentLayout);
const letterLayoutStory = createLayoutStory(LetterLayout);
const analysisLayoutStory = createLayoutStory(AnalysisLayout);
const liveLayoutStory = createLayoutStory(LiveLayout);
const galleryLayoutStory = createLayoutStory(GalleryLayout);
const immersiveLayoutStory = createLayoutStory(ImmersiveLayout);

const newsletterSignUpLayoutStory = createLayoutStory(
	(props: { item: NewsletterSignup }) => (
		<>
			<style>
				{`.js-signup-form-container {
			display:block !important;
		}`}
			</style>
			<NewsletterSignUpLayout item={props.item} />
		</>
	),
);
const newsletterSignUpFallbackLayoutStory = (
	fixture: NewsletterSignup,
): StoryFn<typeof NewsletterSignUpLayout> => {
	const story = (): ReactElement => (
		<>
			<style>
				{`.js-signup-form-fallback-container {
				display:block !important;
			}`}
			</style>
			<NewsletterSignUpLayout item={fixture} />
		</>
	);
	story.storyName = `${formatToString(
		fixture,
	)} (form component not supported)`;

	return story;
};

// ----- Stories ----- //

/*
These are named based on the `ArticleFormat` type of the fixture they
correspond to. Each one has a name of the form: "<Design><Display><Theme>".
For example: "ReviewStandardNews", where `Review` is the `Design`, `Standard`
is the `Display` and `News` is the `Theme`.
*/

export const StandardStandardNews = standardLayoutStory(article);
export const StandardStandardNewsNoComments =
	standardLayoutStory(articleNoComments);

export const StandardStandardNewsNoLocationOrJobTitle =
	standardLayoutStory(articleNoJobTitle);

export const StandardStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(article);
export const StandardImmersiveNews = immersiveLayoutStory(standardImmersive);
export const StandardImmersiveSpecialReportAlt = pipe(
	standardImmersive,
	setSpecialReportAlt,
	immersiveLayoutStory,
);

export const ReviewStandardNews = standardLayoutStory(review);
export const ReviewStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(review);

export const MatchReportStandardNews = standardLayoutStory(matchReport);
export const MatchReportStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(matchReport);

export const PrintShopStandardNews = standardLayoutStory(printShop);
export const PrintShopStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(printShop);

export const PhotoEssayStandardNews = standardLayoutStory(photoEssay);
export const PhotoEssayStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(photoEssay);

export const FeatureStandardNews = standardLayoutStory(feature);
export const FeatureStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(feature);

export const InterviewStandardNews = standardLayoutStory(interview);
export const InterviewStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(interview);

export const QuizStandardNews = standardLayoutStory(quiz);
export const QuizStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(quiz);

export const RecipeStandardNews = standardLayoutStory(recipe);
export const RecipeStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(recipe);

export const CommentStandardNews = commentLayoutStory(comment);
export const CommentStandardNewsWithComments = commentLayoutStory(comment);

export const CommentStandardSpecialReportAlt = pipe(
	comment,
	setSpecialReportAlt,
	commentLayoutStory,
);
export const CommentImmersiveOpinion = immersiveLayoutStory(commentImmersive);
export const CommentImmersiveSpecialReportAlt = pipe(
	commentImmersive,
	setSpecialReportAlt,
	immersiveLayoutStory,
);

export const LetterStandardNews = letterLayoutStory(letter);
export const LetterStandardSpecialReportAlt = pipe(
	letter,
	setSpecialReportAlt,
	letterLayoutStory,
);

export const EditorialStandardNews = commentLayoutStory(editorial);
export const EditorialStandardSpecialReportAlt = pipe(
	editorial,
	setSpecialReportAlt,
	commentLayoutStory,
);

export const AnalysisStandardNews = analysisLayoutStory(analysis);
export const AnalysisStandardSpecialReportAlt = pipe(
	analysis,
	setSpecialReportAlt,
	analysisLayoutStory,
);

export const ExplainerStandardNews = standardLayoutStory(explainer);
export const ExplainerStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(explainer);

export const ObituaryStandardNews = standardLayoutStory(obituary);
export const ObituaryStandardSpecialReportAlt =
	standardLayoutStoryWithSpecialReportAlt(obituary);

export const LiveBlogStandardNews = pipe(
	live,
	setEdition(Edition.US),
	liveLayoutStory,
);
export const LiveBlogStandardSpecialReportAlt = pipe(
	live,
	setEdition(Edition.US),
	setSpecialReportAlt,
	liveLayoutStory,
);

export const DeadBlogStandardNews = pipe(
	deadBlog,
	setEdition(Edition.AU),
	liveLayoutStory,
);
export const DeadBlogStandardSpecialReportAlt = pipe(
	deadBlog,
	setEdition(Edition.AU),
	setSpecialReportAlt,
	liveLayoutStory,
);

export const NewsletterSignUpStandardNews =
	newsletterSignUpLayoutStory(newsletterSignUp);
export const NewsletterSignUpStandardSpecialReportAlt = pipe(
	newsletterSignUp,
	setSpecialReportAlt,
	newsletterSignUpLayoutStory,
);
export const NewsletterSignUpStandardNewsFallback =
	newsletterSignUpFallbackLayoutStory(newsletterSignUp);
export const NewsletterSignUpStandardSpecialReportAltFallback = pipe(
	newsletterSignUp,
	setSpecialReportAlt,
	newsletterSignUpFallbackLayoutStory,
);

export const GalleryStandardNews = galleryLayoutStory(gallery);
export const GalleryStandardSpecialReportAlt = pipe(
	gallery,
	setSpecialReportAlt,
	galleryLayoutStory,
);

// ----- Story Config ----- //

export default {
	title: 'AR/Layout',
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			diffThreshold: 0.4,
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};
