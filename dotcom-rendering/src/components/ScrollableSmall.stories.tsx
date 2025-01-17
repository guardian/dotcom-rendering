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
		aspectRatio: '5:4',
	},
	render: (args) => (
		<FrontSection
			title="Scrollable small"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			containerLevel="Secondary"
		>
			<ScrollableSmall {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof ScrollableSmall>;

export default meta;

type Story = StoryObj<typeof ScrollableSmall>;

export const WithMultipleCards = {};

export const WithFourCards = {
	args: {
		trails: trails.slice(0, 4),
	},
};

export const WithThreeCards = {
	args: {
		trails: trails.slice(0, 3),
	},
};

export const WithOneCard = {
	args: {
		trails: trails.slice(0, 1),
	},
};

export const WithTwoCards = {
	args: {
		trails: trails.slice(0, 2),
	},
};

export const WithPrimaryContainer = {
	render: (args) => (
		<FrontSection
			title="Scrollable small"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			containerLevel="Primary"
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
] as const satisfies readonly Omit<DCRContainerPalette, 'MediaPalette'>[];

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
					containerLevel="Secondary"
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
