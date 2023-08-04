import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { FixedMediumFastXII } from './FixedMediumFastXII.tsx';
import { FrontSection } from './FrontSection.tsx';

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
		<FixedMediumFastXII trails={trails} showAge={true} />
	</FrontSection>
);
Default.storyName = 'FixedMediumFastXII';
