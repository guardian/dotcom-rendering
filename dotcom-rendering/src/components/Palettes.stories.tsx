import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { FlexibleGeneral } from './FlexibleGeneral';
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
	splash: [trails[0]],
	huge: [],
	veryBig: [],
	big: [],
	standard: [
		trails[1],
		trails[2],
		trails[3],
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
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
			<FlexibleGeneral
				groupedTrails={groupedTrails}
				containerPalette="EventPalette"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
				aspectRatio={'5:4'}
				collectionId={12345}
			/>
		</LabsSection>
	),
} satisfies Story;
