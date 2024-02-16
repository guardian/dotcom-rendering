import type { Decorator, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import { Feature as FeatureStandardCultureFixture } from '../../fixtures/generated/articles/Feature';
import { Labs as PhotoEssayImmersiveLabsFixture } from '../../fixtures/generated/articles/Labs';
import { Live as LiveFixture } from '../../fixtures/generated/articles/Live';
import { NewsletterSignup as NewsletterSignupStandardSportFixture } from '../../fixtures/generated/articles/NewsletterSignup';
import { Picture as PictureShowcaseOpinionFixture } from '../../fixtures/generated/articles/Picture';
import { Recipe as RecipeStandardLifestyleFixture } from '../../fixtures/generated/articles/Recipe';
import { Standard as StandardStandardNewsFixture } from '../../fixtures/generated/articles/Standard';
import { embedIframe } from '../client/embedIframe';
import { decideFormat } from '../lib/decideFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { extractNAV } from '../model/extract-nav';
import { DecideLayout, type Props as DecideLayoutProps } from './DecideLayout';

mockRESTCalls();

/**
 * HydratedLayout is used here to simulated the hydration that happens after we init react on
 * the client. We need a separate component so that we can make use of useEffect to ensure
 * the hydrate step only runs once the dom has been rendered.
 */
const HydratedLayout: Decorator<DecideLayoutProps> = (Story, context) => {
	const { article } = context.args;
	const NAV = {
		...extractNAV(article.nav),
		selectedPillar: getCurrentPillar(article),
	};
	const format: ArticleFormat = decideFormat(article.format);
	useEffect(() => {
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${String(e)}`),
		);
	}, [article]);

	return lightDecorator<DecideLayoutProps>([format])(Story, {
		...context,
		args: {
			...context.args,
			NAV,
			format,
			renderingTarget: 'Web',
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

type Story = StoryObj<typeof DecideLayout>;

export const WebStandardStandardNewsLight: Story = {
	args: {
		article: StandardStandardNewsFixture,
	},
};

export const WebNewsletterSignupStandardSportLight: Story = {
	args: {
		article: NewsletterSignupStandardSportFixture,
	},
};

export const WebPictureShowcaseOpinionLight: Story = {
	args: {
		article: PictureShowcaseOpinionFixture,
	},
};

export const WebPhotoEssayImmersiveLabsLight: Story = {
	args: {
		article: PhotoEssayImmersiveLabsFixture,
	},
};

export const WebStandardStandardLabsLight: Story = {
	args: {
		article: {
			...StandardStandardNewsFixture,
			format: {
				...StandardStandardNewsFixture.format,
				theme: 'Labs',
			},
		},
	},
};

export const WebFeatureStandardLabsLight: Story = {
	args: {
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
		article: {
			...RecipeStandardLifestyleFixture,
			format: {
				...RecipeStandardLifestyleFixture.format,
				theme: 'Labs',
			},
		},
	},
};

export const WebLiveBlogStandardNewsLight: Story = {
	args: {
		article: LiveFixture,
	},
};

export const LiveblogWithNoKeyEvents: Story = {
	args: {
		article: { ...LiveFixture, keyEvents: [] },
	},
};
