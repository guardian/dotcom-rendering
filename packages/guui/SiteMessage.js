// @flow
import { styled, Component } from '@guardian/guui';
import { transparentize } from 'polished';

import pallete from 'pasteup/palette';
import CloseButton from 'components/buttons/Close';

const duration = 100;

const Overlay = styled('div')(
    ({ foregroundColor, backgroundColor, close }) => ({
        backgroundColor: transparentize(0.03, backgroundColor),
        color: foregroundColor,
        fill: foregroundColor,
        width: ' 100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
        transform: close ? 'translateY(100%)' : 'translateY(0)',
        transition: `transform ${duration}ms ease-out`,
    }),
);

export default class SiteMessage extends Component {
    static defaultProps = {
        foregroundColor: 'white',
        backgroundColor: pallete.neutral[1],
    };

    constructor(props) {
        super(props);

        this.state = { closed: false, close: false };
    }

    close = () => {
        this.setState({ close: true });
        setTimeout(
            () =>
                window.requestAnimationFrame(() =>
                    this.setState({ closed: true }),
                ),
            duration,
        );
    };

    render() {
        const renderOverlay = !this.state.closed;
        return (
            renderOverlay && (
                <Overlay
                    foregroundColor={this.props.foregroundColor}
                    backgroundColor={this.props.backgroundColor}
                    close={this.state.close}
                    {...this.props}
                >
                    {this.props.children}
                    <CloseButton
                        foregroundColor={this.props.foregroundColor}
                        backgroundColor={this.props.backgroundColor}
                        onClick={this.close}
                    />
                </Overlay>
            )
        );
    }
}

