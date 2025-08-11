import type { Meta, StoryObj } from '@storybook/react';
import { defaultCard, trails } from '../../fixtures/manual/highlights-trails';
import { ScrollableHighlights } from './ScrollableHighlights.importable';
import { Section } from './Section';

const meta: Meta<typeof ScrollableHighlights> = {
	title: 'Components/Masthead/ScrollableHighlights',
	component: ScrollableHighlights,
	render: ({ ...args }) => (
		<Section
			shouldCenter={true}
			showSideBorders={false}
			fullWidth={true}
			showTopBorder={false}
			padSides={false}
			element="section"
		>
			<ScrollableHighlights {...args} />
		</Section>
	),
};

export default meta;
type Story = StoryObj<typeof ScrollableHighlights>;

export const Default = {
	args: {
		trails: trails.slice(0, 6),
	},
};

export const withEightCards = {
	name: 'With Eight Cards',
	args: {
		trails: trails.slice(0, 8),
	},
};

export const withTwoLineKicker: Story = {
	...Default,
	name: 'With Two Line Kicker',
	args: {
		trails: [
			{
				...defaultCard,
				kickerText: 'UK Housing and Mortgages',
			},
			...Default.args.trails,
		],
	},
};

export const withLiveKicker: Story = {
	...Default,
	name: 'With Live Kicker',
	args: {
		trails: [
			{
				...defaultCard,
				kickerText: 'Live',
				format: { display: 0, theme: 3, design: 11 },
			},
			...Default.args.trails,
		],
	},
};

export const withFourLineHeadline: Story = {
	...Default,
	name: 'With Four Line Headline',
	args: {
		trails: [
			{
				...defaultCard,
				headline:
					'Really long headline to show what happens when it is long',
			},
			...Default.args.trails,
		],
	},
};

export const withExcessivleyLongHeadline: Story = {
	...Default,
	name: 'With Excessively Long Headline',
	args: {
		trails: [
			{
				...defaultCard,
				headline:
					'Really long headline to show what happens when there is a really long headline that we will never ever have but we should check how it looks anyway',
			},
			...Default.args.trails,
		],
	},
};
