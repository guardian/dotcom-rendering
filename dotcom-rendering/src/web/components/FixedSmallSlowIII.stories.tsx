import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowIII } from './FixedSmallSlowIII';
import { FrontSection } from './FrontSection';

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
	<FrontSection
		title="Fixed Small Slow III"
		padContent={true}
		centralBorder="partial"
	>
		<FixedSmallSlowIII trails={trails} showAge={true} />
	</FrontSection>
);
Default.story = { name: 'FixedSmallSlowIII' };
