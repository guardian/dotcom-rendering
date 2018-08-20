// @flow
import { css } from 'react-emotion';

import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { egyptian } from '@guardian/pasteup/fonts';

import MainMenuColumn from './MainMenuColumn';

const MainMenuColumnsStyle = css`
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

const BrandExtensionColumn = css`
    display: none;
    position: absolute;
    right: 20px;
    top: 18px;
    bottom: 0px;
    ${desktop} {
        display: block;
    }
`;

const BrandExtensionList = css`
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

const BrandExtensionListItem = css`
    marginright: 0;
    margintop: -6px;
    paddingbottom: 0;
`;

const BrandExtensionLink = css`
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
    ${desktop}: {
        padding: 6px 0;
    }
    :hover: {
        color: #5d5f5f;
        text-decoration: underline;
    }
    :focus: {
        color: #5d5f5f;
        text-decoration: underline;
    }
    > *: {
        pointer-events: none;
    }
`;

type Props = {
    columns: Array<LinkType>,
    brandExtensions: Array<LinkType>,
};

export default ({ columns, brandExtensions }: Props) => (
    <ul className={MainMenuColumnsStyle} role="menubar" tabIndex="-1">
        {columns.map((column, i) => (
            <MainMenuColumn
                column={column}
                key={column.title.toLowerCase()}
                isLastIndex={i === columns.length - 1}
                brandExtensions={brandExtensions}
            />
        ))}
        <li className={BrandExtensionColumn} role="none">
            <ul className={BrandExtensionList} role="menu">
                {brandExtensions.map(brandExtension => (
                    <li
                        className={BrandExtensionListItem}
                        key={brandExtension.title}
                    >
                        <a
                            className={BrandExtensionLink}
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
