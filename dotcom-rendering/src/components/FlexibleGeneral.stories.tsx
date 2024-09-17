import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { FlexibleGeneral } from './FlexibleGeneral';
import { FrontSection } from './FrontSection';

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
	splash: [],
};

const meta = {
	component: FlexibleGeneral,
	title: 'Components/FlexibleGeneral',
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
		groupedTrails: defaultGroupedTrails,
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
			<FlexibleGeneral {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof FlexibleGeneral>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
	name: 'With one splash card',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			splash: trails.slice(0, 1),
			standard: [],
		},
	},
};
export const Two: Story = {
	name: 'With one splash card and one standard card',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			splash: trails.slice(0, 1),
			standard: trails.slice(1, 2),
		},
	},
};
export const Three: Story = {
	name: 'With one splash card and two standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			splash: trails.slice(0, 1),
			standard: trails.slice(1, 3),
		},
	},
};
export const Zero: Story = {
	name: 'With zero splash cards and two standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(1, 3),
		},
	},
};
export const Four: Story = {
	name: 'With one splash card and three standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			splash: trails.slice(0, 1),
			standard: trails.slice(1, 4),
		},
	},
};
export const Five: Story = {
	name: 'With one splash card and four standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			splash: trails.slice(0, 1),
			standard: trails.slice(1, 5),
		},
	},
};
