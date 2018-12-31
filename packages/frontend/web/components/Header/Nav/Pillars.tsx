import React from 'react';
import { css, cx } from 'react-emotion';

import {
    tablet,
    desktop,
    leftCol,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';

import { serif } from '@guardian/pasteup/typography';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { palette } from '@guardian/pasteup/palette';

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);

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
        position: relative;
        ${desktop} {
            width: 118px;
        }
        ${leftCol} {
            width: 140px;
        }
    }
`;

const showMenuUnderline = css`
    :hover {
        text-decoration: underline;
    }
`;

const pillarStyle = css`
    & :first-child > a {
        padding-left: 0;
    }
`;

const pillarDivider = css`
    :before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 4px;
        bottom: 0;
        width: 1px;
        background-color: ${palette.neutral[86]};
    }
`;

const linkStyle = css`
    font-family: ${serif.headline};
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    display: block;
    font-size: 15.4px;
    height: 30px;
    line-height: 1;
    padding: 0 4px;
    position: relative;
    overflow: hidden;
    ${tablet} {
        font-size: 22px;
        height: 42px;
        padding-right: 20px;
        padding-left: 5px;
    }
    ${leftCol} {
        height: 48px;
        font-size: 24px;
    }
    :after {
        content: '';
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        bottom: -4px;
        transition: transform 150ms ease-out;
    }
    :focus:after {
        transform: translateY(-4px);
    }
    :hover {
        text-decoration: none;
    }
    :hover:after {
        transform: translateY(-4px);
    }
`;
const pillarUnderline = pillarMap(
    pillar => css`
        :after {
            border-bottom: 4px solid ${pillarPalette[pillar].dark};
        }
    `,
);

const forceUnderline = css`
    :after {
        transform: translateY(-4px);
    }
    :focus:after {
        transform: translateY(-4px);
    }
    :hover {
        text-decoration: none;
    }
    :hover:after {
        transform: translateY(-4px);
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
                className={cx(pillarStyle, { [pillarDivider]: i > 0 })}
            >
                <a
                    className={cx(
                        linkStyle,
                        pillarColours[p.pillar],
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
