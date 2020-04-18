import React from 'react';
import { css } from 'emotion';

import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';

const veggieBurger = ({
    display,
    showExpandedMenu,
}: {
    display: Display;
    showExpandedMenu: boolean;
}) => css`
    background-color: ${brandAlt[400]};
    color: ${neutral[7]};
    cursor: pointer;
    height: 42px;
    min-width: 42px;
    position: absolute;
    border: 0;
    border-radius: 50%;
    outline: none;
    ${until.tablet} {
        z-index: 1;
    }
    ${from.tablet} {
        z-index: ${showExpandedMenu ? 1071 : 0};
    }
    right: 5px;
    bottom: 48px;
    ${from.mobileMedium} {
        bottom: ${display === 'immersive' ? '3px' : '-3px'};
        right: 5px;
    }
    ${from.mobileLandscape} {
        right: 18px;
    }
    ${from.tablet} {
        bottom: 3px;
    }
    ${from.desktop} {
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
    display: Display;
    toggleExpandedMenu: (value: boolean) => void;
    showExpandedMenu: boolean;
    enhanceCheckbox: boolean;
    htmlFor: string;
    ariaControls: string;
}> = ({
    display,
    toggleExpandedMenu,
    showExpandedMenu,
    enhanceCheckbox,
    htmlFor,
    ariaControls,
}) => {
    if (enhanceCheckbox) {
        return (
            <button
                className={veggieBurger({ display, showExpandedMenu })}
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
        // TODO: Refactor this component to work better without js. Where better
        // means working and accessible
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control
        <label
            className={veggieBurger({ display, showExpandedMenu })}
            onClick={() => toggleExpandedMenu(!showExpandedMenu)}
            htmlFor={htmlFor}
            tabIndex={0}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
            aria-label="Toggle main menu"
        >
            <span className={veggieBurgerIcon({ showExpandedMenu })} />
        </label>
    );
};
