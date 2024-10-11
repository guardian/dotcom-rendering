import { breakpoints } from '@guardian/source/foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedSmallSlowIII } from './FixedSmallSlowIII';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallSlowIII,
	title: 'Components/Containers/FixedSmallSlowIII',
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
		title="Fixed Small Slow III"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedSmallSlowIII
			trails={trails}
			showAge={true}
			absoluteServerTimes={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedSmallSlowIII';
