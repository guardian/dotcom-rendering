import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { FixedSmallSlowVThird } from './FixedSmallSlowVThird.tsx';
import { FrontSection } from './FrontSection.tsx';

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
	<FrontSection title="Fixed Small Slow V Third">
		<FixedSmallSlowVThird trails={trails} showAge={true} />
	</FrontSection>
);
Default.storyName = 'FixedSmallSlowVThird';
