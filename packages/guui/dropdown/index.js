// @flow
/*
 * A dropdown component
 */

import { styled, Component } from '@guardian/guui';
import palette from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/fonts';
import { screenReaderOnly } from '@guardian/pasteup/mixins';

export type Link = {
    url: string,
    title: string,
    isActive?: boolean,
};

type Props = {
    label: string,
    links: Array<Link>,
};

const Div = styled('div')({
    'button, label': {
        display: 'block',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        lineHeight: 1.2,

        fontSize: 14,
        fontFamily: textSans,
        color: palette.neutral['1'],
        transition: 'color 80ms ease-out',
        padding: '6px 10px',
        margin: '1px 0 0',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline',
        },
        ':focus': {
            textDecoration: 'underline',
        },

        ':after': {
            content: '""',
            display: 'inline-block',
            width: '4px',
            height: '4px',
            transform: 'translateY(-2px) rotate(45deg)',
            border: '1px solid currentColor',
            borderLeft: 'transparent',
            borderTop: 'transparent',
            marginLeft: '6px',
            verticalAlign: 'middle',
            transition: 'transform 250ms ease-out',
        },
    },

    'button.expanded:after, label.expanded:after': {
        transform: 'translateY(1px) rotate(-135deg)',
    },

    ul: {
        zIndex: 1072,
        listStyle: 'none',
        backgroundColor: 'white',
        padding: '6px 0',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
        borderRadius: '3px',
        position: 'absolute',
        right: '0',
        width: '200px',
        display: 'none',
    },

    'ul.expanded': {
        display: 'block',
    },

    'li a': {
        display: 'block',
        padding: '10px 18px 15px 30px',
    },

    a: {
        fontSize: '15px',
        fontFamily: textSans,
        color: palette.neutral['1'],
        lineHeight: 1.2,
        position: 'relative',
        transition: 'color 80ms ease-out',
        padding: '6px 10px',
        margin: '-1px 0 0 0',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline',
        },
        ':focus': {
            textDecoration: 'underline',
        },

        ':before': {
            content: '""',
            borderTop: '1px solid #ededed',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: '30px',
            right: 0,
        },
    },

    // no top border for first item
    'li:first-child a:before': {
        content: 'none',
    },

    'a:hover': {
        backgroundColor: '#ededed',
        textDecoration: 'none',
    },

    'a.active': {
        fontWeight: 'bold',

        ':after': {
            content: '""',
            border: '2px solid #c70000',
            borderTop: 0,
            borderRight: 0,
            position: 'absolute',
            top: '14px',
            left: '10px',
            width: '10px',
            height: '4px',
            transform: 'rotate(-45deg)',
        },
    },
});

const NoJSCheckbox = styled('input')({
    ...screenReaderOnly,
    ':checked + ul': {
        display: 'block',
    },
});

export default class Dropdown extends Component<
    Props,
    { isExpanded: boolean, noJS: boolean },
> {
    constructor(props: Props) {
        super(props);
        this.state = { isExpanded: false, noJS: true };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const dismiss = (event: KeyboardEvent) => {
            const escKey = 27;
            if (event.keyCode === escKey) {
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

    toggle: () => void; // indicate method writable for flow so can bind in constructor
    toggle() {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    render() {
        const { label, links } = this.props;

        // needs to be unique to allow multiple dropdowns on same page
        // this should be unique because JS is single-threaded
        const dropdownID = `dropbox-id-${Date.now()}`;
        const checkboxID = `checkbox-id-${Date.now()}`;

        return (
            <Div>
                {this.state.noJS ? (
                    [
                        // eslint-disable-next-line jsx-a11y/label-has-for
                        <label
                            htmlFor={checkboxID}
                            className={this.state.isExpanded ? 'expanded' : ''}
                            aria-controls={dropdownID}
                            aria-expanded={
                                this.state.isExpanded ? 'true' : 'false'
                            }
                        >
                            {label}
                        </label>,
                        <NoJSCheckbox
                            type="checkbox"
                            id={checkboxID}
                            aria-controls={dropdownID}
                            tabIndex="-1"
                            key="OpenMainMenuCheckbox"
                            role="menuitemcheckbox"
                        />,
                    ]
                ) : (
                    <button
                        onClick={this.toggle}
                        className={this.state.isExpanded ? 'expanded' : ''}
                        aria-controls={dropdownID}
                        aria-expanded={this.state.isExpanded ? 'true' : 'false'}
                    >
                        {label}
                    </button>
                )}

                <ul
                    id={dropdownID}
                    className={this.state.isExpanded ? 'expanded' : ''}
                >
                    {links.map(link => (
                        <li key={link.title}>
                            <a
                                href={link.url}
                                className={link.isActive ? 'active' : ''}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </Div>
        );
    }
}
