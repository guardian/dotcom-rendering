import type { AccessToken, IDToken } from '@guardian/identity-auth';
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { CustomIdTokenClaims, SignedIn } from '../lib/identity';
import { ConfigProvider } from './ConfigContext';
import { TopBarMyAccount } from './TopBarMyAccount';

jest.mock('../lib/useBraze', () => ({
	useBraze: () => ({
		brazeCards: undefined,
	}),
}));

const renderWithConfig = (component: ReactElement) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			{component}
		</ConfigProvider>,
	);

const signedInAuthStatus: SignedIn = {
	kind: 'SignedIn',
	accessToken: {
		accessToken: 'access-token',
	} as AccessToken<never>,
	idToken: {
		claims: {
			legacy_identity_id: 'user-id',
		},
	} as IDToken<CustomIdTokenClaims>,
};

describe('TopBarMyAccount', () => {
	it('renders a signed-out control with an accessible sign-in name', () => {
		const { getByRole } = renderWithConfig(
			<TopBarMyAccount
				mmaUrl="https://manage.example.com"
				idUrl="https://profile.example.com"
				discussionApiUrl="https://discussion.example.com"
				idApiUrl="https://id.example.com"
				authStatus={{ kind: 'SignedOut' }}
				showSignInTextOnMobile={false}
			/>,
		);

		const signInLink = getByRole('link', { name: 'Sign in' });

		expect(signInLink).toHaveAttribute('aria-label', 'Sign in');
	});

	it('opens the signed-in dropdown and preserves its analytics name', () => {
		const { getByRole } = renderWithConfig(
			<TopBarMyAccount
				mmaUrl="https://manage.example.com"
				idUrl="https://profile.example.com"
				discussionApiUrl="https://discussion.example.com"
				idApiUrl="https://id.example.com"
				authStatus={signedInAuthStatus}
				showSignInTextOnMobile={false}
			/>,
		);

		const accountButton = getByRole('button', { name: 'My account' });

		expect(accountButton).toHaveAttribute('aria-label', 'My account');
		expect(accountButton).toHaveAttribute('aria-expanded', 'false');
		expect(accountButton).toHaveAttribute(
			'data-link-name',
			'header : topbar : my account',
		);

		fireEvent.click(accountButton);

		expect(accountButton).toHaveAttribute('aria-expanded', 'true');
		expect(getByRole('link', { name: 'Billing' })).toBeVisible();
	});
});
