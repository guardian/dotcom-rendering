import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumFastXI } from './FixedMediumFastXI';
import { Section } from './Section';

export default {
	component: FixedMediumFastXI,
	title: 'Components/FixedMediumFastXI',
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

export const OneTrail = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 1)} />
	</Section>
);
OneTrail.story = { name: 'with one trail' };

export const TwoTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 2)} />
	</Section>
);
TwoTrails.story = { name: 'with two trails' };

export const ThreeTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 3)} />
	</Section>
);
ThreeTrails.story = { name: 'with three trails' };

export const FourTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 4)} />
	</Section>
);
FourTrails.story = { name: 'with four trails' };

export const FiveTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 5)} />
	</Section>
);
FiveTrails.story = { name: 'with five trails' };

export const SixTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 6)} />
	</Section>
);
SixTrails.story = { name: 'with six trails' };

export const SevenTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 7)} />
	</Section>
);
SevenTrails.story = { name: 'with seven trails' };

export const EightTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 8)} />
	</Section>
);
EightTrails.story = { name: 'with eight trails' };

export const NineTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 9)} />
	</Section>
);
NineTrails.story = { name: 'with nine trails' };

export const TenTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 10)} />
	</Section>
);
TenTrails.story = { name: 'with ten trails' };

export const ElevenTrails = () => (
	<Section
		title="FixedMediumFastXI"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXI trails={trails.slice(0, 11)} />
	</Section>
);
ElevenTrails.story = { name: 'with eleven trails' };
