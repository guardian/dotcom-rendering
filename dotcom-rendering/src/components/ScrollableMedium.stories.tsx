import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import type { DCRContainerPalette } from '../types/front';
import { FrontSection } from './FrontSection';
import { ScrollableMedium } from './ScrollableMedium.importable';

export default {
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
			editionId={'UK'}
			showTopBorder={false}
		>
			<ScrollableMedium {...args} />
		</FrontSection>
	),
} as Meta<typeof ScrollableMedium>;

type Story = StoryObj<typeof ScrollableMedium>;

export const WithMultipleCards: Story = {};

export const WithOneCard: Story = {
	args: {
		trails: trails.slice(0, 1),
	},
};

export const WithTwoCards: Story = {
	args: {
		trails: trails.slice(0, 2),
	},
};

export const WithThreeCards: Story = {
	args: {
		trails: trails.slice(0, 3),
	},
};

export const WithFourCards: Story = {
	args: {
		trails: trails.slice(0, 4),
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

export const WithSpecialPaletteVariations: Story = {
	render: (args) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<FrontSection
					title="Scrollable medium"
					discussionApiUrl={discussionApiUrl}
					editionId={'UK'}
					showTopBorder={false}
					key={containerPalette}
					containerPalette={containerPalette}
				>
					<ScrollableMedium
						{...args}
						containerPalette={containerPalette}
					/>
				</FrontSection>
			))}
		</>
	),
};
