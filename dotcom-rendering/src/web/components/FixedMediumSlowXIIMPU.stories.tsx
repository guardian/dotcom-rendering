import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { FixedMediumSlowXIIMPU } from './FixedMediumSlowXIIMPU';

export default {
	component: FixedMediumSlowXIIMPU,
	title: 'Components/FixedMediumSlowXIIMPU',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.mobileLandscape,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const OneTrail = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
OneTrail.story = { name: 'with one trail' };

export const TwoTrails = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
TwoTrails.story = { name: 'with two trails' };

export const ThreeTrails = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
ThreeTrails.story = { name: 'with three trails' };

export const FourTrails = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
FourTrails.story = { name: 'with four trails' };

export const FiveTrails = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 5)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
FiveTrails.story = { name: 'with five trails' };

export const SixTrails = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 6)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
SixTrails.story = { name: 'with six trails' };

export const SevenTrails = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 7)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
SevenTrails.story = { name: 'with seven trails' };

export const EightTrails = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 8)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
EightTrails.story = { name: 'with eight trails' };

export const NineTrails = () => (
	<ContainerLayout
		title="FixedMediumSlowXIIMPU"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 9)}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
NineTrails.story = { name: 'with nine trails' };
