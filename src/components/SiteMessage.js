// @flow
import { Component } from 'preact';
import styled from 'preact-emotion';
import { transparentize } from 'polished';

import pallete from 'pasteup/palette';
import CloseButton from 'components/buttons/Close';

const Overlay = styled('div')(({ foregroundColor, backgroundColor, fade }) => ({
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
    transform: fade ? 'translateY(100%)' : 'translateY(0)',
    transition: 'transform .1s ease-out',
}));

export default class SiteMessage extends Component {
    constructor(props) {
        super(props);

        this.state = { closed: false, fade: false };
    }

    close = () => {
        this.setState({ fade: true });
        setTimeout(() => this.setState({ closed: true }), 300);
    };

    render() {
        const renderOverlay = !this.state.closed;
        return (
            renderOverlay && (
                <Overlay
                    foregroundColor={this.props.foregroundColor}
                    backgroundColor={this.props.backgroundColor}
                    fade={this.state.fade}
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
SiteMessage.defaultProps = {
    foregroundColor: 'white',
    backgroundColor: pallete.neutral[1],
};
