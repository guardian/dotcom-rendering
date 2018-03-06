// @flow
/* eslint-disable global-require,import/no-dynamic-require */

import { log } from 'util';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

import doc from 'lib/__html';

// just while we're not getting a full state from play
import appConfig from '../__config__/app';

const fetchPage = async ({ page, data }) => {
    const pageModule = await import(`./pages/${page}`);
    const Page = pageModule.default;
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(<Page data={data} />),
    );

    return doc({ html, data, css, cssIDs });
};

export default () => async (req, res) => {
    try {
        const html = await fetchPage({
            page: req.params.page,
            data: { ...appConfig, ...req.body },
        });
        res.status(200).send(html);
    } catch (e) {
        log(e);
    }
};
