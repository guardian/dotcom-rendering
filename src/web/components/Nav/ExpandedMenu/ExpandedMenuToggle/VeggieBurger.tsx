import React from 'react';
import { css } from 'emotion';

import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';

const screenReadable = css`
    ${visuallyHidden};
`;

const veggieBurgerIconStyles = (navInputCheckboxId: string) => {
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
        background-color: currentColor;
        /*
            IMPORTANT NOTE:
            we need to specify the adjacent path to the a (current) tag
            to apply styles to the nested tabs due to the fact we use ~
            to support NoJS
        */
        /* stylelint-disable */
        ${`#${navInputCheckboxId}`}:checked ~ label & {
            background-color: transparent;
        }
        /* stylelint-enable */

        top: 50%;
        right: 0;
        margin-top: -1px;
        margin-left: auto;
        margin-right: auto;
        ${lineStyles};

        :before {
            ${lineStyles};
            ${beforeAfterStyles};
            top: -6px;
            /* refer to comment above */
            /* stylelint-disable */
            ${`#${navInputCheckboxId}`}:checked ~ label & {
                top: 0;
                transform: rotate(-45deg);
            }
            /* stylelint-enable */
        }
        :after {
            ${lineStyles};
            ${beforeAfterStyles};
            bottom: -6px;
            /* refer to comment above */
            /* stylelint-disable */
            ${`#${navInputCheckboxId}`}:checked ~ label & {
                bottom: 0;
                transform: rotate(45deg);
            }
            /* stylelint-enable */
        }
    `;
};

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

export const VeggieBurger: React.FC<{
    display: Display;
    navInputCheckboxId: string;
    id: string;
}> = ({ display, navInputCheckboxId, id }) => {
    return (
        /* eslint-disable @typescript-eslint/ban-ts-ignore, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role */
        // @ts-ignore
        <label
            id={id}
            className={veggieBurgerStyles(display)}
            aria-label="Toggle main menu"
            key="OpenExpandedMenuButton"
            htmlFor={navInputCheckboxId}
            data-link-name="nav2 : veggie-burger: show"
            // @ts-ignore
            tabindex={0}
            role="button"
        >
            <span className={screenReadable}>Show More</span>
            <span className={veggieBurgerIconStyles(navInputCheckboxId)} />
        </label>
        /* eslint-enable @typescript-eslint/ban-ts-ignore, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role  */
    );
};
