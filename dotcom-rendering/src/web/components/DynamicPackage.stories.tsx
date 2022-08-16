import { breakpoints } from '@guardian/source-foundations';
import type { DCRGroupedTrails } from 'src/types/front';
import { trails } from '../../../fixtures/manual/trails';
import { Section } from './Section';
import { DynamicPackage } from './DynamicPackage';

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
};

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
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: [...trails].slice(0, 3),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Three.story = {
	name: 'With three standard cards',
};

export const Four = () => (
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: [...trails].slice(0, 4),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Four.story = {
	name: 'With four standard cards',
};

export const Five = () => (
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: [...trails].slice(0, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Five.story = {
	name: 'With five standard cards',
};

export const Boosted3 = () => {
	const primary = [...trails].slice(0)[0];
	const remaining = [...trails].slice(1, 3);

	return (
		<Section
			title="DynamicPackage"
			padContent={false}
			centralBorder="partial"
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</Section>
	);
};
Boosted3.story = {
	name: 'With three standard cards - boosted',
};

export const Boosted4 = () => {
	const primary = [...trails].slice(0)[0];
	const remaining = [...trails].slice(1, 4);

	return (
		<Section
			title="DynamicPackage"
			padContent={false}
			centralBorder="partial"
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</Section>
	);
};
Boosted4.story = {
	name: 'With four standard cards - boosted',
};

export const Boosted5 = () => {
	const primary = [...trails].slice(0)[0];
	const remaining = [...trails].slice(1, 5);

	return (
		<Section
			title="DynamicPackage"
			padContent={false}
			centralBorder="partial"
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</Section>
	);
};
Boosted5.story = {
	name: 'With five standard cards - boosted',
};

export const OneSnapThreeStandard = () => (
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [trails[0]],
				standard: [...trails].slice(1, 4),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
OneSnapThreeStandard.story = {
	name: 'With one snap - three standard cards',
};

export const ThreeSnapTwoStandard = () => (
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [...trails].slice(0, 3),
				standard: [...trails].slice(3, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
OneSnapThreeStandard.story = {
	name: 'With three snaps - two standard cards',
};

export const ThreeSnapTwoStandard2ndBoosted = () => (
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [trails[0], { ...trails[1], isBoosted: true }, trails[2]],
				standard: [...trails].slice(3, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
OneSnapThreeStandard.story = {
	name: 'With three snaps (2nd boosted) - two standard cards',
};
