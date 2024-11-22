import { isObject } from '@guardian/libs';
import { breakpoints } from '@guardian/source/foundations';
import type { Decorator, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { colourSchemeDecorator } from '../../.storybook/decorators/themeDecorator';
import { Analysis as AnalysisStandardNewsFixture } from '../../fixtures/generated/fe-articles/Analysis';
import { Comment as CommentStandardOpinionFixture } from '../../fixtures/generated/fe-articles/Comment';
import { Feature as FeatureStandardCultureFixture } from '../../fixtures/generated/fe-articles/Feature';
import { Labs as PhotoEssayImmersiveLabsFixture } from '../../fixtures/generated/fe-articles/Labs';
import { Live as LiveBlogStandardNewsFixture } from '../../fixtures/generated/fe-articles/Live';
import { LiveBlogSingleContributor as LiveBlogSingleContributorFixture } from '../../fixtures/generated/fe-articles/LiveBlogSingleContributor';
import { NewsletterSignup as NewsletterSignupStandardSportFixture } from '../../fixtures/generated/fe-articles/NewsletterSignup';
import { Picture as PictureShowcaseOpinionFixture } from '../../fixtures/generated/fe-articles/Picture';
import { Recipe as RecipeStandardLifestyleFixture } from '../../fixtures/generated/fe-articles/Recipe';
import { Standard as StandardStandardNewsFixture } from '../../fixtures/generated/fe-articles/Standard';
import { Video as VideoStandardNewsFixture } from '../../fixtures/generated/fe-articles/Video';
import { embedIframe } from '../client/embedIframe';
import { type ArticleFormat, decideFormat } from '../lib/articleFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { extractNAV } from '../model/extract-nav';
import {
	type Article,
	type ArticleDeprecated,
	enhanceArticleType,
} from '../types/article';
import { DecideLayout, type Props as DecideLayoutProps } from './DecideLayout';

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

export const WebStandardStandardNewsLight = {
	args: {
		article: enhanceArticleType(StandardStandardNewsFixture, 'Web')
			.frontendData,
	},
	parameters: webParameters,
} satisfies Story;

export const AppsStandardStandardNewsLight = {
	args: {
		article: enhanceArticleType(StandardStandardNewsFixture, 'Apps')
			.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
} satisfies Story;

export const AppsStandardStandardNewsDark: Story = {
	args: {
		article: AppsStandardStandardNewsLight.args.article,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const standardImmersiveNewsAppsFixture: ArticleDeprecated = {
	...AppsStandardStandardNewsLight.args.article,
	format: {
		...AppsStandardStandardNewsLight.args.article.format,
		display: 'ImmersiveDisplay',
	},
};

export const AppsStandardImmersiveNewsLight: Story = {
	args: {
		article: standardImmersiveNewsAppsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsStandardImmersiveNewsDark: Story = {
	args: {
		article: standardImmersiveNewsAppsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebNewsletterSignupStandardSportLight: Story = {
	args: {
		article: enhanceArticleType(NewsletterSignupStandardSportFixture, 'Web')
			.frontendData,
	},
	parameters: webParameters,
};

export const WebPictureShowcaseOpinionLight: Story = {
	args: {
		article: enhanceArticleType(PictureShowcaseOpinionFixture, 'Web')
			.frontendData,
	},
	parameters: webParameters,
};

export const WebStandardLifestyleReviewLight: Story = {
	args: {
		article: {
			...WebStandardStandardNewsLight.args.article,
			format: {
				...WebStandardStandardNewsLight.args.article.format,
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
			...WebStandardStandardNewsLight.args.article,
			format: {
				...WebStandardStandardNewsLight.args.article.format,
				design: 'InterviewDesign',
			},
		},
	},
	parameters: webParameters,
};

export const AppsPictureShowcaseOpinionLight = {
	args: {
		article: enhanceArticleType(PictureShowcaseOpinionFixture, 'Apps')
			.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
} satisfies Story;

export const AppsPictureShowcaseOpinionDark: Story = {
	args: {
		article: AppsPictureShowcaseOpinionLight.args.article,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebPhotoEssayImmersiveLabsLight: Story = {
	args: {
		article: enhanceArticleType(PhotoEssayImmersiveLabsFixture, 'Web')
			.frontendData,
	},
	parameters: webParameters,
};

const standardStandardLabsWebFixture: ArticleDeprecated = {
	...WebStandardStandardNewsLight.args.article,
	format: {
		...WebStandardStandardNewsLight.args.article.format,
		theme: 'Labs',
	},
};

const standardStandardLabsAppsFixture: ArticleDeprecated = {
	...AppsStandardStandardNewsLight.args.article,
	format: {
		...AppsStandardStandardNewsLight.args.article.format,
		theme: 'Labs',
	},
};

export const WebStandardStandardLabsLight: Story = {
	args: {
		article: standardStandardLabsWebFixture,
	},
	parameters: webParameters,
};

export const AppsStandardStandardLabsLight: Story = {
	args: {
		article: standardStandardLabsAppsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsStandardStandardLabsDark: Story = {
	args: {
		article: standardStandardLabsAppsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const featureStandardCultureWebFixture: Article = enhanceArticleType(
	FeatureStandardCultureFixture,
	'Web',
);

export const WebFeatureStandardLabsLight: Story = {
	args: {
		article: {
			...featureStandardCultureWebFixture.frontendData,
			format: {
				...featureStandardCultureWebFixture.frontendData.format,
				theme: 'Labs',
			},
		},
	},
	parameters: webParameters,
};

const recipeStandardLifestyleWebFixture: Article = enhanceArticleType(
	RecipeStandardLifestyleFixture,
	'Web',
);

export const WebRecipeStandardLabsLight: Story = {
	args: {
		article: {
			...recipeStandardLifestyleWebFixture.frontendData,
			format: {
				...recipeStandardLifestyleWebFixture.frontendData.format,
				theme: 'Labs',
			},
		},
	},
	parameters: webParameters,
};

export const AppsRecipeStandardLifestyleLight = {
	args: {
		article: enhanceArticleType(RecipeStandardLifestyleFixture, 'Apps')
			.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
} satisfies Story;

export const AppsRecipeStandardLifestyleDark: Story = {
	args: {
		article: AppsRecipeStandardLifestyleLight.args.article,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebLiveBlogStandardNewsLight = {
	args: {
		article: enhanceArticleType(LiveBlogStandardNewsFixture, 'Web')
			.frontendData,
	},
	parameters: webParameters,
} satisfies Story;

export const WebLiveBlogStandardLabsLight: Story = {
	args: {
		article: {
			...WebLiveBlogStandardNewsLight.args.article,
			format: {
				...WebLiveBlogStandardNewsLight.args.article.format,
				theme: 'Labs',
			},
		},
	},
	parameters: webParameters,
};

export const AppsLiveBlogStandardNewsLight = {
	args: {
		article: enhanceArticleType(LiveBlogStandardNewsFixture, 'Apps')
			.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
} satisfies Story;

export const AppsLiveBlogStandardNewsDark: Story = {
	args: {
		article: AppsLiveBlogStandardNewsLight.args.article,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const liveBlogStandardSportAppsFixture: ArticleDeprecated = {
	...AppsLiveBlogStandardNewsLight.args.article,
	format: {
		...AppsLiveBlogStandardNewsLight.args.article.format,
		theme: 'SportPillar',
	},
};

export const AppsLiveBlogStandardSportLight: Story = {
	args: {
		article: liveBlogStandardSportAppsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsLiveBlogStandardSportDark: Story = {
	args: {
		article: liveBlogStandardSportAppsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const liveBlogStandardSpecialReportAppsFixture: ArticleDeprecated = {
	...AppsLiveBlogStandardNewsLight.args.article,
	format: {
		...AppsLiveBlogStandardNewsLight.args.article.format,
		theme: 'SpecialReportTheme',
	},
};

export const AppsLiveBlogStandardSpecialReportLight: Story = {
	args: {
		article: liveBlogStandardSpecialReportAppsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsLiveBlogStandardSpecialReportDark: Story = {
	args: {
		article: liveBlogStandardSpecialReportAppsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const liveBlogStandardSpecialReportAltAppsFixture: ArticleDeprecated = {
	...AppsLiveBlogStandardNewsLight.args.article,
	format: {
		...AppsLiveBlogStandardNewsLight.args.article.format,
		theme: 'SpecialReportAltTheme',
	},
};

export const AppsLiveBlogStandardSpecialReportAltLight: Story = {
	args: {
		article: liveBlogStandardSpecialReportAltAppsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsLiveBlogStandardSpecialReportAltDark: Story = {
	args: {
		article: liveBlogStandardSpecialReportAltAppsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebLiveblogWithNoKeyEvents: Story = {
	args: {
		article: {
			...WebLiveBlogStandardNewsLight.args.article,
			keyEvents: [],
		},
	},
	parameters: webParameters,
};

export const AppsLiveblogSingleContributorLight = {
	args: {
		article: enhanceArticleType(LiveBlogSingleContributorFixture, 'Apps')
			.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
} satisfies Story;

export const AppsLiveblogSingleContributorDark: Story = {
	args: {
		article: AppsLiveblogSingleContributorLight.args.article,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const commentStandardOpinionAppsFixture: Article = enhanceArticleType(
	CommentStandardOpinionFixture,
	'Apps',
);

const commentStandardNewsAppsFixture: ArticleDeprecated = {
	...commentStandardOpinionAppsFixture.frontendData,
	format: {
		...commentStandardOpinionAppsFixture.frontendData.format,
		theme: 'NewsPillar',
	},
};

export const AppsCommentStandardNewsLight: Story = {
	args: {
		article: commentStandardNewsAppsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsCommentStandardNewsDark: Story = {
	args: {
		article: commentStandardNewsAppsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const interactiveStandardNewsAppsFixture: ArticleDeprecated = {
	...AppsStandardStandardNewsLight.args.article,
	format: {
		...AppsStandardStandardNewsLight.args.article.format,
		design: 'InteractiveDesign',
	},
};

export const AppsInteractiveStandardNewsLight: Story = {
	args: {
		article: interactiveStandardNewsAppsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsInteractiveStandardNewsDark: Story = {
	args: {
		article: interactiveStandardNewsAppsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const AppsAnalysisStandardNewsLight = {
	args: {
		article: enhanceArticleType(AnalysisStandardNewsFixture, 'Apps')
			.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
} satisfies Story;

export const AppsAnalysisStandardNewsDark: Story = {
	args: {
		article: AppsAnalysisStandardNewsLight.args.article,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

const analysisStandardCultureAppsFixture: ArticleDeprecated = {
	...AppsAnalysisStandardNewsLight.args.article,
	format: {
		...AppsAnalysisStandardNewsLight.args.article.format,
		theme: 'CulturePillar',
	},
};

export const AppsAnalysisStandardCultureLight: Story = {
	args: {
		article: analysisStandardCultureAppsFixture,
		colourScheme: 'light',
	},
	parameters: appsParameters,
};

export const AppsAnalysisStandardCultureDark: Story = {
	args: {
		article: analysisStandardCultureAppsFixture,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};

export const WebVideoStandardNewsLight = {
	args: {
		article: enhanceArticleType(VideoStandardNewsFixture, 'Web')
			.frontendData,
	},
	parameters: webParameters,
} satisfies Story;

export const WebVideoStandardLabsLight: Story = {
	args: {
		article: {
			...WebVideoStandardNewsLight.args.article,
			format: {
				...WebVideoStandardNewsLight.args.article.format,
				theme: 'Labs',
			},
		},
	},
	parameters: webParameters,
};

export const AppsVideoStandardNewsLight = {
	args: {
		article: enhanceArticleType(VideoStandardNewsFixture, 'Apps')
			.frontendData,
		colourScheme: 'light',
	},
	parameters: appsParameters,
} satisfies Story;

export const AppsVideoStandardNewsDark: Story = {
	args: {
		article: AppsVideoStandardNewsLight.args.article,
		colourScheme: 'dark',
	},
	parameters: appsParameters,
};
