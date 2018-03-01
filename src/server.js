// @flow

import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { ThemeProvider } from 'emotion-theming';
import guTheme from 'styles/guTheme';

import doc from 'lib/__html';

export default async (state: { page: string }): string => {
    const pageModule = await import(`./pages/${state.page}`);
    const Page = pageModule.default;
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(
            <ThemeProvider theme={guTheme}>
                <Page state={state} />
            </ThemeProvider>,
        ),
    );

    return doc({ html, state, css, cssIDs });
};
