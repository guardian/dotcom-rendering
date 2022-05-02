import { breakpoints } from '@guardian/source-foundations';
import { ContainerLayout } from './ContainerLayout';
import { DynamicFast } from './DynamicFast';

import { trails } from '../../../fixtures/manual/trails';

export default {
	component: DynamicFast,
	title: 'Components/DynamicFast',
};

export const Default = () => (
	<ContainerLayout
		title="DynamicFast"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicFast trails={trails} />
	</ContainerLayout>
);
Default.story = {
	name: 'DynamicFast',
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
