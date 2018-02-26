// @flow

import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import requireDir from 'require-dir';
import { ThemeProvider } from 'emotion-theming';
import guTheme from 'styles/guTheme';

import doc from 'lib/__html';

const pages = requireDir('./pages');

export default (state: { page: string }): string => {
    const Page = pages[state.page].default;

    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(
            <ThemeProvider theme={guTheme}>
                <Page />
            </ThemeProvider>,
        ),
    );

    return doc({ html, state, css, cssIDs });
};
