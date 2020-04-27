import React from 'react';
import { css } from 'emotion';

import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import { VeggieBurger } from './VeggieBurger';
import { NoJSButton } from './NoJSButton';

const screenReadable = css`
    ${visuallyHidden};
`;

const showMoreTextStyles = (menuCheckboxId: string) => css`
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

        /*
            IMPORTANT NOTE:
            we need to specify the adjacent path to the a (current) tag
            to apply styles to the nested tabs due to the fact we use ~
            to support NoJS
        */
        transform: translateY(-3px) rotate(45deg);
        /* stylelint-disable-line */
        ${`#${menuCheckboxId}`}:checked ~ & {
            transform: translateY(1px) rotate(-135deg);
        }

        transition: transform 250ms ease-out;
        vertical-align: middle;
        width: 8px;
    }
    :hover:after {
        /* refer to comment above */
        transform: translateY(0) rotate(45deg);
        /* stylelint-disable-line */
        ${`#${menuCheckboxId}`}:checked ~ & {
            transform: translateY(-2px) rotate(-135deg);
        }
    }
`;

interface Props {
    display: Display;
    menuCheckboxId: string;
}

export const ExpandedMenuToggle = ({ display, menuCheckboxId }: Props) => (
    <>
        <VeggieBurger
            display={display}
            menuCheckboxId={menuCheckboxId}
            key="VeggieBurger"
        />
        <NoJSButton
            isVeggieBurger={false}
            display={display}
            dataLinkName="nav2"
            menuCheckboxId={menuCheckboxId}
        >
            <span className={screenReadable}>Show</span>
            <span className={showMoreTextStyles(menuCheckboxId)}>More</span>
        </NoJSButton>
    </>
);
