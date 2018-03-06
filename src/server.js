// @flow
/* eslint-disable global-require,import/no-dynamic-require */

import { log } from 'util';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

import doc from 'lib/__html';

const fetchPage = async (data: { page: string }): string => {
    const pageModule = await import(`./pages/${data.page}`);
    const Page = pageModule.default;
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(<Page data={data} />),
    );

    return doc({ html, data, css, cssIDs });
};

export default () => async (req, res) => {
    const pageType = req.params[0].split('/pages/')[0];
    const data = require(`../.data/${pageType}`);

    try {
        const html = await fetchPage(data);
        res.status(200).send(html);
    } catch (e) {
        log(e);
    }
};
