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

export const Default = () => (
	<ContainerLayout
		title="DynamicFast"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicFast trails={trails} showAge={true} showMoreId="abc" />
	</ContainerLayout>
);
Default.story = {
	name: 'DynamicFast',
};
