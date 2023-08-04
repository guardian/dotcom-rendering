import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails-nav.ts';
import { FrontSection } from './FrontSection.tsx';
import { NavList } from './NavList.tsx';

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
	<FrontSection title="NavList">
		<NavList trails={trails} showImage={false} />
	</FrontSection>
);
Default.storyName = 'NavList';

export const DefaultWithImages = () => (
	<FrontSection title="Nav Media List">
		<NavList trails={trails} showImage={true} />
	</FrontSection>
);
DefaultWithImages.storyName = 'NavList with images';
