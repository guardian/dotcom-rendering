import React, { Component } from 'react';
import { css, cx } from 'emotion';

import {
    headline,
    visuallyHidden,
    desktop,
    palette,
} from '@guardian/src-foundations';

import { VeggieBurger } from './VeggieBurger';

const screenReadable = css`
    ${visuallyHidden};
`;
const openExpandedMenu = css`
    ${headline({ level: 3 })};
    font-weight: 300;
    color: ${palette.neutral[100]};
    cursor: pointer;
    display: none;
    position: relative;
    overflow: hidden;
    border: 0;
    background-color: transparent;
    height: 48px;
    padding-left: 9px;
    padding-right: 20px;
    ${desktop} {
        display: block;
        padding-top: 5px;
        height: 42px;
    }
    :hover {
        color: ${palette.yellow.main};
    }
    :focus {
        color: ${palette.yellow.main};
    }
`;
const checkbox = css`
    :checked {
        + div {
            display: block;
        }
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
    showExpandedMenu: boolean;
    toggleExpandedMenu: (value: boolean) => void;
    ariaControls: string;
}

export class ExpandedMenuToggle extends Component<
    Props,
    { enhanceCheckbox: boolean }
> {
    constructor(props: Props) {
        super(props);

        this.state = {
            enhanceCheckbox: false,
        };
    }

    public componentDidMount() {
        /*
            componentDidMount is only executed in the browser therefore if
            enhanceCheckbox is set to true it indicates that JS is running
            in the browser and we should re-render without the NO JS fallback.
            https://reactjs.org/docs/react-component.html#componentdidmount

         */
        this.setState({
            enhanceCheckbox: true,
        });
    }

    public render() {
        const {
            toggleExpandedMenu,
            ariaControls,
            showExpandedMenu,
        } = this.props;
        const { enhanceCheckbox } = this.state;
        const CHECKBOX_ID = 'main-menu-toggle';

        if (enhanceCheckbox) {
            return [
                <VeggieBurger
                    showExpandedMenu={showExpandedMenu}
                    toggleExpandedMenu={toggleExpandedMenu}
                    enhanceCheckbox={enhanceCheckbox}
                    htmlFor={CHECKBOX_ID}
                    ariaControls={ariaControls}
                    key="VeggieBurger"
                />,
                <button
                    className={openExpandedMenu}
                    onClick={() => toggleExpandedMenu(!showExpandedMenu)}
                    aria-controls={ariaControls}
                    key="OpenExpandedMenuButton"
                    data-link-name={`nav2 : veggie-burger : ${
                        showExpandedMenu ? 'show' : 'hide'
                    }`}
                >
                    <span className={screenReadable}>Show</span>
                    <span className={text({ showExpandedMenu })}>More</span>
                </button>,
            ];
        }

        return [
            <VeggieBurger
                showExpandedMenu={showExpandedMenu}
                toggleExpandedMenu={toggleExpandedMenu}
                enhanceCheckbox={enhanceCheckbox}
                htmlFor={CHECKBOX_ID}
                ariaControls={ariaControls}
                key="VeggieBurger"
            />,
            // We can't nest the input inside the label because the structure is important for CSS reasons
            <label
                className={openExpandedMenu}
                htmlFor={CHECKBOX_ID}
                tabIndex={0}
                key="OpenExpandedMenuLabel"
            >
                <span className={screenReadable}>Show</span>
                <span className={text({ showExpandedMenu })}>More</span>
            </label>,
            <input
                type="checkbox"
                className={cx(screenReadable, checkbox)}
                id={CHECKBOX_ID}
                aria-controls={ariaControls}
                tabIndex={-1}
                key="OpenExpandedMenuCheckbox"
                role="menuitemcheckbox"
                aria-checked="false"
            />,
        ];
    }
}
