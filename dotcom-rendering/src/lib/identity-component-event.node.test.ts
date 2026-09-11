import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { createAuthenticationEventParams } from './identity-component-event';

void nodeDescribe('createAuthenticationEventParams', () => {
	void nodeIt(
		'creates authentication event params given a component Id',
		() => {
			assert.equal(
				createAuthenticationEventParams('amp_sidebar_signin'),
				'componentEventParams=componentType%3Didentityauthentication%26componentId%3Damp_sidebar_signin',
			);
		},
	);

	void nodeIt(
		'creates authentication event params given a component Id and a page view Id',
		() => {
			assert.equal(
				createAuthenticationEventParams(
					'amp_sidebar_signin',
					'pageViewId',
				),
				'componentEventParams=componentType%3Didentityauthentication%26componentId%3Damp_sidebar_signin%26viewId%3DpageViewId',
			);
		},
	);
});
