import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import type { DCRContainerPalette } from '../types/front';
import { FrontSection } from './FrontSection';
import { ScrollableMedium } from './ScrollableMedium.importable';

const meta = {
	title: 'Components/ScrollableMedium',
	component: ScrollableMedium,
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
		containerPalette: undefined,
		showAge: true,
		absoluteServerTimes: true,
		imageLoading: 'eager',
		containerType: 'scrollable/medium',
	},
	render: (args) => (
		<FrontSection
			title="Scrollable medium"
			discussionApiUrl={discussionApiUrl}
			editionId="UK"
			showTopBorder={true}
			containerLevel="Secondary"
		>
			<ScrollableMedium {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof ScrollableMedium>;

export default meta;

type Story = StoryObj<typeof ScrollableMedium>;

export const WithMultipleCards = {} satisfies Story;

export const WithOneCard = {
	args: {
		trails: trails.slice(0, 1),
	},
} satisfies Story;

export const WithTwoCards = {
	args: {
		trails: trails.slice(0, 2),
	},
} satisfies Story;

export const WithThreeCards = {
	args: {
		trails: trails.slice(0, 3),
	},
} satisfies Story;

export const WithFourCards = {
	args: {
		trails: trails.slice(0, 4),
	},
} satisfies Story;

export const WithPrimaryContainer = {
	render: (args) => (
		<FrontSection
			title="Scrollable medium"
			discussionApiUrl={discussionApiUrl}
			editionId="UK"
			showTopBorder={true}
			containerLevel="Primary"
		>
			<ScrollableMedium {...args} />
		</FrontSection>
	),
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
					showTopBorder={true}
					key={containerPalette}
					containerPalette={containerPalette}
					containerLevel="Secondary"
				>
					<ScrollableMedium
						{...args}
						containerPalette={containerPalette}
					/>
				</FrontSection>
			))}
		</>
	),
} satisfies Story;
