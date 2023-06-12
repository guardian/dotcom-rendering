import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails';
import { FixedSmallSlowIV } from './FixedSmallSlowIV';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallSlowIV,
	title: 'Components/FixedSmallSlowIV',
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
	<FrontSection title="Fixed Small Slow IV">
		<FixedSmallSlowIV trails={trails} showAge={true} />
	</FrontSection>
);
Default.storyName = 'FixedSmallSlowIV';
