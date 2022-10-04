import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumSlowVII } from './FixedMediumSlowVII';
import { Section } from './Section';

export default {
	component: FixedMediumSlowVII,
	title: 'Components/FixedMediumSlowVII',
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
	<Section
		title="FixedMediumSlowVII"
		showTopBorder={true}
		showSideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumSlowVII trails={trails} showAge={true} />
	</Section>
);
Default.story = { name: 'FixedMediumSlowVII' };
