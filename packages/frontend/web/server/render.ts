import express from 'express';

import { document } from '@frontend/web/server/document';
import { extract as extractCAPI } from '@frontend/model/extract-capi';
import { extract as extractNAV } from '@frontend/model/extract-nav';
import { extract as extractGA } from '@frontend/model/extract-ga';
import { extract as extractConfig } from '@frontend/model/extract-config';
import { extract as extractLinkedData } from '@frontend/model/extract-linked-data';
import { validateRequestData } from '@root/packages/frontend/model/validate';
import { logger } from '@frontend/app/logging';

export const render = (
    { body, path }: express.Request,
    res: express.Response,
) => {
    let validatedBody: any;
    try {
        validatedBody = validateRequestData(body, path);
    } catch (e) {
        logger.warn(e);
        res.status(400).send(`<pre>${e.stack}</pre>`);
    }

    try {
        const resp = document({
            data: {
                site: 'frontend',
                page: 'Article',
                CAPI: extractCAPI(validatedBody),
                NAV: extractNAV(validatedBody),
                config: extractConfig(validatedBody),
                GA: extractGA(validatedBody),
                linkedData: extractLinkedData(validatedBody),
            },
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};
