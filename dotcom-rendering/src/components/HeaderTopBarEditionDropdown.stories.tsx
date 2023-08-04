import { HeaderTopBarEditionDropdown } from './HeaderTopBarEditionDropdown.tsx';

export default {
	component: HeaderTopBarEditionDropdown,
	title: 'Components/HeaderTopBarEditionDropdown',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

export const defaultStory = () => {
	return (
		<HeaderTopBarEditionDropdown
			editionId="UK"
			dataLinkName="test"
			isInEuropeTest={false}
		/>
	);
};

defaultStory.storyName = 'default';
