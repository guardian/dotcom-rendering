/**
 * @file
 * This was largely copied from https://github.com/guardian/dotcom-rendering/blob/68224f48e7b5f3a465884e3f53607a2227eb9494/dotcom-rendering/src/components/HeaderTopBarMyAccount.tsx
 * For more Git history, please refer to the original file
 */
import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import type { SignedIn } from '../lib/identity';
import { createAuthenticationEventParams } from '../lib/identity-component-event';
import {
	addNotificationsToDropdownLinks,
	mapBrazeCardsToNotifications,
} from '../lib/notification';
import type { Notification } from '../lib/notification';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { AuthStatusOrPending } from '../lib/useAuthStatus';
import { useBraze } from '../lib/useBraze';
import { palette as themePalette } from '../palette';
import ProfileIcon from '../static/icons/profile.svg';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';
import type { DropdownLinkType } from './Dropdown.importable';
import { Dropdown } from './Dropdown.importable';

interface MyAccountProps {
	mmaUrl: string;
	idUrl: string;
	discussionApiUrl: string;
	idApiUrl: string;
	authStatus: AuthStatusOrPending;
}

// when SignedIn, authStatus can only be one of the two SignedIn states
type SignedInBrazeProps = MyAccountProps & {
	authStatus: SignedIn;
	renderingTarget: RenderingTarget;
};

const myAccountLinkStyles = css`
	display: flex;
	/** Required to absolutely position the dropdown menu */
	position: relative;
	align-items: center;
	${textSansBold17};

	color: ${themePalette('--masthead-top-bar-link-text')};
	transition: color 80ms ease-out;
	text-decoration: none;

	padding: ${space[1]}px 0 ${space[1]}px ${space[1]}px;

	:hover,
	:focus {
		text-decoration: underline;
	}

	svg {
		fill: currentColor;
		float: left;
		height: 18px;
		width: 18px;
		margin: 0 ${space[1]}px 0 0;
	}

	z-index: ${getZIndex('mastheadMyAccountDropdown')};
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
			'header',
			'topbar',
			link.id.replaceAll('_', ' '),
		),
	}));
};

const SignIn = ({ idUrl }: { idUrl: string }) => (
	<a
		css={myAccountLinkStyles}
		href={`${idUrl}/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in&${createAuthenticationEventParams(
			'guardian_signin_header',
		)}`}
		data-link-name={nestedOphanComponents('header', 'topbar', 'signin')}
		data-testid="topbar-signin"
	>
		<ProfileIcon /> Sign in
	</a>
);

export const dropDownOverrides = css`
	color: ${themePalette('--masthead-top-bar-link-text')};
	padding-right: 0;
	padding-bottom: 0;
	margin-top: 0;

	font-weight: bold;

	&:not(ul):hover {
		color: ${themePalette('--masthead-top-bar-link-text')};
		text-decoration: underline;
	}

	/** Handles case of *new* top bar being 52px high until tablet */
	&:not(button) {
		${until.tablet} {
			top: 44px;
		}

		${from.tablet} {
			right: 0;
			top: 52px;
		}

		${from.desktop} {
			top: 56px;
		}
	}
`;

interface SignedInWithNotificationsProps {
	mmaUrl: string;
	idUrl: string;
	notifications: Notification[];
	authStatus: SignedIn;
}

const SignedInWithNotifications = ({
	mmaUrl,
	idUrl,
	notifications,
	authStatus,
}: SignedInWithNotificationsProps) => {
	const userId = authStatus.idToken.claims.legacy_identity_id;

	if (!userId) return <SignIn idUrl={idUrl} />;

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
				id="topbar-my-account"
				dataLinkName={nestedOphanComponents(
					'header',
					'topbar',
					'my account',
				)}
				cssOverrides={dropDownOverrides}
			/>
		</div>
	);
};

const SignedInBraze = ({
	idApiUrl,
	authStatus,
	renderingTarget,
	...props
}: SignedInBrazeProps) => {
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
			{authStatus.kind === 'SignedIn' ? (
				<SignedInBraze
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
