import React, { Component } from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { CollapseColumnButton } from './CollapseColumnButton';

// CSS vars
const pillarHeight = 42;

// CSS

export const hideDesktop = css`
    ${from.desktop} {
        display: none;
    }
`;

const pillarDivider = css`
    ${from.desktop} {
        :before {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: ${palette.brand.pastel};
            z-index: 1;
        }
    }
`;

const pillarDividerExtended = css`
    ${from.desktop} {
        :before {
            top: -${pillarHeight}px;
        }
    }
`;

const columnLinkTitle = css`
    ${textSans.medium({ lineHeight: 'tight' })};
    background-color: transparent;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    color: ${palette.neutral[100]};
    cursor: pointer;
    display: inline-block;
    font-weight: 500;
    outline: none;
    padding: 8px 34px 8px 50px;
    position: relative;
    text-align: left;
    width: 100%;

    ${from.tablet} {
        padding-left: 60px;
    }

    ${from.desktop} {
        font-size: 16px;
        padding: 6px 0;
    }

    :hover,
    :focus {
        color: ${palette.brandYellow.main};
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
    ${from.desktop} {
        display: list-item;
    }
`;

const ColumnLink: React.FC<{
    link: LinkType;
}> = ({ link }) => (
    <li
        className={cx(mainMenuLinkStyle, {
            [hideDesktop]: !!link.mobileOnly,
        })}
        role="none"
    >
        <a
            className={cx(columnLinkTitle)}
            href={link.url}
            role="menuitem"
            data-link-name={`nav2 : secondary : ${link.longTitle}`}
        >
            {link.longTitle}
        </a>
    </li>
);

const columnLinks = css`
    ${textSans.medium()};
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    position: relative;
    ${from.desktop} {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        order: 1;
        height: 100%;
        width: 100%;
        padding: 0 9px;
    }
`;

const firstColumnLinks = css`
    ${from.desktop} {
        padding-left: 0;
    }
`;

const pillarColumnLinks = css`
    ${until.tablet} {
        background: ${palette.brand.dark};
    }
`;

const hide = css`
    display: none;
`;

const ColumnLinks: React.FC<{
    column: LinkType;
    showColumnLinks: boolean;
    id: string;
    index?: number;
}> = ({ column, showColumnLinks, id, index }) => {
    return (
        <ul
            className={cx(
                columnLinks,
                { [firstColumnLinks]: index === 0 },
                { [pillarColumnLinks]: !!column.pillar },
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
    ${textSans.medium()};
    list-style: none;
    margin: 0;
    padding-bottom: 10px;
    position: relative;

    :after {
        background-color: ${palette.brand.pastel};
        top: 0;
        content: '';
        display: block;
        height: 1px;
        left: 50px;
        position: absolute;
        right: 0;
    }

    /* Remove the border from the top item on mobile */
    :first-of-type:after {
        content: none;
    }

    ${from.desktop} {
        width: 134px;
        float: left;
        position: relative;

        :after {
            content: none;
        }

        :first-of-type {
            width: 123px;
        }
    }
    ${from.leftCol} {
        width: 160px;

        :first-of-type {
            width: 150px;
        }
    }
`;

export const ReaderRevenueLinks: React.FC<{
    readerRevenueLinks: ReaderRevenuePositions;
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
        <ul className={cx(hideDesktop)}>
            {links.map(link => (
                <ColumnLink link={link} key={link.title.toLowerCase()} />
            ))}
        </ul>
    );
};

export const More: React.FC<{
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
        <li
            className={cx(columnStyle, pillarDivider, pillarDividerExtended)}
            role="none"
        >
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
            <li className={cx(columnStyle, pillarDivider)} role="none">
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
