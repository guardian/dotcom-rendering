import React from 'react';
import { css, cx } from 'emotion';

import { textSans } from '@guardian/src-foundations';
import ArrowRight from '@guardian/pasteup/icons/arrow-right.svg';
import { palette, until } from '@guardian/src-foundations';

const supportStyles = css`
    align-self: flex-start;
    background-color: ${palette.yellow.main};
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    min-height: 30px;
    ${until.mobileMedium} {
        padding: 0 10px;
        min-height: 24px;
    }
`;

const supportHeaderStyles = css`
    ${supportStyles}
    justify-content: center;
    margin-top: 10px;
    margin-left: 10px;
    ${until.mobileMedium} {
        margin-top: 28px;
    }
`;

const supportFooterStyles = css`
    ${supportStyles}
    margin-bottom: 6px;
`;

const supportLinkStyles = css`
    position: relative;
    color: ${palette.neutral[7]};
    ${textSans({ level: 3})};
    font-weight: 700;
    display: block;
    text-decoration: none;
    width: 100%;

    padding-right: 20px;
    ${until.mobileMedium} {
        ${textSans({ level: 2 })};
        padding-right: 18px;
    }

    svg {
        position: absolute;
        top: -5px;
        ${until.mobileMedium} {
            top: -2px;
            width: 26px;
            height: 26px;
        }
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
