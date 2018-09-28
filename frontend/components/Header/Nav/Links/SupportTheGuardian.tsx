import React from 'react';
import { cx, css } from 'react-emotion';

import { serif } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import { getCookie } from '../../../../lib/cookie';
import { AsyncClientComponent } from '../../../lib/AsyncClientComponent';

const style = css`
    color: ${palette.neutral[97]};
    font-family: ${serif.headline};
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    width: 135px;
    display: block;
    text-align: center;
    padding-top: 6px;
    z-index: 0;
    float: left;
    :before {
        background-color: ${palette.neutral[7]};
        border-radius: 50%;
        top: -85px;
        left: 0;
        right: 0;
        padding-top: 100%;
        content: '';
        display: block;
        position: absolute;
        transition: all 250ms ease-out;
        z-index: -1;
    }
    :hover:before {
        background-color: ${palette.news.main};
        transform: scale(1.05);
    }
`;

const SupportTheGuardian: React.SFC<{
    className?: string;
    children: React.ReactChild;
    href: string;
}> = ({ className, children, href, ...props }) => (
    <AsyncClientComponent f={shouldShow}>
        {({ data }) => (
            <>
                {data && (
                    <a className={cx(style, className)} href={href} {...props}>
                        {children}
                    </a>
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
