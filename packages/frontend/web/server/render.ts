import express from 'express';

import document from '@frontend/web/server/document';
import { extract as extractCAPI } from '@frontend/model/extract-capi';
import { extract as extractNAV } from '@frontend/model/extract-nav';
import { extract as extractGA } from '@frontend/model/extract-ga';
import { extract as extractConfig } from '@frontend/model/extract-config';
import { extract as extractLinkedData } from '@frontend/model/extract-linked-data';

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
                linkedData: extractLinkedData(body),
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};
