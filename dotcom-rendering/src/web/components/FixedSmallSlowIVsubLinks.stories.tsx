import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowIV } from './FixedSmallSlowIV';
import { Section } from './Section';

export default {
	component: FixedSmallSlowIV,
	title: 'Components/FixedSmallSlowIVSublink',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet, breakpoints.wide],
		},
	},
};

export const Default = () => (
	<Section title="FixedSmallSlowIV" padContent={false} centralBorder="partial">
		<FixedSmallSlowIV
			trails={trails}
			showAge={true}
			supportingContent={trails[0].supportingContent}
		/>
	</Section>
);
Default.story = { name: 'FixedSmallSlowIV' };
