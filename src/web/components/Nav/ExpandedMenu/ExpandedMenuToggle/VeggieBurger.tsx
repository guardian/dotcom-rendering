import React from 'react';
import { css } from 'emotion';

import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import { NoJSButton } from './NoJSButton';

const screenReadable = css`
    ${visuallyHidden};
`;

const veggieBurgerIconStyles = (menuCheckboxId: string) => {
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
        /* stylelint-disable-line */
        ${`#${menuCheckboxId}`}:checked ~ label & {
            background-color: transparent;
        }

        top: 50%;
        right: 0;
        margin-top: -1px;
        margin-left: auto;
        margin-right: auto;
        ${lineStyles};

        :before {
            ${lineStyles};
            ${beforeAfterStyles};
            /* refer to comment above */
            top: -6px;
            /* stylelint-disable-line */
            ${`#${menuCheckboxId}`}:checked ~ label & {
                top: 0;
                transform: rotate(-45deg);
            }
        }
        :after {
            ${lineStyles};
            ${beforeAfterStyles};
            /* refer to comment above */
            bottom: -6px;
            /* stylelint-disable-line */
            ${`#${menuCheckboxId}`}:checked ~ label & {
                bottom: 0;
                transform: rotate(45deg);
            }
        }
    `;
};

export const VeggieBurger: React.FC<{
    display: Display;
    menuCheckboxId: string;
}> = ({ display, menuCheckboxId }) => {
    return (
        <NoJSButton
            display={display}
            isVeggieBurger={true}
            dataLinkName="nav2 : veggie-burger"
            menuCheckboxId={menuCheckboxId}
        >
            <span className={screenReadable}>Show More</span>
            <span className={veggieBurgerIconStyles(menuCheckboxId)} />
        </NoJSButton>
    );
};
