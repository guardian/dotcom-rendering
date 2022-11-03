import { trails } from '../../../fixtures/manual/trails';
import { DynamicFast } from './DynamicFast';
import { Section } from './Section';

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
	<Section
		title="EventPalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="EventPalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="EventPalette"
			showAge={true}
		/>
	</Section>
);

export const EventAltPalette = () => (
	<Section
		title="EventAltPalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="EventAltPalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="EventAltPalette"
			showAge={true}
		/>
	</Section>
);

export const SombrePalette = () => (
	<Section
		title="SombrePalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="SombrePalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="SombrePalette"
			showAge={true}
		/>
	</Section>
);

export const SombreAltPalette = () => (
	<Section
		title="SombreAltPalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="SombreAltPalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="SombreAltPalette"
			showAge={true}
		/>
	</Section>
);

export const BreakingPalette = () => (
	<Section
		title="BreakingPalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="BreakingPalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="BreakingPalette"
			showAge={true}
		/>
	</Section>
);

export const LongRunningPalette = () => (
	<Section
		title="LongRunningPalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="LongRunningPalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="LongRunningPalette"
			showAge={true}
		/>
	</Section>
);

export const LongRunningAltPalette = () => (
	<Section
		title="LongRunningAltPalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="LongRunningAltPalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="LongRunningAltPalette"
			showAge={true}
		/>
	</Section>
);

export const InvestigationPalette = () => (
	<Section
		title="InvestigationPalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="InvestigationPalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="InvestigationPalette"
			showAge={true}
		/>
	</Section>
);

export const SpecialReportAltPalette = () => (
	<Section
		title="SpecialReportAltPalette"
		padContent={false}
		centralBorder="partial"
		containerPalette="SpecialReportAltPalette"
		showDateHeader={true}
		editionId={'UK'}
	>
		<DynamicFast
			groupedTrails={groupedTrails}
			containerPalette="SpecialReportAltPalette"
			showAge={true}
		/>
	</Section>
);
