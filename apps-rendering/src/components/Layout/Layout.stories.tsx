// ----- Imports ----- //
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import { breakpoints } from '@guardian/source-foundations';
import { formatToString } from 'articleFormat';
import {
	analysis,
	article,
	comment,
	editorial,
	explainer,
	feature,
	gallery,
	immersive,
	interview,
	letter,
	matchReport,
	newsletterSignUp,
	photoEssay,
	printShop,
	quiz,
	recipe,
	review,
} from 'fixtures/item';
import { deadBlog, live } from 'fixtures/live';
import type { ReactElement } from 'react';
import AnalysisLayout from './AnalysisLayout';
import CommentLayout from './CommentLayout';
import GalleryLayout from './GalleryLayout';
import ImmersiveLayout from './ImmersiveLayout';
import LetterLayout from './LetterLayout';
import LiveLayout from './LiveLayout';
import NewsletterSignUpLayout from './NewsletterSignUpLayout';
import StandardLayout from './StandardLayout';

// ----- Stories ----- //

export const Standard = (): ReactElement => <StandardLayout item={article} />;
Standard.story = { name: formatToString(article) };

export const Review = (): ReactElement => <StandardLayout item={review} />;
Review.story = { name: formatToString(review) };

export const MatchReport = (): ReactElement => (
	<StandardLayout item={matchReport} />
);
MatchReport.story = { name: formatToString(matchReport) };

export const PrintShop = (): ReactElement => (
	<StandardLayout item={printShop} />
);
PrintShop.story = { name: formatToString(printShop) };

export const PhotoEssay = (): ReactElement => (
	<StandardLayout item={photoEssay} />
);
PhotoEssay.story = { name: formatToString(photoEssay) };

export const Feature = (): ReactElement => <StandardLayout item={feature} />;
Feature.story = { name: formatToString(feature) };

export const Interview = (): ReactElement => (
	<StandardLayout item={interview} />
);
Interview.story = { name: formatToString(interview) };

export const Quiz = (): ReactElement => <StandardLayout item={quiz} />;
Quiz.story = { name: formatToString(quiz) };

export const Recipe = (): ReactElement => <StandardLayout item={recipe} />;
Recipe.story = { name: formatToString(recipe) };

export const Comment = (): ReactElement => <CommentLayout item={comment} />;
Comment.story = { name: formatToString(comment) };

export const Letter = (): ReactElement => <LetterLayout item={letter} />;
Letter.story = { name: formatToString(letter) };

export const Editorial = (): ReactElement => <CommentLayout item={editorial} />;
Editorial.story = { name: formatToString(editorial) };

export const Analysis = (): ReactElement => <AnalysisLayout item={analysis} />;
Analysis.story = { name: formatToString(analysis) };

export const Explainer = (): ReactElement => (
	<StandardLayout item={explainer} />
);
Explainer.story = { name: formatToString(explainer) };

export const LiveBlog = (): ReactElement => (
	<LiveLayout
		item={{
			...live,
			edition: Edition.US,
		}}
	/>
);
LiveBlog.story = { name: formatToString(live) };

export const DeadBlog = (): ReactElement => (
	<LiveLayout
		item={{
			...deadBlog,
			edition: Edition.AU,
		}}
	/>
);
DeadBlog.story = { name: formatToString(deadBlog) };

export const NewsletterSignup = (): ReactElement => (
	<>
		<style>
			{`.js-signup-form-container {
			display:block !important;
		}`}
		</style>
		<NewsletterSignUpLayout item={newsletterSignUp} />
	</>
);
NewsletterSignup.story = { name: formatToString(newsletterSignUp) };

export const NewsletterSignupFallback = (): ReactElement => (
	<>
		<style>
			{`.js-signup-form-fallback-container {
			display:block !important;
		}`}
		</style>
		<NewsletterSignUpLayout item={newsletterSignUp} />
	</>
);
NewsletterSignupFallback.story = {
	name: `${formatToString(newsletterSignUp)} (form component not supported)`,
};

export const Gallery = (): ReactElement => <GalleryLayout item={gallery} />;
Gallery.story = { name: formatToString(gallery) };

export const Immersive = (): ReactElement => (
	<ImmersiveLayout item={immersive} />
);
Immersive.story = { name: formatToString(immersive) };

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
