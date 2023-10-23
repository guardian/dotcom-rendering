import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { DynamicSlow } from './DynamicSlow';
import { FrontSection } from './FrontSection';

const articleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
};

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
				'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png',
			format: articleFormat,
		};
	});
	return (
		<FrontSection title="Dynamic Slow" discussionApiUrl={discussionApiUrl}>
			<DynamicSlow
				groupedTrails={{
					...defaultGroupedTrails,
					veryBig: avatarTrails
						.slice(0, 2)
						.map((card, index) =>
							index === 0 ? { ...card, isBoosted: true } : card,
						),
					big: avatarTrails.slice(2, 4),
					standard: avatarTrails.slice(4, 8),
				}}
				showAge={true}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
Avatar.storyName = 'With avatars';

/* First Slice Variants */
export const OneHugeTwoBigsFourStandards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: oneHuge</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				huge: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
OneHugeTwoBigsFourStandards.storyName = 'With 1 huge card, 2 bigs, 4 standards';

export const OneVeryBigTwoBigsFourStandards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: oneVeryBig</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
OneVeryBigTwoBigsFourStandards.storyName =
	'with 1 very big card, 2 bigs, 4 standards';

export const TwoVeryBigsTwoBigsFourStandards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigsTwoBigsFourStandards.storyName =
	'with 2 very big cards, 2 bigs, 4 standards';

export const TwoVeryBigs1stBoostedTwoBigsFourStandards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigsFirstBoosted</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [{ ...trails[0], isBoosted: true }, trails[1]],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigs1stBoostedTwoBigsFourStandards.storyName =
	'with 2 very big cards (1st boosted), 2 bigs, 4 standards';

export const TwoVeryBigs2ndBoostedTwoBigsFourStandards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigsSecondBoosted</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], { ...trails[1], isBoosted: true }],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigs2ndBoostedTwoBigsFourStandards.storyName =
	'with 2 very big cards (2nd boosted), 2 bigs, 4 standards';

/* Second Slice Variants */
export const TwoVeryBigs8Standards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigs</br>second slice: noBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				standard: trails.slice(2, 10),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigs8Standards.storyName = 'with 2 very bigs, 8 standards';

export const TwoVeryBigsOneBig4Standards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoVeryBigsOneBig4Standards.storyName = 'with 2 very bigs, 1 big, 8 standards';

export const TwoVeryBigsTwoBigs4Standards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigsTwoBigs4Standards.storyName =
	'with 2 very bigs, 2 bigs, 8 standards';

/* Edge cases */

// Uneven number of Standards with no bigs
export const TwoVeryBigsFiveStandards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigs</br>second slice: noBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				standard: trails.slice(2, 7),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigsFiveStandards.storyName = 'with 2 very bigs, 5 standards';

// Demote a very big to a big & fifth standard is not shown
export const ThreeVeryBigsFiveStandards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 3),
				standard: trails.slice(3, 8),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
ThreeVeryBigsFiveStandards.storyName = 'with 3 very bigs, 5 standards';

// No standards were provided
export const TwoVeryBigsOneBig = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 3),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoVeryBigsOneBig.storyName = 'with 2 very bigs, 1 big';

// No first slice
export const TwoBigsThreeStandards = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: undefined</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				big: trails.slice(0, 2),
				standard: trails.slice(2, 5),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoBigsThreeStandards.storyName = 'with 2 bigs, 3 standards';

// Just 1 standard
export const OneVeryBigTwoBigsOneStandard = () => (
	<FrontSection
		title="Dynamic Slow"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 5),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
OneVeryBigTwoBigsOneStandard.storyName =
	'with 2 very bigs, two bigs, 1 standard';
