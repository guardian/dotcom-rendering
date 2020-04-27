import React from 'react';
import { css } from 'emotion';

import { brandBackground } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { ExpandedMenuToggle } from './ExpandedMenuToggle/ExpandedMenuToggle';
import { Columns } from './Columns';

const mainMenuStyles = (menuCheckboxId: string) => css`
    background-color: ${brandBackground.primary};
    box-sizing: border-box;
    ${textSans.large()};
    left: 0;
    margin-right: 29px;
    padding-bottom: 24px;
    top: 0;
    z-index: 1070;
    overflow: hidden;

    /*
        IMPORTANT NOTE:
        we need to specify the adjacent path to the a (current) tag
        to apply styles to the nested tabs due to the fact we use ~
        to support NoJS
    */
    ${`#${menuCheckboxId}`}:checked ~ & {
        ${from.desktop} {
            display: block;
            overflow: visible;
        }
    }
    ${from.desktop} {
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

    /* refer to comment above */
    ${`#${menuCheckboxId}`}:checked ~ & {
        ${until.desktop} {
            transform: translateX(
                0%
            ); /* when translateX is set to 0% it reapears on the screen */
        }
    }
    ${until.desktop} {
        transform: translateX(
            -110%
        ); /* the negative translateX makes the nav hide to the side */
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

    ${from.mobileMedium} {
        margin-right: 29px;
    }
    ${from.mobileLandscape} {
        margin-right: 70px;
    }
    ${from.tablet} {
        margin-right: 100px;
    }
`;

export const ExpandedMenu: React.FC<{
    display: Display;
    mainMenuId: string;
    nav: NavType;
    menuCheckboxId: string;
}> = ({ display, mainMenuId, nav, menuCheckboxId }) => {
    return (
        <>
            <ExpandedMenuToggle
                display={display}
                menuCheckboxId={menuCheckboxId}
            />
            <div
                className={mainMenuStyles(menuCheckboxId)}
                id={mainMenuId}
                data-testid="expanded-menu"
            >
                <Columns nav={nav} />
            </div>
        </>
    );
};
