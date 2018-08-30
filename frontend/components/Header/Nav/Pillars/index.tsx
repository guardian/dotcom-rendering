import React from 'react';
import { css, cx } from 'react-emotion';

import {
    tablet,
    desktop,
    leftCol,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';

import { pillars as pillarPalette } from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/fonts';

const pillarColours = Object.entries(pillarPalette)
    .map(([pillar, colour]) => ({
        [pillar]: css`
            color: ${colour};
        `,
    }))
    .reduce((c, a) => ({ ...c, ...a }), {});

const pillarsStyles = css`
    clear: right;
    margin: 0;
    list-style: none;
    list-style-image: none;
    ${mobileLandscape} {
        padding-left: 20px;
    }
    li {
        float: left;
        ${desktop} {
            width: 118px;
            position: relative;
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
        ${leftCol} {
            width: 140px;
        }
    }
`;

const showMenuUnderline = (shouldShow: boolean): string => {
    const show = css`
        :hover {
            text-decoration: underline;
        }
    `;

    const hide = css`
        :hover {
            text-decoration: none;
        }
    `;
    
    if (shouldShow) {
        return show;
    }

    return hide;
};

const linkStyle = css`
    font-family: ${headline};
    font-weight: 600;
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
    ${desktop} {
        height: 48px;
    }
    :after {
        content: '';
        display: block;
        left: 0;
        position: absolute;
        border-bottom: 4px solid currentColor;
        right: 0;
        bottom: -4px;
        transition: transform 150ms ease-out;
    }
    :focus:after {
        transform: translateY(-4px);
    }
    :hover:after {
        transform: translateY(-4px);
    }
`;

type Props = {
    showMainMenu: boolean,
    pillars: Array<LinkType>,
};

const Pillars: React.SFC<Props> = ({ showMainMenu, pillars }: Props) => (
    <ul className={pillarsStyles}>
        {pillars.filter(pillar => pillar.title !== 'More').map(pillar => (
            <li key={pillar.title}>
                <a
                    className={cx(
                        linkStyle,
                        showMenuUnderline(showMainMenu),
                        pillarColours[pillar.title.toLowerCase()],
                    )}
                    href={pillar.url}
                >
                    {pillar.title}
                </a>
            </li>
        ))}
    </ul>
);
export default Pillars;
