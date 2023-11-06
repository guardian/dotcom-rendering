import type { AuthStatus } from '../lib/identity';
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
	const authStatus: AuthStatus = { kind: 'SignedOutWithCookies' };
	return (
		<MyAccount
			mmaUrl="mmaUrl"
			idApiUrl="idApiUrl"
			idUrl="idUrl"
			discussionApiUrl="discussionApiUrl"
			authStatus={authStatus}
		/>
	);
};

defaultStory.storyName = 'not signed in';

//may want to adjust these for the okta case
export const signedInStory = () => {
	const authStatus: AuthStatus = { kind: 'SignedInWithCookies' };
	return (
		<MyAccount
			mmaUrl="mmaUrl"
			idApiUrl="idApiUrl"
			idUrl="idUrl"
			discussionApiUrl="discussionApiUrl"
			authStatus={authStatus}
		/>
	);
};

signedInStory.storyName = 'signed in';
