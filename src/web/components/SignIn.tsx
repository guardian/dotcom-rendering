import React from 'react';

import { DropdownLinkType, Dropdown } from '@root/src/web/components/Dropdown';
import ProfileIcon from '@frontend/static/icons/profile.svg';

type Props = {
    linkStyles: string;
};

const signInUrl = `https://profile.theguardian.com/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in`;
const identityLinks: DropdownLinkType[] = [
    {
        url: `https://profile.theguardian.com/user/id/123`, // TODO use actual user ID once we have a user model
        title: 'Comments and replies',
        dataLinkName: 'nav2 : topbar : comment activity',
    },
    {
        url: `https://profile.theguardian.com/public/edit`,
        title: 'Public profile',
        dataLinkName: 'nav2 : topbar : edit profile',
    },
    {
        url: `https://profile.theguardian.com/account/edit`,
        title: 'Account details',
        dataLinkName: 'nav2 : topbar : account details',
    },
    {
        url: `https://profile.theguardian.com/email-prefs`,
        title: 'Emails and marketing',
        dataLinkName: 'nav2 : topbar : email prefs',
    },
    {
        url: `https://profile.theguardian.com/membership/edit`,
        title: 'Membership',
        dataLinkName: 'nav2 : topbar : membership',
    },
    {
        url: `https://profile.theguardian.com/contribution/recurring/edit`,
        title: 'Contributions',
        dataLinkName: 'nav2 : topbar : contributions',
    },
    {
        url: `https://profile.theguardian.com/digitalpack/edit`,
        title: 'Digital pack',
        dataLinkName: 'nav2 : topbar : subscriptions',
    },
    {
        url: `https://profile.theguardian.com/signout`,
        title: 'Sign out',
        dataLinkName: 'nav2 : topbar : sign out',
    },
];

export const SignIn = ({ linkStyles }: Props) => {
    const isSignedIn = false;

    if (isSignedIn) {
        return (
            <div className={linkStyles}>
                <ProfileIcon />
                <Dropdown
                    label="My account"
                    links={identityLinks}
                    id="my-account"
                    dataLinkName="nav2 : topbar: my account"
                />
            </div>
        );
    }

    return (
        <a
            className={linkStyles}
            href={signInUrl}
            data-link-name="nav2 : topbar : signin"
        >
            <ProfileIcon /> Sign in
        </a>
    );
};
