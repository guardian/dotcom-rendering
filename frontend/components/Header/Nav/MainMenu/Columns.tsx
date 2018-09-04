import React from 'react'
import { css } from 'react-emotion';

import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { egyptian } from '@guardian/pasteup/fonts';

import { Column } from './Column';

const ColumnsStyle = css`
    box-sizing: border-box;
    max-width: none;
    ${desktop} {
        max-width: 980px;
        background-color: #e9eff1;
        padding: 0 20px;
        position: relative;
        margin: 0 auto;
        display: flex;
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
    top: 18px;
    bottom: 0;
`;

const brandExtensionList = css`
    width: 186px;
    box-sizing: border-box;
    font-size: 18px;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    ${leftCol} {
        width: 220px;
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
    font-size: 24px;
    font-weight: 700;
    line-height: 1.1;
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    color: #121212;
    cursor: pointer;
    display: inline-block;
    font-family: ${egyptian};
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
    :hover,
    :focus {
        color: #5d5f5f;
        text-decoration: underline;
    }
    > * {
        pointer-events: none;
    }
`;

export const Columns: React.SFC<{
    columns: Array<LinkType>,
    brandExtensions: Array<LinkType>,
}> = ({
    columns,
    brandExtensions,
}) => (
    <ul className={ColumnsStyle} role="menubar" tabIndex={-1}>
        {columns.map((column, i) => (
            <Column
                column={column}
                key={column.title.toLowerCase()}
                isLastIndex={i === columns.length - 1}
                brandExtensions={brandExtensions}
            />
        ))}
        <li className={desktopBrandExtensionColumn} role="none">
            <ul className={brandExtensionList} role="menu">
                {brandExtensions.map(brandExtension => (
                    <li
                        className={brandExtensionListItem}
                        key={brandExtension.title}
                    >
                        <a
                            className={brandExtensionLink}
                            href={brandExtension.url}
                            key={brandExtension.title}
                            role="menuitem"
                        >
                            {brandExtension.longTitle || brandExtension.title}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    </ul>
);
