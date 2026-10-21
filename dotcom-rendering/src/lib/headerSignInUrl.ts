import { createAuthenticationEventParams } from './identity-component-event';

export const getHeaderSignInUrl = (idUrl: string): string =>
	`${idUrl}/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in&${createAuthenticationEventParams(
		'guardian_signin_header',
	)}`;
