import { IdentityAuth } from '@guardian/identity-auth';

function getStage() {
	if (!window.guardian.config.isDev) {
		return window.guardian.config.stage;
	} else return 'DEV';
}

const getIssuer = (stage: StageType) =>
	stage === 'PROD'
		? 'https://profile.theguardian.com/oauth2/aus3xgj525jYQRowl417'
		: 'https://profile.code.dev-theguardian.com/oauth2/aus3v9gla95Toj0EE0x7';

const getClientId = (stage: StageType) =>
	stage === 'PROD' ? '0oa79m1fmgzrtaHc1417' : '0oa53x6k5wGYXOGzm0x7';

const getRedirectUri = (stage: StageType) => {
	switch (stage) {
		case 'PROD':
			return 'https://www.theguardian.com/ ';
		case 'CODE':
			return 'https://m.code.dev-theguardian.com/';
		case 'DEV':
		default:
			return 'http://localhost:3030/';
	}
};

let identityAuth: IdentityAuth | undefined = undefined;

function getIdentityAuth() {
	if (identityAuth === undefined) {
		const stage = getStage();

		identityAuth = new IdentityAuth({
			issuer: getIssuer(stage),
			clientId: getClientId(stage),
			redirectUri: getRedirectUri(stage),
			scopes: ['openid', 'profile', 'email'], // and any other scopes you need
		});
	}
	return identityAuth;
}

export async function isSignedInWithOkta(): Promise<boolean> {
	const isLoggedIn = await getIdentityAuth().isSignedIn();

	return isLoggedIn;
}
