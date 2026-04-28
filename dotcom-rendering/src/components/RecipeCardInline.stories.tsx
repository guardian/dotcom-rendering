import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { darkDecorator } from '../../.storybook/decorators/themeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { RecipeCardInline } from './RecipeCardInline';

const recipeFormat = {
	design: ArticleDesign.Recipe,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const meta = {
	title: 'Components/RecipeCardInline',
	component: RecipeCardInline,
	args: {
		pageId: 'food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes',
		recipeName: "Meera Sodha's spring onion pancakes",
	},
	parameters: {
		chromatic: { viewports: [375, 740, 980] },
	},
} satisfies Meta<typeof RecipeCardInline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — recipe name + CTAs */
export const Default: Story = {};

/** Without a recipe object — falls back to recipeName */
export const NoRecipeData: Story = {
	args: { recipe: undefined },
};

/** With left-col card active — hides at from.wide */
export const WithLeftColCard: Story = {
	args: { shouldShowLeftColCard: true },
};

/** Dark mode */
export const DefaultDark: Story = {
	decorators: [darkDecorator([recipeFormat])],
	args: { darkModeAvailable: true },
};
