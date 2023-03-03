import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails-nav';
import { FrontSection } from './FrontSection';
import { NavList } from './NavList';

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
	<FrontSection title="NavList" centralBorder="partial">
		<NavList trails={trails} showImage={false} />
	</FrontSection>
);
Default.story = { name: 'NavList' };

export const DefaultWithImages = () => (
	<FrontSection title="Nav Media List" centralBorder="partial">
		<NavList trails={trails} showImage={true} />
	</FrontSection>
);
DefaultWithImages.story = { name: 'NavList with images' };
