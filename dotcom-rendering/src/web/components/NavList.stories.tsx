import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { NavList } from './NavList';
import { Section } from './Section';

export default {
	component: NavList,
	title: 'Components/NavList',
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
	<Section title="NavList" padContent={false} centralBorder="partial">
		<NavList trails={trails} />
	</Section>
);
Default.story = { name: 'NavList' };
