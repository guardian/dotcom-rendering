import { nav } from '../../../Nav/Nav.mock';
import { ExpandedNav } from './ExpandedNav';

export default {
	component: ExpandedNav,
	title: 'Components/Masthead/ExpandedNav',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

export const defaultStory = () => {
	return <ExpandedNav nav={nav} editionId={'UK'} />;
};

defaultStory.storyName = 'default';
