import express from 'express';
import { extract as extractNAV } from '@frontend/model/extract-nav';

import { document } from '@frontend/web/server/document';
import { validateAsCAPIType } from '@frontend/model/validate';
import { extract as extractGA } from '@frontend/model/extract-ga';
import { bodyJSON } from '@frontend/model/exampleBodyJSON';

export const render = ({ body }: express.Request, res: express.Response) => {
    try {
        const CAPI = validateAsCAPIType(body);

        const resp = document({
            data: {
                CAPI,
                site: 'frontend',
                page: 'Article',
                NAV: extractNAV(CAPI.nav),
                config: Object.assign(
                    {},
                    { isDev: process.env.NODE_ENV !== 'production' },
                    CAPI.config,
                ),
                GA: extractGA(CAPI),
                linkedData: CAPI.linkedData,
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};

export const renderPerfTest = (req: express.Request, res: express.Response) => {
    req.body = JSON.parse(bodyJSON);
    render(req, res);
};
