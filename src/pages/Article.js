// @flow

import Article from 'components/pages/Article';
import init from '../browser';

if (module.hot) {
    module.hot.accept();
    require('preact/debug'); // eslint-disable-line global-require
}

init(Article);
