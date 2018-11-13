import React from 'react';
import { css, cx } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';
import { serif } from '@guardian/pasteup/fonts';
import {
    desktop,
    tablet,
    mobileMedium,
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

    li {
        float: left;
        line-height: 40px;
    }
    padding: 0 5px;

    ${tablet} {
        li {
            line-height: 48px;
        }
        padding: 0 15px;
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
    font-family: ${serif.headline};
    font-weight: 500;
    color: ${palette.neutral[7]};
    padding: 0 5px;
    font-size: 14px;
    height: 36px;
    line-height: 36px;

    ${mobileMedium} {
        font-size: 15px;
    }

    ${tablet} {
        font-size: 16px;
        height: 42px;
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
        margin-left: 4px;
    }
`; // I'm not sure what the palette.neutral is for this should always receive a pillar by types.
const psp = pillarMap(
    pillar => css`
        :after {
            border-left-color: ${pillarPalette[pillar].main};
        }
    `,
);

export const Inner: React.SFC<{
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
