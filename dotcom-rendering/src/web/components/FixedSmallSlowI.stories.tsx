import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowI } from './FixedSmallSlowI';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallSlowI,
	title: 'Components/FixedSmallSlowI',
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
	<FrontSection title="Fixed Small Slow I">
		<FixedSmallSlowI trails={trails} showAge={true} />
	</FrontSection>
);
Default.storyName = 'FixedSmallSlowI';
