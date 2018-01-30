// @flow

import ReactDOM from 'react-dom';
import App from './app';

__webpack_public_path__ = '/assets/javascript/';

const render = () => {
    ReactDOM.hydrate(<App />, document.getElementById('app'));
};

render();
