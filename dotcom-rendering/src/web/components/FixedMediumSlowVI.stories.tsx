import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumSlowVI } from './FixedMediumSlowVI';
import { FrontSection } from './FrontSection';

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
	<FrontSection title="Fixed Medium Slow VI" centralBorder="partial">
		<FixedMediumSlowVI trails={trails} showAge={true} />
	</FrontSection>
);
Default.story = { name: 'FixedMediumSlowVI' };
