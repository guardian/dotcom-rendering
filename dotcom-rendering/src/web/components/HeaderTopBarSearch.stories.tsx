import { Search } from './HeaderTopBarSearch';

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

defaultStory.story = { name: 'Header top bar search' };
