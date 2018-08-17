// @flow
import { css } from 'react-emotion';

import {
    tablet,
    desktop,
    mobileMedium,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';

const veggieBurger = ({ showMainMenu }) => css`
    background-color: #121212;
    top: 24px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    color: #e9eff1;
    cursor: pointer;
    height: 40px;
    min-width: 40px;
    position: absolute;
    border: 0;
    border-radius: 50%;
    outline: none;
    right: 5px;
    z-index: ${showMainMenu ? 1071 : 0};
    ${mobileMedium} {
        bottom: -6px;
        height: 48px;
        min-width: 48px;
        top: auto;
    }
    ${mobileLandscape} {
        right: 51px;
    }
    ${tablet} {
        z-index: 0;
    }
    ${desktop} {
        display: none;
    }
`;

const veggieBurgerIcon = ({ showMainMenu }) => {
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

type Props = {
    toggleMainMenu: () => void,
    showMainMenu: boolean,
    enhanceCheckbox: boolean,
    htmlFor: string,
    ariaControls: string,
};

export default ({
    toggleMainMenu,
    showMainMenu,
    enhanceCheckbox,
    htmlFor,
    ariaControls,
}: Props) => {
    if (enhanceCheckbox) {
        return (
            // eslint-disable-next-line jsx-a11y/label-has-for
            <label
                className={veggieBurger({ showMainMenu })}
                onClick={() => toggleMainMenu()}
                aria-controls={ariaControls}
                htmlFor={htmlFor}
            >
                <span className={veggieBurgerIcon({ showMainMenu })} />
            </label>
        );
    }

    return (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <label
            className={veggieBurger({ showMainMenu })}
            onClick={() => toggleMainMenu()}
            htmlFor={htmlFor}
            tabIndex="0"
        >
            <span className={veggieBurgerIcon({ showMainMenu })} />
        </label>
    );
};
