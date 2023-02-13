import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumFastXII } from './FixedMediumFastXII';
import { Section } from './Section';

export default {
	component: FixedMediumFastXII,
	title: 'Components/FixedMediumFastXII',
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
		title="FixedMediumFastXII"
		padContent={true}
		centralBorder="partial"
	>
		<FixedMediumFastXII trails={trails} showAge={true} />
	</Section>
);
Default.story = { name: 'FixedMediumFastXII' };
