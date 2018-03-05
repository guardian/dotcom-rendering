// @flow
/* eslint-disable global-require,import/no-dynamic-require */

import { log } from 'util';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

import doc from 'lib/__html';

const fetchPage = async (state: { page: string }): string => {
    const pageModule = await import(`./pages/${state.page}`);
    const Page = pageModule.default;
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(<Page state={state} />),
    );

    return doc({ html, state, css, cssIDs });
};

export default () => (req, res) => {
    const pageType = req.params[0].split('/pages/')[0];
    const data = require(`../.data/${pageType}`);

    fetchPage(data)
        .then(html => {
            res.status(200).send(html);
        })
        .catch(e => {
            log(e);
        });
};
