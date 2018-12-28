import express from 'express';

import document from '@frontend/web/server/document';
import { extract as extractCAPI } from '@frontend/lib/model/extract-capi';
import { extract as extractNAV } from '@frontend/lib/model/extract-nav';
import { extract as extractGA } from '@frontend/lib/model/extract-ga';
import { extract as extractConfig } from '@frontend/lib/model/extract-config';

export const render = ({ body }: express.Request, res: express.Response) => {
    try {
        const resp = document({
            data: {
                site: 'frontend',
                page: 'Article',
                CAPI: extractCAPI(body),
                NAV: extractNAV(body),
                config: extractConfig(body),
                GA: extractGA(body),
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};
