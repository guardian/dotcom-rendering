import { createAuthenticationEventParams } from './identity-component-event';

describe('createAuthenticationEventParams', () => {
	it('creates authentication event params given a component Id', () => {
		expect(createAuthenticationEventParams('signin_to_reply_comment')).toBe(
			'componentEventParams=componentType%3Didentityauthentication%26componentId%3Dsignin_to_reply_comment',
		);
	});
});
