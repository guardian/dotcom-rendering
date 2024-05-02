/**
 * @file
 * This was largely copied from https://github.com/guardian/dotcom-rendering/blob/68224f48e7b5f3a465884e3f53607a2227eb9494/dotcom-rendering/src/components/HeaderTopBarMyAccount.tsx
 * For more Git history, please refer to the original file
 */
import { css } from '@emotion/react';
import { joinUrl } from '@guardian/libs';
import { from, palette } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import type { UserProfile } from '../lib/discussion';
import { getZIndex } from '../lib/getZIndex';
import type {
	AuthStatus,
	SignedInWithCookies,
	SignedInWithOkta,
} from '../lib/identity';
import { createAuthenticationEventParams } from '../lib/identity-component-event';
import {
	addNotificationsToDropdownLinks,
	mapBrazeCardsToNotifications,
} from '../lib/notification';
import type { Notification } from '../lib/notification';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { useApi } from '../lib/useApi';
import { useBraze } from '../lib/useBraze';
import ProfileIcon from '../static/icons/profile.svg';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';
import type { DropdownLinkType } from './Dropdown';
import { Dropdown } from './Dropdown';
import { TopBarLink, topBarLinkStyles } from './TopBarLink';

interface MyAccountProps {
	mmaUrl: string;
	idUrl: string;
	discussionApiUrl: string;
	idApiUrl: string;
	authStatus: AuthStatus;
}

// when SignedIn, authStatus can only be one of the two SignedIn states
type SignedInProps = MyAccountProps & {
	authStatus: SignedInWithCookies | SignedInWithOkta;
	renderingTarget: RenderingTarget;
};

const myAccountLinkStyles = css`
	${topBarLinkStyles}
	${getZIndex('myAccountDropdown')}
`;

export const buildIdentityLinks = (
	mmaUrl: string,
	idUrl: string,
	userId: string,
): DropdownLinkType[] => {
	/**
	 * Note: the IDs in here are used by Braze to target notifications so should
	 * be unique. Please check with Marketing Tools/TX before changing!
	 */
	const links = [
		{
			id: 'account_overview',
			url: `${mmaUrl}/`,
			title: 'Account overview',
		},
		{
			id: 'billing',
			url: `${mmaUrl}/billing`,
			title: 'Billing',
		},
		{
			id: 'edit_profile',
			url: `${mmaUrl}/public-settings`,
			title: 'Profile',
		},
		{
			id: 'email_prefs',
			url: `${mmaUrl}/email-prefs`,
			title: 'Emails & marketing',
		},
		{
			id: 'data_privacy',
			url: `${mmaUrl}/data-privacy`,
			title: 'Data privacy',
		},
		{
			id: 'settings',
			url: `${mmaUrl}/account-settings`,
			title: 'Settings',
		},
		{
			id: 'help',
			url: `${mmaUrl}/help`,
			title: 'Help',
		},
		{
			id: 'comment_activity',
			url: `${idUrl}/user/id/${userId}`,
			title: 'Comments & replies',
		},
		{
			id: 'sign_out',
			url: `${idUrl}/signout`,
			title: 'Sign out',
		},
	] as const;

	return links.map((link) => ({
		...link,
		dataLinkName: nestedOphanComponents(
			'nav3',
			'topbar',
			link.id.replaceAll('_', ' '),
		),
	}));
};

const SignIn = ({ idUrl }: { idUrl: string }) => (
	<TopBarLink
		href={`${idUrl}/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in&${createAuthenticationEventParams(
			'guardian_signin_header',
		)}`}
		dataLinkName={nestedOphanComponents('nav3', 'topbar', 'signin')}
	>
		<ProfileIcon /> Sign in
	</TopBarLink>
);

export const dropDownOverrides = css`
	color: ${palette.neutral[100]};
	padding-right: 0;
	padding-bottom: 0;
	margin-top: 0;

	font-size: 1rem;

	&:not(ul):hover {
		color: ${palette.neutral[100]};
		text-decoration: underline;
	}

	${from.tablet} {
		right: 0;
	}

	${from.desktop} {
		font-weight: bold;
	}
`;

interface SignedInWithNotificationsProps {
	mmaUrl: string;
	idUrl: string;
	discussionApiUrl: string;
	notifications: Notification[];
	authStatus: SignedInWithCookies | SignedInWithOkta;
}

const SignedInWithNotifications = ({
	mmaUrl,
	idUrl,
	discussionApiUrl,
	notifications,
	authStatus,
}: SignedInWithNotificationsProps) => {
	let userId: string | undefined;

	// TODO Okta: Remove the useApi and status === 'NotInTest' when at 100% in Okta oktaVariant
	// If we encounter an error or don't have user data display sign in to the user.
	// SWR will retry in the background if the request failed
	const { data, error } = useApi<{ userProfile: UserProfile }>(
		authStatus.kind === 'SignedInWithCookies'
			? joinUrl(
					discussionApiUrl,
					'profile/me?strict_sanctions_check=false',
			  )
			: undefined,

		{},
		{
			credentials: 'include',
		},
	);
	if (authStatus.kind === 'SignedInWithCookies' && data) {
		userId = data.userProfile.userId;
	}

	if (authStatus.kind === 'SignedInWithOkta') {
		userId = authStatus.idToken.claims.legacy_identity_id;
	}

	if (!userId || error) return <SignIn idUrl={idUrl} />;

	const identityLinks = buildIdentityLinks(mmaUrl, idUrl, userId);

	const identityLinksWithNotifications = addNotificationsToDropdownLinks(
		identityLinks,
		notifications,
	);

	return (
		<div css={myAccountLinkStyles}>
			<ProfileIcon />
			<Dropdown
				label="My account"
				links={identityLinksWithNotifications}
				id="my-account"
				dataLinkName={nestedOphanComponents(
					'nav3',
					'topbar',
					'my account',
				)}
				cssOverrides={dropDownOverrides}
			/>
		</div>
	);
};

const SignedIn = ({
	idApiUrl,
	authStatus,
	renderingTarget,
	...props
}: SignedInProps) => {
	const { brazeCards } = useBraze(idApiUrl, renderingTarget);
	const [brazeNotifications, setBrazeNotifications] = useState<
		Notification[]
	>([]);

	useEffect(() => {
		if (brazeCards) {
			const cards = brazeCards.getCardsForProfileBadge();
			const cardsToNotifications = mapBrazeCardsToNotifications(cards);
			if (cardsToNotifications.length) {
				setBrazeNotifications(cardsToNotifications);
			}
		}
	}, [brazeCards]);

	return (
		<SignedInWithNotifications
			{...props}
			notifications={brazeNotifications}
			authStatus={authStatus}
		/>
	);
};

export const TopBarMyAccount = ({
	mmaUrl,
	idUrl,
	discussionApiUrl,
	idApiUrl,
	authStatus,
}: MyAccountProps) => {
	const { renderingTarget } = useConfig();

	return (
		<>
			{authStatus.kind === 'SignedInWithOkta' ||
			authStatus.kind === 'SignedInWithCookies' ? (
				<SignedIn
					mmaUrl={mmaUrl}
					idUrl={idUrl}
					discussionApiUrl={discussionApiUrl}
					idApiUrl={idApiUrl}
					authStatus={authStatus}
					renderingTarget={renderingTarget}
				/>
			) : (
				<SignIn idUrl={idUrl} />
			)}
		</>
	);
};
