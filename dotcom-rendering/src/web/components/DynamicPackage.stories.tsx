import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { DynamicPackage } from './DynamicPackage';

export default {
	component: DynamicPackage,
	title: 'Components/DynamicPackage',
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
		title="DynamicPackage"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicPackage trails={trails} showAge={true} />
	</ContainerLayout>
);
Default.story = {
	name: 'DynamicPackage',
};
