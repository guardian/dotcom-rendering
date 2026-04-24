import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FeastContextualNudge } from './FeastContextualNudge';

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
