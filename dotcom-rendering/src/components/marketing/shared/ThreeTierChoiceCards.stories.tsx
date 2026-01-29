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
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>(choiceCardsSettings.choiceCards.find((card) => card.isDefault));

			return (
				<Story
					args={{
						...context.args,
						selectedChoiceCard:
							selectedChoiceCard ??
							choiceCardsSettings.choiceCards[0],
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

export const WithCustomPillColorsFromDesign: Story = {
	name: 'Custom pill colors from design settings',
	args: {
		id: 'banner',
		choiceCardDesignSettings: {
			pillTextColour: palette.neutral[100],
			pillBackgroundColour: palette.brand[400],
		},
		choices: choiceCardsSettingsWithDiscountPill.choiceCards, // overridden by design
	},
};

export const WithCustomPillColorsFromChoiceCard: Story = {
	name: 'Custom pill colors from choice card settings',
	args: {
		choices: choiceCardsSettingsWithDiscountPill.choiceCards,
		id: 'banner',
	},
};

export const WithCustomButtonColors: Story = {
	name: 'Custom button and pill colors',
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
