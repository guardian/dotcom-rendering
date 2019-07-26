import express from 'express';
import { extract as extractNAV } from '@frontend/model/extract-nav';

import { document } from '@frontend/web/server/document';
import { validateAsCAPIType } from '@frontend/model/validate';

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
                GA: '', // TODO fixme with extractGA(body)
                linkedData: CAPI.linkedData,
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};
