import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumSlowXIIMPU } from './FixedMediumSlowXIIMPU';
import { Section } from './Section';

export default {
	component: FixedMediumSlowXIIMPU,
	title: 'Components/FixedMediumSlowXIIMPU',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet, breakpoints.wide],
		},
	},
};

export const OneTrail = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			index={1}
		/>
	</Section>
);
OneTrail.story = { name: 'with one trail' };

export const TwoTrails = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			index={1}
		/>
	</Section>
);
TwoTrails.story = { name: 'with two trails' };

export const ThreeTrails = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			index={1}
		/>
	</Section>
);
ThreeTrails.story = { name: 'with three trails' };

export const FourTrails = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			index={1}
		/>
	</Section>
);
FourTrails.story = { name: 'with four trails' };

export const FiveTrails = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 5)}
			showAge={true}
			index={1}
		/>
	</Section>
);
FiveTrails.story = { name: 'with five trails' };

export const SixTrails = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 6)}
			showAge={true}
			index={1}
		/>
	</Section>
);
SixTrails.story = { name: 'with six trails' };

export const SevenTrails = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 7)}
			showAge={true}
			index={1}
		/>
	</Section>
);
SevenTrails.story = { name: 'with seven trails' };

export const EightTrails = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 8)}
			showAge={true}
			index={1}
		/>
	</Section>
);
EightTrails.story = { name: 'with eight trails' };

export const NineTrails = () => (
	<Section
		title="FixedMediumSlowXIIMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 9)}
			showAge={true}
			index={1}
		/>
	</Section>
);
NineTrails.story = { name: 'with nine trails' };
