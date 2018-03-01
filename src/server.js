// @flow

import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

import doc from 'lib/__html';

export default async (state: { page: string }): string => {
    const pageModule = await import(`./pages/${state.page}`);
    const Page = pageModule.default;
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(<Page state={state} />),
    );

    return doc({ html, state, css, cssIDs });
};
