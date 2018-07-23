// @flow
/*
 * A dropdown component
 */

import { styled, Component } from '@guardian/guui';
import palette from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/fonts';

type Link = {
    url: string,
    title: string,
    isActive: boolean,
};

type Props = {
    label: string,
    links: Array<Link>,
};

const Div = styled('div')({
    button: {
        cursor: 'pointer',
        background: 'none',
        border: 'none',

        fontSize: 14,
        fontFamily: textSans,
        color: palette.neutral['1'],
        lineHeight: 1.2,
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
            width: '0.25rem',
            height: '0.25rem',
            transform: 'translateY(-0.125rem) rotate(45deg)',
            border: '0.0625rem solid currentColor',
            borderLeft: 'transparent',
            borderTop: 'transparent',
            marginLeft: '6px',
            verticalAlign: 'middle',
            transition: 'transform 250ms ease-out',
        },
    },

    'button.expanded:after': {
        transform: 'translateY(0.0625rem) rotate(-135deg)',
    },

    ul: {
        zIndex: 1072,
        listStyle: 'none',
        backgroundColor: 'white',
        padding: '0.375rem 0',
        boxShadow: '0 0 0 0.0625rem rgba(0,0,0,0.1)',
        borderRadius: '0.1875rem',
        position: 'absolute',
        right: '0',
        width: '12.5rem',
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
            borderTop: '0.0625rem solid #ededed',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: '1.875rem',
            right: 0,
        },
    },

    'a:hover': {
        backgroundColor: '#ededed',
        textDecoration: 'none',
    },

    'a.active': {
        fontWeight: 'bold',

        ':after': {
            content: '""',
            border: '0.125rem solid #c70000',
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

// TODOs:
// - add parent link
// - toggle display
// - accessibility stuff (navigate with keyboard, ESC, etc., tags?)

export default class Dropdown extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = { isExpanded: true };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    render() {
        const { label, links } = this.props;

        return (
            <Div>
                <button
                    onClick={this.toggle}
                    className={this.state.isExpanded ? 'expanded' : ''}
                >
                    {label}
                </button>
                {this.state.isExpanded && (
                    <ul>
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
                )}
            </Div>
        );
    }
}
