import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
	audioTrails,
	galleryTrails,
	newsletterTrails,
	trails,
	youtubeVideoTrails,
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
		isInSlimHomepageAbTestVariant: false,
	},
	render: (args) => (
		<FrontSection
			title="Static medium four"
			editionId="UK"
			containerLevel="Primary"
			slimifySectionForSlimHomepageAbTest={
				args.isInSlimHomepageAbTestVariant
			}
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

export const FourSlimHomepageAbTest = {
	name: 'With Four Cards in Slim Homepage AB Test',
	args: {
		trails: trails.slice(0, 4),
		isInSlimHomepageAbTestVariant: true,
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
			youtubeVideoTrails[0],
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
