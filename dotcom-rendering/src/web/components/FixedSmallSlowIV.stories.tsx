import { breakpoints } from '@guardian/source-foundations';
import { ContainerLayout } from './ContainerLayout';
import { FixedSmallSlowIV } from './FixedSmallSlowIV';

import { trails } from '../../../fixtures/manual/trails';

export default {
	component: FixedSmallSlowIV,
	title: 'Components/FixedSmallSlowIV',
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
		title="FixedSmallSlowIV"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowIV trails={trails} />
	</ContainerLayout>
);
Default.story = { name: 'FixedSmallSlowIV' };
