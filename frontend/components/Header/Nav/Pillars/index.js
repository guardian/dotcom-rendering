// @flow
import { css } from 'react-emotion';

import {
    tablet,
    desktop,
    leftCol,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';

import { pillars as pillarColours } from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/fonts';
import type { LinkType } from '../__config__';

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

const link = ({ showMainMenu, pillar }) => css`
    font-family: ${headline};
    font-weight: 600;
    text-decoration: none;
    color: ${pillarColours[pillar]};
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
    :hover {
        text-decoration: ${showMainMenu ? 'underline' : 'none'};
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

export default ({ showMainMenu, pillars }: Props) => (
    <ul className={pillarsStyles}>
        {pillars.filter(pillar => pillar.title !== 'More').map(pillar => (
            <li key={pillar.title}>
                <a
                    className={link({
                        pillar: pillar.title.toLowerCase(),
                        showMainMenu,
                    })}
                    href={pillar.url}
                >
                    {pillar.title}
                </a>
            </li>
        ))}
    </ul>
);
