import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRContainerPalette } from '../types/front';
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
			title="Static medium four"
			discussionApiUrl={discussionApiUrl}
			editionId="UK"
			showTopBorder={true}
			containerLevel="Primary"
		>
			<StaticMediumFour {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof StaticMediumFour>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Four = {
	name: 'With four cards',
	args: {
		trails: trails.slice(0, 4),
	},
};

export const Three: Story = {
	name: 'With three cards',
	args: {
		trails: trails.slice(0, 3),
	},
};

export const Two: Story = {
	name: 'With two cards',
	args: {
		trails: trails.slice(0, 2),
	},
};

export const One: Story = {
	name: 'With one card',
	args: {
		trails: trails.slice(0, 1),
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
					showTopBorder={false}
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
