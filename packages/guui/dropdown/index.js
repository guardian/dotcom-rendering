// @flow
/*
 * A dropdown component
 */

import { styled, Component } from '@guardian/guui';

type Link = {
    url: string,
    title: string,
};

type Props = {
    label: string,
    links: Array<Link>,
};

const Div = styled('div')({});

// TODOs:
// - add parent link
// - toggle display
// - accessibility stuff (navigate with keyboard, ESC, etc., tags?)

export default class Dropdown extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = { isExpanded: false };
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
                            <li key={link.title}>
                                <a href={link.url}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </Div>
        );
    }
}
