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
} as Meta;

type Story = StoryObj<typeof ScrollableSmall>;

export const WithFrontSection = {
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
