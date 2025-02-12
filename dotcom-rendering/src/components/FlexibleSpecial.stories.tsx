import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRContainerPalette, DCRGroupedTrails } from '../types/front';
import { liveUpdatesCard } from './FlexibleGeneral.stories';
import { FlexibleSpecial } from './FlexibleSpecial';
import { FrontSection } from './FrontSection';

type FlexibleSpecialArgsAndCustomArgs = React.ComponentProps<
	typeof FlexibleSpecial
> & { frontSectionTitle: string };

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
	splash: [],
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
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
		aspectRatio: '5:4',
		frontSectionTitle: 'Flexible general',
	},
	render: ({ frontSectionTitle, ...args }) => (
		<FrontSection
			title={frontSectionTitle}
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={true}
		>
			<FlexibleSpecial {...args} />
		</FrontSection>
	),
} satisfies Meta<FlexibleSpecialArgsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
	name: 'With one splash card',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 1),
		},
	},
};
export const Two: Story = {
	name: 'With one splash card and one standard card',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 2),
		},
	},
};
export const Three: Story = {
	name: 'With one splash card and two standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 3),
		},
	},
};
export const Four: Story = {
	name: 'With one splash card and three standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 4),
		},
	},
};
export const Five: Story = {
	name: 'With one splash card and four standard cards',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 5),
		},
	},
};
export const DefaultSplashWithImageSupression: Story = {
	name: 'Standard splash with image supression',
	args: {
		frontSectionTitle: 'Standard splash with image supression',
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [{ ...trails[0], image: undefined }],
		},
	},
};

export const BoostedSplashWithImageSupression: Story = {
	name: 'Boosted splash with image supression',
	args: {
		frontSectionTitle: 'Boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [{ ...trails[0], boostLevel: 'boost', image: undefined }],
		},
	},
};

export const MegaBoostedSplashWithImageSupression: Story = {
	name: 'Mega boosted splash with image supression',
	args: {
		frontSectionTitle: 'Mega boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], boostLevel: 'megaboost', image: undefined },
			],
		},
	},
};

export const GigaBoostedSplashWithImageSupression: Story = {
	name: 'Giga boosted splash with image supression',
	args: {
		frontSectionTitle: 'Giga boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [
				{ ...trails[0], boostLevel: 'gigaboost', image: undefined },
			],
		},
	},
};

export const DefaultSplashWithLiveUpdates: Story = {
	name: 'Standard splash with live updates',
	args: {
		frontSectionTitle: 'Standard splash',
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [{ ...liveUpdatesCard }],
		},
	},
};

export const BoostedSplashWithLiveUpdates: Story = {
	name: 'Boosted splash with live updates',
	args: {
		frontSectionTitle: 'Boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [{ ...liveUpdatesCard, boostLevel: 'boost' }],
		},
	},
};

export const MegaBoostedSplashWithLiveUpdates: Story = {
	name: 'Mega boosted splash with live updates',
	args: {
		frontSectionTitle: 'Mega boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [{ ...liveUpdatesCard, boostLevel: 'megaboost' }],
		},
	},
};

export const GigaBoostedSplashWithLiveUpdates: Story = {
	name: 'Giga boosted splash with live updates',
	args: {
		frontSectionTitle: 'Giga boosted splash',
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: [{ ...liveUpdatesCard, boostLevel: 'gigaboost' }],
		},
	},
};

const containerPalettes = [
	'InvestigationPalette',
	'LongRunningPalette',
	'SombrePalette',
	'BreakingPalette',
	'EventPalette',
	'EventAltPalette',
	'LongRunningAltPalette',
	'SombreAltPalette',
	'SpecialReportAltPalette',
	'Branded',
] as const satisfies readonly Omit<
	DCRContainerPalette,
	'MediaPalette' | 'PodcastPalette'
>[];

export const WithSpecialPaletteVariations = {
	name: 'With special palette variations',
	args: {
		groupedTrails: {
			...defaultGroupedTrails,
			snap: [],
			standard: trails.slice(0, 5),
		},
	},
	render: (args) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<FrontSection
					discussionApiUrl={discussionApiUrl}
					editionId={'UK'}
					showTopBorder={true}
					containerPalette={containerPalette}
					key={containerPalette}
					title={containerPalette}
				>
					<FlexibleSpecial
						containerPalette={containerPalette}
						{...args}
					/>
				</FrontSection>
			))}
		</>
	),
} satisfies Story;
