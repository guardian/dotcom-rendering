// @flow
/* eslint-disable import/no-extraneous-dependencies */
import { styled } from 'styletron-react';

const Preview = styled('div', {
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});

const GithubLink = styled('a', {
    float: 'right',
    paddingLeft: '1em',
    textDecoration: 'none',
    color: '#121212',
    ':hover': {
        color: 'hotpink',
    },
    ':after': {
        content: '" ‣"',
    },
});

const Isolate = styled(GithubLink, {
    ':after': {
        content: '" ➚"',
    },
});

const Header = styled('div', {
    fontFamily: 'Guardian Agate Sans',
    fontSize: '13px',
    paddingBottom: '2rem',
});

const Frame = styled('iframe', {
    border: 'none',
    width: '100%',
    flex: 1,
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
        top: '6px',
        left: 0,
        height: '1px',
    },
    ':after': {
        content: 'attr(data-breakpoint)',
        backgroundColor: 'white',
        color: '#c3c3c3',
        position: 'relative',
        padding: '0 1ch',
        textShadow: '1px 1px 0px rgba(255, 255, 255, 0.5)',
    },
});

const Selector = styled('select', {
    marginLeft: '1ex',
});

const breakpoints: {
    [string]: number,
} = {
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
    { breakpoint: string },
> {
    constructor(props: { path: string }) {
        super(props);
        this.state = {
            breakpoint: '?',
        };
    }

    componentDidMount() {
        window.addEventListener('message', this.handleMessage, false);
    }

    handleChange = event => {
        window.location = `${window.location.origin}/demo/${
            event.target.value
        }`;
    };

    handleMessage = (e: { data: { ComponentWindowWidth?: number } }): void => {
        const width = e.data.ComponentWindowWidth;
        if (typeof width === 'number') {
            const bp = Object.keys(breakpoints).reduce(
                (prev, breakpoint): string => {
                    const test = breakpoints[breakpoint];

                    return test > breakpoints[prev] && test <= width
                        ? breakpoint
                        : prev;
                },
                'mobile',
            );

            this.setState({ breakpoint: bp });
        }
    };

    render() {
        return (
            <Preview>
                <Header>
                    demo for
                    <Selector
                        value={this.props.path}
                        onChange={this.handleChange}
                    >
                        {this.props.availableDemos.map(demo => {
                            const name = `components/${
                                demo.split('.demo.js')[0]
                            }`;
                            return (
                                <option key={demo} value={name}>
                                    {name}
                                </option>
                            );
                        })}
                    </Selector>
                    <GithubLink
                        href={`https://github.com/guardian/guui/blob/master/src/${
                            this.props.path
                        }.js`}
                    >
                        github
                    </GithubLink>
                    <Isolate
                        href={`http://localhost:3000/src/${this.props.path}`}
                    >
                        isolate
                    </Isolate>
                </Header>

                <FrameSize data-breakpoint={this.state.breakpoint} />

                <Frame src={`http://localhost:3000/src/${this.props.path}`} />
            </Preview>
        );
    }
}
