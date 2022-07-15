import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { DynamicFast } from './DynamicFast';

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
	<ContainerLayout
		title="DynamicFast"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicFast
			groupedTrails={{
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
	</ContainerLayout>
);

DF2VeryBigs2Bigs5Standards.story = {
	name: '2 Very Bigs - 2 Bigs - 5 Standards (None boosted)',
};

export const DF1Huge1VeryBig2Big3Standard = () => (
	<ContainerLayout
		title="DynamicFast"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicFast
			groupedTrails={{
				huge: [trails[0]],
				veryBig: [trails[1]],
				big: [trails[2], trails[3]],
				standard: [trails[4], trails[5], trails[6]],
			}}
			showAge={true}
		/>
	</ContainerLayout>
);

DF1Huge1VeryBig2Big3Standard.story = {
	name: '1 Huge - 1 Very Big - 2 Bigs - 3 Standards (None boosted)',
};
