import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { FlexibleSpecial } from './FlexibleSpecial';
import { FrontSection } from './FrontSection';

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
};

const meta = {
	component: FlexibleSpecial,
	title: 'Components/FlexibleSpecial',
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
	},
	render: (args) => (
		<FrontSection
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={true}
		>
			<FlexibleSpecial groupedTrails={args.groupedTrails} />
		</FrontSection>
	),
} satisfies Meta<typeof FlexibleSpecial>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
	name: 'With one standard card',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 1),
		},
	},
};
