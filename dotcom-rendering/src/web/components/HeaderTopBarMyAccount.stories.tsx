import { MyAccount } from './HeaderTopBarMyAccount';

export default {
	component: MyAccount,
	title: 'Components/MyAccount',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

export const defaultStory = () => {
	return (
		<MyAccount
			mmaUrl="mmaUrl"
			idApiUrl="idApiUrl"
			idUrl="idUrl"
			discussionApiUrl="discussionApiUrl"
		/>
	);
};

defaultStory.storyName =
	'not signed in';

export const signedInStory = () => {
	return (
		<MyAccount
			mmaUrl="mmaUrl"
			idApiUrl="idApiUrl"
			idUrl="idUrl"
			discussionApiUrl="discussionApiUrl"
			isSignedIn={true}
		/>
	);
};

signedInStory.storyName =
	'signed in';
