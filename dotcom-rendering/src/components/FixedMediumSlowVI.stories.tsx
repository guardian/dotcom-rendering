import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
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
	<FrontSection
		title="Fixed Medium Slow VI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowVI
			trails={trails}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedMediumSlowVI';
