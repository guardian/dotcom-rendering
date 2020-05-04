import React from 'react';
import { css } from 'emotion';
import { brandText, brandAlt } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { VeggieBurger } from './VeggieBurger';

const screenReadable = css`
    ${visuallyHidden};
`;
const openExpandedMenu = (display: Display) => css`
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
        padding-top: ${display === 'immersive' ? '9px' : '5px'};
        height: 42px;
    }
    :hover,
    :focus {
        color: ${brandAlt[400]};
    }
`;

const text = ({ showExpandedMenu }: { showExpandedMenu: boolean }) => css`
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

interface Props {
    display: Display;
    showExpandedMenu: boolean;
    toggleExpandedMenu: (value: boolean) => void;
    ariaControls: string;
}

export const ExpandedMenuToggle = ({
    display,
    toggleExpandedMenu,
    ariaControls,
    showExpandedMenu,
}: Props) => (
    <>
        <VeggieBurger
            display={display}
            showExpandedMenu={showExpandedMenu}
            toggleExpandedMenu={toggleExpandedMenu}
            ariaControls={ariaControls}
            key="VeggieBurger"
        />
        <button
            className={openExpandedMenu(display)}
            onClick={() => toggleExpandedMenu(!showExpandedMenu)}
            aria-controls={ariaControls}
            key="OpenExpandedMenuButton"
            data-link-name={`nav2 : veggie-burger : ${
                showExpandedMenu ? 'show' : 'hide'
            }`}
        >
            <span className={screenReadable}>Show</span>
            <span className={text({ showExpandedMenu })}>More</span>
        </button>
    </>
);
