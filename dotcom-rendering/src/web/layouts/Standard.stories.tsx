import { useEffect } from 'react';

import { breakpoints } from '@guardian/source-foundations';

import { decideFormat } from '../lib/decideFormat';

import { Article } from '../../../fixtures/generated/articles/Article';
import { NewsletterSignup } from '../../../fixtures/generated/articles/NewsletterSignup';
import { PhotoEssay } from '../../../fixtures/generated/articles/PhotoEssay';
import { Review } from '../../../fixtures/generated/articles/Review';
import { PrintShop } from '../../../fixtures/generated/articles/PrintShop';
import { Analysis } from '../../../fixtures/generated/articles/Analysis';
import { Feature } from '../../../fixtures/generated/articles/Feature';
import { Live } from '../../../fixtures/generated/articles/Live';
import { Editorial } from '../../../fixtures/generated/articles/Editorial';
import { Letter } from '../../../fixtures/generated/articles/Letter';
import { Interview } from '../../../fixtures/generated/articles/Interview';
import { Quiz } from '../../../fixtures/generated/articles/Quiz';
import { Recipe } from '../../../fixtures/generated/articles/Recipe';
import { Comment } from '../../../fixtures/generated/articles/Comment';
import { MatchReport } from '../../../fixtures/generated/articles/MatchReport';
import { Labs } from '../../../fixtures/generated/articles/Labs';
import { SpecialReport } from '../../../fixtures/generated/articles/SpecialReport';
import { NumberedList } from '../../../fixtures/generated/articles/NumberedList';

import { embedIframe } from '../browser/embedIframe/embedIframe';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';

import { extractNAV } from '../../model/extract-nav';
import { DecideLayout } from './DecideLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';

mockRESTCalls();

export default {
	title: 'Layouts/Standard',
	parameters: {
		chromatic: {
			viewports: [breakpoints.wide],
			delay: 800,
			diffThreshold: 0.2,
		},
	},
};

const convertToStandard = (CAPIArticle: CAPIArticleType) => {
	return {
		...CAPIArticle,
		format: {
			...CAPIArticle.format,
			display: 'StandardDisplay' as CAPIDisplay,
		},
	};
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({
	ServerCAPI,
	modifyPage,
}: {
	ServerCAPI: CAPIArticleType;
	modifyPage?: () => void;
}) => {
	const NAV = extractNAV(ServerCAPI.nav);
	const format: ArticleFormat = decideFormat(ServerCAPI.format);

	useEffect(() => {
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${e}`),
		);
		// Manually updates the footer DOM because it's not hydrated
		injectPrivacySettingsLink();
		doStorybookHydration();
	}, [ServerCAPI]);
	if (modifyPage) {
		modifyPage();
	}
	return <DecideLayout CAPIArticle={ServerCAPI} NAV={NAV} format={format} />;
};

export const ArticleStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Article);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ArticleStory.story = { name: 'Article' };

export const NewsletterSignupStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard({
		...NewsletterSignup,
		headline: 'Sign up for First Edition',
		blocks: [{...NewsletterSignup.blocks[0], elements:[
			{
				"html": "<p>Start the day one step ahead.</p><p>Our email breaks down the key stories of the day and why they matter. </p>",
				"_type": "model.dotcomrendering.pageElements.TextBlockElement",
				"elementId": "fbc31a95-6e90-4919-80d9-e8dbbe14cb54"
			},
			{
				"html": "<iframe src=\"https://www.theguardian.com/email/form/thrasher/4156\" height=\"52px\" data-form-title=\"A different kind of daily email\" data-form-description=\"Sign up and get a daily briefing from the Guardian\" data-form-campaign-code=\"UK_signup_page\" scrolling=\"no\" seamless frameborder=\"0\" class=\"iframed--overflow-hidden email-sub__iframe js-email-sub__iframe js-email-sub__iframe--article\" data-form-success-desc=\"Thanks, you'll start getting the morning briefing soon.\"></iframe>",
				"safe": true,
				"alt": "Sign up to Guardian Morning Briefing",
				"isMandatory": true,
				"isThirdPartyTracking": false,
				"source": "The Guardian",
				"sourceDomain": "theguardian.com",
				"_type": "model.dotcomrendering.pageElements.EmbedBlockElement",
				"elementId": "dcd0a6cf-0e79-4065-8aa3-94c1833ac7a4"
			},
			{
				"html": `
					<style>
						[data-is-banner-for-newsletter-signup=true] {
							background-color: purple;
							border: 2px dashed white;
							border-radius: 5px;
							padding: 8px;
							color: white;
							font-family: arial,sans-serif;
						}
						[data-is-banner-for-newsletter-signup=true] h3 {
							font-size: 150%;
						}
						[data-is-banner-for-newsletter-signup=true] span, [data-is-banner-for-newsletter-signup=true] p {
							font-size: 100%;
							line-height: 1.5;
						}
						[data-is-banner-for-newsletter-signup=true] code {
							font-family: monospace;
						}
					</style>
					<div data-is-banner-for-newsletter-signup=\"true\">
						<h3>This purple box is an embed - the blue banner is a part of the layout</h3>

						<p>The layout file finds the emded element containing the text <code>data-is-banner-for-newsletter-signup=\"true\"</code>, removes it from the rest of the content and renders it inside this banner. The banner is not rendered if the emebed is not in the article.</p>

						<p>Editors could change which other newsletter was promoted in sign-up page by changing the embed in composer.</p>
					</div>
				`,
				"safe": true,
				"alt": "ADVERT FOR THE LONG READ",
				"isMandatory": true,
				"isThirdPartyTracking": false,
				"source": "The Guardian",
				"sourceDomain": "theguardian.com",
				"_type": "model.dotcomrendering.pageElements.EmbedBlockElement",
				"elementId": "dcd0a6cf-0e79-4065-8aa3-94c1833ac7a5"
			},
			{
				"html": `
				<p>The <strong>sign-up embed</strong> is part of the composer content, so there is editorial control over where it goes in the content. The <strong>share buttons</strong> and the <strong>privacy wording</strong> are part of the page layout, so the editors would not need to add those in composer.</p>
				`,
				"_type": "model.dotcomrendering.pageElements.TextBlockElement",
				"elementId": "fbc31a95-6e90-4919-80d9-e8dbbe14cb59"
			},
		]} ]
	});

	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
NewsletterSignupStory.story = { name: 'NewsletterSignup' };

export const ReviewStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Review);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ReviewStory.story = { name: 'Review' };

export const PrintShopStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(PrintShop);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
PrintShopStory.story = { name: 'PrintShop' };

export const CommentStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Comment);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
CommentStory.story = {
	name: 'Comment',
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		// Cutout/byline interaction is a specific issue
		// we look out for on mobile on opinion content
		chromatic: { viewports: [breakpoints.mobile, breakpoints.wide] },
	},
};

export const PhotoEssayStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(PhotoEssay);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
PhotoEssayStory.story = { name: 'PhotoEssay' };

export const AnalysisStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Analysis);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
AnalysisStory.story = {
	name: 'Analysis',
	parameters: {
		viewport: { defaultViewport: 'mobileLandscape' },
		chromatic: { viewports: [breakpoints.mobileLandscape] },
	},
};

export const FeatureStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Feature);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
FeatureStory.story = { name: 'Feature' };

export const LiveStory = (): React.ReactNode => {
	const LiveBlog = {
		...Live,
		format: {
			...Live.format,
			design: 'LiveBlogDesign' as CAPIDesign,
		},
	};
	const ServerCAPI = convertToStandard(LiveBlog);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LiveStory.story = {
	name: 'LiveBlog',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const DeadStory = (): React.ReactNode => {
	const DeadBlog = {
		...Live,
		format: {
			...Live.format,
			design: 'DeadBlogDesign' as CAPIDesign,
		},
	};
	const ServerCAPI = convertToStandard(DeadBlog);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
DeadStory.story = {
	name: 'DeadBlog',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const EditorialStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Editorial);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
EditorialStory.story = {
	name: 'Editorial',
	parameters: {
		viewport: { defaultViewport: 'phablet' },
		chromatic: { viewports: [breakpoints.phablet] },
	},
};

export const LetterStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Letter);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LetterStory.story = {
	name: 'Letter',
};

export const InterviewStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Interview);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
InterviewStory.story = {
	name: 'Interview',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [breakpoints.desktop] },
	},
};

export const QuizStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Quiz);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
QuizStory.story = {
	name: 'Quiz',
	parameters: {
		viewport: { defaultViewport: 'wide' },
	},
};

export const RecipeStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Recipe);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
RecipeStory.story = {
	name: 'Recipe',
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [breakpoints.mobileMedium] },
	},
};

export const MatchReportStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(MatchReport);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
MatchReportStory.story = {
	name: 'MatchReport',
	parameters: {
		viewport: { defaultViewport: 'wide' },
	},
};

export const LabsStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(Labs);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
LabsStory.story = {
	name: 'Labs',
};

export const SpecialReportStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(SpecialReport);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
SpecialReportStory.story = {
	name: 'SpecialReport',
};

export const NumberedListStory = (): React.ReactNode => {
	const ServerCAPI = convertToStandard(NumberedList);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
NumberedListStory.story = {
	name: 'NumberedList',
};
