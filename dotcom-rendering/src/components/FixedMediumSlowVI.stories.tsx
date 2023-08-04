import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { FixedMediumSlowVI } from './FixedMediumSlowVI.tsx';
import { FrontSection } from './FrontSection.tsx';

export default {
	component: FixedMediumSlowVI,
	title: 'Components/FixedMediumSlowVI',
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
	<FrontSection title="Fixed Medium Slow VI">
		<FixedMediumSlowVI trails={trails} showAge={true} />
	</FrontSection>
);
Default.storyName = 'FixedMediumSlowVI';
