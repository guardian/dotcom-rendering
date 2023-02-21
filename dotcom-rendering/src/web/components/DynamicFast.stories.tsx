import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../../types/front';
import { DynamicFast } from './DynamicFast';
import { FrontSection } from './FrontSection';

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
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);
OneHugeTwoBigsSixStandards.story = {
	name: 'With 1 huge card, 2 bigs, 6 standards',
};

export const OneVeryBigTwoBigsSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);
OneVeryBigTwoBigsSixStandards.story = {
	name: 'with 1 very big card, 2 bigs, 6 standards',
};

export const TwoVeryBigsTwoBigsSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);
TwoVeryBigsTwoBigsSixStandards.story = {
	name: 'with 2 very big cards, 2 bigs, 6 standards',
};

export const TwoVeryBigs1stBoostedTwoBigsSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);
TwoVeryBigs1stBoostedTwoBigsSixStandards.story = {
	name: 'with 2 very big cards (1st boosted), 2 bigs, 6 standards',
};

export const TwoVeryBigs2ndBoostedTwoBigsSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);
TwoVeryBigs2ndBoostedTwoBigsSixStandards.story = {
	name: 'with 2 very big cards (2nd boosted), 2 bigs, 6 standards',
};

/* Second Slice variants */

export const TwoVeryBigsTwelveStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

TwoVeryBigsTwelveStandards.story = {
	name: 'with 2 very big cards, 12 standards',
};

export const TwoVeryBigsOneBigEightStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

TwoVeryBigsOneBigEightStandards.story = {
	name: 'with 2 very big cards, 1 big, 8 standards',
};

export const TwoVeryBigsOneBigBoostedSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

TwoVeryBigsOneBigBoostedSixStandards.story = {
	name: 'with 2 very big cards, 1 big (boosted), 6 standards',
};

export const TwoVeryBigsTwoBigsFiveStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

TwoVeryBigsTwoBigsFiveStandards.story = {
	name: 'with 2 very big cards, 2 bigs, 5 standards',
};

export const TwoVeryBigsTwoBigsFirstBoostedEightStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: twoOrMoreBigsFirstBoosted`}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [{ ...trails[3], isBoosted: true }, trails[4]],
				standard: trails.slice(5, 12),
			}}
			showAge={true}
		/>
	</FrontSection>
);

TwoVeryBigsTwoBigsFirstBoostedEightStandards.story = {
	name: 'with 2 very big cards, 2 bigs (first boosted), 8 standards',
};

export const TwoVeryBigsThreeBigsThreeStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

TwoVeryBigsThreeBigsThreeStandards.story = {
	name: 'with 2 very big cards, 3 bigs, 3 standards',
};

export const TwoVeryBigsFourBigs = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

TwoVeryBigsFourBigs.story = {
	name: 'with 2 very big cards, 4 bigs',
};

/* Edge cases */

// Demote a very big to a big
// First test: 1 huge (& less that normal amount of standards)
export const OneHugeOneVeryBig7Standards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

OneHugeOneVeryBig7Standards.story = {
	name: 'with 1 huge, 1 very big, 7 standards',
};

// Second test: 3 very bigs (& the last big is not shown)
export const ThreeVeryBigsFourBigs = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

OneHugeOneVeryBig7Standards.story = {
	name: 'with 1 huge, 1 very big, 7 standards',
};

// No first slice is provided
export const TwoBigsFourStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

TwoBigsFourStandards.story = {
	name: 'with 2 bigs, 4 standards',
};

// No standards are provided
// First test: there are some (2) bigs
export const OneVeryBigTwoBigs = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

OneVeryBigTwoBigs.story = {
	name: 'with 1 very big, 2 bigs',
};

// Second test: There are no bigs (first slice only)
export const OneVeryBig = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

OneVeryBig.story = {
	name: 'with 1 very big',
};

// Bigs are demoted in twoOrMoreBigsFirstBoosted layout
export const TwoVeryBigsFourBigsFirstBoostedThreeStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		padContent={true}
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
	</FrontSection>
);

TwoVeryBigsFourBigsFirstBoostedThreeStandards.story = {
	name: 'with 2 very big cards, 4 bigs (first boosted), 3 standards',
};
