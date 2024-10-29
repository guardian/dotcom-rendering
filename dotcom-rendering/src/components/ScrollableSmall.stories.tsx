import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import type { DCRContainerPalette } from '../types/front';
import { FrontSection } from './FrontSection';
import { ScrollableSmall } from './ScrollableSmall.importable';

export default {
	title: 'Components/ScrollableSmall',
	component: ScrollableSmall,
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
		containerType: 'scrollable/small',
	},
	render: (args) => (
		<FrontSection
			title="Scrollable small"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			showTopBorder={false}
		>
			<ScrollableSmall {...args} />
		</FrontSection>
	),
} as Meta<typeof ScrollableSmall>;

type Story = StoryObj<typeof ScrollableSmall>;

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
					title="Scrollable small"
					discussionApiUrl={discussionApiUrl}
					editionId={'UK'}
					showTopBorder={false}
					key={containerPalette}
					containerPalette={containerPalette}
				>
					<ScrollableSmall
						{...args}
						containerPalette={containerPalette}
					/>
				</FrontSection>
			))}
		</>
	),
};
