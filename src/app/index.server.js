// @flow

import { renderToString } from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';

import doc from './__html';
import App from './App';

export default (): string => {
    const styletron = new Styletron();

    const html = renderToString(
        <StyletronProvider styletron={styletron}>
            <App />
        </StyletronProvider>,
    );

    const stylesForHead = styletron.getStylesheetsHtml();

    return doc({ html, stylesForHead });
};
