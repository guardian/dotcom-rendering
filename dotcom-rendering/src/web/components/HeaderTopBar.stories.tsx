import { HeaderTopBar } from './HeaderTopBar.importable';

export default {
	component: HeaderTopBar,
	title: 'Components/HeaderTopBar',
};

export const defaultStory = () => {
	return (
		<HeaderTopBar
			editionId="UK"
			dataLinkName="test"
			idUrl="idurl"
			mmaUrl="mmaUrl"
			discussionApiUrl="discussionApiUrl"
			idApiUrl="idApiUrl"
		/>
	);
};

defaultStory.story = { name: 'Header top bar signed out' };

export const signedInStory = () => {
	return (
		<HeaderTopBar
			editionId="UK"
			dataLinkName="test"
			idUrl="idurl"
			mmaUrl="mmaUrl"
			discussionApiUrl="discussionApiUrl"
			idApiUrl="idApiUrl"
			isSignedIn={true}
		/>
	);
};

signedInStory.story = { name: 'Header top bar signed in' };
