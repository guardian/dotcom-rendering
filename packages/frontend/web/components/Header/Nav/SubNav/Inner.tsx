import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/typography';
import {
    desktop,
    tablet,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';
import { pillarPalette, pillarMap } from '@frontend/lib/pillars';

const wrapperCollapsed = css`
    height: 36px;
    overflow: hidden;

    ${tablet} {
        height: 42px;
    }
`;

const subnav = css`
    list-style: none;
    padding: 0 5px;

    ${mobileLandscape} {
        padding: 0 15px;
    }

    li {
        float: left;
        display: block;
    }
`;

const subnavExpanded = css`
    ${subnav};
`;

const subnavCollapsed = css`
    ${subnav};
    max-width: calc(100% - 60px);

    ${mobileLandscape} {
        max-width: calc(100% - 70px);
    }
`;

const fontStyle = css`
    ${textSans(5)};
    font-weight: 500;
    color: ${palette.neutral[7]};
    padding: 0 5px;
    height: 36px;
    /* Design System: Line height is being used here for centering layout, we need the primitives */
    /* stylelint-disable-next-line property-blacklist */
    line-height: 36px;

    ${tablet} {
        height: 42px;
        /* Design System: Line height is being used here for centering layout, we need the primitives */
        /* stylelint-disable-next-line property-blacklist */
        line-height: 42px;
    }
`;

const linkStyle = css`
    ${fontStyle};
    float: left;
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }
`;
const selected = css`
    font-weight: 700;
`;
const moreStyle = css`
    ${fontStyle};

    cursor: pointer;
    border: none;
    background-color: transparent;
    color: ${palette.neutral[46]};

    :hover {
        color: ${palette.news.main};
    }

    ${desktop} {
        display: none;
    }
`;

const parentLinkStyle = css`
    ${linkStyle};
    font-weight: 700;
`;
const ps1 = css`
    :after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 10px solid ${palette.neutral[7]};
        margin-top: 12px;
        margin-left: 2px;

        ${tablet} {
            margin-top: 16px;
        }
    }
`; // I'm not sure what the palette.neutral is for this should always receive a pillar by types.
const psp = pillarMap(
    pillar => css`
        :after {
            border-left-color: ${pillarPalette[pillar].main};
        }
    `,
);

export const Inner: React.FC<{
    links: LinkType[];
    currentNavLink: string;
    pillar: Pillar;
    parent?: LinkType | undefined;
    showMore: boolean;
    collapseWrapper: boolean;
    expandSubNav: boolean;
    ulRef: React.RefObject<HTMLUListElement>;
    isExpanded: boolean;
    toggle: () => void;
}> = ({
    links,
    currentNavLink,
    pillar,
    parent,
    showMore,
    collapseWrapper,
    expandSubNav,
    ulRef,
    isExpanded,
    toggle,
}) => {
    const parentLink = parent && (
        <li key={parent.url} className={cx(ps1, psp[pillar])}>
            <a className={parentLinkStyle} href={parent.url}>
                {parent.title}
            </a>
        </li>
    );
    const list = links.map(link => (
        <li key={link.url}>
            <a
                className={cx(linkStyle, {
                    [selected]: link.title === currentNavLink,
                })}
                href={link.url}
                data-link-name={`nav2 : subnav : ${link.title}`}
            >
                {link.title}
            </a>
        </li>
    ));

    return (
        <div className={cx({ [wrapperCollapsed]: collapseWrapper })}>
            <ul
                ref={ulRef}
                className={cx({
                    [subnavCollapsed]: !expandSubNav,
                    [subnavExpanded]: expandSubNav,
                })}
            >
                {parentLink}
                {list}
            </ul>
            {showMore && (
                <button onClick={toggle} className={moreStyle}>
                    {isExpanded ? 'Less' : 'More'}
                </button>
            )}
        </div>
    );
};
