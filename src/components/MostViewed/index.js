// @flow
import { Component } from 'preact';

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
                <h1>Most Viewed</h1>
                <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
            </div>
        );
    }
}
