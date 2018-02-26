// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate } from 'react-dom';

import Demo from './Demo';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const { availableDemos } = window.gu.app.state;

const componentPath = window.location.pathname.split('/demo/')[1];

hydrate(
    <Demo path={componentPath} availableDemos={availableDemos} />,
    document.getElementById('app'),
);
