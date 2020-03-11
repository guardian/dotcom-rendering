import React from 'react';
import { css, cx } from 'emotion';

import SearchIcon from '@frontend/static/icons/search.svg';

import { palette } from '@guardian/src-foundations';
import { brandText, brandAlt } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

import { DropdownLinkType, Dropdown } from '@root/src/web/components/Dropdown';
import ProfileIcon from '@frontend/static/icons/profile.svg';

type Props = {
    isSignedIn?: boolean;
};

const search = css`
    :after {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        transform: translateY(-2px) rotate(45deg);
        border-width: 1px;
        border-style: solid;
        border-color: currentColor;
        border-left: none;
        border-top: none;
        margin-left: 5px;
        vertical-align: middle;
        backface-visibility: hidden;
        transition: transform 250ms ease-out;
    }
    :hover:after {
        transform: translateY(0) rotate(45deg);
    }
`;

const linkStyles = css`
    ${textSans.medium()};
    color: ${brandText.primary};
    float: left;
    position: relative;
    transition: color 80ms ease-out;
    text-decoration: none;
    padding: 7px 0;

    ${from.tablet} {
        padding: 5px 7px;
    }

    :hover,
    :focus {
        color: ${brandAlt[400]};
    }

    svg {
        fill: currentColor;
        float: left;
        height: 18px;
        width: 18px;
        margin: 3px 4px 0 0;
    }
`;

const linkTablet = ({ showAtTablet }: { showAtTablet: boolean }) => css`
    display: none;

    ${from.tablet} {
        display: ${showAtTablet ? 'block' : 'none'};
    }

    ${from.desktop} {
        display: block;
    }
`;

const seperatorStyles = css`
    border-left: 1px solid ${palette.brand.pastel};
    float: left;
    height: 24px;
    margin: 0 -2px 0 10px;
    display: none;

    ${from.desktop} {
        display: block;
    }
`;

const seperatorHideStyles = css`
    border-left: 1px solid ${palette.brand.pastel};
    float: left;
    height: 24px;
    margin: 0 -2px 0 10px;
    display: none;

    ${from.tablet} {
        display: block;
    }
`;

const Search = ({
    className,
    children,
    href,
    dataLinkName,
}: {
    href: string;
    className?: string;
    dataLinkName: string;
    children: JSXElements;
}) => (
    <a
        href={href}
        className={cx(search, className)}
        data-link-name={dataLinkName}
    >
        {children}
    </a>
);

const linksStyles = css`
    position: absolute;
    left: 10px;
    top: 0;

    ${from.mobileLandscape} {
        left: 20px;
    }

    ${from.tablet} {
        left: auto;
        right: 205px;
    }

    ${from.desktop} {
        right: 266px;
    }

    ${from.wide} {
        right: 342px;
    }
`;

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

export const Links = ({ isSignedIn }: Props) => (
    <div id="links-root" className={linksStyles}>
        <div className={seperatorStyles} />
        <a
            href="https://jobs.theguardian.com/?INTCMP=jobs_uk_web_newheader"
            className={cx(linkTablet({ showAtTablet: false }), linkStyles)}
            data-link-name="nav2 : job-cta"
        >
            Search jobs
        </a>

        <a
            href="https://soulmates.theguardian.com/?INTCMP=soulmates_uk_web_newheader"
            className={cx(linkTablet({ showAtTablet: false }), linkStyles)}
            data-link-name="nav2 : soulmates-cta"
        >
            Dating
        </a>
        <div className={seperatorHideStyles} />

        {isSignedIn ? (
            <div className={linkStyles}>
                <ProfileIcon />
                <Dropdown
                    label="My account"
                    links={identityLinks}
                    id="my-account"
                    dataLinkName="nav2 : topbar: my account"
                />
            </div>
        ) : (
            <a
                className={linkStyles}
                href="https://profile.theguardian.com/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in"
                data-link-name="nav2 : topbar : signin"
            >
                <ProfileIcon /> Sign in
            </a>
        )}

        <Search
            className={cx(linkTablet({ showAtTablet: false }), linkStyles)}
            href="https://www.google.co.uk/advanced_search?q=site:www.theguardian.com"
            dataLinkName="nav2 : search"
        >
            <SearchIcon />
            <>Search</>
        </Search>
    </div>
);
