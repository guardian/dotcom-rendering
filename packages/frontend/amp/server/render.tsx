import React from 'react';
import express from 'express';
import { document } from '@frontend/amp/server/document';
import AMPArticle from '@frontend/amp/pages/Article';
import { extractScripts } from '@root/packages/frontend/amp/lib/scripts';
import { extract as extractCAPI } from '@frontend/model/extract-capi';
import { extract as extractNAV } from '@frontend/model/extract-nav';
import { extract as extractConfig } from '@frontend/model/extract-config';

export const render = ({ body }: express.Request, res: express.Response) => {
    try {
        const CAPI = extractCAPI(body);
        const resp = document({
            scripts: extractScripts(CAPI.elements),
            body: (
                <AMPArticle
                    articleData={CAPI}
                    nav={extractNAV(body)}
                    config={extractConfig(body)}
                />
            ),
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};
