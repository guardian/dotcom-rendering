import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../../types/front';
import { DynamicFast } from './DynamicFast';
import { Section } from './Section';

export default {
	component: DynamicFast,
	title: 'Components/DynamicFast',
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

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
};

/* First Slice Variants */

export const OneHugeTwoBigsSixStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: oneHuge</br>second slice: twoBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				huge: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 10),
			}}
			showAge={true}
		/>
	</Section>
);
OneHugeTwoBigsSixStandards.story = {
	name: 'With 1 huge card, 2 bigs, 6 standards',
};

export const OneVeryBigTwoBigsSixStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: oneVeryBig</br>second slice: twoBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 10),
			}}
			showAge={true}
		/>
	</Section>
);
OneVeryBigTwoBigsSixStandards.story = {
	name: 'with 1 very big card, 2 bigs, 6 standards',
};

export const TwoVeryBigsTwoBigsSixStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 11),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigsTwoBigsSixStandards.story = {
	name: 'with 2 very big cards, 2 bigs, 6 standards',
};

export const TwoVeryBigs1stBoostedTwoBigsSixStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigsFirstBoosted</br>second slice: twoBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [{ ...trails[0], isBoosted: true }, trails[1]],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 11),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigs1stBoostedTwoBigsSixStandards.story = {
	name: 'with 2 very big cards (1st boosted), 2 bigs, 6 standards',
};

export const TwoVeryBigs2ndBoostedTwoBigsSixStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigsSecondBoosted</br>second slice: twoBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], { ...trails[1], isBoosted: true }],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 11),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigs2ndBoostedTwoBigsSixStandards.story = {
	name: 'with 2 very big cards (2nd boosted), 2 bigs, 6 standards',
};

/* Second Slice variants */

export const TwoVeryBigsTwelveStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: noBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				standard: trails.slice(2, 14),
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsTwelveStandards.story = {
	name: 'with 2 very big cards, 12 standards',
};

export const TwoVeryBigsOneBigEightStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [trails[3]],
				standard: trails.slice(4, 12),
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsOneBigEightStandards.story = {
	name: 'with 2 very big cards, 1 big, 8 standards',
};

export const TwoVeryBigsOneBigBoostedSixStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: oneBigBoosted`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [{ ...trails[3], isBoosted: true }],
				standard: trails.slice(4, 10),
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsOneBigBoostedSixStandards.story = {
	name: 'with 2 very big cards, 1 big (boosted), 6 standards',
};

export const TwoVeryBigsTwoBigsFiveStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [trails[3], trails[4]],
				standard: trails.slice(5, 10),
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsTwoBigsFiveStandards.story = {
	name: 'with 2 very big cards, 2 bigs, 5 standards',
};

export const TwoVeryBigsTwoBigsFirstBoostedSevenStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: twoOrMoreBigsFirstBoosted`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [{ ...trails[3], isBoosted: true }, trails[4]],
				standard: trails.slice(5, 11),
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsTwoBigsFirstBoostedSevenStandards.story = {
	name: 'with 2 very big cards, 2 bigs (first boosted), 7 standards',
};

export const TwoVeryBigsThreeBigsThreeStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: threeBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [trails[3], trails[4], trails[5]],
				standard: trails.slice(6, 9),
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsThreeBigsThreeStandards.story = {
	name: 'with 2 very big cards, 3 bigs, 3 standards',
};

export const TwoVeryBigsFourBigs = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: fourBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [trails[3], trails[4], trails[5], trails[6]],
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsFourBigs.story = {
	name: 'with 2 very big cards, 4 bigs',
};

/* Edge cases */

// Demote a very big to a big
// First test: 1 huge (& less that normal amount of standards)
export const OneHugeOneVeryBig7Standards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: oneHuge</br>second slice: oneBig`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				huge: [trails[0]],
				veryBig: [trails[1]],
				standard: trails.slice(2, 9),
			}}
			showAge={true}
		/>
	</Section>
);

OneHugeOneVeryBig7Standards.story = {
	name: 'with 1 huge, 1 very big, 7 standards',
};

// Second test: 3 very bigs (& the last big is not shown)
export const ThreeVeryBigsFourBigs = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: fourBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1], trails[2]],
				big: [trails[3], trails[4], trails[5], trails[6]],
			}}
			showAge={true}
		/>
	</Section>
);

OneHugeOneVeryBig7Standards.story = {
	name: 'with 1 huge, 1 very big, 7 standards',
};

// No first slice is provided
export const TwoBigsFourStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: undefined</br>second slice: twoBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				big: [trails[0], trails[1]],
				standard: trails.slice(2, 6),
			}}
			showAge={true}
		/>
	</Section>
);

TwoBigsFourStandards.story = {
	name: 'with 2 bigs, 4 standards',
};

// No standards are provided
// First test: there are some (2) bigs
export const OneVeryBigTwoBigs = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: oneVeryBig</br>second slice: twoBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
				big: [trails[1], trails[2]],
			}}
			showAge={true}
		/>
	</Section>
);

OneVeryBigTwoBigs.story = {
	name: 'with 1 very big, 2 bigs',
};

// Second test: There are no bigs (first slice only)
export const OneVeryBig = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: oneVeryBig</br>second slice: noBigs`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
			}}
			showAge={true}
		/>
	</Section>
);

OneVeryBig.story = {
	name: 'with 1 very big',
};

// Bigs are demoted in twoOrMoreBigsFirstBoosted layout
export const TwoVeryBigsFourBigsFirstBoostedThreeStandards = () => (
	<Section
		title="DynamicFast"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: twoOrMoreBigsFirstBoosted`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [{ ...trails[2], isBoosted: true }, trails[3], trails[4]],
				standard: trails.slice(5, 8),
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsFourBigsFirstBoostedThreeStandards.story = {
	name: 'with 2 very big cards, 4 bigs (first boosted), 3 standards',
};
