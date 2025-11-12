import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { DynamicFast } from './DynamicFast';
import { FrontSection } from './FrontSection';
import { LabsSection } from './LabsSection';

const meta = {
	title: 'Layouts/Palettes',
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitVertical,
			},
		},
	},
	args: {
		showLabsRedesign: false,
	},
	argTypes: {
		showLabsRedesign: {
			control: { type: 'boolean' },
			description:
				'Toggle between old Labs design (LabsSection) and new design (FrontSection)',
		},
	},
} satisfies Meta<{ showLabsRedesign: boolean }>;
type Story = StoryObj<typeof meta>;

export default meta;

const groupedTrails = {
	snap: [],
	splash: [],
	huge: [],
	veryBig: [{ isBoosted: true, ...trails[0] }, trails[1]],
	big: [trails[2], trails[3]],
	standard: [
		trails[4],
		trails[5],
		trails[6],
		trails[7],
		trails[8],
		trails[9],
	],
} satisfies DCRGroupedTrails;

export const EventPalette = {
	render: () => (
		<FrontSection
			title="Event Palette"
			containerPalette="EventPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

export const EventAltPalette = {
	render: () => (
		<FrontSection
			title="Event Alt Palette"
			containerPalette="EventAltPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="EventAltPalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

export const SombrePalette = {
	render: () => (
		<FrontSection
			title="Sombre Palette"
			containerPalette="SombrePalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="SombrePalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
};

export const SombreAltPalette = {
	render: () => (
		<FrontSection
			title="Sombre Alt Palette"
			containerPalette="SombreAltPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="SombreAltPalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
};

export const BreakingPalette = {
	render: () => (
		<FrontSection
			title="Breaking Palette"
			containerPalette="BreakingPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="BreakingPalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
};

export const LongRunningPalette = {
	render: () => (
		<FrontSection
			title="Long Running Palette"
			containerPalette="LongRunningPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="LongRunningPalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

export const LongRunningAltPalette = {
	render: () => (
		<FrontSection
			title="Long Running Alt Palette"
			containerPalette="LongRunningAltPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="LongRunningAltPalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

export const InvestigationPalette = {
	render: () => (
		<FrontSection
			title="Investigation Palette"
			containerPalette="InvestigationPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="InvestigationPalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

export const SpecialReportAltPalette = {
	render: () => (
		<FrontSection
			title="Special Report Alt Palette"
			containerPalette="SpecialReportAltPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="SpecialReportAltPalette"
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

export const BrandedPalette: StoryObj<{ showLabsRedesign: boolean }> = {
	render: ({ showLabsRedesign }) =>
		showLabsRedesign ? (
			<FrontSection
				title="Branded Palette Redesign"
				containerPalette="Branded"
				showDateHeader={true}
				editionId={'UK'}
				discussionApiUrl={discussionApiUrl}
				isLabs={true}
				showLabsRedesign={showLabsRedesign}
			>
				<DynamicFast
					groupedTrails={groupedTrails}
					containerPalette="Branded"
					showAge={true}
					imageLoading="eager"
				/>
			</FrontSection>
		) : (
			<LabsSection
				title="Branded Palette"
				collectionId={''}
				pageId={''}
				ajaxUrl={''}
				sectionId={'branded-palette-toggle'}
				ophanComponentName={'branded-palette-toggle'}
				ophanComponentLink={'branded-palette-toggle'}
				discussionApiUrl={discussionApiUrl}
				editionId={'UK'}
			>
				<DynamicFast
					groupedTrails={groupedTrails}
					containerPalette="Branded"
					showAge={true}
					imageLoading="eager"
				/>
			</LabsSection>
		),
};
