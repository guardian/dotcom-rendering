import type { Decorator } from '@storybook/react-webpack5';
import { customMockFetch } from '../../src/lib/mockRESTCalls';

// Extend window type for auth state mock
declare global {
	interface Window {
		__STORYBOOK_AUTH_STATE__?: 'SignedIn' | 'SignedOut' | 'Pending';
	}
}

/**
 * Decorator for pending auth state.
 */
export const pendingAuthDecorator: Decorator = (Story) => {
	window.__STORYBOOK_AUTH_STATE__ = 'Pending';
	return <Story />;
};

/**
 * Decorator for signed-out user state.
 * Sets the auth state to 'SignedOut' so useAuthStatus returns { kind: 'SignedOut' }.
 */
export const signedOutDecorator: Decorator = (Story) => {
	window.__STORYBOOK_AUTH_STATE__ = 'SignedOut';
	return <Story />;
};

/**
 * Creates a decorator for signed-in user state with custom newsletter subscriptions.
 * Sets the auth state to 'SignedIn' and mocks the newsletters API response.
 *
 * @param subscriptions - Array of newsletter subscriptions to return from the API.
 *                        Each subscription should have a `listId` string.
 * @returns A Storybook decorator
 *
 * @example
 * // User signed in but not subscribed to any newsletters
 * decorators: [signedInDecorator([])]
 *
 * @example
 * // User signed in and subscribed to newsletter with listId 4147
 * decorators: [signedInDecorator([{ listId: '4147' }])]
 */
export const signedInDecorator = (
	subscriptions: Array<{ listId: string }> = [],
): Decorator => {
	return (Story) => {
		window.__STORYBOOK_AUTH_STATE__ = 'SignedIn';
		window.fetch = customMockFetch([
			{
				mockedMethod: 'GET',
				mockedUrl: /.*idapi\.theguardian\.com\/users\/me\/newsletters/,
				mockedStatus: 200,
				mockedBody: {
					result: {
						subscriptions,
					},
				},
			},
		]) as typeof window.fetch;
		return <Story />;
	};
};
