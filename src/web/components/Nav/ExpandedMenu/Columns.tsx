import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import {
    headline,
    textSans,
} from '@guardian/src-foundations/__experimental__typography';
import { from } from '@guardian/src-foundations/mq';

import { Column, More, ReaderRevenueLinks } from './Column';

const ColumnsStyle = css`
    box-sizing: border-box;
    max-width: none;
    ${from.desktop} {
        max-width: 980px;
        padding: 0 20px;
        position: relative;
        margin: 0 auto;
        display: flex;
        border-left: 1px solid ${palette.brand.pastel};
        border-right: 1px solid ${palette.brand.pastel};
    }
    ${from.leftCol} {
        max-width: 1140px;
    }
    ${from.wide} {
        max-width: 1300px;
    }
`;

const desktopBrandExtensionColumn = css`
    ${from.desktop} {
        display: block;
    }
    display: none;
    position: absolute;
    right: 20px;
    top: 4px;
    bottom: 0;
`;

const brandExtensionList = css`
    width: 131px;
    box-sizing: border-box;
    ${textSans.medium()};
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    ${from.leftCol} {
        width: 140px;
    }
    ${from.wide} {
        width: 300px;
    }
`;

const brandExtensionListItem = css`
    margin-right: 0;
    margin-top: -6px;
    padding-bottom: 0;
`;

const brandExtensionLink = css`
    ${headline.xxsmall()};
    font-weight: 700;
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    color: ${palette.neutral[100]};
    cursor: pointer;
    display: inline-block;
    outline: none;
    padding: 8px 34px 8px 50px;
    position: relative;
    text-align: left;
    width: 100%;
    text-decoration: none;
    ${from.tablet} {
        padding-left: 60px;
    }
    ${from.desktop} {
        padding: 6px 0;
    }
    ${from.wide} {
        font-size: 24px;
    }
    :hover,
    :focus {
        color: ${palette.yellow.main};
    }
    > * {
        pointer-events: none;
    }
`;

export const Columns: React.FC<{
    nav: NavType;
}> = ({ nav }) => (
    <ul className={ColumnsStyle} role="menubar" tabIndex={-1}>
        {nav.pillars.map((column, i) => (
            <Column
                column={column}
                key={column.title.toLowerCase()}
                index={i}
            />
        ))}
        <ReaderRevenueLinks readerRevenueLinks={nav.readerRevenueLinks} />
        <More
            column={nav.otherLinks}
            brandExtensions={nav.brandExtensions}
            key="more"
        />
        <li className={desktopBrandExtensionColumn} role="none">
            <ul className={brandExtensionList} role="menu">
                {nav.brandExtensions.map(brandExtension => (
                    <li
                        className={brandExtensionListItem}
                        key={brandExtension.title}
                    >
                        <a
                            className={brandExtensionLink}
                            href={brandExtension.url}
                            key={brandExtension.title}
                            role="menuitem"
                            data-link-name={`nav2 : brand extension : ${brandExtension.longTitle}`}
                        >
                            {brandExtension.longTitle}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    </ul>
);
