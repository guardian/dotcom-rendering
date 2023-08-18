import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedSmallSlowIV } from './FixedSmallSlowIV';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallSlowIV,
	title: 'Components/FixedSmallSlowIV',
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
		title="Fixed Small Slow IV"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedSmallSlowIV trails={trails} showAge={true} imageLoading="eager" />
	</FrontSection>
);
Default.storyName = 'FixedSmallSlowIV';
