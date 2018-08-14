// @flow

import { css } from 'react-emotion';
import { connect } from 'unistore/react';

import Dropdown from '@guardian/guui/components/Dropdown';
import type { Link as DropdownLink } from '@guardian/guui/components/Dropdown';

import palette from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/fonts';

import { tablet, desktop } from '@guardian/pasteup/breakpoints';

import SupportTheGuardian from './SupportTheGuardian';

const profileSubdomain = 'https://profile.theguardian.com';
const subscribeUrl =
    'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_HEADER%22%2C%22componentId%22%3A%22header_support_subscribe%22%2C%22referrerPageviewId%22%3A%22jkjutjbkxfh1d8yyadfc%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fwww.theguardian.com%2Fuk%22%7D';
const jobsUrl = 'https://jobs.theguardian.com/?INTCMP=jobs_uk_web_newheader';
const signInUrl = `${profileSubdomain}/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in`;

const identityLinks: Array<DropdownLink> = [
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

const linkPosition = showAtTablet => css`
    display: none;
    float: left;
    position: relative;
    display: none;

    ${tablet} {
        display: ${showAtTablet ? 'block' : 'none'};
    }

    ${desktop} {
        display: block;
    }
`;

const linkStyle = css`
    font-size: 14px;
    font-family: ${textSans};
    color: ${palette.neutral['1']};
    line-height: 1.2;
    transition: color 80ms ease-out;
    padding: 6px 10px;
    margin: 1px 0 0;
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }

    :focus {
        text-decoration: underline;
    }
`;

const link = showAtTablet => css`
    ${linkStyle};
    ${linkPosition(showAtTablet)};
`;

const linksPositioning = css`
    left: 0;
    top: 0;
    position: absolute;
`;

export default connect('header')(
    ({ isPayingMember, isRecentContributor, isSignedIn }) => (
        <div className={linksPositioning}>
            {isPayingMember ||
                isRecentContributor || (
                    <SupportTheGuardian href="/">
                        Support The Guardian
                    </SupportTheGuardian>
                )}

            <a className={link(true)} href={subscribeUrl} showAtTablet>
                Subscribe
            </a>
            <a className={link(true)} href={jobsUrl}>
                Find a job
            </a>

            {isSignedIn ? (
                <div className={linkPosition(false)}>
                    <Dropdown
                        label="My account"
                        links={identityLinks}
                        id="my-account"
                    />
                </div>
            ) : (
                <a className={link(false)} href={signInUrl}>
                    Sign in / Register
                </a>
            )}

            <a className={link(false)} href="/">
                Search
            </a>
        </div>
    ),
);
