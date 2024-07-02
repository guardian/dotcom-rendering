import { nav } from '../../../Nav/Nav.mock';
import { TitlepiecePillars } from '../TitlepiecePillars';
import { TitlepieceExpandedNav } from './ExpandedNav';

export default {
	component: TitlepiecePillars,
	title: 'Components/Masthead/ExpandedNav',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

export const defaultStory = () => {
	return <TitlepieceExpandedNav nav={nav} editionId={'UK'} />;
};

defaultStory.storyName = 'default';
