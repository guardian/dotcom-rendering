import { Search } from './HeaderTopBarSearch.tsx';

export default {
	component: Search,
	title: 'Components/HeaderTopBarSearch',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

export const defaultStory = () => {
	return <Search href="" dataLinkName="" />;
};

defaultStory.storyName = 'Header top bar search';
