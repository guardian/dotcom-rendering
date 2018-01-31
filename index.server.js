// @flow
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

import App from './app';

const { html, css } = extractCritical(renderToString(<App />));

export { html };
export { css };
