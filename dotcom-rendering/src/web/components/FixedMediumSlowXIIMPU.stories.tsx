import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumSlowXIIMPU } from './FixedMediumSlowXIIMPU';
import { FrontSection } from './FrontSection';


export default {
	component: FixedMediumSlowXIIMPU,
	title: 'Components/FixedMediumSlowXIIMPU',
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
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
OneTrail.story = { name: 'with one trail' };

export const TwoTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
TwoTrails.story = { name: 'with two trails' };

export const ThreeTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
ThreeTrails.story = { name: 'with three trails' };

export const FourTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
FourTrails.story = { name: 'with four trails' };

export const FiveTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 5)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
FiveTrails.story = { name: 'with five trails' };

export const SixTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 6)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
SixTrails.story = { name: 'with six trails' };

export const SevenTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 7)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
SevenTrails.story = { name: 'with seven trails' };

export const EightTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 8)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
EightTrails.story = { name: 'with eight trails' };

export const NineTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 9)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);
NineTrails.story = { name: 'with nine trails' };
