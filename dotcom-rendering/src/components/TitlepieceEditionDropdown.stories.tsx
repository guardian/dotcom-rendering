import { TitlepieceEditionDropdown } from './TitlepieceEditionDropdown';

export default {
	component: TitlepieceEditionDropdown,
	title: 'Components/Masthead/Titlepiece/EditionDropdown',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
		chromatic: { disable: true },
	},
};

export const defaultStory = () => {
	return <TitlepieceEditionDropdown editionId={'UK'} dataLinkName="test" />;
};

defaultStory.storyName = 'default';
