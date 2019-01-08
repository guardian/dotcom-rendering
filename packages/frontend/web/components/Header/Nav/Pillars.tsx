import React from 'react';
import { css, cx } from 'emotion';

import {
    tablet,
    desktop,
    leftCol,
    mobileLandscape,
    mobileMedium,
    wide,
    until,
} from '@guardian/pasteup/breakpoints';

import { headline } from '@guardian/pasteup/typography';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { palette } from '@guardian/pasteup/palette';

const pillarsStyles = css`
    clear: right;
    margin: 0;
    list-style: none;
    list-style-image: none;
    padding-left: 10px;
    ${mobileLandscape} {
        padding-left: 20px;
    }
    li {
        float: left;
        display: block;
        position: relative;
        ${desktop} {
            width: 134px;
        }
        ${leftCol} {
            width: 160px;
        }
    }

    :after {
        content: '';
        border-top: 1px solid ${palette.brand.pastel};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 37px;
        ${tablet} {
            border: 1px solid ${palette.brand.pastel};
            border-bottom: 0;
            height: 49px;
        }
        ${desktop} {
            height: 43px;
        }
    }
`;

const showMenuUnderline = css`
    ${desktop} {
        :before {
            bottom: 0;
        }
    }

    :hover {
        text-decoration: underline;
    }
`;

const pillarStyle = css`
    :first-child {
        margin-left: -20px;
        ${desktop} {
            width: 144px;
        }
        ${leftCol} {
            width: 171px;
        }
        a {
            padding-left: 20px;
        }
    }

    :last-child a:before {
        ${until.desktop} {
            content: none;
        }
    }
`;

const pillarDivider = css`
    :before {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: ${palette.brand.pastel};

        ${tablet} {
            bottom: 17px;
        }

        ${desktop} {
            bottom: .6em;
        }
    }
`;

const linkStyle = css`
    ${headline(2)}
    box-sizing: border-box;
    font-weight: 900;
    color: ${palette.neutral[100]};
    cursor: pointer;
    display: block;
    font-size: 15.4px;
    height: 36px;
    line-height: 1;
    padding: 9px 5px 0;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    z-index: 1;
    ${mobileMedium} {
        font-size: 15.7px;
        padding: 9px 4px 0;
    }
    ${mobileLandscape} {
        font-size: 18px;
        padding: 7px 4px 0;
    }
    ${tablet} {
        font-size: 22px;
        padding-top: 11px;
        height: 48px;
        padding-right: 20px;
        padding-left: 9px;
    }
    ${desktop} {
        padding-top: 7px;
        height: 42px;
    }
    ${wide} {
        font-size: 24px;
    }
    :focus:after {
        transform: translateY(4px);
    }
    :hover {
        text-decoration: none;
    }
    :hover:after {
        transform: translateY(4px);
    }
`;
const pillarUnderline = pillarMap(
    pillar => css`
        :after {
            border-top: 4px solid ${pillarPalette[pillar].bright};
            left: 0;
            right: 1px;
            top: -4px;
            content: '';
            display: block;
            position: absolute;
            transition: transform .3s ease-in-out;
        }
    `,
);

const forceUnderline = css`
    :after {
        transform: translateY(4px);
    }
    :focus:after {
        transform: translateY(4px);
    }
    :hover {
        text-decoration: none;
    }
    :hover:after {
        transform: translateY(4px);
    }
`; // A11Y warning: this styling has no focus state for the selected pillar

const Pillars: React.SFC<{
    showMainMenu: boolean;
    pillars: PillarType[];
    pillar: Pillar;
}> = ({ showMainMenu, pillars, pillar }) => (
    <ul className={pillarsStyles}>
        {pillars.map((p, i) => (
            <li
                key={p.title}
                className={pillarStyle}
            >
                <a
                    className={cx(
                        pillarDivider,
                        linkStyle,
                        pillarUnderline[p.pillar],
                        {
                            [showMenuUnderline]: showMainMenu,
                            [forceUnderline]: p.pillar === pillar,
                        },
                    )}
                    href={p.url}
                >
                    {p.title}
                </a>
            </li>
        ))}
    </ul>
);
export default Pillars;
