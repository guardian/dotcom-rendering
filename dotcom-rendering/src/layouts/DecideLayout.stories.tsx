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
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { extractNAV } from '../model/extract-nav';
import { type Article, enhanceArticleType } from '../types/article';
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
	const format: ArticleFormat = {
		design: article.design,
		display: article.display,
		theme: article.theme,
	};
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
			  }
			: {
					...context.args,
					renderingTarget: 'Web',
					NAV: {
						...extractNAV(article.frontendData.nav),
						selectedPillar: getCurrentPillar(article.frontendData),
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
		article: enhanceArticleType(StandardStandardNewsFixture, 'Web'),
	},
	parameters: webParameters,
} satisfies Story;

export const AppsStandardStandardNewsLight = {
	args: {
		article: enhanceArticleType(StandardStandardNewsFixture, 'Apps'),
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

const standardImmersiveNewsAppsFixture: Article = {
	...AppsStandardStandardNewsLight.args.article,
	display: ArticleDisplay.Immersive,
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
		article: enhanceArticleType(
			NewsletterSignupStandardSportFixture,
			'Web',
		),
	},
	parameters: webParameters,
};

export const WebPictureShowcaseOpinionLight: Story = {
	args: {
		article: enhanceArticleType(PictureShowcaseOpinionFixture, 'Web'),
	},
	parameters: webParameters,
};

export const WebStandardLifestyleReviewLight: Story = {
	args: {
		article: {
			frontendData: {
				...WebStandardStandardNewsLight.args.article.frontendData,
				starRating: 4,
			},
			display: WebStandardStandardNewsLight.args.article.display,
			theme: Pillar.Lifestyle,
			design: ArticleDesign.Review,
		},
	},
	parameters: webParameters,
};

export const WebStandardNewsInterviewLight: Story = {
	args: {
		article: {
			...WebStandardStandardNewsLight.args.article,
			design: ArticleDesign.Interview,
		},
	},
	parameters: webParameters,
};

export const AppsPictureShowcaseOpinionLight = {
	args: {
		article: enhanceArticleType(PictureShowcaseOpinionFixture, 'Apps'),
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

/**
 * Skipped (flaky).
 *
 * This story fails intermittently as an iframe is inserted into the page
 * which is sometimes registered by the snapshot.
 *
 * Example: https://www.chromatic.com/test?appId=63e251470cfbe61776b0ef19&id=675aaa4f3aa384bd64bde3a1
 */
export const WebPhotoEssayImmersiveLabsLight: Story = {
	args: {
		article: enhanceArticleType(PhotoEssayImmersiveLabsFixture, 'Web'),
	},
	parameters: {
		...webParameters,
		chromatic: { disableSnapshot: true },
	},
};

const standardStandardLabsWebFixture: Article = {
	...WebStandardStandardNewsLight.args.article,
	theme: ArticleSpecial.Labs,
};

const standardStandardLabsAppsFixture: Article = {
	...AppsStandardStandardNewsLight.args.article,
	theme: ArticleSpecial.Labs,
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
			...featureStandardCultureWebFixture,
			theme: ArticleSpecial.Labs,
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
			...recipeStandardLifestyleWebFixture,
			theme: ArticleSpecial.Labs,
		},
	},
	parameters: webParameters,
};

export const AppsRecipeStandardLifestyleLight = {
	args: {
		article: enhanceArticleType(RecipeStandardLifestyleFixture, 'Apps'),
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
		article: enhanceArticleType(LiveBlogStandardNewsFixture, 'Web'),
	},
	parameters: webParameters,
} satisfies Story;

export const WebLiveBlogStandardLabsLight: Story = {
	args: {
		article: {
			...WebLiveBlogStandardNewsLight.args.article,
			theme: ArticleSpecial.Labs,
		},
	},
	parameters: webParameters,
};

export const AppsLiveBlogStandardNewsLight = {
	args: {
		article: enhanceArticleType(LiveBlogStandardNewsFixture, 'Apps'),
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

const liveBlogStandardSportAppsFixture: Article = {
	...AppsLiveBlogStandardNewsLight.args.article,
	theme: Pillar.Sport,
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

const liveBlogStandardSpecialReportAppsFixture: Article = {
	...AppsLiveBlogStandardNewsLight.args.article,
	theme: ArticleSpecial.SpecialReport,
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

const liveBlogStandardSpecialReportAltAppsFixture: Article = {
	...AppsLiveBlogStandardNewsLight.args.article,
	theme: ArticleSpecial.SpecialReportAlt,
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
			frontendData: {
				...WebLiveBlogStandardNewsLight.args.article.frontendData,
				keyEvents: [],
			},
		},
	},
	parameters: webParameters,
};

export const AppsLiveblogSingleContributorLight = {
	args: {
		article: enhanceArticleType(LiveBlogSingleContributorFixture, 'Apps'),
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

const commentStandardNewsAppsFixture: Article = {
	...commentStandardOpinionAppsFixture,
	theme: Pillar.News,
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

const interactiveStandardNewsAppsFixture: Article = {
	...AppsStandardStandardNewsLight.args.article,
	design: ArticleDesign.Interactive,
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
		article: enhanceArticleType(AnalysisStandardNewsFixture, 'Apps'),
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

const analysisStandardCultureAppsFixture: Article = {
	...AppsAnalysisStandardNewsLight.args.article,
	theme: Pillar.Culture,
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
		article: enhanceArticleType(VideoStandardNewsFixture, 'Web'),
	},
	parameters: webParameters,
} satisfies Story;

export const WebVideoStandardLabsLight: Story = {
	args: {
		article: {
			...WebVideoStandardNewsLight.args.article,
			theme: ArticleSpecial.Labs,
		},
	},
	parameters: webParameters,
};

export const AppsVideoStandardNewsLight = {
	args: {
		article: enhanceArticleType(VideoStandardNewsFixture, 'Apps'),
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
