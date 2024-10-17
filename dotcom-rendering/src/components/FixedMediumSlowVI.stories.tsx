import { breakpoints } from '@guardian/source/foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedMediumSlowVI } from './FixedMediumSlowVI';
import { FrontSection } from './FrontSection';

export default {
	component: FixedMediumSlowVI,
	title: 'Components/Containers/FixedMediumSlowVI',
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
		title="Fixed Medium Slow VI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumSlowVI
			trails={trails}
			showAge={true}
			absoluteServerTimes={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedMediumSlowVI';
