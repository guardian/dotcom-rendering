import { TitlepieceEditionDropdown } from './TitlepieceEditionDropdown';

export default {
	component: TitlepieceEditionDropdown,
	title: 'Components/Masthead/EditionDropdown',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

export const defaultStory = () => {
	return (
		<TitlepieceEditionDropdown
			editionId={'UK'}
			dataLinkName="test"
			isTabletOrSmaller={false}
		/>
	);
};

defaultStory.storyName = 'default';
