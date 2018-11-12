import React, { Component } from 'react';
import { serif } from '@guardian/pasteup/fonts';
import { css, cx } from 'react-emotion';

import { desktop, tablet, leftCol } from '@guardian/pasteup/breakpoints';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { palette } from '@guardian/pasteup/palette';
import { CollapseColumnButton } from './CollapseColumnButton';

export const hideDesktop = css`
    ${desktop} {
        display: none;
    }
`;

const perPillarStyles = pillarMap(
    pillar => css`
        button {
            color: ${pillarPalette[pillar].main};
        }
        a:hover {
            color: ${pillarPalette[pillar].main};
            text-decoration: underline;
        }
        a:focus {
            color: ${pillarPalette[pillar].main};
            text-decoration: underline;
        }
    `,
);

const pillarDivider = css`
    ${desktop} {
        :before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: -100px;
            width: 1px;
            background-color: ${palette.neutral[86]};
            z-index: 1;
        }
    }
`;

const columnLinkTitle = css`
    background-color: transparent;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    color: ${palette.neutral[7]};
    cursor: pointer;
    display: inline-block;
    font-size: 20px;
    font-family: ${serif.headline};
    font-weight: 500;
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
        color: ${palette.neutral[20]};
        text-decoration: underline;
    }

    > * {
        pointer-events: none;
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

const readerRevenueLinksStyle = css`
    background-color: ${palette.neutral[93]};
`;

const ColumnLink: React.SFC<{
    link: LinkType;
}> = ({ link }) => (
    <li
        className={cx(mainMenuLinkStyle, {
            [hideDesktop]: link.mobileOnly,
        })}
        role="none"
    >
        <a className={cx(columnLinkTitle)} href={link.url} role="menuitem">
            {link.longTitle}
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
    background-color: ${palette.neutral[97]};
    ${desktop} {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        order: 1;
        background-color: ${palette.neutral[97]};
        width: 100%;
        padding: 0 5px;
    }
    ${pillarDivider};
`;

const firstColumn = css`
    ${desktop} {
        padding-left: 0;
        :before {
            display: none;
        }
    }
`;

const hide = css`
    display: none;
`;

const ColumnLinks: React.SFC<{
    column: LinkType;
    showColumnLinks: boolean;
    id: string;
    index?: number;
}> = ({ column, showColumnLinks, id, index }) => {
    return (
        <ul
            className={cx(
                columnLinks,
                { [firstColumn]: index === 0 },
                {
                    [hide]: !showColumnLinks,
                },
            )}
            aria-expanded={showColumnLinks}
            role="menu"
            id={id}
        >
            {(column.children || []).map(link => (
                <ColumnLink link={link} key={link.title.toLowerCase()} />
            ))}
        </ul>
    );
};

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

export const ReaderRevenueLinks: React.SFC<{
    readerRevenueLinks: ReaderRevenueLinks;
}> = ({ readerRevenueLinks }) => {
    const links: LinkType[] = [
        {
            longTitle: 'Make a contribution',
            title: 'Make a contribution',
            mobileOnly: true,
            url: readerRevenueLinks.sideMenu.contribute,
        },
        {
            longTitle: 'Subscribe',
            title: 'Subscribe',
            mobileOnly: true,
            url: readerRevenueLinks.sideMenu.subscribe,
        },
    ];

    return (
        <ul className={cx(readerRevenueLinksStyle, hideDesktop)}>
            {links.map(link => (
                <ColumnLink link={link} key={link.title.toLowerCase()} />
            ))}
        </ul>
    );
};

export const More: React.SFC<{
    column: LinkType;
    brandExtensions: LinkType[];
}> = ({ column, brandExtensions }) => {
    const subNavId = `${column.title.toLowerCase()}Links`;
    // Add the brand extensions to 'more' on mobile.
    const more = {
        ...column,
        children: [
            ...brandExtensions.map(brandExtension => ({
                ...brandExtension,
                mobileOnly: true,
            })),
            ...(column.children || []),
        ],
    };
    return (
        <li className={cx(columnStyle)} role="none">
            <ColumnLinks column={more} showColumnLinks={true} id={subNavId} />
        </li>
    );
};

export class Column extends Component<
    {
        column: PillarType;
        index: number;
    },
    { showColumnLinks: boolean }
> {
    public state = {
        showColumnLinks: false,
    };

    public toggleColumnLinks() {
        this.setState(state => ({
            showColumnLinks: !state.showColumnLinks,
        }));
    }

    public render() {
        const { showColumnLinks } = this.state;
        const { column, index } = this.props;
        const subNavId = `${column.title.toLowerCase()}Links`;

        return (
            <li
                className={cx(columnStyle, perPillarStyles[column.pillar], {
                    [pillarDivider]: index > 0,
                })}
                role="none"
            >
                <CollapseColumnButton
                    title={column.title}
                    showColumnLinks={showColumnLinks}
                    toggleColumnLinks={() => {
                        this.toggleColumnLinks();
                    }}
                    ariaControls={subNavId}
                />

                <ColumnLinks
                    column={column}
                    showColumnLinks={showColumnLinks}
                    id={subNavId}
                    index={index}
                />
            </li>
        );
    }
}
