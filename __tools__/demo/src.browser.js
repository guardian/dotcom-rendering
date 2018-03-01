// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate } from 'react-dom';

import Src from './Src';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const componentPath = window.location.pathname.split('/src/')[1];

if (module.hot) {
    module.hot.accept();
}

const render = (demos = {}) => {
    hydrate(
        <Src demos={{ ...demos }} path={componentPath} />,
        document.getElementById('app'),
    );
};

import(`../../src/${componentPath}.demo.js`)
    .then(render)
    .catch(render);
