// @flow
import { styled, Component } from '@guardian/guui';
import { transparentize } from 'polished';

import pallete from '@guardian/pasteup/palette';
import CloseButton from '@guardian/guui/buttons/Close';

type SiteMessageProps = {
    foregroundColor: string,
    backgroundColor: string,
    children?: React.Node,
};

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

export default class SiteMessage extends Component<SiteMessageProps, *> {
    static defaultProps: SiteMessageProps = {
        foregroundColor: 'white',
        backgroundColor: pallete.neutral[1],
    };

    constructor(props: SiteMessageProps) {
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
