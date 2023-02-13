import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../../types/front';
import { DynamicPackage } from './DynamicPackage';
import { Section } from './Section';

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
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};

export const One = () => (
	<Section
		title="DynamicPackage"
		showTopBorder={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 1),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
One.story = {
	name: 'With one standard card',
};

export const Two = () => (
	<Section
		title="DynamicPackage"
		showTopBorder={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 2),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Two.story = {
	name: 'With two standard cards',
};

export const Three = () => (
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 3),
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
				standard: trails.slice(0, 4),
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
				standard: trails.slice(0, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Five.story = {
	name: 'With five standard cards',
};

export const Six = () => (
	<Section
		title="DynamicPackage"
		showTopBorder={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 6),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Six.story = {
	name: 'With six standard cards',
};

export const Seven = () => (
	<Section
		title="DynamicPackage"
		showTopBorder={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 7),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Seven.story = {
	name: 'With seven standard cards',
};

export const Eight = () => (
	<Section
		title="DynamicPackage"
		showTopBorder={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 8),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Eight.story = {
	name: 'With eight standard cards',
};

export const Nine = () => (
	<Section
		title="DynamicPackage"
		showTopBorder={true}
		showSideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 9),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
Nine.story = {
	name: 'With nine standard cards',
};

export const Boosted1 = () => {
	const primary = trails[0];

	return (
		<Section
			title="DynamicPackage"
			showTopBorder={true}
			padContent={false}
			centralBorder="partial"
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</Section>
	);
};
Boosted1.story = {
	name: 'With one standard card - boosted',
};

export const Boosted2 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 2);

	return (
		<Section
			title="DynamicPackage"
			showTopBorder={true}
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
Boosted2.story = {
	name: 'With two standard cards - boosted',
};

export const Boosted3 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 3);

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
	const primary = trails[0];
	const remaining = trails.slice(1, 4);

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
	const primary = trails[0];
	const remaining = trails.slice(1, 5);

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

export const Boosted8 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 8);

	return (
		<Section
			title="DynamicPackage"
			showTopBorder={true}
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
Boosted8.story = {
	name: 'With eight standard cards - boosted',
};

export const Boosted9 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 9);

	return (
		<Section
			title="DynamicPackage"
			showTopBorder={true}
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
Boosted9.story = {
	name: 'With nine standard cards - boosted',
};

export const OneSnapThreeStandard = () => (
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [trails[0]],
				standard: trails.slice(1, 4),
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
				snap: trails.slice(0, 3),
				standard: trails.slice(3, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
ThreeSnapTwoStandard.story = {
	name: 'With three snaps - two standard cards',
};

export const ThreeSnapTwoStandard2ndBoosted = () => (
	<Section title="DynamicPackage" padContent={false} centralBorder="partial">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [trails[0], { ...trails[1], isBoosted: true }, trails[2]],
				standard: trails.slice(3, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</Section>
);
ThreeSnapTwoStandard2ndBoosted.story = {
	name: 'With three snaps (2nd boosted) - two standard cards',
};
