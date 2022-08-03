import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { DynamicFast } from './DynamicFast';

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
	<ContainerLayout
		title="EventPalette"
		showTopBorder={true}
		sideBorders={true}
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
	</ContainerLayout>
);

export const EventAltPalette = () => (
	<ContainerLayout
		title="EventAltPalette"
		showTopBorder={true}
		sideBorders={true}
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
	</ContainerLayout>
);

export const SombrePalette = () => (
	<ContainerLayout
		title="SombrePalette"
		showTopBorder={true}
		sideBorders={true}
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
	</ContainerLayout>
);

export const SombreAltPalette = () => (
	<ContainerLayout
		title="SombreAltPalette"
		showTopBorder={true}
		sideBorders={true}
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
	</ContainerLayout>
);

export const BreakingPalette = () => (
	<ContainerLayout
		title="BreakingPalette"
		showTopBorder={true}
		sideBorders={true}
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
	</ContainerLayout>
);

export const LongRunningPalette = () => (
	<ContainerLayout
		title="LongRunningPalette"
		showTopBorder={true}
		sideBorders={true}
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
	</ContainerLayout>
);

export const LongRunningAltPalette = () => (
	<ContainerLayout
		title="LongRunningAltPalette"
		showTopBorder={true}
		sideBorders={true}
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
	</ContainerLayout>
);

export const InvestigationPalette = () => (
	<ContainerLayout
		title="InvestigationPalette"
		showTopBorder={true}
		sideBorders={true}
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
	</ContainerLayout>
);
