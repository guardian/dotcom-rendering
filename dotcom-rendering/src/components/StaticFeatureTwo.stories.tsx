import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FrontSection } from './FrontSection';
import { StaticFeatureTwo } from './StaticFeatureTwo';

const meta = {
	component: StaticFeatureTwo,
	title: 'Components/StaticFeatureTwo',
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
		absoluteServerTimes: true,
		imageLoading: 'eager',
	},
	render: (args) => (
		<FrontSection
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={true}
		>
			<StaticFeatureTwo {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof StaticFeatureTwo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Default Story',
	args: {
		trails: trails.slice(0, 2),
	},
};
