import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FrontSection } from './FrontSection';
import { StaticMediumFour } from './StaticMediumFour';

const meta = {
	component: StaticMediumFour,
	title: 'Components/StaticMediumFour',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
	args: {
		trails,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
	},
	render: (args) => (
		<FrontSection
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={true}
		>
			<StaticMediumFour {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof StaticMediumFour>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
	name: 'With one card',
	args: {
		trails: trails.slice(0, 1),
	},
};

export const Two: Story = {
	name: 'With two cards',
	args: {
		trails: trails.slice(0, 2),
	},
};

export const Three: Story = {
	name: 'With three cards',
	args: {
		trails: trails.slice(0, 3),
	},
};

export const Four: Story = {
	name: 'With four cards',
	args: {
		trails: trails.slice(0, 4),
	},
};
