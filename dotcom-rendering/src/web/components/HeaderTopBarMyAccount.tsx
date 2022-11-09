import { css } from '@emotion/react';
import { getCookie, joinUrl } from '@guardian/libs';
import { brand, from, neutral, textSans } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { createAuthenticationEventParams } from '../../lib/identity-component-event';
import ProfileIcon from '../../static/icons/profile.svg';
import { getZIndex } from '../lib/getZIndex';
import {
	addNotificationsToDropdownLinks,
	mapBrazeCardsToNotifications,
} from '../lib/notification';
import type { Notification } from '../lib/notification';
import { useApi } from '../lib/useApi';
import { useBraze } from '../lib/useBraze';
import type { DropdownLinkType } from './Dropdown';
import { Dropdown } from './Dropdown';

interface MyAccountProps {
	mmaUrl: string;
	idUrl: string;
	discussionApiUrl: string;
	idApiUrl: string;
}

const myAccountStyles = css`
	display: flex;
	${from.desktop} {
		:before {
			content: '';
			border-left: 1px solid ${brand[600]};
			height: 24px;
		}
	}
`;

const myAccountLinkStyles = css`
	display: flex;
	align-items: flex-start;
	height: fit-content;
	position: relative;
	${textSans.medium({ fontWeight: 'bold' })};
	color: ${neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 7px 10px 0 5px;
	}

	:hover,
	:focus {
		text-decoration: underline;
	}

	svg {
		fill: currentColor;
		float: left;
		height: 18px;
		width: 18px;
		margin: 3px 4px 0 0;
	}
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
			dataLinkName: 'nav2 : topbar : account overview',
		},
		{
			id: 'edit_profile',
			url: `${mmaUrl}/public-settings`,
			title: 'Profile',
			dataLinkName: 'nav2 : topbar : edit profile',
		},
		{
			id: 'email_prefs',
			url: `${mmaUrl}/email-prefs`,
			title: 'Emails & marketing',
			dataLinkName: 'nav2 : topbar : email prefs',
		},
		{
			id: 'settings',
			url: `${mmaUrl}/account-settings`,
			title: 'Settings',
			dataLinkName: 'nav2 : topbar : settings',
		},
		{
			id: 'help',
			url: `${mmaUrl}/help`,
			title: 'Help',
			dataLinkName: 'nav2 : topbar : help',
		},
		{
			id: 'comment_activity',
			url: `${idUrl}/user/id/${userId}`,
			title: 'Comments & replies',
			dataLinkName: 'nav2 : topbar : comment activity',
		},
		{
			id: 'sign_out',
			url: `${idUrl}/signout`,
			title: 'Sign out',
			dataLinkName: 'nav2 : topbar : sign out',
		},
	];

	return links;
};

const SignIn = ({ idUrl }: { idUrl: string }) => (
	<a
		css={myAccountLinkStyles}
		href={`${idUrl}/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in&${createAuthenticationEventParams(
			'guardian_signin_header',
		)}`}
		data-link-name="nav2 : topbar : signin"
	>
		<ProfileIcon /> Sign in
	</a>
);

export const dropDownOverrides = css`
	color: ${neutral[100]};
	padding-right: 0;

	font-weight: bold;

	&:hover {
		color: inherit;
	}

	${from.tablet} {
		right: 0;
	}
`;

interface SignedInWithNotificationsProps {
	mmaUrl: string;
	idUrl: string;
	discussionApiUrl: string;
	notifications: Notification[];
}

const SignedInWithNotifications = ({
	mmaUrl,
	idUrl,
	discussionApiUrl,
	notifications,
}: SignedInWithNotificationsProps) => {
	const { data, error } = useApi<{ userProfile: UserProfile }>(
		joinUrl(discussionApiUrl, 'profile/me?strict_sanctions_check=false'),
		{},
		{
			credentials: 'include',
		},
	);

	// If we encounter an error or don't have user data display sign in to the user.
	// SWR will retry in the background if the request failed
	if (error || !data?.userProfile.userId) return <SignIn idUrl={idUrl} />;

	const identityLinks = buildIdentityLinks(
		mmaUrl,
		idUrl,
		data.userProfile.userId,
	);

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
				dataLinkName="nav2 : topbar: my account"
				cssOverrides={dropDownOverrides}
			/>
		</div>
	);
};

const SignedIn = ({ idApiUrl, ...props }: MyAccountProps) => {
	const { brazeCards } = useBraze(idApiUrl);
	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		if (brazeCards) {
			const cards = brazeCards.getCardsForProfileBadge();
			setNotifications(mapBrazeCardsToNotifications(cards));
		}
	}, [brazeCards]);

	return (
		<SignedInWithNotifications {...props} notifications={notifications} />
	);
};

export const MyAccount = ({
	mmaUrl,
	idUrl,
	discussionApiUrl,
	idApiUrl,
}: MyAccountProps) => {
	const isServer = typeof window === 'undefined';
	const isSignedIn =
		!isServer && !!getCookie({ name: 'GU_U', shouldMemoize: true });

	return (
		<div css={myAccountStyles}>
			{isSignedIn ? (
				<SignedIn
					mmaUrl={mmaUrl}
					idUrl={idUrl}
					discussionApiUrl={discussionApiUrl}
					idApiUrl={idApiUrl}
				/>
			) : (
				<SignIn idUrl={idUrl} />
			)}
		</div>
	);
};
