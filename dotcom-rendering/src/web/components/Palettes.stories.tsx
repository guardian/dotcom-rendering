import { ContainerLayout } from './ContainerLayout';
import { DynamicFast } from './DynamicFast';

import { trails } from '../../../fixtures/manual/trails';

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
	>
		<DynamicFast
			trails={trails}
			containerPalette="EventPalette"
			containerDisplayName="Spotlight"
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
	>
		<DynamicFast
			trails={trails}
			containerPalette="EventAltPalette"
			containerDisplayName="Spotlight"
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
	>
		<DynamicFast
			trails={trails}
			containerPalette="SombrePalette"
			containerDisplayName="Spotlight"
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
	>
		<DynamicFast
			trails={trails}
			containerPalette="SombreAltPalette"
			containerDisplayName="Spotlight"
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
	>
		<DynamicFast
			trails={trails}
			containerPalette="BreakingPalette"
			containerDisplayName="Spotlight"
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
	>
		<DynamicFast
			trails={trails}
			containerPalette="LongRunningPalette"
			containerDisplayName="Spotlight"
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
	>
		<DynamicFast
			trails={trails}
			containerPalette="LongRunningAltPalette"
			containerDisplayName="Spotlight"
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
	>
		<DynamicFast
			trails={trails}
			containerPalette="InvestigationPalette"
			containerDisplayName="Spotlight"
		/>
	</ContainerLayout>
);
