import React from 'react';
import { css, cx } from 'emotion';
import { textSans, palette } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

export interface Link {
    url: string;
    title: string;
    isActive?: boolean;
    dataLinkName: string;
}

interface Props {
    id: string;
    label: string;
    links: Link[];
    dataLinkName: string;
}

const input = css`
    ${visuallyHidden};
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
    display: none;

    ${until.tablet} {
        position: fixed;
        border-radius: 0;
        top: 32px;
        left: 0;
        right: 0;
        width: auto;
        max-height: calc(100% - 50px);
        overflow: auto;
    }

    ${from.tablet} {
        position: absolute;
        right: 0;
        width: 200px;
        border-radius: 3px;
    }
`;

const ulExpanded = css`
    display: block;
`;

const link = css`
    ${textSans({ level: 2 })};
    color: ${palette.neutral[7]};
    position: relative;
    transition: color 80ms ease-out;
    margin: -1px 0 0 0;
    text-decoration: none;
    display: block;
    padding: 10px 18px 15px 30px;

    :hover {
        background-color: ${palette.neutral[93]};
        text-decoration: none;
    }

    :focus {
        text-decoration: underline;
    }

    :before {
        content: '';
        border-top: 1px solid ${palette.neutral[93]};
        display: block;
        position: absolute;
        top: 0px;
        left: 30px;
        right: 0px;
    }
`;

const linkActive = css`
    font-weight: bold;

    :after {
        content: '';
        border: 2px solid ${palette.news.main};
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
    ${textSans({ level: 3 })};
    display: block;
    cursor: pointer;
    background: none;
    border: none;
    /* Design System: The buttons should be components that handle their own layout using primitives  */
    /* stylelint-disable-next-line property-blacklist */
    line-height: 1.2;
    color: ${palette.neutral[100]};
    transition: color 80ms ease-out;
    padding: 0px 10px 6px 5px;
    margin: 1px 0 0;
    text-decoration: none;

    :hover {
        color: ${palette.yellow.main};

        :after {
            transform: translateY(0) rotate(45deg);
        }
    }

    :after {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        transform: translateY(-2px) rotate(45deg);
        border: 1px solid currentColor;
        border-left: transparent;
        border-top: transparent;
        margin-left: 5px;
        vertical-align: middle;
        transition: transform 250ms ease-out;
    }
`;

const buttonExpanded = css`
    :hover:after {
        transform: translateY(-1px) rotate(-135deg);
    }
    :after {
        transform: translateY(1px) rotate(-135deg);
    }
`;

export class Dropdown extends React.Component<
    Props,
    { isExpanded: boolean; noJS: boolean }
> {
    private boundToggle: () => void;
    constructor(props: Props) {
        super(props);
        this.state = { isExpanded: false, noJS: true };
        this.boundToggle = this.toggle.bind(this);
    }

    public componentDidMount() {
        // If componentDidMount runs we know client-side JS is enabled
        this.setState({
            noJS: false,
        });
    }

    public toggle() {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    public render() {
        const { label, links } = this.props;

        if (this.state.isExpanded) {
            const removeListeners = () => {
                document.removeEventListener('keydown', dismissOnEsc);
                document.removeEventListener('click', dismissOnClick);
            };
            const dismissOnClick = (event: MouseEvent) => {
                event.stopPropagation();
                this.setState(() => ({
                    isExpanded: false,
                }));
                removeListeners();
            };
            const dismissOnEsc = (event: KeyboardEvent) => {
                const escKey = 'Escape';

                if (event.code === escKey) {
                    this.setState(() => ({
                        isExpanded: false,
                    }));
                    removeListeners();
                }
            };

            document.addEventListener('keydown', dismissOnEsc, false);
            document.addEventListener('click', dismissOnClick, false);
        }

        // needs to be unique to allow multiple dropdowns on same page
        // this should be unique because JS is single-threaded
        const dropdownID = `dropbox-id-${this.props.id}`;
        const checkboxID = `checkbox-id-${this.props.id}`;

        return (
            <>
                {this.state.noJS ? (
                    <label
                        htmlFor={checkboxID}
                        className={cx({
                            [button]: true,
                            [buttonExpanded]: this.state.isExpanded,
                        })}
                        aria-controls={dropdownID}
                        aria-expanded={this.state.isExpanded ? 'true' : 'false'}
                        role="button"
                    >
                        <input
                            className={input}
                            type="checkbox"
                            id={checkboxID}
                            aria-controls={dropdownID}
                            aria-checked="false"
                            tabIndex={-1}
                            key="OpenMainMenuCheckbox"
                            role="menuitemcheckbox"
                        />
                        {label}
                    </label>
                ) : (
                    <button
                        onClick={this.boundToggle}
                        className={cx({
                            [button]: true,
                            [buttonExpanded]: this.state.isExpanded,
                        })}
                        aria-controls={dropdownID}
                        aria-expanded={this.state.isExpanded ? 'true' : 'false'}
                        data-link-name={this.props.dataLinkName}
                    >
                        {label}
                    </button>
                )}

                <ul
                    id={dropdownID}
                    className={cx({
                        [ul]: true,
                        [ulExpanded]: this.state.isExpanded,
                    })}
                >
                    {links.map((l, index) => (
                        <li key={l.title}>
                            <a
                                href={l.url}
                                className={cx({
                                    [link]: true,
                                    [linkActive]: !!l.isActive,
                                    [linkFirst]: index === 0,
                                })}
                                data-link-name={l.dataLinkName}
                            >
                                {l.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
