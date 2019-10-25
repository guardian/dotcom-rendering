import React from 'react';
import { css } from 'emotion';

import {
    desktop,
    mobileMedium,
    mobileLandscape,
    tablet,
    palette,
} from '@guardian/src-foundations';

const veggieBurger = ({
    showExpandedMenu,
}: {
    showExpandedMenu: boolean;
}) => css`
    background-color: ${palette.yellow.main};
    color: ${palette.neutral[7]};
    cursor: pointer;
    height: 42px;
    min-width: 42px;
    position: absolute;
    border: 0;
    border-radius: 50%;
    outline: none;
    z-index: ${showExpandedMenu ? 1071 : 0};
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

const veggieBurgerIcon = ({
    showExpandedMenu,
}: {
    showExpandedMenu: boolean;
}) => {
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
        background-color: ${showExpandedMenu ? 'transparent' : 'currentColor'};
        :before {
            ${lineStyles};
            ${beforeAfterStyles};
            ${showExpandedMenu
                ? `top: 0;
            transform: rotate(-45deg);
            `
                : 'top: -6px;'};
        }
        :after {
            ${lineStyles};
            ${beforeAfterStyles};
            ${showExpandedMenu
                ? `bottom: 0;
            transform: rotate(45deg);
            `
                : 'bottom: -6px;'};
        }
    `;
};

export const VeggieBurger: React.FC<{
    toggleExpandedMenu: (value: boolean) => void;
    showExpandedMenu: boolean;
    enhanceCheckbox: boolean;
    htmlFor: string;
    ariaControls: string;
}> = ({
    toggleExpandedMenu,
    showExpandedMenu,
    enhanceCheckbox,
    htmlFor,
    ariaControls,
}) => {
    if (enhanceCheckbox) {
        return (
            <button
                className={veggieBurger({ showExpandedMenu })}
                onClick={() => toggleExpandedMenu(!showExpandedMenu)}
                aria-controls={ariaControls}
                aria-label="Toggle main menu"
                data-link-name={`nav2 : veggie-burger : ${
                    showExpandedMenu ? 'hide' : 'show'
                }`}
            >
                <span className={veggieBurgerIcon({ showExpandedMenu })} />
            </button>
        );
    }

    return (
        <label
            className={veggieBurger({ showExpandedMenu })}
            onClick={() => toggleExpandedMenu(!showExpandedMenu)}
            htmlFor={htmlFor}
            tabIndex={0}
            role="button"
            aria-label="Toggle main menu"
        >
            <span className={veggieBurgerIcon({ showExpandedMenu })} />
        </label>
    );
};
