// @flow
/* eslint-disable global-require,import/no-dynamic-require */

import { log } from 'util';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { Provider } from 'unstated';

import doc from 'lib/__html';
import App from 'lib/AppContainer';

// just while we're not getting a full state from play
import appConfig from '../__config__/app';

const fetchPage = async data => {
    const module = await import(`./pages/${data.page}`);
    const Page = module.default;

    const app = new App(data);

    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(
            <Provider inject={[app]}>
                <Page />
            </Provider>,
        ),
    );

    return doc({ html, data, css, cssIDs });
};

export default () => async (req, res) => {
    try {
        const html = await fetchPage({
            page: req.params.page,
            ...appConfig,
            ...req.body,
        });
        res.status(200).send(html);
    } catch (e) {
        log(e);
        res.status(404).send(`¯\\_(ツ)_/¯ ${req.params.page} does not exist`);
    }
};
