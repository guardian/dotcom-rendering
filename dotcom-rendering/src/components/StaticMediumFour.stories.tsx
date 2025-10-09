import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import {
	audioTrails,
	galleryTrails,
	newsletterTrails,
	trails,
	videoTrails,
} from '../../fixtures/manual/trails';
import type { DCRContainerPalette } from '../types/front';
import { FrontSection } from './FrontSection';
import { StaticMediumFour } from './StaticMediumFour';

const meta = {
	component: StaticMediumFour,
	title: 'Front Containers/StaticMediumFour',
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

		imageLoading: 'eager',
		aspectRatio: '5:4',
	},
	render: (args) => (
		<FrontSection
			title="Static medium four"
			discussionApiUrl={discussionApiUrl}
			editionId="UK"
			containerLevel="Primary"
		>
			<StaticMediumFour {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof StaticMediumFour>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Four = {
	name: 'With Four Cards',
	args: {
		trails: trails.slice(0, 4),
	},
};

export const Three: Story = {
	name: 'With Three Cards',
	args: {
		trails: trails.slice(0, 3),
	},
};

export const Two: Story = {
	name: 'With Two Cards',
	args: {
		trails: trails.slice(0, 2),
	},
};

export const One: Story = {
	name: 'With One Card',
	args: {
		trails: trails.slice(0, 1),
	},
};

export const Media = {
	name: 'With Media Cards',
	args: {
		trails: [
			audioTrails[0],
			videoTrails[0],
			galleryTrails[0],
			newsletterTrails[0],
		],
	},
} satisfies Story;

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
] as const satisfies readonly DCRContainerPalette[];

export const WithSpecialPaletteVariations = {
	parameters: {
		/** We only want one breakpoint snapshotted for special palette variations */
		chromatic: { viewports: [breakpoints.desktop] },
	},
	render: (args) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<FrontSection
					title={containerPalette}
					discussionApiUrl={discussionApiUrl}
					editionId="UK"
					key={containerPalette}
					containerPalette={containerPalette}
					containerLevel="Primary"
				>
					<StaticMediumFour
						{...args}
						containerPalette={containerPalette}
					/>
				</FrontSection>
			))}
		</>
	),
} satisfies Story;
