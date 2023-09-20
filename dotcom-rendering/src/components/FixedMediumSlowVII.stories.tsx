import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
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
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowVII
			trails={trails}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedMediumSlowVII';
