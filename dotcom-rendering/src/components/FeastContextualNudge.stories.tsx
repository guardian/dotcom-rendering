import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { darkDecorator } from '../../.storybook/decorators/themeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { FeastContextualNudge } from './FeastContextualNudge';

const recipeFormat = {
	design: ArticleDesign.Recipe,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const meta = {
	title: 'Components/FeastContextualNudge',
	component: FeastContextualNudge,
	args: {
		pageId: 'food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes',
		editionId: 'UK',
		onDismiss: () => undefined,
	},
	parameters: {
		chromatic: { viewports: [375, 740, 980] },
	},
} satisfies Meta<typeof FeastContextualNudge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default non-subscriber (UK edition) — shows trial copy */
export const DefaultNonSubscriber: Story = {
	args: { subscriberVariant: 'default' },
};

/** US non-subscriber — unit-conversion copy */
export const USNonSubscriber: Story = {
	args: { subscriberVariant: 'usNonSubscriber', editionId: 'US' },
};

/** HVS / Supporter Plus — "Your supporter package includes Feast" */
export const HVSSubscriber: Story = {
	args: { subscriberVariant: 'hvsSubscriber' },
};

/** Compact — shown for 2nd, 3rd… recipes in a multi-recipe article: actions only */
export const CompactSubsequentRecipe: Story = {
	args: { subscriberVariant: 'default', compact: true },
};

/** Dark mode — default variant on a dark background */
export const DefaultDark: Story = {
	decorators: [darkDecorator([recipeFormat])],
	args: { subscriberVariant: 'default', darkModeAvailable: true },
};

/** Dark mode — compact variant */
export const CompactDark: Story = {
	decorators: [darkDecorator([recipeFormat])],
	args: {
		subscriberVariant: 'default',
		compact: true,
		darkModeAvailable: true,
	},
};
