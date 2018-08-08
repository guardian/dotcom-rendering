// @flow
/*
 * A dropdown component
 */

import { Component } from 'react';
import { css } from 'react-emotion';
import palette from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/fonts';
// import { screenReaderOnly } from '@guardian/pasteup/mixins';

export type Link = {
    url: string,
    title: string,
    isActive?: boolean,
};

type Props = {
    id: string,
    label: string,
    links: Array<Link>,
};

const input = css`
    // TODO re-add screen-reader only mixin
    :checked + ul {
        display: block;
    }
`;

const ul = css`
    z-index: 1072;
    list-style: none;
    background-color: white;
    padding: 6px 0;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    position: absolute;
    right: 0;
    width: 200px;
    display: none;
`;

const ulExpanded = css`
    ${ul};
    display: block;
`;

const link = css`
    font-size: 15px;
    font-family: ${textSans};
    color: ${palette.neutral['1']};
    line-height: 1.2;
    position: relative;
    transition: color 80ms ease-out;
    padding: 6px 10px;
    margin: -1px 0 0 0;
    text-decoration: none;

    display: block;
    padding: 10px 18px 15px 30px;

    :hover {
        text-decoration: underline;
        background-color: #ededed;
        text-decoration: none;
    }

    :focus {
        text-decoration: underline;
    }

    :before {
        content: '';
        border-top: 1px solid #ededed;
        display: block;
        position: absolute;
        top: 0px;
        left: 30px;
        right: 0px;
    }
`;

const linkActive = css`
    ${link};

    font-weight: bold;

    :after {
        content: '';
        border: 2px solid #c70000;
        border-top: 0px;
        border-right: 0px;
        position: absolute;
        top: 14px;
        left: 10px;
        width: 10px;
        height: 4px;
        transform: rotate(-45deg);
    }
`;

const linkFirst = css`
    :before {
        content: none;
    }
`;

const button = css`
    display: block;
    cursor: pointer;
    background: none;
    border: none;
    line-height: 1.2;
    font-size: 14px;
    font-family: ${textSans};
    color: ${palette.neutral['1']};
    transition: color 80ms ease-out;
    padding: 6px 10px;
    margin: 1px 0 0;
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }

    :focus {
        text-decoration: underline;
    }

    :after {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        transform: translateY(-2px) rotate(45deg);
        border: 1px solid currentColor;
        border-left: transparent;
        border-top: transparent;
        margin-left: 6px;
        vertical-align: middle;
        transition: transform 250ms ease-out;
    }

    .expanded:after,
    .expanded:after {
        transform: translateY(1px) rotate(-135deg);
    }
`;

const buttonExpanded = css`
    ${button};
    :after {
        transform: translateY(1px) rotate(-135deg);
    }
`;

export default class Dropdown extends Component<
    Props,
    { isExpanded: boolean, noJS: boolean },
> {
    constructor(props: Props) {
        super(props);
        this.state = { isExpanded: false, noJS: true };
        this.toggle_ = this.toggle.bind(this);
    }

    componentDidMount() {
        const dismiss = (event: KeyboardEvent) => {
            const escKey = 'Escape';
            if (event.code === escKey) {
                this.setState(() => ({
                    isExpanded: false,
                }));
            }
        };

        document.addEventListener('keydown', dismiss, false);

        // If componentDidMount runs we know client-side JS is enabled
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            noJS: false,
        });
    }

    toggle_: () => void;

    toggle() {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    render() {
        const { label, links } = this.props;

        // needs to be unique to allow multiple dropdowns on same page
        // this should be unique because JS is single-threaded
        const dropdownID = `dropbox-id-${this.props.id}`;
        const checkboxID = `checkbox-id-${this.props.id}`;

        return (
            <div>
                {this.state.noJS ? (
                    [
                        <label
                            htmlFor={checkboxID}
                            className={
                                this.state.isExpanded ? buttonExpanded : button
                            }
                            aria-controls={dropdownID}
                            aria-expanded={
                                this.state.isExpanded ? 'true' : 'false'
                            }
                        >
                            <input
                                className={input}
                                type="checkbox"
                                id={checkboxID}
                                aria-controls={dropdownID}
                                aria-checked="false"
                                tabIndex="-1"
                                key="OpenMainMenuCheckbox"
                                role="menuitemcheckbox"
                            />
                            {label}
                        </label>,
                    ]
                ) : (
                    <button
                        onClick={this.toggle_}
                        className={
                            this.state.isExpanded ? buttonExpanded : button
                        }
                        aria-controls={dropdownID}
                        aria-expanded={this.state.isExpanded ? 'true' : 'false'}
                    >
                        {label}
                    </button>
                )}

                <ul
                    id={dropdownID}
                    className={this.state.isExpanded ? ulExpanded : ul}
                >
                    {links.map((l, index) => (
                        <li key={l.title}>
                            <a
                                href={l.url}
                                className={`${l.isActive ? linkActive : link} ${
                                    index === 0 ? linkFirst : ''
                                }`}
                            >
                                {l.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
