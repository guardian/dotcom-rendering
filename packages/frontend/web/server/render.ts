import express from 'express';

import { document } from '@frontend/web/server/document';
import { extract as extractCAPI } from '@frontend/model/extract-capi';
import { extract as extractGA } from '@frontend/model/extract-ga';
import { validateAsCAPIType as validateV2 } from '@frontend/modelV2/validate';

export const render = ({ body }: express.Request, res: express.Response) => {
    try {
        const CAPI = body.version === 3 ? validateV2(body) : extractCAPI(body);

        const resp = document({
            data: {
                CAPI,
                site: 'frontend',
                page: 'Article',
                NAV: CAPI.nav,
                config: CAPI.config,
                GA: extractGA(body), // TODO fixme
                linkedData: CAPI.linkedData,
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};
