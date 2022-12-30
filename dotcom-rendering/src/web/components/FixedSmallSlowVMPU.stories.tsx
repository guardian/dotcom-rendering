import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowVMPU } from './FixedSmallSlowVMPU';
import { Section } from './Section';

export default {
	component: FixedSmallSlowVMPU,
	title: 'Components/FixedSmallSlowVMPU',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet, breakpoints.wide],
		},
	},
};

export const FourCards = () => (
	<Section
		title="FixedSmallSlowVMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU trails={trails.slice(0, 4)} showAge={true} index={1} />
	</Section>
);

FourCards.story = { name: 'With 4 cards' };

export const ThreeCards = () => (
	<Section
		title="FixedSmallSlowVMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU trails={trails.slice(0, 3)} showAge={true} index={1} />
	</Section>
);

ThreeCards.story = { name: 'With 3 cards' };

export const TwoCards = () => (
	<Section
		title="FixedSmallSlowVMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU trails={trails.slice(0, 2)} showAge={true} index={1} />
	</Section>
);

TwoCards.story = { name: 'With 2 cards' };

export const OneCard = () => (
	<Section
		title="FixedSmallSlowVMPU"
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowVMPU trails={trails.slice(0, 1)} showAge={true} index={1} />
	</Section>
);

OneCard.story = { name: 'With 1 card' };
