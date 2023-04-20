import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { DynamicSlowMPU } from './DynamicSlowMPU';
import { FrontSection } from './FrontSection';

export default {
	component: DynamicSlowMPU,
	title: 'Components/DynamicSlowMPU',
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

const bigs = trails.slice(0, 3);
const standards = trails.slice(3);

export const NoBigs = () => (
	<FrontSection title="Dynamic Slow MPU" centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [],
				standard: standards,
			}}
			showAge={true}
			index={1}
			renderAds={true}
			trails={trails}
		/>
	</FrontSection>
);
NoBigs.storyName = 'with no big cards, only standard';

export const OneBig = () => (
	<FrontSection title="Dynamic Slow MPU" centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 1),
				standard: standards,
			}}
			showAge={true}
			index={1}
			renderAds={true}
			trails={trails}
		/>
	</FrontSection>
);
OneBig.storyName = 'with just one big';

export const TwoBigs = () => (
	<FrontSection title="Dynamic Slow MPU" centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 2),
				standard: standards,
			}}
			showAge={true}
			index={1}
			renderAds={true}
			trails={trails}
		/>
	</FrontSection>
);
TwoBigs.storyName = 'with two bigs';

export const FirstBigBoosted = () => (
	<FrontSection title="Dynamic Slow MPU" centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs
					.slice(0, 2)
					.map((card, index) =>
						index === 0 ? { ...card, isBoosted: true } : card,
					),
				standard: standards,
			}}
			showAge={true}
			index={1}
			renderAds={true}
			trails={trails}
		/>
	</FrontSection>
);
FirstBigBoosted.storyName = 'with the first of two bigs boosted';

export const SecondBigBoosted = () => (
	<FrontSection title="Dynamic Slow MPU" centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs
					.slice(0, 2)
					.map((card, index) =>
						index === 1 ? { ...card, isBoosted: true } : card,
					),
				standard: standards,
			}}
			showAge={true}
			index={1}
			renderAds={true}
			trails={trails}
		/>
	</FrontSection>
);
SecondBigBoosted.storyName = 'with the second of two bigs boosted';

export const ThreeBigs = () => (
	<FrontSection title="Dynamic Slow MPU" centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 3),
				standard: standards,
			}}
			showAge={true}
			index={1}
			renderAds={true}
			trails={trails}
		/>
	</FrontSection>
);
ThreeBigs.storyName = 'with three bigs';

export const AllBigs = () => (
	<FrontSection title="Dynamic Slow MPU" centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: standards,
				standard: [],
			}}
			showAge={true}
			index={1}
			renderAds={true}
			trails={trails}
		/>
	</FrontSection>
);
AllBigs.storyName = 'with lots of bigs and no standards';

export const AdfreeDynamicSlowMPU = () => (
	<FrontSection title="DynamicSlowMPU" centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: standards,
				standard: [],
			}}
			showAge={true}
			index={1}
			renderAds={false}
			trails={trails}
		/>
	</FrontSection>
);
AdfreeDynamicSlowMPU.storyName = 'Ad-free dynamic slow MPU';
