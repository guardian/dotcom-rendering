import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedLargeSlowXIV } from './FixedLargeSlowXIV';
import { FrontSection } from './FrontSection';

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
	<FrontSection
		title="Fixed Large Slow XIV"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedLargeSlowXIV
			trails={trails}
			showAge={true}
			absoluteServerTimes={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedLargeSlowXIV';
