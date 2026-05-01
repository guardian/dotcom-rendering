import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { darkDecorator } from '../../.storybook/decorators/themeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { FeastRecipeNudge } from './FeastRecipeNudge';

const recipeFormat = {
	design: ArticleDesign.Recipe,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const meta = {
	title: 'Components/FeastRecipeNudge',
	component: FeastRecipeNudge,
	args: {
		pageId: 'food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes',
		editionId: 'UK',
		recipeName: "Meera Sodha's spring onion pancakes",
	},
	parameters: {
		chromatic: { viewports: [1300] }, // only meaningful at `from.wide`
	},
} satisfies Meta<typeof FeastRecipeNudge>;

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

export const USEdition: Story = {
	args: { editionId: 'US', recipeName: 'Buttermilk fried chicken' },
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

/** Dark mode — card on a dark background */
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
