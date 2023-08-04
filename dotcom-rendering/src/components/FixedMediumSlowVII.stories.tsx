import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { FixedMediumSlowVII } from './FixedMediumSlowVII.tsx';
import { FrontSection } from './FrontSection.tsx';

export default {
	component: FixedMediumSlowVII,
	title: 'Components/FixedMediumSlowVII',
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
	<FrontSection title="Fixed Medium Slow VII" showTopBorder={true}>
		<FixedMediumSlowVII trails={trails} showAge={true} />
	</FrontSection>
);
Default.storyName = 'FixedMediumSlowVII';
