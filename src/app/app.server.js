// @flow

import { renderToString } from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import requireDir from 'require-dir';

import doc from './__html';

const pages = requireDir('../pages');

export default (state: { page: string }): string => {
    const Page = pages[state.page].default;
    const styletron = new Styletron();

    const html = renderToString(
        <StyletronProvider styletron={styletron}>
            <Page />
        </StyletronProvider>,
    );

    const stylesForHead = styletron.getStylesheetsHtml();

    return doc({ html, stylesForHead, state });
};
