// @flow
import { Component } from 'preact';
import styled from 'preact-emotion';

const MostViewed = styled('div');

MostViewed.displayName = 'MostViewed';

export default class MostViewedComp extends Component {
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
            <MostViewed>
                <h1>Most Viewed</h1>
                <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
            </MostViewed>
        );
    }
}
