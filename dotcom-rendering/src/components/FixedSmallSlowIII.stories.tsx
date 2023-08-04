import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { FixedSmallSlowIII } from './FixedSmallSlowIII.tsx';
import { FrontSection } from './FrontSection.tsx';

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
	<FrontSection title="Fixed Small Slow III">
		<FixedSmallSlowIII trails={trails} showAge={true} />
	</FrontSection>
);
Default.storyName = 'FixedSmallSlowIII';
