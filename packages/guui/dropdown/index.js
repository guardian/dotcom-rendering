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
    },
    ul: {
        listStyle: 'none',
        backgroundColor: 'white',
        padding: '0.375rem 0',
        boxShadow: '0 0 0 0.0625rem rgba(0,0,0,0.1)',
        borderRadius: '0.1875rem',
        position: 'absolute',
        right: '0',
        width: '12.5rem',
        zIndex: 1072,
    },
    'li a': {
        display: 'block',
        padding: '0.4375rem 1.25rem 0.9375rem 1.875rem',
    },

    a: {
        fontSize: 14,
        fontFamily: textSans,
        color: palette.neutral['1'],
        lineHeight: 1.2,
        position: 'relative',
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
    },

    'a:hover': {
        backgroundColor: '#ededed',
    },

    'a.active': {
        fontWeight: 'bold',
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
                <button onClick={this.toggle}>{label}</button>
                {this.state.isExpanded && (
                    <ul>
                        {links.map(link => (
                            <li
                                key={link.title}
                                className={link.isActive ? 'active' : ''}
                            >
                                <a href={link.url}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </Div>
        );
    }
}
