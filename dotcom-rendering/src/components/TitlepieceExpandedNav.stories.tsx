import { nav } from './Nav/Nav.mock';
import { TitlepieceExpandedNav } from './TitlepieceExpandedNav';

export default {
	component: TitlepieceExpandedNav,
	title: 'Components/Masthead/ExpandedNav',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

export const defaultStory = () => {
	return <TitlepieceExpandedNav nav={nav} />;
};

defaultStory.storyName = 'default';
