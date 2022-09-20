import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { DynamicFast } from './DynamicFast';
import { Section } from './Section';

export default {
	component: DynamicFast,
	title: 'Components/DynamicFast',
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

export const DF2VeryBigs2Bigs5Standards = () => (
	<Section title="DynamicFast" padContent={false} centralBorder="partial">
		<DynamicFast
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [trails[0], trails[1]],
				big: [trails[2], trails[3]],
				standard: [
					trails[4],
					trails[5],
					trails[6],
					trails[7],
					trails[8],
				],
			}}
			showAge={true}
		/>
	</Section>
);

DF2VeryBigs2Bigs5Standards.story = {
	name: '2 Very Bigs - 2 Bigs - 5 Standards (None boosted)',
};

export const DF1Huge1VeryBig2Big3Standard = () => (
	<Section title="DynamicFast" padContent={false} centralBorder="partial">
		<DynamicFast
			groupedTrails={{
				snap: [],
				huge: [trails[0]],
				veryBig: [trails[1]],
				big: [trails[2], trails[3]],
				standard: [trails[4], trails[5], trails[6]],
			}}
			showAge={true}
		/>
	</Section>
);

DF1Huge1VeryBig2Big3Standard.story = {
	name: '1 Huge - 1 Very Big - 2 Bigs - 3 Standards (None boosted)',
};

export const DF1VeryBig0Big8Standard = () => (
	<Section title="DynamicFast" padContent={false} centralBorder="partial">
		<DynamicFast
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [trails[0]],
				big: [],
				standard: [
					trails[1],
					trails[2],
					trails[3],
					trails[4],
					trails[5],
					trails[6],
					trails[7],
					trails[8],
				],
			}}
			showAge={true}
		/>
	</Section>
);

DF1VeryBig0Big8Standard.story = {
	name: '1 Very Big - 0 Bigs - 8 Standards (None boosted)',
};

export const DF2VeryBigs1Big8StandardsFirstBoosted = () => (
	<Section title="DynamicFast" padContent={false} centralBorder="partial">
		<DynamicFast
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [{ isBoosted: true, ...trails[0] }, trails[1]],
				big: [trails[2]],
				standard: [
					trails[3],
					trails[4],
					trails[5],
					trails[6],
					trails[7],
					trails[8],
					trails[9],
					trails[10],
				],
			}}
			showAge={true}
		/>
	</Section>
);

DF2VeryBigs1Big8StandardsFirstBoosted.story = {
	name: '2 Very Bigs - 1 Big - 8 Standards (First boosted)',
};

export const DF3VeryBigs3Big0StandardsSecondBoosted = () => (
	<Section title="DynamicFast" padContent={false} centralBorder="partial">
		<DynamicFast
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [
					trails[0],
					{ isBoosted: true, ...trails[1] },
					trails[2],
				],
				big: [trails[3], trails[4], trails[5]],
				standard: [],
			}}
			showAge={true}
		/>
	</Section>
);

DF3VeryBigs3Big0StandardsSecondBoosted.story = {
	name: '3 Very Bigs - 3 Big - 0 Standards (Second boosted)',
};

export const DF2VeryBigs3Big6StandardsThirdBoosted = () => (
	<Section title="DynamicFast" padContent={false} centralBorder="partial">
		<DynamicFast
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [trails[0], trails[1]],
				big: [{ isBoosted: true, ...trails[2] }, trails[3], trails[4]],
				standard: [
					trails[5],
					trails[6],
					trails[7],
					trails[8],
					trails[9],
					trails[10],
				],
			}}
			showAge={true}
		/>
	</Section>
);

DF2VeryBigs3Big6StandardsThirdBoosted.story = {
	name: '2 Very Bigs - 3 Big - 6 Standards (Third boosted)',
};

export const DF2VeryBigs1Big8StandardsFirstThirdBoosted = () => (
	<Section title="DynamicFast" padContent={false} centralBorder="partial">
		<DynamicFast
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [{ isBoosted: true, ...trails[0] }, trails[1]],
				big: [{ isBoosted: true, ...trails[2] }],
				standard: [
					trails[3],
					trails[4],
					trails[5],
					trails[6],
					trails[7],
					trails[8],
					trails[9],
					trails[10],
				],
			}}
			showAge={true}
		/>
	</Section>
);

DF2VeryBigs1Big8StandardsFirstThirdBoosted.story = {
	name: '2 Very Bigs - 1 Big - 8 Standards (First & Third boosted)',
};

export const DF2VeryBigs2Big3StandardsSecondThirdBoosted = () => (
	<Section title="DynamicFast" padContent={false} centralBorder="partial">
		<DynamicFast
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [trails[0], { isBoosted: true, ...trails[1] }],
				big: [{ isBoosted: true, ...trails[2] }, trails[3]],
				standard: [trails[4], trails[5], trails[6]],
			}}
			showAge={true}
		/>
	</Section>
);

DF2VeryBigs2Big3StandardsSecondThirdBoosted.story = {
	name: '2 Very Bigs - 1 Big - 3 Standards (Second & Third boosted)',
};
