import React from 'react';
import { css, cx } from 'emotion';

import Dropdown, {
    Link as DropdownLink,
} from '@guardian/guui/components/Dropdown/Dropdown';
import ProfileIcon from '@guardian/pasteup/icons/profile.svg';
import SearchIcon from '@guardian/pasteup/icons/search.svg';
import { palette } from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/typography';
import {
    tablet,
    desktop,
    mobileLandscape,
    wide,
} from '@guardian/pasteup/breakpoints';

// import ReaderRevenueLinks from './ReaderRevenueLinks';

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

const seperatorLink = css`
    border-left: 1px solid ${palette.brand.pastel};
    float: left;
    height: 24px;
    margin: 0 -2px 0 10px;
`;

const link = ({ showAtTablet }: { showAtTablet: boolean }) => css`
    ${textSans(5)};
    color: ${palette.neutral[100]};
    float: left;
    position: relative;
    transition: color 80ms ease-out;
    text-decoration: none;
    display: none;
    z-index: 1072;

    :hover,
    :focus {
        color: ${palette.highlight.main};
    }

    ${tablet} {
        display: ${showAtTablet ? 'block' : 'none'};
    }

    ${desktop} {
        display: block;
    }

    svg {
        fill: currentColor;
        float: left;
        height: 18px;
        width: 18px;
        margin: 1px 4px 0 0;
    }
`;

const paddedLink = css`
    padding: 7px 7px;
`;

const Search: React.SFC<{
    href: string;
    children: React.ReactChild;
    className?: string;
}> = ({ className, children, href, ...props }) => (
    <a href={href} className={cx(search, className)} {...props}>
        {children}
    </a>
);

const links = css`
    position: absolute;
    left: 10px;
    top: 0;

    ${mobileLandscape} {
        left: 20px;
    }

    ${tablet} {
        left: auto;
        right: 205px;
    }

    ${desktop} {
        right: 266px;
    }

    ${wide} {
        right: 342px;
    }
`;

const profileSubdomain = 'https://profile.theguardian.com';
const jobsUrl = 'https://jobs.theguardian.com/?INTCMP=jobs_uk_web_newheader';
const datingUrl =
    'https://soulmates.theguardian.com/?INTCMP=soulmates_uk_web_newheader';
const signInUrl = `${profileSubdomain}/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in`;

const identityLinks: DropdownLink[] = [
    {
        url: `${profileSubdomain}/user/id/123`, // TODO use actual user ID once we have a user model
        title: 'Comments and replies',
    },
    {
        url: `${profileSubdomain}/public/edit`,
        title: 'Public profile',
    },
    {
        url: `${profileSubdomain}/account/edit`,
        title: 'Account details',
    },
    {
        url: `${profileSubdomain}/email-prefs`,
        title: 'Emails and marketing',
    },
    {
        url: `${profileSubdomain}/membership/edit`,
        title: 'Membership',
    },
    {
        url: `${profileSubdomain}/contribution/recurring/edit`,
        title: 'Contributions',
    },
    {
        url: `${profileSubdomain}/digitalpack/edit`,
        title: 'Digital pack',
    },
    {
        url: `${profileSubdomain}/signout`,
        title: 'Sign out',
    },
];

const Links: React.SFC<{
    isSignedIn: boolean;
}> = ({ isSignedIn }) => (
    <div className={links}>
        <div className={cx(link({ showAtTablet: false }), seperatorLink)} />
        <a
            href={jobsUrl}
            className={cx(link({ showAtTablet: false }), paddedLink)}
        >
            Search jobs
        </a>

        <a
            href={datingUrl}
            className={cx(link({ showAtTablet: false }), paddedLink)}
        >
            Dating
        </a>
        <div className={seperatorLink} />
        {isSignedIn ? (
            <div className={link}>
                <ProfileIcon />
                <Dropdown
                    label="My account"
                    links={identityLinks}
                    id="my-account"
                />
            </div>
        ) : (
            <a
                className={cx(link({ showAtTablet: true }), paddedLink)}
                href={signInUrl}
            >
                <ProfileIcon /> Sign in
            </a>
        )}

        <Search
            className={cx(link({ showAtTablet: false }), paddedLink)}
            href="https://www.google.co.uk/advanced_search?q=site:www.theguardian.com"
        >
            <SearchIcon /> Search
        </Search>
    </div>
);

export default Links;
