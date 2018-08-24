// @flow
import { css, cx } from 'react-emotion';
import React from 'react'

import {
    until,
    mobileMedium,
    mobileLandscape,
    desktop,
} from '@guardian/pasteup/breakpoints';

import { Columns } from './Columns';

const showMenu = css`
    ${desktop} {
        display: block;
    }
    ${until.desktop} {
        transform: translateX(0%);
    }
`;

const mainMenu = css`
    background-color: #e9eff1;
    box-sizing: border-box;
    font-size: 20px;
    left: 0;
    line-height: 1;
    margin-right: 29px;
    padding-bottom: 24px;
    top: 0;
    z-index: 1070;
    ${until.desktop} {
        transform: translateX(-110%);
        transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        box-shadow: 3px 0 16px rgba(0, 0, 0, 0.4);
        bottom: 0;
        height: 100%;
        overflow: auto;
        padding-top: 6px;
        position: fixed;
        right: 0;
        will-change: transform;
    }
    ${mobileMedium} {
        margin-right: 29px;
    }
    ${mobileLandscape} {
        margin-right: 70px;
    }
    ${desktop} {
        display: none;
        position: absolute;
        padding-bottom: 0;
        padding-top: 0;
        top: 100%;
        left: 0;
        right: 0;
        width: 100%;
        border-bottom: 1px solid #abc2c9;
        @supports (width: 100vw) {
            left: 50%;
            right: 50%;
            width: 100vw;
            margin-left: -50vw;
            margin-right: -50vw;
        }
    }
`;

export const MainMenu = ({
    showMainMenu,
    id,
    nav,
}: {
    showMainMenu: boolean,
    id: string,
    nav: NavType,
}) => (
    <div
        className={cx(mainMenu, { [showMenu]: showMainMenu })}
        aria-hidden={!showMainMenu}
        id={id}
    >
        <Columns columns={nav.pillars} brandExtensions={nav.brandExtensions} />
    </div>
);
