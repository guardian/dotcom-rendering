import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { DynamicSlow } from './DynamicSlow';
import { Section } from './Section';

export default {
	component: DynamicSlow,
	title: 'Components/DynamicSlow',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.mobileLandscape,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const Default = () => (
	<Section title="DynamicSlow" padContent={false} centralBorder="partial">
		<DynamicSlow trails={trails} showAge={true} />
	</Section>
);
Default.story = { name: 'DynamicSlow' };
