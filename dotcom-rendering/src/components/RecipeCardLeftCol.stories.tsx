import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { darkDecorator } from '../../.storybook/decorators/themeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { RecipeBlockElement } from '../types/content';
import { RecipeCardLeftCol } from './RecipeCardLeftCol';

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
	title: 'Components/RecipeCardLeftCol',
	component: RecipeCardLeftCol,
	args: {
		pageId: 'food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes',
		recipeName: "Meera Sodha's spring onion pancakes",
		recipe: mockRecipe,
	},
	parameters: {
		chromatic: { viewports: [1300] }, // only meaningful at `from.wide`
	},
} satisfies Meta<typeof RecipeCardLeftCol>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * At viewports narrower than `wide` (1300px) the card is `display: none`.
 * Use the Storybook viewport selector or resize to ≥ 1300px to see it.
 */
export const Default: Story = {};

export const LongRecipeName: Story = {
	args: {
		recipeName:
			'Roasted cauliflower with turmeric, pomegranate and pistachio cream',
	},
};

export const ShortRecipeName: Story = {
	args: { recipeName: 'Pasta e fagioli' },
};

/**
 * Rendered inside a simulated section container (position: relative) with a
 * left-col gutter so the sticky positioning is visible in Storybook.
 */
export const InSectionContext: Story = {
	decorators: [
		(Story) => (
			<div
				css={css`
					margin-left: 260px; /* simulate wide article body start */
					position: relative;
					min-height: 600px;
					padding-top: 16px;
				`}
			>
				<div
					css={css`
						position: absolute;
						left: -240px;
						width: 220px;
						height: 100%;
					`}
				>
					<Story />
				</div>
				<p
					css={css`
						color: #666;
						font-size: 14px;
					`}
				>
					← recipe card appears here while you scroll through this
					section
				</p>
			</div>
		),
	],
};

/** Dark mode */
export const DefaultDark: Story = {
	decorators: [darkDecorator([recipeFormat])],
	args: { darkModeAvailable: true },
};

export const LongNameDark: Story = {
	decorators: [darkDecorator([recipeFormat])],
	args: {
		darkModeAvailable: true,
		recipeName:
			'Roasted cauliflower with turmeric, pomegranate and pistachio cream',
	},
};
