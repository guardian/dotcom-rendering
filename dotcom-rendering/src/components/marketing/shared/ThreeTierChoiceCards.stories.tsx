import { palette } from '@guardian/source/foundations';
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
	choiceCardsSettings,
	choiceCardsSettingsWithDiscountPill,
} from '../lib/storybook';
import { ThreeTierChoiceCards } from './ThreeTierChoiceCards';

const meta: Meta<typeof ThreeTierChoiceCards> = {
	component: ThreeTierChoiceCards,
	title: 'Components/marketing/ThreeTierChoiceCards',
	decorators: [
		(Story, context) => {
			const storyChoices =
				(context.args.choices as ChoiceCard[]) ??
				choiceCardsSettings.choiceCards;
			const initialDefaultCard = storyChoices.find(
				(card) => card.isDefault,
			);
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>(initialDefaultCard);

			return (
				<Story
					args={{
						...context.args,
						selectedChoiceCard,
						setSelectedChoiceCard,
					}}
				/>
			);
		},
	],
};

export default meta;

type Story = StoryObj<typeof ThreeTierChoiceCards>;

export const Default: Story = {
	name: 'Default choice cards',
	args: {
		choices: choiceCardsSettings.choiceCards,
		id: 'banner',
	},
};

export const WithCustomPillColoursFromDesign: Story = {
	name: 'Custom pill colours from design settings',
	args: {
		id: 'banner',
		choiceCardDesignSettings: {
			pillTextColour: palette.neutral[100],
			pillBackgroundColour: palette.brand[400],
		},
		choices: choiceCardsSettingsWithDiscountPill.choiceCards, // overridden by design
	},
};

export const WithCustomPillColoursFromChoiceCard: Story = {
	name: 'Custom pill colours from choice card settings',
	args: {
		choices: choiceCardsSettingsWithDiscountPill.choiceCards,
		id: 'banner',
	},
};

export const WithCustomButtonColours: Story = {
	name: 'Custom button and pill colours',
	args: {
		choices: choiceCardsSettingsWithDiscountPill.choiceCards,
		id: 'banner',
		choiceCardDesignSettings: {
			buttonColour: '#F1F8FC',
			buttonSelectColour: '#E3F6FF',
			buttonSelectBorderColour: palette.brand[500],
			pillTextColour: '#FFFFFF',
			pillBackgroundColour: '#007ABC',
		},
	},
};

export const WithDefaultExpanded: Story = {
	name: 'No default check but expanded state',
	args: {
		id: 'banner',
		choices: choiceCardsSettings.choiceCards.map((c) =>
			c.product.supportTier === 'SupporterPlus'
				? { ...c, isDefault: false, defaultExpanded: true }
				: { ...c, isDefault: false },
		),
	},
};
