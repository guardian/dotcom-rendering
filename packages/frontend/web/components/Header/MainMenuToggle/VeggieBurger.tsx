import React from 'react';
import { css } from 'emotion';

import {
    desktop,
    mobileMedium,
    mobileLandscape,
    tablet,
    palette,
} from '@guardian/src-foundations';

const veggieBurger = ({ showMainMenu }: { showMainMenu: boolean }) => css`
    background-color: ${palette.yellow.main};
    color: ${palette.neutral[7]};
    cursor: pointer;
    height: 42px;
    min-width: 42px;
    position: absolute;
    border: 0;
    border-radius: 50%;
    outline: none;
    z-index: ${showMainMenu ? 1071 : 0};
    right: 5px;
    bottom: 48px;
    ${mobileMedium} {
        bottom: -3px;
        right: 5px;
    }
    ${mobileLandscape} {
        right: 18px;
    }
    ${tablet} {
        bottom: 3px;
    }
    ${desktop} {
        display: none;
    }
`;

const veggieBurgerIcon = ({ showMainMenu }: { showMainMenu: boolean }) => {
    const beforeAfterStyles = css`
        content: '';
        background-color: currentColor;
    `;
    const lineStyles = css`
        height: 2px;
        left: 0;
        position: absolute;
        width: 20px;
    `;

    return css`
        top: 50%;
        right: 0;
        margin-top: -1px;
        margin-left: auto;
        margin-right: auto;
        ${lineStyles};
        background-color: ${showMainMenu ? 'transparent' : 'currentColor'};
        :before {
            ${lineStyles};
            ${beforeAfterStyles};
            ${showMainMenu
                ? `top: 0;
            transform: rotate(-45deg);
            `
                : 'top: -6px;'};
        }
        :after {
            ${lineStyles};
            ${beforeAfterStyles};
            ${showMainMenu
                ? `bottom: 0;
            transform: rotate(45deg);
            `
                : 'bottom: -6px;'};
        }
    `;
};

export const VeggieBurger: React.FC<{
    toggleMainMenu: (value: boolean) => void;
    showMainMenu: boolean;
    enhanceCheckbox: boolean;
    htmlFor: string;
    ariaControls: string;
}> = ({
    toggleMainMenu,
    showMainMenu,
    enhanceCheckbox,
    htmlFor,
    ariaControls,
}) => {
    if (enhanceCheckbox) {
        return (
            <button
                className={veggieBurger({ showMainMenu })}
                onClick={() => toggleMainMenu(!showMainMenu)}
                aria-controls={ariaControls}
                aria-label="Toggle main menu"
                data-link-name={`nav2 : veggie-burger : ${
                    showMainMenu ? 'hide' : 'show'
                }`}
            >
                <span className={veggieBurgerIcon({ showMainMenu })} />
            </button>
        );
    }

    return (
        <label
            className={veggieBurger({ showMainMenu })}
            onClick={() => toggleMainMenu(!showMainMenu)}
            htmlFor={htmlFor}
            tabIndex={0}
            role="button"
            aria-label="Toggle main menu"
        >
            <span className={veggieBurgerIcon({ showMainMenu })} />
        </label>
    );
};
