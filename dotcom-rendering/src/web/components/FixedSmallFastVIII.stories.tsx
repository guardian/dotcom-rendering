import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallFastVIII } from './FixedSmallFastVIII';
import { FrontSection } from './FrontSection';

export default {
	component: FixedSmallFastVIII,
	title: 'Components/FixedSmallFastVIII',
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
	<FrontSection
		title="Fixed Small Fast VIII"
		showTopBorder={true}
		showSideBorders={true}
		centralBorder="partial"
	>
		<FixedSmallFastVIII trails={trails} showAge={true} />
	</FrontSection>
);
Default.story = { name: 'FixedSmallFastVIII' };
