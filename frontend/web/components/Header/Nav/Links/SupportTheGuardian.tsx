import React from 'react';
import { css } from 'react-emotion';

import { serif } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import {
    mobileLandscape,
    tablet,
    mobileMedium,
} from '@guardian/pasteup/breakpoints';
import ProfileIcon from '@guardian/pasteup/icons/profile.svg';
import { screenReaderOnly } from '@guardian/pasteup/mixins';

import { getCookie } from '../../../../lib/cookie';
import { AsyncClientComponent } from '../../../lib/AsyncClientComponent';

const style = css`
    position: relative;
    display: block;
    float: left;
    margin-left: -20px;
    text-decoration: none;

    ${mobileLandscape} {
        margin-left: -10px;
    }

    :before {
        background-color: ${palette.neutral[7]};
        border-radius: 50%;
        bottom: -12px;
        left: 0;
        right: 0;
        padding-top: 100%;
        content: '';
        display: block;
        position: absolute;
        transition-timing-function: ease-out;
        transition-duration: 250ms;
        transition-property: background-color, transform;
    }

    :hover:before {
        background-color: ${palette.news.main};
        transform: scale(1.05);
    }
`;

const text = css`
    color: ${palette.neutral[97]};
    font-family: ${serif.headline};
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    line-height: 1.2;
    padding: 6px 20px 3px;
    position: relative;

    ${tablet} {
        font-size: 14px;
    }
`;

const mobileSignInContainer = css`
    display: block;
    padding: 10px;
    margin-left: -8px;
    float: left;

    ${mobileMedium} {
        padding-top: 12px;
    }

    ${tablet} {
        display: none;
    }
`;

const mobileSignInIcon = css`
    height: 18px;
    width: 18px;

    ${mobileMedium} {
        height: 23px;
        width: 23px;
    }

    fill: ${palette.neutral[46]};
`;

const SupportTheGuardian: React.SFC<{
    url: string;
}> = ({ url }) => (
    <AsyncClientComponent f={shouldShow}>
        {({ data }) => (
            <>
                {data && (
                    <>
                        <a className={style} href={url}>
                            <div className={text}>
                                Support The
                                <br /> Guardian
                            </div>
                        </a>
                        <div className={mobileSignInContainer}>
                            <a href="https://profile.theguardian.com/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN">
                                <ProfileIcon className={mobileSignInIcon} />
                                <span
                                    className={css`
                                        ${screenReaderOnly};
                                    `}
                                >
                                    Sign in
                                </span>
                            </a>
                        </div>
                    </>
                )}
            </>
        )}
    </AsyncClientComponent>
);

const shouldShow: () => Promise<boolean> = () =>
    Promise.resolve(!(isRecentContributor() || isPayingMember()));

const isRecentContributor: () => boolean = () => {
    const value = getCookie('gu.contributions.contrib-timestamp');

    if (!value) {
        return false;
    }

    const now = new Date().getTime();
    const lastContribution = new Date(value).getTime();
    const diffDays = Math.ceil((now - lastContribution) / (1000 * 3600 * 24));

    return diffDays <= 180;
};

const isPayingMember: () => boolean = () => {
    return getCookie('gu_paying_member') === 'true';
};

export default SupportTheGuardian;
