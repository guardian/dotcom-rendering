import { Component } from 'react';

class Dateline extends Component<
    { dateDisplay: string },
    { dateDisplay: string }
> {
    constructor(props: { dateDisplay: string }) {
        super(props);
        this.state = { dateDisplay: this.props.dateDisplay };
    }
    public render() {
        return this.state.dateDisplay;
    }
}

export default Dateline;
