import { trails } from '../../../fixtures/manual/trails';
import { breakpoints } from '@guardian/source-foundations';
import { Section } from './Section';
import { FixedMediumFastXII } from './FixedMediumFastXII';

export default {
	component: FixedMediumFastXII,
	title: 'Components/FixedMediumFastXII',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet, breakpoints.wide],
		},
	},
};

export const Default = () => (
	<Section
		title="FixedMediumFastXII"
		padContent={false}
		centralBorder="partial"
	>
		<FixedMediumFastXII trails={trails} showAge={true} />
	</Section>
);
Default.story = { name: 'FixedMediumFastXII' };
