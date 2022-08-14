import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { FixedSmallSlowVMPU } from './FixedSmallSlowVMPU';

export default {
	component: FixedSmallSlowVMPU,
	title: 'Components/FixedSmallSlowVMPU',
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
		title="FixedSmallSlowVMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU trails={trails} showAge={true} index={1} />
	</ContainerLayout>
);
Default.story = { name: 'FixedSmallSlowVMPU' };
