import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { lightDecorator } from '../../.storybook/theme-decorators';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { DynamicFast } from './DynamicFast';
import { FrontSection } from './FrontSection';
import { LabsSection } from './LabsSection';

const articleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
};

export default {
	title: 'Layouts/Palettes',
};

const groupedTrails = {
	snap: [],
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
};

export const EventPalette = () => (
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
);
EventPalette.story = {
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};
EventPalette.decorators = [lightDecorator(articleFormat)];

export const EventAltPalette = () => (
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
);
EventAltPalette.decorators = [lightDecorator(articleFormat)];

export const SombrePalette = () => (
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
);
SombrePalette.decorators = [lightDecorator(articleFormat)];

export const SombreAltPalette = () => (
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
);
SombreAltPalette.decorators = [lightDecorator(articleFormat)];

export const BreakingPalette = () => (
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
);
BreakingPalette.decorators = [lightDecorator(articleFormat)];

export const LongRunningPalette = () => (
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
);
LongRunningPalette.decorators = [lightDecorator(articleFormat)];

export const LongRunningAltPalette = () => (
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
);
LongRunningAltPalette.decorators = [lightDecorator(articleFormat)];

export const InvestigationPalette = () => (
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
);
InvestigationPalette.decorators = [lightDecorator(articleFormat)];

export const SpecialReportAltPalette = () => (
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
);
SpecialReportAltPalette.decorators = [lightDecorator(articleFormat)];

export const BrandedPalette = () => (
	<LabsSection
		title="Branded Palette"
		collectionId={''}
		pageId={''}
		ajaxUrl={''}
		sectionId={'branded-palette'}
		ophanComponentName={'branded-palette'}
		ophanComponentLink={'branded-palette'}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="Branded"
			showAge={true}
			imageLoading="eager"
		/>
	</LabsSection>
);
BrandedPalette.decorators = [lightDecorator(articleFormat)];

export const MediaPalette = () => (
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
			imageLoading="eager"
		/>
	</FrontSection>
);
MediaPalette.decorators = [lightDecorator(articleFormat)];

export const PodcastPalette = () => (
	<FrontSection
		title="Podcast Palette"
		collectionId={''}
		pageId={''}
		ajaxUrl={''}
		sectionId={'podcast-palette'}
		ophanComponentName={'podcast-palette'}
		ophanComponentLink={'podcast-palette'}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="PodcastPalette"
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
PodcastPalette.decorators = [lightDecorator(articleFormat)];
