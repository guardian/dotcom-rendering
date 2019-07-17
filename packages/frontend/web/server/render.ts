import express from 'express';

import { document } from '@frontend/web/server/document';
// import { extract as extractGA } from '@frontend/model/extract-ga';
import { validateAsCAPIType as validateV2 } from '@frontend/modelV2/validate';

export const render = ({ body }: express.Request, res: express.Response) => {
    try {
        const CAPI = validateV2(body);

        const resp = document({
            data: {
                CAPI,
                site: 'frontend',
                page: 'Article',
                NAV: CAPI.nav,
                config: CAPI.config,
                GA: '', // TODO fixme with extractGA(body)
                linkedData: CAPI.linkedData,
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};
