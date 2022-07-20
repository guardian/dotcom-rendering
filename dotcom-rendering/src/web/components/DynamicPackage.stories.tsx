import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { DynamicPackage } from './DynamicPackage';

export default {
	component: DynamicPackage,
	title: 'Components/DynamicPackage',
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

export const Three = () => (
	<ContainerLayout
		title="DynamicPackage"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			trails={[...trails].slice(0, 3)}
			containerPalette="LongRunningPalette"
		/>
	</ContainerLayout>
);
Three.story = {
	name: 'With three cards',
};

export const Four = () => (
	<ContainerLayout
		title="DynamicPackage"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			trails={[...trails].slice(0, 4)}
			containerPalette="LongRunningPalette"
		/>
	</ContainerLayout>
);
Four.story = {
	name: 'With four cards',
};

export const Five = () => (
	<ContainerLayout
		title="DynamicPackage"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			trails={[...trails].slice(0, 5)}
			containerPalette="LongRunningPalette"
		/>
	</ContainerLayout>
);
Five.story = {
	name: 'With five cards',
};

export const Boosted3 = () => {
	const primary = [...trails].slice(0)[0];
	const remaining = [...trails].slice(1, 3);

	return (
		<ContainerLayout
			title="DynamicPackage"
			showTopBorder={true}
			sideBorders={true}
			padContent={false}
			centralBorder="partial"
		>
			<DynamicPackage
				trails={[{ ...primary, isBoosted: true }, ...remaining]}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</ContainerLayout>
	);
};
Boosted3.story = {
	name: 'With three cards - boosted',
};

export const Boosted4 = () => {
	const primary = [...trails].slice(0)[0];
	const remaining = [...trails].slice(1, 4);

	return (
		<ContainerLayout
			title="DynamicPackage"
			showTopBorder={true}
			sideBorders={true}
			padContent={false}
			centralBorder="partial"
		>
			<DynamicPackage
				trails={[{ ...primary, isBoosted: true }, ...remaining]}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</ContainerLayout>
	);
};
Boosted4.story = {
	name: 'With four cards - boosted',
};

export const Boosted5 = () => {
	const primary = [...trails].slice(0)[0];
	const remaining = [...trails].slice(1, 5);

	return (
		<ContainerLayout
			title="DynamicPackage"
			showTopBorder={true}
			sideBorders={true}
			padContent={false}
			centralBorder="partial"
		>
			<DynamicPackage
				trails={[{ ...primary, isBoosted: true }, ...remaining]}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</ContainerLayout>
	);
};
Boosted5.story = {
	name: 'With five cards - boosted',
};
