import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { getSublinks, trails } from '../../fixtures/manual/trails';
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

const splashWithNoSublinks = { ...trails[0], supportingContent: [] };
const splashWith2Sublinks = { ...trails[0], supportingContent: getSublinks(2) };
const splashWith4Sublinks = { ...trails[0], supportingContent: getSublinks(4) };

type FlexibleGeneralArgsAndCustomArgs = React.ComponentProps<
	typeof FlexibleGeneral
> & { frontSectionTitle: string };

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
		frontSectionTitle: 'Flexible general',
		groupedTrails: defaultGroupedTrails,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
	},
	render: ({ frontSectionTitle, ...args }) => (
		<FrontSection
			title={frontSectionTitle}
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={true}
		>
			<FlexibleGeneral {...args} />
		</FrontSection>
	),
} satisfies Meta<FlexibleGeneralArgsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoSublinkSplash: Story = {
	name: 'Standard splash, no sublinks, 8 standard stories',
	args: {
		frontSectionTitle: 'Standard splash, no sublinks, 8 standard stories',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [splashWithNoSublinks],
			standard: trails.slice(1, 9),
		},
	},
};

export const TwoSublinkSplashThirdStoryBoosted: Story = {
	name: 'Standard splash, 2 sublinks, third standard boosted',
	args: {
		frontSectionTitle:
			'Standard splash, 2 sublinks, third standard boosted',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [splashWith2Sublinks],
			standard: [
				...trails.slice(1, 3),
				{
					...trails[3],
					boostLevel: 'boost',
				},
				...trails.slice(4, 9),
			],
		},
	},
};

export const FourSublinkSplash: Story = {
	name: 'Standard splash, 4 sublinks, 3rd standard megaboosted',
	args: {
		frontSectionTitle:
			'Standard splash, 4 sublinks, 3rd standard megaboosted',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [splashWith4Sublinks],
			standard: [
				...trails.slice(1, 3),
				{
					...trails[3],
					boostLevel: 'megaboost',
				},
				...trails.slice(4, 9),
			],
		},
	},
};

export const BoostedSplash: Story = {
	name: 'Boosted splash, 4 sublinks, ',
	args: {
		frontSectionTitle: 'Boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [{ ...splashWith4Sublinks, boostLevel: 'boost' }],
			standard: trails.slice(1, 9),
		},
	},
};

export const MegaBoostedSplash: Story = {
	name: 'Mega boosted splash, 4 sublinks, 8 standard stories',
	args: {
		frontSectionTitle: 'Mega boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [{ ...splashWith4Sublinks, boostLevel: 'megaboost' }],
			standard: trails.slice(1, 9),
		},
	},
};

export const GigaBoostedSplash: Story = {
	name: 'Giga boosted splash, 4 sublinks, 8 standard stories',
	args: {
		frontSectionTitle: 'Giga boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			splash: [{ ...splashWith4Sublinks, boostLevel: 'gigaboost' }],
			standard: trails.slice(1, 9),
		},
	},
};
