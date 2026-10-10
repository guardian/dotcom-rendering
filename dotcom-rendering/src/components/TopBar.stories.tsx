import { css } from '@emotion/react';
import type { AccessToken, IDToken } from '@guardian/identity-auth';
import { breakpoints, from } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react-vite';
import type { PropsWithChildren } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
	contributionsHeaderResponse,
	contributionsSignInPromptHeaderResponse,
} from '../../fixtures/manual/contributionsHeader';
import type { CustomIdTokenClaims } from '../lib/identity';
import { customMockFetch } from '../lib/mockRESTCalls';
import { palette as themePalette } from '../palette';
import { TopBar } from './TopBar.island';
import { TopBarMyAccount } from './TopBarMyAccount';

const mockContributionsRequestFetch = (
	component: 'Header' | 'SignInPromptHeader',
) =>
	customMockFetch([
		{
			mockedMethod: 'GET',
			mockedUrl: /.*ophan\.theguardian\.com\/img\/.*/,
			mockedStatus: 200,
		},
		{
			mockedMethod: 'POST',
			mockedUrl:
				/.*contributions\.(code\.dev-)?guardianapis\.com\/header/,
			mockedStatus: 200,
			mockedBody:
				component === 'SignInPromptHeader'
					? contributionsSignInPromptHeaderResponse
					: contributionsHeaderResponse,
		},
	]);

const mockAccessToken: AccessToken = {
	expiresAt: 1618888077,
	scopes: ['openid', 'profile', 'email'],
	clockSkew: 0,
	accessToken: 'your-access-token',
	claims: {
		aud: 'your-audience',
		auth_time: 1618884477,
		cid: 'your-client-id',
		exp: 1618888077,
		iat: 1618884477,
		iss: 'your-issuer',
		jti: 'your-jti',
		scp: ['openid', 'profile', 'email'],
		sub: 'your-sub',
		uid: 'your-uid',
		ver: 1,
		email_validated: true,
		identity_username: 'username',
		legacy_identity_id: 'legacy-id',
		user_groups: ['group1', 'group2'], // Added line
	},
	tokenType: 'Bearer',
};

const mockIdToken: IDToken<CustomIdTokenClaims> = {
	idToken: 'your-id-token',
	issuer: 'your-issuer',
	clientId: 'your-client-id',
	nonce: 'your-nonce',
	clockSkew: 0,
	expiresAt: 1618888077,
	scopes: ['openid', 'profile', 'email'],
	claims: {
		aud: 'your-audience',
		auth_time: 1618884477,
		exp: 1618888077,
		iat: 1618884477,
		iss: 'your-issuer',
		sub: 'your-sub',
		identity_username: 'username',
		email_validated: true,
		email: 'user@example.com',
		braze_uuid: 'braze-uuid-value',
		user_groups: ['group1', 'group2'],
		legacy_identity_id: 'legacy-id',
		amr: ['pwd'],
		at_hash: 'at-hash-value',
		idp: 'your-idp',
		jti: 'your-jti',
		name: 'User Name',
		nonce: 'your-nonce',
		ver: 1,
	},
};

const accountStoryFrameStyles = css`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	box-sizing: border-box;
	height: 52px;
	background-color: ${themePalette('--masthead-top-bar-background')};

	${from.tablet} {
		height: 60px;
	}

	${from.desktop} {
		height: 64px;
	}
`;

const AccountStoryFrame = ({ children }: PropsWithChildren) => (
	<div css={accountStoryFrameStyles}>{children}</div>
);

const accountStoryParameters = {
	chromatic: {
		viewports: [breakpoints.mobile, breakpoints.desktop, breakpoints.wide],
	},
};

const meta = {
	component: TopBar,
	title: 'Components/Masthead/TopBar',
	render: (args) => {
		global.fetch = mockContributionsRequestFetch('Header');
		return <TopBar {...args} />;
	},
	args: {
		editionId: 'UK',
		idUrl: 'https://profile.theguardian.com',
		mmaUrl: 'https://manage.theguardian.com',
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		idApiUrl: 'https://idapi.theguardian.com',
		contributionsServiceUrl: 'https://contributions.guardianapis.com',
	},
} satisfies Meta<typeof TopBar>;
export default meta;

export const Default = {};

export const WithSignInPrompt = () => {
	global.fetch = mockContributionsRequestFetch('SignInPromptHeader');

	return (
		<TopBar
			editionId="UK"
			idUrl="https://profile.theguardian.com"
			mmaUrl="https://manage.theguardian.com"
			discussionApiUrl="https://discussion.theguardian.com/discussion-api"
			idApiUrl="https://idapi.theguardian.com"
			contributionsServiceUrl="https://contributions.guardianapis.com"
		/>
	);
};

/** We show a "Newsletters" link instead of "Search jobs" for AU edition */
export const OnAUEdition = {
	args: {
		editionId: 'AU',
	},
};

export const SignedInText = () => {
	return (
		<AccountStoryFrame>
			<TopBarMyAccount
				mmaUrl={''}
				idUrl={''}
				discussionApiUrl={''}
				idApiUrl={''}
				authStatus={{
					kind: 'SignedIn',
					accessToken: mockAccessToken as AccessToken<never>,
					idToken: mockIdToken,
				}}
				showSignInTextOnMobile={true}
			/>
		</AccountStoryFrame>
	);
};
SignedInText.parameters = accountStoryParameters;

export const SignedInNoText = () => {
	return (
		<AccountStoryFrame>
			<TopBarMyAccount
				mmaUrl={''}
				idUrl={''}
				discussionApiUrl={''}
				idApiUrl={''}
				authStatus={{
					kind: 'SignedIn',
					accessToken: mockAccessToken as AccessToken<never>,
					idToken: mockIdToken,
				}}
				showSignInTextOnMobile={false}
			/>
		</AccountStoryFrame>
	);
};
SignedInNoText.parameters = accountStoryParameters;

export const SignedInNoTextExpanded = () => <SignedInNoText />;
SignedInNoTextExpanded.parameters = accountStoryParameters;
SignedInNoTextExpanded.play = async ({
	canvasElement,
}: {
	canvasElement: HTMLElement;
}) => {
	const canvas = within(canvasElement);
	const button = await canvas.findByTestId('dropdown-button');

	await userEvent.click(button);
	await expect(button).toHaveAttribute('aria-expanded', 'true');

	const billingLink = await canvas.findByRole('link', { name: 'Billing' });
	await expect(billingLink).toBeVisible();

	const expectedDividerLeft =
		window.innerWidth < breakpoints.tablet ? '24px' : '30px';
	await expect(window.getComputedStyle(billingLink, '::before').left).toBe(
		expectedDividerLeft,
	);
};

export const SignedOutText = () => {
	return (
		<AccountStoryFrame>
			<TopBarMyAccount
				mmaUrl={''}
				idUrl={''}
				discussionApiUrl={''}
				idApiUrl={''}
				authStatus={{
					kind: 'SignedOut',
				}}
				showSignInTextOnMobile={true}
			/>
		</AccountStoryFrame>
	);
};
SignedOutText.parameters = accountStoryParameters;

export const SignedOutNoText = () => {
	return (
		<AccountStoryFrame>
			<TopBarMyAccount
				mmaUrl={''}
				idUrl={''}
				discussionApiUrl={''}
				idApiUrl={''}
				authStatus={{
					kind: 'SignedOut',
				}}
				showSignInTextOnMobile={false}
			/>
		</AccountStoryFrame>
	);
};
SignedOutNoText.parameters = accountStoryParameters;
