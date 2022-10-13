import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails-nav';
import { NavMediaList } from './NavMediaList';
import { Section } from './Section';

export default {
	component: NavMediaList,
	title: 'Components/NavMediaList',
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
	<Section title="NavMediaList" padContent={false} centralBorder="partial">
		<NavMediaList trails={trails} />
	</Section>
);
Default.story = { name: 'NavMediaList' };
