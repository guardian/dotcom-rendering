import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../../types/front';
import { DynamicSlow } from './DynamicSlow';
import { Section } from './Section';

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
};

export default {
	component: DynamicSlow,
	title: 'Components/DynamicSlow',
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

/* With Avatars */
export const Avatar = () => {
	const avatarTrails = trails.map((trail) => {
		return {
			...trail,
			trailText: 'This is the trail text',
			avatarUrl:
				'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3',
			format: {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticlePillar.Opinion,
			},
		};
	});
	return (
		<Section title="DynamicSlow" padContent={false} centralBorder="partial">
			<DynamicSlow
				groupedTrails={{
					...defaultGroupedTrails,
					veryBig: [
						{ ...avatarTrails[0], isBoosted: true },
						avatarTrails[1],
					],
					big: avatarTrails.slice(2, 4),
					standard: avatarTrails.slice(4, 8),
				}}
				showAge={true}
			/>
		</Section>
	);
};
Avatar.story = { name: 'With avatars' };

/* First Slice Variants */
export const OneHugeTwoBigsFourStandards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: oneHuge</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				huge: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
		/>
	</Section>
);
OneHugeTwoBigsFourStandards.story = {
	name: 'With 1 huge card, 2 bigs, 4 standards',
};

export const OneVeryBigTwoBigsFourStandards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: oneVeryBig</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
		/>
	</Section>
);
OneVeryBigTwoBigsFourStandards.story = {
	name: 'with 1 very big card, 2 bigs, 4 standards',
};

export const TwoVeryBigsTwoBigsFourStandards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigsTwoBigsFourStandards.story = {
	name: 'with 2 very big cards, 2 bigs, 4 standards',
};

export const TwoVeryBigs1stBoostedTwoBigsFourStandards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigsFirstBoosted</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [{ ...trails[0], isBoosted: true }, trails[1]],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigs1stBoostedTwoBigsFourStandards.story = {
	name: 'with 2 very big cards (1st boosted), 2 bigs, 4 standards',
};

export const TwoVeryBigs2ndBoostedTwoBigsFourStandards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigsSecondBoosted</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], { ...trails[1], isBoosted: true }],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigs2ndBoostedTwoBigsFourStandards.story = {
	name: 'with 2 very big cards (2nd boosted), 2 bigs, 4 standards',
};

/* Second Slice Variants */
export const TwoVeryBigs8Standards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: noBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				standard: trails.slice(2, 10),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigs8Standards.story = {
	name: 'with 2 very bigs, 8 standards',
};

export const TwoVeryBigsOneBig4Standards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
		/>
	</Section>
);

TwoVeryBigsOneBig4Standards.story = {
	name: 'with 2 very bigs, 1 big, 8 standards',
};

export const TwoVeryBigsTwoBigs4Standards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigsTwoBigs4Standards.story = {
	name: 'with 2 very bigs, 2 bigs, 8 standards',
};

/* Edge cases */

// Uneven number of Standards with no bigs
export const TwoVeryBigsFiveStandards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: noBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				standard: trails.slice(2, 7),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigsFiveStandards.story = {
	name: 'with 2 very bigs, 5 standards',
};

// Demote a very big to a big & fifth standard is not shown
export const ThreeVeryBigsFiveStandards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 3),
				standard: trails.slice(3, 8),
			}}
			showAge={true}
		/>
	</Section>
);
ThreeVeryBigsFiveStandards.story = {
	name: 'with 3 very bigs, 5 standards',
};

// No standards were provided
export const TwoVeryBigsOneBig = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 3),
			}}
			showAge={true}
		/>
	</Section>
);
TwoVeryBigsOneBig.story = {
	name: 'with 2 very bigs, 1 big',
};

// No first slice
export const TwoBigsThreeStandards = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: undefined</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				big: trails.slice(0, 2),
				standard: trails.slice(2, 5),
			}}
			showAge={true}
		/>
	</Section>
);
TwoBigsThreeStandards.story = {
	name: 'with 2 bigs, 3 standards',
};

// Just 1 standard
export const OneVeryBigTwoBigsOneStandard = () => (
	<Section
		title="DynamicSlow"
		padContent={false}
		centralBorder="partial"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 5),
			}}
			showAge={true}
		/>
	</Section>
);
OneVeryBigTwoBigsOneStandard.story = {
	name: 'with 2 very bigs, two bigs, 1 standard',
};
