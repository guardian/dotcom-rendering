import { createAuthenticationEventParams } from './identity-component-event';

describe('createAuthenticationEventParams', () => {
	it('creates authentication event params given a component Id', () => {
		expect(createAuthenticationEventParams('amp_sidebar_signin')).toBe(
			'componentEventParams=componentType%3Didentityauthentication%26componentId%3Damp_sidebar_signin',
		);
	});
	it('creates authentication event params given a component Id and a page view Id', () => {
		expect(
			createAuthenticationEventParams('amp_sidebar_signin', 'pageViewId'),
		).toBe(
			'componentEventParams=componentType%3Didentityauthentication%26componentId%3Damp_sidebar_signin%26viewId%3DpageViewId',
		);
	});
});
