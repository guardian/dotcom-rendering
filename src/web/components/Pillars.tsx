import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';

// CSS Vars

export const firstPillarWidth = 171;
export const pillarWidth = 160;
export const preLeftColFirstPillarWidth = 144;
export const preLeftColPillarWidth = 134;
export const preDesktopPillarWidth = 'auto';

// CSS

const pillarsStyles = css`
    clear: right;
    margin: 0;
    list-style: none;
    list-style-image: none;
    padding-left: 10px;
    ${from.mobileLandscape} {
        padding-left: 20px;
    }
    li {
        float: left;
        display: block;
        position: relative;
        width: ${preDesktopPillarWidth};
        ${from.desktop} {
            width: ${preLeftColPillarWidth}px;
        }
        ${from.leftCol} {
            width: ${pillarWidth}px;
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
        ${from.tablet} {
            border-bottom: 0;
            height: 49px;
        }
        ${from.desktop} {
            height: 43px;
        }
    }
`;

const showMenuUnderline = css`
    ${from.desktop} {
        :before {
            bottom: 0;
        }
    }

    :hover {
        text-decoration: underline;
    }

    :after {
        transform: translateY(4px);
    }
`;

const pillarStyle = css`
    :first-of-type {
        margin-left: -20px;
        width: ${preDesktopPillarWidth};

        ${from.desktop} {
            width: ${preLeftColFirstPillarWidth}px;
        }

        ${from.leftCol} {
            width: ${firstPillarWidth}px;
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

        ${from.tablet} {
            bottom: 17px;
        }

        ${from.desktop} {
            bottom: 0.6em;
        }
    }
`;

const linkStyle = css`
    ${headline.xxxsmall()};
    box-sizing: border-box;
    font-weight: 900;
    color: ${palette.neutral[100]};
    cursor: pointer;
    display: block;
    font-size: 15.4px;
    height: 36px;
    padding: 9px 5px 0;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    z-index: 1;
    ${from.mobileMedium} {
        font-size: 15.7px;
        padding: 9px 4px 0;
    }
    ${from.mobileLandscape} {
        font-size: 18px;
        padding: 7px 4px 0;
    }
    ${from.tablet} {
        font-size: 22px;
        padding-top: 9px;
        height: 48px;
        padding-right: 20px;
        padding-left: 9px;
    }
    ${from.desktop} {
        padding-top: 5px;
        height: 42px;
    }

    ${from.wide} {
        padding-top: 7px;
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
            transition: transform 0.3s ease-in-out;
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

const isNotLastPillar = (i: number, noOfPillars: number): boolean =>
    i !== noOfPillars - 1;

export const Pillars: React.FC<{
    mainMenuOpen: boolean;
    pillars: PillarType[];
    pillar: Pillar;
    showLastPillarDivider?: boolean;
}> = ({ mainMenuOpen, pillars, pillar, showLastPillarDivider = true }) => (
    <ul className={pillarsStyles}>
        {pillars.map((p, i) => (
            <li key={p.title} className={pillarStyle}>
                <a
                    className={cx(linkStyle, pillarUnderline[p.pillar], {
                        [pillarDivider]:
                            showLastPillarDivider ||
                            isNotLastPillar(i, pillars.length),
                        [showMenuUnderline]: mainMenuOpen,
                        [forceUnderline]: p.pillar === pillar,
                    })}
                    href={p.url}
                    data-link-name={`nav2 : primary : ${p.title}`}
                >
                    {p.title}
                </a>
            </li>
        ))}
    </ul>
);
