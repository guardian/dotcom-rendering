import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { DynamicSlowMPU } from './DynamicSlowMPU';
import { Section } from './Section';

export default {
	component: DynamicSlowMPU,
	title: 'Components/DynamicSlowMPU',
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

const [bigOne, bigTwo, bigThree] = trails;
const standards = trails.slice(3);

export const NoBigs = () => (
	<Section title="DynamicSlowMPU" padContent={false} centralBorder="partial">
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
		/>
	</Section>
);
NoBigs.story = { name: 'with no big cards, only standard' };

export const OneBig = () => (
	<Section title="DynamicSlowMPU" padContent={false} centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [bigOne],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</Section>
);
OneBig.story = { name: 'with just one big' };

export const TwoBigs = () => (
	<Section title="DynamicSlowMPU" padContent={false} centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [bigOne, bigTwo],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</Section>
);
TwoBigs.story = { name: 'with two bigs' };

export const FirstBigBoosted = () => (
	<Section title="DynamicSlowMPU" padContent={false} centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [
					{
						...bigOne,
						isBoosted: true,
					},
					bigTwo,
				],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</Section>
);
FirstBigBoosted.story = { name: 'with the first of two bigs boosted' };

export const ThreeBigs = () => (
	<Section title="DynamicSlowMPU" padContent={false} centralBorder="partial">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [bigOne, bigTwo, bigThree],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</Section>
);
ThreeBigs.story = { name: 'with three bigs' };

export const AllBigs = () => (
	<Section title="DynamicSlowMPU" padContent={false} centralBorder="partial">
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
		/>
	</Section>
);
AllBigs.story = { name: 'with lots of bigs and no standards' };
