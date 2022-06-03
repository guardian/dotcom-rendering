import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { DynamicFast } from './DynamicFast';

export default {
	title: 'Layouts/Palettes',
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
			collectionId="abc"
			trails={trails}
			containerPalette="EventPalette"
			showAge={true}
			hasMore={false}
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
			collectionId="abc"
			trails={trails}
			containerPalette="EventAltPalette"
			showAge={true}
			hasMore={false}
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
			collectionId="abc"
			trails={trails}
			containerPalette="SombrePalette"
			showAge={true}
			hasMore={false}
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
			collectionId="abc"
			trails={trails}
			containerPalette="SombreAltPalette"
			showAge={true}
			hasMore={false}
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
			collectionId="abc"
			trails={trails}
			containerPalette="BreakingPalette"
			showAge={true}
			hasMore={false}
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
			collectionId="abc"
			trails={trails}
			containerPalette="LongRunningPalette"
			showAge={true}
			hasMore={false}
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
			collectionId="abc"
			trails={trails}
			containerPalette="LongRunningAltPalette"
			showAge={true}
			hasMore={false}
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
			collectionId="abc"
			trails={trails}
			containerPalette="InvestigationPalette"
			showAge={true}
			hasMore={false}
		/>
	</ContainerLayout>
);
