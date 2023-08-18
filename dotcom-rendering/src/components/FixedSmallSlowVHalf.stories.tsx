import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedSmallSlowVHalf } from './FixedSmallSlowVHalf';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallSlowVHalf,
	title: 'Components/FixedSmallSlowVHalf',
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
		title="Fixed Small Slow V Half"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedSmallSlowVHalf
			trails={trails}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedSmallSlowVHalf';
