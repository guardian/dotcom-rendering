import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumSlowVII } from './FixedMediumSlowVII';
import { FrontSection } from './FrontSection';

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
	<FrontSection
		title="Fixed Medium Slow VII"
		showTopBorder={true}
		showSideBorders={true}
		centralBorder="partial"
	>
		<FixedMediumSlowVII trails={trails} showAge={true} />
	</FrontSection>
);
Default.story = { name: 'FixedMediumSlowVII' };
