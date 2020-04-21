import React from 'react';
import { css } from 'emotion';

import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

const veggieBurgerStyles = (display: Display) => css`
    background-color: ${brandAlt[400]};
    color: ${neutral[7]};
    cursor: pointer;
    height: 42px;
    min-width: 42px;
    position: absolute;
    border: 0;
    border-radius: 50%;
    outline: none;

    /* TODO: we should not use such a hight z-index number  */
    z-index: 1071;

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

const veggieBurgerIconStyles = (CHECKBOX_ID: string) => {
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

        /*
            IMPORTANT NOTE:
            we need to specify the adjacent path to the a (current) tag
            to apply styles to the nested tabs due to the face we use ~
            to support NoJS
        */
        background-color: currentColor;
        ${'#' + CHECKBOX_ID}:checked ~ label & {
            background-color: transparent;
        }
        :before {
            ${lineStyles};
            ${beforeAfterStyles};

            /*
                IMPORTANT NOTE:
                we need to specify the adjacent path to the a (current) tag
                to apply styles to the nested tabs due to the face we use ~
                to support NoJS
            */
            top: -6px;
            ${'#' + CHECKBOX_ID}:checked ~ label & {
                top: 0;
                transform: rotate(-45deg);
            }
        }
        :after {
            ${lineStyles};
            ${beforeAfterStyles};

            bottom: -6px;
            /*
                IMPORTANT NOTE:
                we need to specify the adjacent path to the a (current) tag
                to apply styles to the nested tabs due to the face we use ~
                to support NoJS
            */
            ${'#' + CHECKBOX_ID}:checked ~ label & {
                bottom: 0;
                transform: rotate(45deg);
            }
        }
    `;
};

export const VeggieBurger: React.FC<{
    display: Display;
    CHECKBOX_ID: string;
    ariaControls: string;
}> = ({ display, CHECKBOX_ID }) => (
    // TODO: accessible
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control
    <label
        className={veggieBurgerStyles(display)}
        tabIndex={0}
        htmlFor={CHECKBOX_ID}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        aria-label="Toggle main menu"
    >
        <span className={veggieBurgerIconStyles(CHECKBOX_ID)} />
    </label>
);
