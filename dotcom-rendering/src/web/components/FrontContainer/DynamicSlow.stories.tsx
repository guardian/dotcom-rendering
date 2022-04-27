import { breakpoints } from '@guardian/source-foundations';
import { ContainerLayout } from '../ContainerLayout';
import { DynamicSlow } from './DynamicSlow';

import { trails } from '../../../../fixtures/manual/trails';

export default {
	component: DynamicSlow,
	title: 'Components/DynamicSlow',
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
		title="DynamicSlow"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<DynamicSlow trails={trails} />
	</ContainerLayout>
);
Default.story = { name: 'DynamicSlow' };
