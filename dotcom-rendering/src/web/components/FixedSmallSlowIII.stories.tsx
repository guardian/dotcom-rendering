import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowIII } from './FixedSmallSlowIII';
import { Section } from './Section';

export default {
	component: FixedSmallSlowIII,
	title: 'Components/FixedSmallSlowIII',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};

export const Default = () => (
	<Section
		title="FixedSmallSlowIII"
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowIII trails={trails} showAge={true} />
	</Section>
);
Default.story = { name: 'FixedSmallSlowIII' };
