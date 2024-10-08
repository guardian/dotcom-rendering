import type { Meta, StoryObj } from '@storybook/react';
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
} satisfies Meta;
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
				absoluteServerTimes={true}
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
				absoluteServerTimes={true}
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
				absoluteServerTimes={true}
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
				absoluteServerTimes={true}
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
				absoluteServerTimes={true}
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
				absoluteServerTimes={true}
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
				absoluteServerTimes={true}
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
				absoluteServerTimes={true}
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
				absoluteServerTimes={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

export const BrandedPalette = {
	render: () => (
		<LabsSection
			title="Branded Palette"
			collectionId={''}
			pageId={''}
			ajaxUrl={''}
			sectionId={'branded-palette'}
			ophanComponentName={'branded-palette'}
			ophanComponentLink={'branded-palette'}
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="Branded"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
			/>
		</LabsSection>
	),
} satisfies Story;

export const MediaPalette = {
	render: () => (
		<FrontSection
			title="Media Palette"
			containerPalette="MediaPalette"
			showDateHeader={true}
			editionId={'UK'}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="MediaPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

export const PodcastPalette = {
	render: () => (
		<FrontSection
			title="Podcast Palette"
			collectionId={''}
			pageId={''}
			ajaxUrl={''}
			sectionId={'podcast-palette'}
			ophanComponentName={'podcast-palette'}
			ophanComponentLink={'podcast-palette'}
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="PodcastPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;
