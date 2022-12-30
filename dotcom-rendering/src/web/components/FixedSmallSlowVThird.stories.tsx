import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowVThird } from './FixedSmallSlowVThird';
import { Section } from './Section';

export default {
	component: FixedSmallSlowVThird,
	title: 'Components/FixedSmallSlowVThird',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet, breakpoints.wide],
		},
	},
};

export const Default = () => (
	<Section
		title="FixedSmallSlowVThird"
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallSlowVThird trails={trails} showAge={true} />
	</Section>
);
Default.story = { name: 'FixedSmallSlowVThird' };
