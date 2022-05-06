import { breakpoints } from '@guardian/source-foundations';
import { ContainerLayout } from './ContainerLayout';
import { FixedSmallSlowI } from './FixedSmallSlowI';

import { trails } from '../../../fixtures/manual/trails';

export default {
	component: FixedSmallSlowI,
	title: 'Components/FixedSmallSlowI',
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
		title="FixedSmallSlowI"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowI trails={trails} />
	</ContainerLayout>
);
Default.story = { name: 'FixedSmallSlowI' };
