import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
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
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);

FourCards.story = { name: 'With 4 cards' };

export const ThreeCards = () => (
	<FrontSection
		title="Fixed Small Slow V MPU"
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);

ThreeCards.story = { name: 'With 3 cards' };

export const TwoCards = () => (
	<FrontSection
		title="Fixed Small Slow V MPU"
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);

TwoCards.story = { name: 'With 2 cards' };

export const OneCard = () => (
	<FrontSection
		title="Fixed Small Slow V MPU"
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			index={1}
		/>
	</FrontSection>
);

OneCard.story = { name: 'With 1 card' };
