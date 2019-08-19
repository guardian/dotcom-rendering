import React from 'react';
import { css } from 'emotion';

import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { headline, textSans } from '@guardian/pasteup/typography';

import { Column, More, ReaderRevenueLinks } from './Column';
import { palette } from '@guardian/pasteup/palette';

const ColumnsStyle = css`
    box-sizing: border-box;
    max-width: none;
    ${desktop} {
        max-width: 980px;
        padding: 0 20px;
        position: relative;
        margin: 0 auto;
        display: flex;
        border-left: 1px solid ${palette.brand.pastel};
        border-right: 1px solid ${palette.brand.pastel};
    }
    ${leftCol} {
        max-width: 1140px;
    }
    ${wide} {
        max-width: 1300px;
    }
`;

const desktopBrandExtensionColumn = css`
    ${desktop} {
        display: block;
    }
    display: none;
    position: absolute;
    right: 20px;
    top: 6px;
    bottom: 0;
`;

const brandExtensionList = css`
    width: 131px;
    box-sizing: border-box;
    ${textSans(6)};
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    ${leftCol} {
        width: 140px;
    }
    ${wide} {
        width: 300px;
    }
`;

const brandExtensionListItem = css`
    margin-right: 0;
    margin-top: -6px;
    padding-bottom: 0;
`;

const brandExtensionLink = css`
    ${headline(3)};
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
    ${tablet} {
        padding-left: 60px;
    }
    ${desktop} {
        padding: 6px 0;
    }
    ${wide} {
        font-size: 24px;
    }
    :hover,
    :focus {
        color: ${palette.highlight.main};
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
                            data-link-name={`nav2 : brand extension : ${
                                brandExtension.longTitle
                            }`}
                        >
                            {brandExtension.longTitle}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    </ul>
);
