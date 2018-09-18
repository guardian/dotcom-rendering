import React from 'react';
import { css, cx } from 'react-emotion';

import Dropdown, {
    Link as DropdownLink,
} from '@guardian/guui/components/Dropdown';
import { palette } from '@guardian/pasteup/palette';
import { sans } from '@guardian/pasteup/fonts';
import { tablet, desktop } from '@guardian/pasteup/breakpoints';

import SupportTheGuardian from './SupportTheGuardian';

const search = css`
    :after {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        transform: translateY(-2px) rotate(45deg);
        border-width: 1px;
        border-style: solid;
        border-color: currentColor;
        border-left: none;
        border-top: none;
        margin-left: 4px;
        vertical-align: middle;
        backface-visibility: hidden;
        transition: transform 250ms ease-out;
    }
    :hover:after {
        transform: translateY(0) rotate(45deg);
    }
`;

const link = ({ showAtTablet }: { showAtTablet: boolean }) => css`
    font-size: 14px;
    font-family: ${sans.body};
    color: ${palette.neutral[7]};
    float: left;
    line-height: 1.2;
    position: relative;
    transition: color 80ms ease-out;
    padding: 6px 10px;
    margin: 1px 0 0;
    text-decoration: none;
    display: none;

    :hover {
        text-decoration: underline;
    }

    :focus {
        text-decoration: underline;
    }

    ${tablet} {
        display: ${showAtTablet ? 'block' : 'none'};
    }

    ${desktop} {
        display: block;
    }
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
    left: 0;
    top: 0;
    position: absolute;
`;

const profileSubdomain = 'https://profile.theguardian.com';
const subscribeUrl =
    'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_HEADER%22%2C%22componentId%22%3A%22header_support_subscribe%22%2C%22referrerPageviewId%22%3A%22jkjutjbkxfh1d8yyadfc%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fwww.theguardian.com%2Fuk%22%7D';
const jobsUrl = 'https://jobs.theguardian.com/?INTCMP=jobs_uk_web_newheader';
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
    isPayingMember: boolean;
    isRecentContributor: boolean;
    isSignedIn: boolean;
}> = ({ isPayingMember, isRecentContributor, isSignedIn }) => (
    <div className={links}>
        {isPayingMember ||
            isRecentContributor || (
                <SupportTheGuardian href="/">
                    Support The Guardian
                </SupportTheGuardian>
            )}

        <a href={subscribeUrl} className={link({ showAtTablet: true })}>
            Subscribe
        </a>

        <a href={jobsUrl} className={link({ showAtTablet: true })}>
            Find a job
        </a>

        {isSignedIn ? (
            <div className={link({ showAtTablet: false })}>
                <Dropdown
                    label="My account"
                    links={identityLinks}
                    id="my-account"
                />
            </div>
        ) : (
            <a className={link({ showAtTablet: false })} href={signInUrl}>
                Sign in / Register
            </a>
        )}

        <Search className={link({ showAtTablet: false })} href="/">
            Search
        </Search>
    </div>
);

export default Links;
