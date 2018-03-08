// @flow

import ArticleImmersive from 'components/pages/Article.immersive.js';
import init from '../browser';

if (module.hot) {
    module.hot.accept();
    require('preact/debug'); // eslint-disable-line global-require
}

init(ArticleImmersive);
