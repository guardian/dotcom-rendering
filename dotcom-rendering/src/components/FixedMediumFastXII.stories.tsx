import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails';
import { FixedMediumFastXII } from './FixedMediumFastXII';
import { FrontSection } from './FrontSection';

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
	<FrontSection title="Fixed Medium Fast XII">
		<FixedMediumFastXII
			trails={trails}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
Default.storyName = 'FixedMediumFastXII';
