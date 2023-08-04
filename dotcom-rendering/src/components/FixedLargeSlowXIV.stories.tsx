import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { FixedLargeSlowXIV } from './FixedLargeSlowXIV.tsx';
import { FrontSection } from './FrontSection.tsx';

export default {
	component: FixedLargeSlowXIV,
	title: 'Components/FixedLargeSlowXIV',
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
	<FrontSection title="Fixed Large Slow XIV">
		<FixedLargeSlowXIV trails={trails} showAge={true} />
	</FrontSection>
);
Default.storyName = 'FixedLargeSlowXIV';
