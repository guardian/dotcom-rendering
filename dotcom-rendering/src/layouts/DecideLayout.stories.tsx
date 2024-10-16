import { isObject } from '@guardian/libs';
import { breakpoints } from '@guardian/source/foundations';
import type { Decorator, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { colourSchemeDecorator } from '../../.storybook/decorators/themeDecorator';
import { Analysis as AnalysisStandardNewsFixture } from '../../fixtures/generated/dcr-articles/Analysis';
import { Comment as CommentStandardOpinionFixture } from '../../fixtures/generated/dcr-articles/Comment';
import { Feature as FeatureStandardCultureFixture } from '../../fixtures/generated/dcr-articles/Feature';
import { Labs as PhotoEssayImmersiveLabsFixture } from '../../fixtures/generated/dcr-articles/Labs';
import { Live as LiveBlogStandardNewsFixture } from '../../fixtures/generated/dcr-articles/Live';
import { LiveBlogSingleContributor as LiveBlogSingleContributorFixture } from '../../fixtures/generated/dcr-articles/LiveBlogSingleContributor';
import { NewsletterSignup as NewsletterSignupStandardSportFixture } from '../../fixtures/generated/dcr-articles/NewsletterSignup';
import { Picture as PictureShowcaseOpinionFixture } from '../../fixtures/generated/dcr-articles/Picture';
import { Recipe as RecipeStandardLifestyleFixture } from '../../fixtures/generated/dcr-articles/Recipe';
import { Standard as StandardStandardNewsFixture } from '../../fixtures/generated/dcr-articles/Standard';
import { Video as VideoStandardNewsFixture } from '../../fixtures/generated/dcr-articles/Video';
import { embedIframe } from '../client/embedIframe';
import { type ArticleFormat, decideFormat } from '../lib/format';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { extractNAV } from '../model/extract-nav';
import type { ArticleDeprecated } from '../types/article';
import { DecideLayout, type Props as DecideLayoutProps } from './DecideLayout';

mockRESTCalls();

export type HydratedLayoutDecoratorArgs = {
	colourScheme?: 'light' | 'dark';
};

/**
 * HydratedLayout is used here to simulated the hydration that happens after we init react on
 * the client. We need a separate component so that we can make use of useEffect to ensure
 * the hydrate step only runs once the dom has been rendered.
 *
 * It also sets up `format` and `renderingTarget`, populates the palette colours for the layout
 * stories, and adds the `NAV` for web.
 */
const HydratedLayout: Decorator<
	DecideLayoutProps & HydratedLayoutDecoratorArgs
> = (Story, context) => {
	const { article } = context.args;
	const format: ArticleFormat = decideFormat(article.format);
	const colourScheme =
		(isObject(context.parameters.config) &&
		context.parameters.config.renderingTarget === 'Apps'
			? context.args.colourScheme
			: 'light') ?? 'light';
	const paletteDecorator = colourSchemeDecorator(
		colourScheme,
	)<DecideLayoutProps>([format]);
	const args: DecideLayoutProps =
		isObject(context.parameters.config) &&
		context.parameters.config.renderingTarget === 'Apps'
			? {
					...context.args,
					renderingTarget: 'Apps',
					format,
			  }
			: {
					...context.args,
					renderingTarget: 'Web',
					format,
					NAV: {
						...extractNAV(article.nav),
						selectedPillar: getCurrentPillar(article),
					},
			  };

	useEffect(() => {
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${String(e)}`),
		);
	}, [article]);

	return paletteDecorator(Story, {
		...context,
		args,
	});
};

export default {
	title: 'Components/DecideLayout',
	component: DecideLayout,
	parameters: {
		chromatic: {
			diffThreshold: 0.2,
			pauseAnimationAtEnd: true,
			delay: 1200, // ensure that OnwardsUpper shows relevant data
		},
	},
	decorators: [HydratedLayout],
};

type Story = StoryObj<DecideLayoutProps & HydratedLayoutDecoratorArgs>;

const appsParameters = {
	config: {
		renderingTarget: 'Apps',
		darkModeAvailable: true,
	},
	chromatic: {
		viewports: [breakpoints.mobile, breakpoints.tablet],
	},
};

const webParameters = {
	config: {
		renderingTarget: 'Web',
		darkModeAvailable: false,
	},
};

export const WebStandardStandardNewsLight: Story = {
	args: {
		article: StandardStandardNewsFixture.frontendData,
	},
	parameters: webParameters,
};

export const AppsStandardStandardNewsLight: Story = {
	args: {
		article: StandardStandardNewsFixture.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsStandardStandardNewsDark: Story = {
	args: {
		article: StandardStandardNewsFixture.frontendData,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const standardImmersiveNewsFixture: ArticleDeprecated = {
	...StandardStandardNewsFixture.frontendData,
	format: {
		...StandardStandardNewsFixture.frontendData.format,
		display: 'ImmersiveDisplay',
	},
};

export const AppsStandardImmersiveNewsLight: Story = {
	args: {
		article: standardImmersiveNewsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsStandardImmersiveNewsDark: Story = {
	args: {
		article: standardImmersiveNewsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebNewsletterSignupStandardSportLight: Story = {
	args: {
		article: NewsletterSignupStandardSportFixture.frontendData,
	},
	parameters: webParameters,
};

export const WebPictureShowcaseOpinionLight: Story = {
	args: {
		article: PictureShowcaseOpinionFixture.frontendData,
	},
	parameters: webParameters,
};

export const WebStandardLifestyleReviewLight: Story = {
	args: {
		article: {
			...StandardStandardNewsFixture.frontendData,
			format: {
				...StandardStandardNewsFixture.frontendData.format,
				theme: 'LifestylePillar',
				design: 'ReviewDesign',
			},
			starRating: 4,
		},
	},
	parameters: webParameters,
};

export const WebStandardNewsInterviewLight: Story = {
	args: {
		article: {
			...StandardStandardNewsFixture.frontendData,
			format: {
				...StandardStandardNewsFixture.frontendData.format,
				design: 'InterviewDesign',
			},
		},
	},
	parameters: webParameters,
};

export const AppsPictureShowcaseOpinionLight: Story = {
	args: {
		article: PictureShowcaseOpinionFixture.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsPictureShowcaseOpinionDark: Story = {
	args: {
		article: PictureShowcaseOpinionFixture.frontendData,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebPhotoEssayImmersiveLabsLight: Story = {
	args: {
		article: PhotoEssayImmersiveLabsFixture.frontendData,
	},
	parameters: webParameters,
};

const standardStandardLabsFixture: ArticleDeprecated = {
	...StandardStandardNewsFixture.frontendData,
	format: {
		...StandardStandardNewsFixture.frontendData.format,
		theme: 'Labs',
	},
};

export const WebStandardStandardLabsLight: Story = {
	args: {
		article: standardStandardLabsFixture,
	},
	parameters: webParameters,
};

export const AppsStandardStandardLabsLight: Story = {
	args: {
		article: standardStandardLabsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsStandardStandardLabsDark: Story = {
	args: {
		article: standardStandardLabsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebFeatureStandardLabsLight: Story = {
	args: {
		article: {
			...FeatureStandardCultureFixture.frontendData,
			format: {
				...FeatureStandardCultureFixture.frontendData.format,
				theme: 'Labs',
			},
		},
	},
	parameters: webParameters,
};

export const WebRecipeStandardLabsLight: Story = {
	args: {
		article: {
			...RecipeStandardLifestyleFixture.frontendData,
			format: {
				...RecipeStandardLifestyleFixture.frontendData.format,
				theme: 'Labs',
			},
		},
	},
	parameters: webParameters,
};

export const AppsRecipeStandardLifestyleLight: Story = {
	args: {
		article: RecipeStandardLifestyleFixture.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsRecipeStandardLifestyleDark: Story = {
	args: {
		article: RecipeStandardLifestyleFixture.frontendData,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebLiveBlogStandardNewsLight: Story = {
	args: {
		article: LiveBlogStandardNewsFixture.frontendData,
	},
	parameters: webParameters,
};

export const WebLiveBlogStandardLabsLight: Story = {
	args: {
		article: {
			...LiveBlogStandardNewsFixture.frontendData,
			format: {
				...LiveBlogStandardNewsFixture.frontendData.format,
				theme: 'Labs',
			},
		},
	},
	parameters: webParameters,
};

export const AppsLiveBlogStandardNewsLight: Story = {
	args: {
		article: LiveBlogStandardNewsFixture.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsLiveBlogStandardNewsDark: Story = {
	args: {
		article: LiveBlogStandardNewsFixture.frontendData,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const liveBlogStandardSportFixture: ArticleDeprecated = {
	...LiveBlogStandardNewsFixture.frontendData,
	format: {
		...LiveBlogStandardNewsFixture.frontendData.format,
		theme: 'SportPillar',
	},
};

export const AppsLiveBlogStandardSportLight: Story = {
	args: {
		article: liveBlogStandardSportFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsLiveBlogStandardSportDark: Story = {
	args: {
		article: liveBlogStandardSportFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const liveBlogStandardSpecialReportFixture: ArticleDeprecated = {
	...LiveBlogStandardNewsFixture.frontendData,
	format: {
		...LiveBlogStandardNewsFixture.frontendData.format,
		theme: 'SpecialReportTheme',
	},
};

export const AppsLiveBlogStandardSpecialReportLight: Story = {
	args: {
		article: liveBlogStandardSpecialReportFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsLiveBlogStandardSpecialReportDark: Story = {
	args: {
		article: liveBlogStandardSpecialReportFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const liveBlogStandardSpecialReportAltFixture: ArticleDeprecated = {
	...LiveBlogStandardNewsFixture.frontendData,
	format: {
		...LiveBlogStandardNewsFixture.frontendData.format,
		theme: 'SpecialReportAltTheme',
	},
};

export const AppsLiveBlogStandardSpecialReportAltLight: Story = {
	args: {
		article: liveBlogStandardSpecialReportAltFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsLiveBlogStandardSpecialReportAltDark: Story = {
	args: {
		article: liveBlogStandardSpecialReportAltFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebLiveblogWithNoKeyEvents: Story = {
	args: {
		article: { ...LiveBlogStandardNewsFixture.frontendData, keyEvents: [] },
	},
	parameters: webParameters,
};

export const AppsLiveblogSingleContributorLight: Story = {
	args: {
		article: LiveBlogSingleContributorFixture.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsLiveblogSingleContributorDark: Story = {
	args: {
		article: LiveBlogSingleContributorFixture.frontendData,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const commentStandardNewsFixture: ArticleDeprecated = {
	...CommentStandardOpinionFixture.frontendData,
	format: {
		...CommentStandardOpinionFixture.frontendData.format,
		theme: 'NewsPillar',
	},
};

export const AppsCommentStandardNewsLight: Story = {
	args: {
		article: commentStandardNewsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsCommentStandardNewsDark: Story = {
	args: {
		article: commentStandardNewsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const interactiveStandardNewsFixture: ArticleDeprecated = {
	...StandardStandardNewsFixture.frontendData,
	format: {
		...StandardStandardNewsFixture.frontendData.format,
		design: 'InteractiveDesign',
	},
};

export const AppsInteractiveStandardNewsLight: Story = {
	args: {
		article: interactiveStandardNewsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsInteractiveStandardNewsDark: Story = {
	args: {
		article: interactiveStandardNewsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const AppsAnalysisStandardNewsLight: Story = {
	args: {
		article: AnalysisStandardNewsFixture.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsAnalysisStandardNewsDark: Story = {
	args: {
		article: AnalysisStandardNewsFixture.frontendData,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const analysisStandardCultureFixture: ArticleDeprecated = {
	...AnalysisStandardNewsFixture.frontendData,
	format: {
		...AnalysisStandardNewsFixture.frontendData.format,
		theme: 'CulturePillar',
	},
};

export const AppsAnalysisStandardCultureLight: Story = {
	args: {
		article: analysisStandardCultureFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsAnalysisStandardCultureDark: Story = {
	args: {
		article: analysisStandardCultureFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebVideoStandardNewsLight: Story = {
	args: {
		article: VideoStandardNewsFixture.frontendData,
	},
	parameters: webParameters,
};

export const WebVideoStandardLabsLight: Story = {
	args: {
		article: {
			...VideoStandardNewsFixture.frontendData,
			format: {
				...VideoStandardNewsFixture.frontendData.format,
				theme: 'Labs',
			},
		},
	},
	parameters: webParameters,
};

export const AppsVideoStandardNewsLight: Story = {
	args: {
		article: VideoStandardNewsFixture.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsVideoStandardNewsDark: Story = {
	args: {
		article: VideoStandardNewsFixture.frontendData,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};
