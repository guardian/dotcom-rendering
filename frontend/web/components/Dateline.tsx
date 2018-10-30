import { Component } from 'react';
import { getCookie } from '../lib/cookie';
import dateformat from 'dateformat';

const dtFormatGU = (date: Date, edition: string): string => {
    let datetimeFormatted: string = dateformat(date, 'ddd d mmm yyyy HH:MM Z');
    if (edition === 'UK') {
        datetimeFormatted = datetimeFormatted.replace('GMT+0100', 'BST');
    }
    return datetimeFormatted;
};

const defaultEdition = 'UK';

class Dateline extends Component<
    { capiDate: Date },
    { capiDate: Date; edition: string }
> {
    constructor(props: { capiDate: Date }) {
        super(props);
        this.state = { capiDate: this.props.capiDate, edition: defaultEdition };
    }
    public componentDidMount() {
        const cookieEdition = getCookie('GU_EDITION');
        if (cookieEdition && this.state.edition !== cookieEdition) {
            this.setState({
                capiDate: this.state.capiDate,
                edition: cookieEdition,
            });
        }
    }
    public render() {
        return dtFormatGU(this.state.capiDate, this.state.edition);
    }
}

export default Dateline;
