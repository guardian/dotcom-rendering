import React from 'react';
import { css, cx } from 'emotion';

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
    margin-left: 10px;
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
    linkLabel: string;
    rrLink: ReaderRevenuePosition;
    rrCategory: ReaderRevenueCategory;
    rightAlignIcon?: boolean;
}> = ({ nav, linkLabel, rrLink, rrCategory, rightAlignIcon }) => {
    const url = nav.readerRevenueLinks[rrLink][rrCategory];

    if (url === '') {
        return null;
    }

    const isAmpHeader = rrLink === 'ampHeader';

    return (
        <div
            className={cx([
                isAmpHeader ? supportHeaderStyles : supportFooterStyles,
            ])}
        >
            <a className={supportLinkStyles} href={url}>
                {linkLabel}
                <span
                    className={cx({
                        [rightAlignedIcon]: !!rightAlignIcon,
                    })}
                >
                    <ArrowRight />
                </span>
            </a>
        </div>
    );
};
