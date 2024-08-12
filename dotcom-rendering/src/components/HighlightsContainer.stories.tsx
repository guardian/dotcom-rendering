import type { Meta, StoryObj } from '@storybook/react';
import { defaultCard, trails } from '../../fixtures/manual/highlights-trails';
import { HighlightsContainer } from './HighlightsContainer.importable';

export default {
	title: 'Masthead/HighlightsContainer',
	component: HighlightsContainer,
	args: {
		trails,
	},
} as Meta;

type Story = StoryObj<typeof HighlightsContainer>;

export const Default = {};

export const withTwoLineKicker: Story = {
	args: {
		trails: [
			{
				...defaultCard,
				kicker: 'UK Housing and Mortgages',
			},
			...trails,
		],
	},
	name: 'With Two Line Kicker',
};

export const withLiveKicker: Story = {
	args: {
		trails: [
			{
				...defaultCard,
				kicker: 'Live',
				format: { display: 0, theme: 3, design: 11 },
			},
			...trails,
		],
	},
	name: 'With Live Kicker',
};

export const withFourLineHeadline: Story = {
	args: {
		trails: [
			{
				...defaultCard,
				headline:
					'Really long headline to show what happens when it is long',
			},
			...trails,
		],
	},
	name: 'With Four Line Headline',
};

export const withExcessivleyLongHeadline: Story = {
	args: {
		trails: [
			{
				...defaultCard,
				headline:
					'Really long headline to show what happens when there is a really long headline that we will never ever have but we should check how it looks anyway',
			},
			...trails,
		],
	},
	name: 'With Four Line Headline',
};
