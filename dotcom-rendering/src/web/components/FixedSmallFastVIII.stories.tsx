import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallFastVIII } from './FixedSmallFastVIII';
import { Section } from './Section';

export default {
	component: FixedSmallFastVIII,
	title: 'Components/FixedSmallFastVIII',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet, breakpoints.wide],
		},
	},
};

export const Default = () => (
	<Section
		title="FixedSmallFastVIII"
		showTopBorder={true}
		showSideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<FixedSmallFastVIII trails={trails} showAge={true} />
	</Section>
);
Default.story = { name: 'FixedSmallFastVIII' };
