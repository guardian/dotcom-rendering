import React, { Component } from 'react';
import { headline, egyptian } from '@guardian/pasteup/fonts';
import { css, cx } from 'react-emotion';

import { pillars } from '@guardian/pasteup/palette';
import { desktop, tablet, leftCol } from '@guardian/pasteup/breakpoints';

const hideDesktop = css`
    ${desktop} {
        display: none;
    }
`;
const pillarColor = (pillar: string) =>
    css`
        color: ${pillars[pillar]};
    `;

const showColumnLinksStyle = css`
    :before {
        margin-top: 8px;
        transform: rotate(-135deg);
    }
`;
const hideAfter = css`
    :after {
        display: none;
    }
`;

const collapseColumnButton = css`
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    font-family: ${headline};
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    outline: none;
    padding: 6px 34px 18px 50px;
    position: relative;
    text-align: left;
    width: 100%;
    > * {
        pointer-events: none;
    }
    text-transform: capitalize;
    :before {
        margin-top: 4px;
        color: #5d5f5f;
        left: 25px;
        position: absolute;
        border: 2px solid currentColor;
        border-top: 0;
        border-left: 0;
        content: '';
        display: inline-block;
        height: 10px;

        transform: rotate(45deg);
        width: 10px;
    }

    :after {
        background-color: #abc2c9;
        bottom: 0;
        content: '';
        display: block;
        height: 1;
        left: 50;
        position: absolute;
        width: 100%;
    }
`;

type CollapseColumnButtonProps = {
    column: LinkType,
    showColumnLinks: boolean,
    toggleColumnLinks: () => void,
    ariaControls: string,
    isLastIndex: boolean,
};

const CollapseColumnButton: React.SFC<CollapseColumnButtonProps> = ({
    column,
    showColumnLinks,
    toggleColumnLinks,
    ariaControls,
    isLastIndex,
}: CollapseColumnButtonProps) => (
    <button
        className={cx(
            collapseColumnButton,
            pillarColor(column.title.toLowerCase()),
            {
                [showColumnLinksStyle]: showColumnLinks,
                [hideAfter]: !(isLastIndex || showColumnLinks),
            },
            hideDesktop,
        )}
        onClick={() => {
            toggleColumnLinks();
        }}
        aria-haspopup="true"
        aria-controls={ariaControls}
        role="menuitem"
    >
        {column.title}
    </button>
);

const columnLinkTitle = css`
    background-color: transparent;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    color: #121212;
    cursor: pointer;
    display: inline-block;
    font-size: 20px;
    font-family: ${egyptian};
    font-weight: 400;
    outline: none;
    padding: 8px 34px 8px 50px;
    position: relative;
    text-align: left;
    width: 100%;
    ${tablet} {
        padding-left: 60px;
    }
    ${desktop} {
        font-size: 15px;
        line-height: 1.2;
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

const pillarStyles = (pillar: string) => css`
    :hover {
        color: ${pillars[pillar]};
        text-decoration: underline;
    }
    :focus {
        color: ${pillars[pillar]};
        text-decoration: underline;
    }
`;

const mainMenuLinkStyle = css`
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    width: 100%;
    ${desktop} {
        display: list-item;
    }
`;

type ColumnLinkProps = { 
    column: LinkType, 
    link: LinkType,
};

const ColumnLink: React.SFC<ColumnLinkProps> = ({ link, column }: ColumnLinkProps) => (
    <li
        className={cx(mainMenuLinkStyle, {
            [hideDesktop]: link.mobileOnly,
        })}
        role="none"
    >
        <a
            className={cx(columnLinkTitle, {
                [pillarStyles(column.title.toLowerCase())]: column.isPillar,
            })}
            href={link.url}
            role="menuitem"
        >
            {link.title}
        </a>
    </li>
);

const columnLinks = css`
    box-sizing: border-box;
    display: flex;
    font-size: 18px;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    position: relative;
    background-color: #e9eff1;
    ${desktop} {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        order: 1;
        background-color: #e9eff1;
        width: 100%;
        padding: 0 5px;
    }
`;

const isPillarStyle = css`
    background-color: #d9e4e7;
`;

const hide = css`
    display: none;
`;

const getColumnLinks = (
    column: LinkType,
    brandExtensions: Array<LinkType>,
): Array<LinkType> => {
    if (column.title.toLowerCase() === 'more') {
        // Add the brand extensions to 'more' on mobile.
        return [
            ...brandExtensions.map(brandExtension => ({
                ...brandExtension,
                mobileOnly: true,
            })),
            ...(column.children || []),
        ];
    }
    return column.children || [];
};

type ColumnLinksProps = {
    column: LinkType,
    brandExtensions: Array<LinkType>,
    showColumnLinks: boolean,
    id: string,
};

const ColumnLinks: React.SFC<ColumnLinksProps> = ({
    column,
    showColumnLinks,
    id,
    brandExtensions,
}: ColumnLinksProps) => {
    const links = getColumnLinks(column, brandExtensions);

    return (
        <ul
            className={cx(columnLinks, {
                [hide]: column.isPillar && !showColumnLinks,
                [isPillarStyle]: column.isPillar,
            })}
            aria-expanded={showColumnLinks}
            role="menu"
            id={id}
        >
            {links.map(link => (
                <ColumnLink
                    link={link}
                    key={link.title.toLowerCase()}
                    column={column}
                />
            ))}
        </ul>
    );
};

const columnPillar = css`
    ${desktop} {
        :after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: #abc2c9;
        }
    }
`;

const columnStyle = css`
    font-size: 18px;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    ${desktop} {
        width: 118px;
        float: left;
        position: relative;
    }
    ${leftCol} {
        width: 140px;
    }
`;

type ColumnProps = {
    column: LinkType,
    isLastIndex: boolean,
    brandExtensions: Array<LinkType>,
};

export class Column extends Component<
    ColumnProps,
    { showColumnLinks: boolean }
> {
    constructor(props: ColumnProps) {
        super(props);

        this.state = {
            showColumnLinks: false,
        };
    }

    toggleColumnLinks() {
        this.setState(state => ({
            showColumnLinks: !state.showColumnLinks,
        }));
    }

    render() {
        const { showColumnLinks } = this.state;
        const { column, isLastIndex, brandExtensions } = this.props;
        const subNavId = `${column.title.toLowerCase()}Links`;

        return (
            <li
                className={cx(columnStyle, {
                    [columnPillar]: column.isPillar,
                })}
                role="none"
            >
                {column.isPillar && (
                    <CollapseColumnButton
                        column={column}
                        showColumnLinks={showColumnLinks}
                        toggleColumnLinks={() => {
                            this.toggleColumnLinks();
                        }}
                        ariaControls={subNavId}
                        isLastIndex={isLastIndex}
                    />
                )}
                <ColumnLinks
                    column={column}
                    showColumnLinks={showColumnLinks}
                    id={subNavId}
                    brandExtensions={brandExtensions}
                />
            </li>
        );
    }
}
