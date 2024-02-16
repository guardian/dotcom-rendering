import type { StoryObj } from '@storybook/react';
import type { Decorator } from '@storybook/react';
import { useEffect } from 'react';
import { colourSchemeDecorator } from '../../.storybook/decorators/themeDecorator';
import { Analysis as AnalysisStandardNewsFixture } from '../../fixtures/generated/articles/Analysis';
import { Comment as CommentStandardOpinionFixture } from '../../fixtures/generated/articles/Comment';
import { Feature as FeatureStandardCultureFixture } from '../../fixtures/generated/articles/Feature';
import { Labs as PhotoEssayImmersiveLabsFixture } from '../../fixtures/generated/articles/Labs';
import { Live as LiveBlogStandardNewsFixture } from '../../fixtures/generated/articles/Live';
import { LiveBlogSingleContributor as LiveBlogSingleContributorFixture } from '../../fixtures/generated/articles/LiveBlogSingleContributor';
import { NewsletterSignup as NewsletterSignupStandardSportFixture } from '../../fixtures/generated/articles/NewsletterSignup';
import { Picture as PictureShowcaseOpinionFixture } from '../../fixtures/generated/articles/Picture';
import { Recipe as RecipeStandardLifestyleFixture } from '../../fixtures/generated/articles/Recipe';
import { Standard as StandardStandardNewsFixture } from '../../fixtures/generated/articles/Standard';
import { embedIframe } from '../../src/client/embedIframe';
import { decideFormat } from '../../src/lib/decideFormat';
import { getCurrentPillar } from '../../src/lib/layoutHelpers';
import { extractNAV } from '../../src/model/extract-nav';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import type { DCRArticle } from '../types/frontend';
import { DecideLayout, type Props as DecideLayoutProps } from './DecideLayout';

mockRESTCalls();

export type HydratedLayoutDecoratorArgs =
	| {
			renderingTarget?: 'Apps';
			colourScheme?: 'light' | 'dark';
	  }
	| {
			renderingTarget?: 'Web';
	  };

/**
 * HydratedLayout is used here to simulated the hydration that happens after we init react on
 * the client. We need a separate component so that we can make use of useEffect to ensure
 * the hydrate step only runs once the dom has been rendered.
 *
 * It also sets up format, populates the palette colours for the layout stories, and adds the
 * nav for web.
 */
const HydratedLayout: Decorator<
	DecideLayoutProps & HydratedLayoutDecoratorArgs
> = (Story, context) => {
	const { article } = context.args;
	const NAV = {
		...extractNAV(article.nav),
		selectedPillar: getCurrentPillar(article),
	};
	const format: ArticleFormat = decideFormat(article.format);
	const colourScheme =
		(context.args.renderingTarget === 'Apps'
			? context.args.colourScheme
			: 'light') ?? 'light';

	useEffect(() => {
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${String(e)}`),
		);
	}, [article]);

	const paletteDecorator = colourSchemeDecorator(colourScheme)<
		DecideLayoutProps & HydratedLayoutDecoratorArgs
	>([format]);

	return paletteDecorator(Story, {
		...context,
		args:
			context.args.renderingTarget === 'Web'
				? {
						...context.args,
						NAV,
						format,
				  }
				: {
						...context.args,
						format,
				  },
	});
};

export default {
	title: 'Components/DecideLayout',
	component: DecideLayout,
	parameters: {
		chromatic: {
			diffThreshold: 0.2,
			pauseAnimationAtEnd: true,
		},
	},
	decorators: [HydratedLayout],
};

type Story = StoryObj<DecideLayoutProps & HydratedLayoutDecoratorArgs>;

export const WebStandardStandardNewsLight: Story = {
	args: {
		renderingTarget: 'Web',
		article: StandardStandardNewsFixture,
	},
};

export const AppsStandardStandardNewsLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: StandardStandardNewsFixture,
		colourScheme: 'light',
	},
};

export const AppsStandardStandardNewsDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: StandardStandardNewsFixture,
		colourScheme: 'dark',
	},
};

const standardImmersiveNewsFixture: DCRArticle = {
	...StandardStandardNewsFixture,
	format: {
		...StandardStandardNewsFixture.format,
		display: 'ImmersiveDisplay',
	},
};

export const AppsStandardImmersiveNewsLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: standardImmersiveNewsFixture,
		colourScheme: 'light',
	},
};

export const AppsStandardImmersiveNewsDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: standardImmersiveNewsFixture,
		colourScheme: 'dark',
	},
};

export const WebNewsletterSignupStandardSportLight: Story = {
	args: {
		renderingTarget: 'Web',
		article: NewsletterSignupStandardSportFixture,
	},
};

export const WebPictureShowcaseOpinionLight: Story = {
	args: {
		renderingTarget: 'Web',
		article: PictureShowcaseOpinionFixture,
	},
};

export const AppsPictureShowcaseOpinionLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: PictureShowcaseOpinionFixture,
		colourScheme: 'light',
	},
};

export const AppsPictureShowcaseOpinionDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: PictureShowcaseOpinionFixture,
		colourScheme: 'dark',
	},
};

export const WebPhotoEssayImmersiveLabsLight: Story = {
	args: {
		renderingTarget: 'Web',
		article: PhotoEssayImmersiveLabsFixture,
	},
};

const standardStandardLabsFixture: DCRArticle = {
	...StandardStandardNewsFixture,
	format: {
		...StandardStandardNewsFixture.format,
		theme: 'Labs',
	},
};

export const WebStandardStandardLabsLight: Story = {
	args: {
		renderingTarget: 'Web',
		article: standardStandardLabsFixture,
	},
};

export const AppsStandardStandardLabsLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: standardStandardLabsFixture,
		colourScheme: 'light',
	},
};

export const AppsStandardStandardLabsDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: standardStandardLabsFixture,
		colourScheme: 'dark',
	},
};

export const WebFeatureStandardLabsLight: Story = {
	args: {
		renderingTarget: 'Web',
		article: {
			...FeatureStandardCultureFixture,
			format: {
				...FeatureStandardCultureFixture.format,
				theme: 'Labs',
			},
		},
	},
};

export const WebRecipeStandardLabsLight: Story = {
	args: {
		renderingTarget: 'Web',
		article: {
			...RecipeStandardLifestyleFixture,
			format: {
				...RecipeStandardLifestyleFixture.format,
				theme: 'Labs',
			},
		},
	},
};

export const AppsRecipeStandardLifestyleLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: RecipeStandardLifestyleFixture,
		colourScheme: 'light',
	},
};

export const AppsRecipeStandardLifestyleDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: RecipeStandardLifestyleFixture,
		colourScheme: 'dark',
	},
};

export const WebLiveBlogStandardNewsLight: Story = {
	args: {
		renderingTarget: 'Web',
		article: LiveBlogStandardNewsFixture,
	},
};

export const AppsLiveBlogStandardNewsLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: LiveBlogStandardNewsFixture,
		colourScheme: 'light',
	},
};

export const AppsLiveBlogStandardNewsDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: LiveBlogStandardNewsFixture,
		colourScheme: 'dark',
	},
};

const liveBlogStandardSportFixture: DCRArticle = {
	...LiveBlogStandardNewsFixture,
	format: {
		...LiveBlogStandardNewsFixture.format,
		theme: 'SportPillar',
	},
};

export const AppsLiveBlogStandardSportLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: liveBlogStandardSportFixture,
		colourScheme: 'light',
	},
};

export const AppsLiveBlogStandardSportDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: liveBlogStandardSportFixture,
		colourScheme: 'dark',
	},
};

const liveBlogStandardSpecialReportFixture: DCRArticle = {
	...LiveBlogStandardNewsFixture,
	format: {
		...LiveBlogStandardNewsFixture.format,
		theme: 'SpecialReportTheme',
	},
};

export const AppsLiveBlogStandardSpecialReportLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: liveBlogStandardSpecialReportFixture,
		colourScheme: 'light',
	},
};

export const AppsLiveBlogStandardSpecialReportDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: liveBlogStandardSpecialReportFixture,
		colourScheme: 'dark',
	},
};

const liveBlogStandardSpecialReportAltFixture: DCRArticle = {
	...LiveBlogStandardNewsFixture,
	format: {
		...LiveBlogStandardNewsFixture.format,
		theme: 'SpecialReportAltTheme',
	},
};

export const AppsLiveBlogStandardSpecialReportAltLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: liveBlogStandardSpecialReportAltFixture,
		colourScheme: 'light',
	},
};

export const AppsLiveBlogStandardSpecialReportAltDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: liveBlogStandardSpecialReportAltFixture,
		colourScheme: 'dark',
	},
};

export const WebLiveblogWithNoKeyEvents: Story = {
	args: {
		renderingTarget: 'Web',
		article: { ...LiveBlogStandardNewsFixture, keyEvents: [] },
	},
};

export const AppsLiveblogSingleContributorLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: LiveBlogSingleContributorFixture,
		colourScheme: 'light',
	},
};

export const AppsLiveblogSingleContributorDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: LiveBlogSingleContributorFixture,
		colourScheme: 'dark',
	},
};

const commentStandardNewsFixture: DCRArticle = {
	...CommentStandardOpinionFixture,
	format: {
		...CommentStandardOpinionFixture.format,
		theme: 'NewsPillar',
	},
};

export const AppsCommentStandardNewsLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: commentStandardNewsFixture,
		colourScheme: 'light',
	},
};

export const AppsCommentStandardNewsDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: commentStandardNewsFixture,
		colourScheme: 'dark',
	},
};

const interactiveStandardNewsFixture: DCRArticle = {
	...StandardStandardNewsFixture,
	format: {
		...StandardStandardNewsFixture.format,
		design: 'InteractiveDesign',
	},
};

export const AppsInteractiveStandardNewsLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: interactiveStandardNewsFixture,
		colourScheme: 'light',
	},
};

export const AppsInteractiveStandardNewsDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: interactiveStandardNewsFixture,
		colourScheme: 'dark',
	},
};

export const AppsAnalysisStandardNewsLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: AnalysisStandardNewsFixture,
		colourScheme: 'light',
	},
};

export const AppsAnalysisStandardNewsDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: AnalysisStandardNewsFixture,
		colourScheme: 'dark',
	},
};

const analysisStandardCultureFixture: DCRArticle = {
	...AnalysisStandardNewsFixture,
	format: {
		...AnalysisStandardNewsFixture.format,
		theme: 'CulturePillar',
	},
};

export const AppsAnalysisStandardCultureLight: Story = {
	args: {
		renderingTarget: 'Apps',
		article: analysisStandardCultureFixture,
		colourScheme: 'light',
	},
};

export const AppsAnalysisStandardCultureDark: Story = {
	args: {
		renderingTarget: 'Apps',
		article: analysisStandardCultureFixture,
		colourScheme: 'dark',
	},
};
