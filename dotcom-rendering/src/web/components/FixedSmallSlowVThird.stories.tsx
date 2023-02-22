import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowVThird } from './FixedSmallSlowVThird';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallSlowVThird,
	title: 'Components/FixedSmallSlowVThird',
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
		title="Fixed Small Slow V Third"
		centralBorder="partial"
	>
		<FixedSmallSlowVThird trails={trails} showAge={true} />
	</FrontSection>
);
Default.story = { name: 'FixedSmallSlowVThird' };
