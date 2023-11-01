import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedSmallSlowVMPU } from './FixedSmallSlowVMPU';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallSlowVMPU,
	title: 'Components/FixedSmallSlowVMPU',
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

export const FourCards = () => (
	<FrontSection
		title="Fixed Small Slow V MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

FourCards.storyName = 'With 4 cards';

export const ThreeCards = () => (
	<FrontSection
		title="Fixed Small Slow V MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

ThreeCards.storyName = 'With 3 cards';

export const TwoCards = () => (
	<FrontSection
		title="Fixed Small Slow V MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

TwoCards.storyName = 'With 2 cards';

export const OneCard = () => (
	<FrontSection
		title="Fixed Small Slow V MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

OneCard.storyName = 'With 1 card';

export const AdfreeFixedSmallSlowVMPU = () => (
	<FrontSection
		title="Fixed Small Slow V MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

AdfreeFixedSmallSlowVMPU.storyName = 'Ad-free Fixed Small Slow V MPU';
