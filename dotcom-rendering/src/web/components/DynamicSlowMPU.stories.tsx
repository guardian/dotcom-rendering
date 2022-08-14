import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { DynamicSlowMPU } from './DynamicSlowMPU';

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

const bigs = trails.slice(0, 3);
const standards = trails.slice(3);

export const NoBigs = () => (
	<ContainerLayout
		title="DynamicSlowMPU"
		padContent={false}
		centralBorder="partial"
	>
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
	</ContainerLayout>
);
NoBigs.story = { name: 'with no big cards, only standard' };

export const OneBig = () => (
	<ContainerLayout
		title="DynamicSlowMPU"
		padContent={false}
		centralBorder="partial"
	>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [bigs[0]],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
OneBig.story = { name: 'with just one big' };

export const TwoBigs = () => (
	<ContainerLayout
		title="DynamicSlowMPU"
		padContent={false}
		centralBorder="partial"
	>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [bigs[0], bigs[1]],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
TwoBigs.story = { name: 'with two bigs' };

export const FirstBigBoosted = () => (
	<ContainerLayout
		title="DynamicSlowMPU"
		padContent={false}
		centralBorder="partial"
	>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [
					{
						...bigs[0],
						isBoosted: true,
					},
					bigs[1],
				],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
FirstBigBoosted.story = { name: 'with the first of two bigs boosted' };

export const ThreeBigs = () => (
	<ContainerLayout
		title="DynamicSlowMPU"
		padContent={false}
		centralBorder="partial"
	>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [bigs[0], bigs[1], bigs[2]],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</ContainerLayout>
);
ThreeBigs.story = { name: 'with three bigs' };

export const AllBigs = () => (
	<ContainerLayout
		title="DynamicSlowMPU"
		padContent={false}
		centralBorder="partial"
	>
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
	</ContainerLayout>
);
AllBigs.story = { name: 'with lots of bigs and no standards' };
