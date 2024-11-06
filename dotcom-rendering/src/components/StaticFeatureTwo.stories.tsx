import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRContainerPalette } from '../types/front';
import { FrontSection } from './FrontSection';
import { StaticFeatureTwo } from './StaticFeatureTwo';

const meta = {
	component: StaticFeatureTwo,
	title: 'Components/StaticFeatureTwo',
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
		trails: trails.slice(0, 2),
		absoluteServerTimes: true,
		imageLoading: 'eager',
	},
	render: (args) => (
		<FrontSection
			title="Static feature two"
			discussionApiUrl={discussionApiUrl}
			editionId="UK"
			showTopBorder={true}
			containerLevel="Primary"
		>
			<StaticFeatureTwo {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof StaticFeatureTwo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

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
					<StaticFeatureTwo
						{...args}
						containerPalette={containerPalette}
					/>
				</FrontSection>
			))}
		</>
	),
} satisfies Story;
