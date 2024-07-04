import { TitlepieceEditionDropdown } from './EditionDropdown';

export default {
	component: TitlepieceEditionDropdown,
	title: 'Components/Masthead/EditionDropdown',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

export const defaultStory = () => {
	return <TitlepieceEditionDropdown editionId={'UK'} dataLinkName="test" />;
};

defaultStory.storyName = 'default';
