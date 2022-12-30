import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedLargeSlowXIV } from './FixedLargeSlowXIV';
import { Section } from './Section';

export default {
	component: FixedLargeSlowXIV,
	title: 'Components/FixedLargeSlowXIV',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet, breakpoints.wide],
		},
	},
};

export const Default = () => (
	<Section title="FixedLargeSlowXIV" padContent={false} centralBorder="partial">
		<FixedLargeSlowXIV trails={trails} showAge={true} />
	</Section>
);
Default.story = { name: 'FixedLargeSlowXIV' };
