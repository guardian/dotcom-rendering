// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { styled } from 'styletron-react';

const Monospace = styled('span', {
    fontFamily: 'Inconsolata',
});

const Header = styled('div', {
    fontFamily: 'Guardian Agate Sans',
    fontSize: '13px',
    paddingBottom: '2rem',
});

const Frame = styled('iframe', {
    border: 'none',
    width: '100%',
});

const FrameSize = styled('div', {
    width: '100%',
    textAlign: 'center',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    fontFamily: 'Guardian Agate Sans',
    fontSize: '13px',
    position: 'relative',
    color: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.8rem',
    ':before': {
        content: "''",
        backgroundColor: '#ddd',
        position: 'absolute',
        width: '100%',
        top: '7px',
        left: 0,
        height: '1px',
    },
    ':after': {
        content: 'attr(data-breakpoint)',
        backgroundColor: '#efefef',
        color: '#c3c3c3',
        position: 'relative',
        padding: '0 1ch',
        textShadow: '1px 1px 0px rgba(255, 255, 255, 0.5)',
    },
});

const breakpoints = {
    mobile: 320,
    mobileMedium: 360,
    mobileLandscape: 480,
    phablet: 660,
    tablet: 740,
    desktop: 980,
    leftCol: 1140,
    wide: 1300,
};

export default class extends React.Component<
    { path: string },
    { breakpoint: ?string },
> {
    constructor(props) {
        super(props);
        this.state = {
            breakpoint: '?',
        };
        this.handleMessage = this.handleMessage.bind(this);
    }

    componentDidMount() {
        window.addEventListener('message', this.handleMessage, false);
    }

    handleMessage({ data }: { data: { ComponentWindowWidth?: number } }) {
        if (data.ComponentWindowWidth) {
            const bp = Object.keys(breakpoints).reduce(
                (prev, key) =>
                    breakpoints[key] > breakpoints[prev] &&
                    breakpoints[key] < data.ComponentWindowWidth
                        ? key
                        : prev,
            );
            this.setState({ breakpoint: bp });
        }
    }

    render() {
        return (
            <div>
                <Header>
                    <Monospace>
                        <a
                            href={`https://github.com/guardian/guui/blob/master/src/${
                                this.props.path
                            }.js`}
                        >
                            /src/{this.props.path}.js
                        </a>
                    </Monospace>
                </Header>

                <FrameSize data-breakpoint={this.state.breakpoint}>
                    {this.state.breakpoint}
                </FrameSize>

                <Frame
                    src={`http://localhost:3000/component/${this.props.path}`}
                />
            </div>
        );
    }
}
