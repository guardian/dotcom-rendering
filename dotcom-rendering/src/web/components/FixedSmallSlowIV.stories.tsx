import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { FixedSmallSlowIV } from './FixedSmallSlowIV';

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
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowIV trails={trails} showAge={true} />
	</ContainerLayout>
);
Default.story = { name: 'FixedSmallSlowIV' };
