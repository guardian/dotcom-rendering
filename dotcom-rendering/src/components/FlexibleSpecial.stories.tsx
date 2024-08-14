import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { FlexibleSpecial } from './FlexibleSpecial';
import { FrontSection } from './FrontSection';

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
	render: () => (
		<FrontSection
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={true}
		>
			<FlexibleSpecial />
		</FrontSection>
	),
} satisfies Meta<typeof FlexibleSpecial>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
	name: 'With one standard card',
};
