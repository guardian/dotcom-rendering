import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumFastXI } from './FixedMediumFastXI';
import { FrontSection } from './FrontSection';

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
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 1)} />
	</FrontSection>
);
OneTrail.storyName = 'with one trail';

export const TwoTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 2)} />
	</FrontSection>
);
TwoTrails.storyName = 'with two trails';

export const ThreeTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 3)} />
	</FrontSection>
);
ThreeTrails.storyName = 'with three trails';

export const FourTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 4)} />
	</FrontSection>
);
FourTrails.storyName = 'with four trails';

export const FiveTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 5)} />
	</FrontSection>
);
FiveTrails.storyName = 'with five trails';

export const SixTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 6)} />
	</FrontSection>
);
SixTrails.storyName = 'with six trails';

export const SevenTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 7)} />
	</FrontSection>
);
SevenTrails.storyName = 'with seven trails';

export const EightTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 8)} />
	</FrontSection>
);
EightTrails.storyName = 'with eight trails';

export const NineTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 9)} />
	</FrontSection>
);
NineTrails.storyName = 'with nine trails';

export const TenTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 10)} />
	</FrontSection>
);
TenTrails.storyName = 'with ten trails';

export const ElevenTrails = () => (
	<FrontSection title="Fixed Medium Fast XI">
		<FixedMediumFastXI trails={trails.slice(0, 11)} />
	</FrontSection>
);
ElevenTrails.storyName = 'with eleven trails';
