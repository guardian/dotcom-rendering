// @flow
import { Component } from 'preact';
import styled from 'preact-emotion';
import { headline, textEgyptian } from 'pasteup/fonts';
import palette from 'pasteup/palette';
import { desktop } from 'pasteup/breakpoints';

const Heading = styled('h2')({
    fontFamily: headline,
    color: palette.neutral[1],
    fontSize: 20,
    lineHeight: 1.2,
    fontWeight: 900,
    marginTop: 27,
    marginBottom: 1,
});

const Main = styled('div')({
    '.headline-column--desktop': {
        columnFill: 'balance',
        [desktop]: {
            columnWidth: 600,
        },
    },
    '.headline-column--desktop__item': {
        height: '100%',
        display: 'inline-block',
        width: '100%',
    },
    '.headline-list__item': {
        paddingTop: '0.1875rem',
        paddingBottom: 0,
        minHeight: '4.5rem',
    },
    '.inline-numbers': {
        float: 'left',
    },
    '.headline-list__text': {
        marginLeft: '4.375rem',
    },
    '.inline-garnett-quote__svg': {
        height: '1rem',
        width: '0.54rem',
        marginRight: '0.5rem',
        transform: 'translateY(-0.0625rem)',
    },
    '.headline-list__body': {
        color: palette.neutral[2],
        fontFamily: textEgyptian,
    },
});

export default class MostViewed extends Component {
    constructor() {
        super();
        this.setState({
            html: 'Placeholder text',
        });
    }

    componentDidMount() {
        fetch('https://api.nextgen.guardianapps.co.uk/most-read-geo.json')
            .then(resp => resp.json())
            .then(({ html }) => {
                this.setState({
                    html,
                });
            });
    }

    render() {
        return (
            <div>
                <Heading>Most Viewed</Heading>
                <Main dangerouslySetInnerHTML={{ __html: this.state.html }} />
            </div>
        );
    }
}
