import { breakpoints } from '@guardian/source/foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedSmallSlowVHalf } from './FixedSmallSlowVHalf';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallSlowVHalf,
	title: 'Components/Containers/FixedSmallSlowVHalf',
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
		editionId={'UK'}
	>
		<FixedSmallSlowVHalf
			trails={trails}
			showAge={true}
			absoluteServerTimes={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedSmallSlowVHalf';
