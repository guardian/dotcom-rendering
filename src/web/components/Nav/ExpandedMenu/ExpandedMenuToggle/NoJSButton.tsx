import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import {
    brandText,
    brandAlt,
    neutral,
} from '@guardian/src-foundations/palette';

type Props = {
    menuCheckboxId: string;
    display: Display;
    isVeggieBurger: boolean;
    dataLinkName: string;
    children: JSX.Element | JSX.Element[];
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

export const NoJSButton = ({
    menuCheckboxId,
    display,
    isVeggieBurger,
    dataLinkName,
    children,
}: Props) => {
    // Supporting NoJS and accessibility is hard.

    // We have therefore have added JS to help us make the page accessibile.
    // Adding JS to onKeyDown as a fall back to replace onClick input checkbox
    // helps us keep some accessiblity for keyboard only users.
    // This is not a perfect solution as not all screen readers support JS
    // https://webaim.org/projects/screenreadersurvey8/#javascript

    return (
        // We are using label and `htmlFor` prop to be able to toggle an input checkbox
        // However this means that we are using a label as a button and lose out on
        // browser accessiblity.

        // We need Typescript to ignore the abnormal props we have added to the label
        // But in JSX this can be sometimes a little difficult
        // https://github.com/microsoft/TypeScript/issues/27552#issuecomment-427928685

        /* eslint-disable @typescript-eslint/ban-ts-ignore, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role */
        // @ts-ignore

        <label
            className={
                isVeggieBurger
                    ? veggieBurgerStyles(display)
                    : openExpandedMenu(display)
            }
            aria-label="Toggle main menu"
            key="OpenExpandedMenuButton"
            htmlFor={menuCheckboxId}
            data-link-name={dataLinkName}
            onKeyDown={e => {
                // keyCode: 13 is the Enter key
                if (e.keyCode === 13) {
                    // @ts-ignore
                    document && document.getElementById(menuCheckboxId).click();
                }
            }}
            // @ts-ignore
            tabindex={0}
            role="button"
        >
            {children}
        </label>
        /* eslint-enable @typescript-eslint/ban-ts-ignore, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role  */
    );
};
