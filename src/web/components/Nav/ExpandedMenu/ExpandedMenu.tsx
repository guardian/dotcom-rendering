import React from 'react';
import { css, cx } from 'emotion';

import { brandBackground, brandText, brandAlt } from '@guardian/src-foundations/palette';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import { VeggieBurger } from './VeggieBurger';
import { Columns } from './Columns';

const screenReadableStyle = css`
    ${visuallyHidden};
`;

const showExpandedMenuStyles = css`
    ${from.desktop} {
        display: block;
        overflow: visible;
    }
    ${until.desktop} {
        transform: translateX(0%);
    }
`;

const mainMenu = css`
    background-color: ${brandBackground.primary};
    box-sizing: border-box;
    ${textSans.large()};
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
    ${from.mobileMedium} {
        margin-right: 29px;
    }
    ${from.mobileLandscape} {
        margin-right: 70px;
    }
    ${from.tablet} {
        margin-right: 100px;
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
`;

const openExpandedMenuStyles = css`
    ${headline.xsmall()};
    font-weight: 300;
    color: ${brandText.primary};
    cursor: pointer;
    display: none;
    position: relative;
    overflow: hidden;
    border: 0;
    background-color: transparent;
    height: 48px;
    padding-left: 9px;
    padding-right: 20px;
    ${from.desktop} {
        display: block;
        padding-top: 5px;
        height: 42px;
    }
    :hover,
    :focus {
        color: ${brandAlt[400]};
    }
`;

const textStyles = ({ showExpandedMenu }: { showExpandedMenu: boolean }) => css`
    display: block;
    height: 100%;
    :after {
        content: '';
        border: 1px solid currentColor;
        border-left: transparent;
        border-top: transparent;
        display: inline-block;
        height: 8px;
        margin-left: 6px;
        transform: ${showExpandedMenu
        ? 'translateY(1px) rotate(-135deg)'
        : 'translateY(-3px) rotate(45deg)'};
        transition: transform 250ms ease-out;
        vertical-align: middle;
        width: 8px;
    }
    :hover:after {
        transform: ${showExpandedMenu
        ? 'translateY(-2px) rotate(-135deg)'
        : 'translateY(0) rotate(45deg)'};
    }
`;


export const ExpandedMenu: React.FC<{
    id: string;
    nav: NavType;
    showExpandedMenu: boolean;
    toggleExpandedMenu: (value: boolean) => void;
}> = ({ id, nav, showExpandedMenu, toggleExpandedMenu }) => {
    return (
        <>
            <VeggieBurger
                showExpandedMenu={showExpandedMenu}
                toggleExpandedMenu={toggleExpandedMenu}
                ariaControls={id}
                key="VeggieBurger"
            />
            <button
                className={openExpandedMenuStyles}
                onClick={() => toggleExpandedMenu(!showExpandedMenu)}
                aria-controls={id}
                key="OpenExpandedMenuButton"
                data-link-name={`nav2 : veggie-burger : ${
                    showExpandedMenu ? 'show' : 'hide'
                    }`}
            >
                <span className={screenReadableStyle}>Show</span>
                <span className={textStyles({ showExpandedMenu })}>More</span>
            </button>
            <div
                className={cx(mainMenu, {
                    [showExpandedMenuStyles]: showExpandedMenu,
                })}
                aria-hidden={!showExpandedMenu}
                id={id}
                data-testid="expanded-menu"
            >
                {showExpandedMenu && <Columns nav={nav} />}
            </div>
        </>
    );
};
