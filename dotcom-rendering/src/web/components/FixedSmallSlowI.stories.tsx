import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { ContainerLayout } from './ContainerLayout';
import { FixedSmallSlowI } from './FixedSmallSlowI';

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
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowI trails={trails} showAge={true} />
	</ContainerLayout>
);
Default.story = { name: 'FixedSmallSlowI' };
