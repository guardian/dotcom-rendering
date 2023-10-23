import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { lightDecorator } from '../../.storybook/theme-decorators';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { DynamicFast } from './DynamicFast';
import { FrontSection } from './FrontSection';

const articleFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

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
		description={`first slice: oneHuge</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				huge: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 10),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
OneHugeTwoBigsSixStandards.storyName = 'With 1 huge card, 2 bigs, 6 standards';
OneHugeTwoBigsSixStandards.decorators = [lightDecorator(articleFormat)];

export const OneVeryBigTwoBigsSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: oneVeryBig</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 10),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
OneVeryBigTwoBigsSixStandards.storyName =
	'with 1 very big card, 2 bigs, 6 standards';
OneVeryBigTwoBigsSixStandards.decorators = [lightDecorator(articleFormat)];

export const TwoVeryBigsTwoBigsSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 11),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigsTwoBigsSixStandards.storyName =
	'with 2 very big cards, 2 bigs, 6 standards';
TwoVeryBigsTwoBigsSixStandards.decorators = [lightDecorator(articleFormat)];

export const TwoVeryBigs1stBoostedTwoBigsSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigsFirstBoosted</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [{ ...trails[0], isBoosted: true }, trails[1]],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 11),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigs1stBoostedTwoBigsSixStandards.storyName =
	'with 2 very big cards (1st boosted), 2 bigs, 6 standards';
TwoVeryBigs1stBoostedTwoBigsSixStandards.decorators = [
	lightDecorator(articleFormat),
];

export const TwoVeryBigs2ndBoostedTwoBigsSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigsSecondBoosted</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], { ...trails[1], isBoosted: true }],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 11),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigs2ndBoostedTwoBigsSixStandards.storyName =
	'with 2 very big cards (2nd boosted), 2 bigs, 6 standards';
TwoVeryBigs2ndBoostedTwoBigsSixStandards.decorators = [
	lightDecorator(articleFormat),
];

/* Second Slice variants */

export const TwoVeryBigsTwelveStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: noBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				standard: trails.slice(2, 14),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsTwelveStandards.storyName = 'with 2 very big cards, 12 standards';
TwoVeryBigsTwelveStandards.decorators = [lightDecorator(articleFormat)];

export const TwoVeryBigsOneBigEightStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [trails[3]],
				standard: trails.slice(4, 12),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsOneBigEightStandards.storyName =
	'with 2 very big cards, 1 big, 8 standards';
TwoVeryBigsOneBigEightStandards.decorators = [lightDecorator(articleFormat)];

export const TwoVeryBigsOneBigBoostedSixStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: oneBigBoosted`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [{ ...trails[3], isBoosted: true }],
				standard: trails.slice(4, 10),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsOneBigBoostedSixStandards.storyName =
	'with 2 very big cards, 1 big (boosted), 6 standards';
TwoVeryBigsOneBigBoostedSixStandards.decorators = [
	lightDecorator(articleFormat),
];

export const TwoVeryBigsTwoBigsFiveStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [trails[3], trails[4]],
				standard: trails.slice(5, 10),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsTwoBigsFiveStandards.storyName =
	'with 2 very big cards, 2 bigs, 5 standards';
TwoVeryBigsTwoBigsFiveStandards.decorators = [lightDecorator(articleFormat)];

export const TwoVeryBigsTwoBigsFirstBoostedEightStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: twoOrMoreBigsFirstBoosted`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [{ ...trails[3], isBoosted: true }, trails[4]],
				standard: trails.slice(5, 12),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsTwoBigsFirstBoostedEightStandards.storyName =
	'with 2 very big cards, 2 bigs (first boosted), 8 standards';
TwoVeryBigsTwoBigsFirstBoostedEightStandards.decorators = [
	lightDecorator(articleFormat),
];

export const TwoVeryBigsThreeBigsThreeStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: threeBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [trails[3], trails[4], trails[5]],
				standard: trails.slice(6, 9),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsThreeBigsThreeStandards.storyName =
	'with 2 very big cards, 3 bigs, 3 standards';
TwoVeryBigsThreeBigsThreeStandards.decorators = [lightDecorator(articleFormat)];

export const TwoVeryBigsFourBigs = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: fourBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [trails[3], trails[4], trails[5], trails[6]],
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsFourBigs.storyName = 'with 2 very big cards, 4 bigs';
TwoVeryBigsFourBigs.decorators = [lightDecorator(articleFormat)];

/* Edge cases */

// Demote a very big to a big
// First test: 1 huge (& less that normal amount of standards)
export const OneHugeOneVeryBig7Standards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: oneHuge</br>second slice: oneBig`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				huge: [trails[0]],
				veryBig: [trails[1]],
				standard: trails.slice(2, 9),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

OneHugeOneVeryBig7Standards.storyName = 'with 1 huge, 1 very big, 7 standards';

// Second test: 3 very bigs (& the last big is not shown)
export const ThreeVeryBigsFourBigs = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: fourBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1], trails[2]],
				big: [trails[3], trails[4], trails[5], trails[6]],
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

OneHugeOneVeryBig7Standards.storyName = 'with 1 huge, 1 very big, 7 standards';
OneHugeOneVeryBig7Standards.decorators = [lightDecorator(articleFormat)];

// No first slice is provided
export const TwoBigsFourStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: undefined</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				big: [trails[0], trails[1]],
				standard: trails.slice(2, 6),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoBigsFourStandards.storyName = 'with 2 bigs, 4 standards';

// No standards are provided
// First test: there are some (2) bigs
export const OneVeryBigTwoBigs = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: oneVeryBig</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
				big: [trails[1], trails[2]],
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

OneVeryBigTwoBigs.storyName = 'with 1 very big, 2 bigs';

// Second test: There are no bigs (first slice only)
export const OneVeryBig = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: oneVeryBig</br>second slice: noBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

OneVeryBig.storyName = 'with 1 very big';

// Bigs are demoted in twoOrMoreBigsFirstBoosted layout
export const TwoVeryBigsFourBigsFirstBoostedThreeStandards = () => (
	<FrontSection
		title="Dynamic Fast"
		description={`first slice: twoVeryBigs</br>second slice: twoOrMoreBigsFirstBoosted`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicFast
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], trails[1]],
				big: [{ ...trails[2], isBoosted: true }, trails[3], trails[4]],
				standard: trails.slice(5, 8),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsFourBigsFirstBoostedThreeStandards.storyName =
	'with 2 very big cards, 4 bigs (first boosted), 3 standards';
TwoVeryBigsFourBigsFirstBoostedThreeStandards.decorators = [
	lightDecorator(articleFormat),
];
