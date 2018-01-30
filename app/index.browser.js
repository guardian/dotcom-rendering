// @flow

import { hydrate } from 'react-dom';
import App from './app';

__webpack_public_path__ = '/assets/javascript/';

hydrate(<App />, document.getElementById('app'));
