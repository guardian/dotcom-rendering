import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/highlights-trails';
import type { DCRContainerPalette } from '../types/front';
import { FrontSection } from './FrontSection';
import { ScrollableSmall } from './ScrollableSmall.importable';

const meta = {
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
} satisfies Meta<typeof ScrollableSmall>;

export default meta;

type Story = StoryObj<typeof ScrollableSmall>;

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
} satisfies Story;
