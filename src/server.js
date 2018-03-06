// @flow
/* eslint-disable global-require,import/no-dynamic-require */

import { log } from 'util';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import fetch from 'node-fetch';

import doc from 'lib/__html';

import fakeState from '../__data__';

const fetchPage = async (data: { page: string }): string => {
    const pageModule = await import(`./pages/${data.page}`);
    const Page = pageModule.default;
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(<Page data={data} />),
    );

    return doc({ html, data, css, cssIDs });
};

export default () => async (req, res) => {
    // just while we're not getting a state from play
    const data = fakeState(req.params.page);

    const { html: ignoreMe, ...config } = await fetch(
        `${req.query.url ||
            'https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance'}.json`,
    ).then(article => article.json());

    try {
        const html = await fetchPage({ ...data, ...config });
        res.status(200).send(html);
    } catch (e) {
        log(e);
    }
};
