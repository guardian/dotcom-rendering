import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { FixedSmallSlowVMPU } from './FixedSmallSlowVMPU.tsx';
import { FrontSection } from './FrontSection.tsx';

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
	<FrontSection title="Fixed Small Slow V MPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			adIndex={1}
			renderAds={true}
		/>
	</FrontSection>
);

FourCards.storyName = 'With 4 cards';

export const ThreeCards = () => (
	<FrontSection title="Fixed Small Slow V MPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			adIndex={1}
			renderAds={true}
		/>
	</FrontSection>
);

ThreeCards.storyName = 'With 3 cards';

export const TwoCards = () => (
	<FrontSection title="Fixed Small Slow V MPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			adIndex={1}
			renderAds={true}
		/>
	</FrontSection>
);

TwoCards.storyName = 'With 2 cards';

export const OneCard = () => (
	<FrontSection title="Fixed Small Slow V MPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			adIndex={1}
			renderAds={true}
		/>
	</FrontSection>
);

OneCard.storyName = 'With 1 card';

export const AdfreeFixedSmallSlowVMPU = () => (
	<FrontSection title="Fixed Small Slow V MPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			adIndex={1}
			renderAds={false}
		/>
	</FrontSection>
);

AdfreeFixedSmallSlowVMPU.storyName = 'Ad-free Fixed Small Slow V MPU';
