import React, { useState } from 'react';
import { css, cx } from 'emotion';

import { MainMenuToggle } from '../MainMenuToggle/MainMenuToggle';
import {
    until,
    mobileMedium,
    mobileLandscape,
    desktop,
    tablet,
    textSans,
    palette,
} from '@guardian/src-foundations';
import { Columns } from './Columns';

const showMenuStyles = css`
    ${desktop} {
        display: block;
        overflow: visible;
    }
    ${until.desktop} {
        transform: translateX(0%);
    }
`;

const mainMenu = css`
    background-color: ${palette.brand.main};
    box-sizing: border-box;
    ${textSans({ level: 4 })};
    left: 0;
    margin-right: 29px;
    padding-bottom: 24px;
    top: 0;
    z-index: 1070;
    overflow: hidden;
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
    ${tablet} {
        margin-right: 100px;
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
        @supports (width: 100vw) {
            left: 50%;
            right: 50%;
            width: 100vw;
            margin-left: -50vw;
            margin-right: -50vw;
        }
    }
`;

export const MainMenu: React.FC<{
    id: string;
    nav: NavType;
}> = ({ id, nav }) => {
    const [showMenu, toggleMenu] = useState<boolean>(false);
    return (
        <>
            <MainMenuToggle
                showMainMenu={showMenu}
                toggleMainMenu={toggleMenu}
                ariaControls={id}
            />
            <div
                className={cx(mainMenu, { [showMenuStyles]: showMenu })}
                aria-hidden={!showMenu}
                id={id}
            >
                {showMenu && <Columns nav={nav} />}
            </div>
        </>
    );
};
