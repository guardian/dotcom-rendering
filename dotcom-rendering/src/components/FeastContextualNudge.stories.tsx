import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { darkDecorator } from '../../.storybook/decorators/themeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { RecipeBlockElement } from '../types/content';
import { FeastContextualNudge } from './FeastContextualNudge';

const recipeFormat = {
	design: ArticleDesign.Recipe,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const mockRecipe: RecipeBlockElement = {
	_type: 'model.dotcomrendering.pageElements.RecipeBlockElement',
	id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
	title: "Meera Sodha's spring onion pancakes",
	description:
		'Crisp and savoury, these spring onion pancakes are a perfect weekend brunch or a quick weeknight snack. Serve with the chilli oil for a serious kick.',
	featuredImage: {
		url: 'https://i.guim.co.uk/img/media/9dcb491db0315d5598fc47aa51d049e12eedcbbc/0_18_2831_3539/master/2831.jpg?width=620&dpr=2&s=none&crop=none',
		mediaId: 'a4a7c9d0d6a5b2e0f0c0d1e2f3a4b5c6d7e8f9a0',
		cropId: '0_0_5000_3000',
		caption: 'Spring onion pancakes with chilli oil',
	},
};
const meta = {
	title: 'Components/FeastContextualNudge',
	component: FeastContextualNudge,
	args: {
		pageId: 'food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes',
		recipeName: "Meera Sodha's spring onion pancakes",
		recipe: mockRecipe,
	},
	parameters: {
		chromatic: { viewports: [375, 740, 980] },
	},
} satisfies Meta<typeof FeastContextualNudge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — recipe name + CTAs */
export const Default: Story = {};

/** Without a recipe object — falls back to recipeName */
export const NoRecipeData: Story = {
	args: { recipe: undefined },
};

/** Recipe present but no featured image — image slot omitted */
export const NoFeaturedImage: Story = {
	args: {
		recipe: {
			...mockRecipe,
			featuredImage: undefined,
		},
	},
};

/** Dark mode */
export const DefaultDark: Story = {
	decorators: [darkDecorator([recipeFormat])],
	args: { darkModeAvailable: true },
};
