// @flow
import { Component } from 'preact';
import styled from 'preact-emotion';
import { headline } from 'pasteup/fonts';
import palette from 'pasteup/palette';

const Heading = styled('h2')({
    fontFamily: headline,
    color: palette.neutral[1],
    fontSize: 20,
    lineHeight: 1.2,
    fontWeight: 900,
    marginTop: 27,
    marginBottom: 1,
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
                <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
            </div>
        );
    }
}
