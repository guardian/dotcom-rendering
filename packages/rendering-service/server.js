// @flow
/* eslint-disable global-require */

import path from 'path';
import defaultDocument from '@guardian/guui/document';

import express from 'express';
import type { $Request, $Response } from 'express';

import { dist } from '../../config';

const render = async ({ params, body }: $Request, res: $Response) => {
    try {
        const { site, page } = params;
        const data = {
            site,
            page,
            body,
        };

        const [{ default: Page }, document] = await Promise.all([
            import(`../sites/${site}/pages/${page}`),
            import(`../sites/${site}/document`)
                .then(module => module.default)
                .catch(() => defaultDocument),
        ]);

        const pageSrc = await document({ Page, data });
        res.status(200).send(pageSrc);
    } catch (e) {
        res.status(500).send(e.stack);
    }
};

if (process.env.NODE_ENV === 'production') {
    const app = express();

    app.use(express.json({ limit: '50mb' }));
    app.use(
        '/static',
        express.static(path.join(__dirname, '..', 'src', 'static')),
    );
    app.use('/assets/javascript', express.static(dist));
    app.use(':page', render);

    // express requires all 4 args here:
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res.status(500).send(err.stack);
    });
    app.listen(9000);
}

export default render;
