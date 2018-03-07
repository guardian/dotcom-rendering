// @flow
import { Container } from 'unstated';

export default class AppContainer extends Container {
    constructor(props) {
        super(props);
        this.state = props;
    }
}
