import type { AuthStatus } from '../lib/useAuthStatus';
import { MyAccount } from './HeaderTopBarMyAccount';

export default {
	component: MyAccount,
	title: 'Components/MyAccount',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
	},
};

//will need to adjust this with okta?
export const defaultStory = () => {
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

defaultStory.storyName = 'not signed in';

export const signedInStory = () => {
	const authStatus: AuthStatus = { kind: 'SignedInWithCookies' };
	return (
		<MyAccount
			mmaUrl="mmaUrl"
			idApiUrl="idApiUrl"
			idUrl="idUrl"
			discussionApiUrl="discussionApiUrl"
			isSignedIn={true}
			authStatus={authStatus}
		/>
	);
};

signedInStory.storyName = 'signed in';
