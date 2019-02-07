import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/pasteup/typography';
import ArrowRight from '@guardian/pasteup/icons/arrow-right.svg';
import { palette } from '@guardian/pasteup/palette';

const supportStyles = css`
    align-self: flex-start;
    background-color: ${palette.highlight.main};
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    min-height: 30px;
`;

const supportHeaderStyles = css`
    ${supportStyles}
    justify-content: center;
    margin-top: 20px;
    margin-left: 20px;
`;

const supportFooterStyles = css`
    ${supportStyles}
    margin-bottom: 6px;
`;

const supportLinkStyles = css`
    position: relative;
    color: ${palette.neutral[7]};
    ${textSans(5)};
    display: block;
    line-height: 20px;
    text-decoration: none;
    padding-right: 20px;
    width: 100%;

    svg {
        position: absolute;
        top: -6px;
    }
`;

const rightAlignedIcon = css`
    position: absolute;
    height: 20px;
    width: 20px;
    right: 0;
    top: 0;
`;

export const ReaderRevenueButton: React.SFC<{
    nav: NavType;
    rrLink: ReaderRevenueLinkNames;
    rrCategory: ReaderRevenueCategoryNames;
    rightAlignIcon?: boolean;
}> = ({ nav, rrLink, rrCategory, rightAlignIcon }) => {
    const linkLabel =
        (rrCategory.toString() === 'support' && 'Support Us') ||
        (rrCategory.toString() === 'subscribe' && 'Subscribe') ||
        (rrCategory.toString() === 'contribute' && 'Contribute');

    const url = nav.readerRevenueLinks[rrLink][rrCategory];

    if (url === '') {
        return null;
    }

    return (
        <div
            className={
                rrLink === 'ampHeader'
                    ? supportHeaderStyles
                    : supportFooterStyles
            }
        >
            <a className={supportLinkStyles} href={url}>
                {linkLabel}
                <span className={rightAlignIcon ? rightAlignedIcon : ''}>
                    <ArrowRight />
                </span>
            </a>
        </div>
    );
};
