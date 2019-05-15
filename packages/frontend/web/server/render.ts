import express from 'express';

import {
    getNavigationData,
    makeGuardianNavigation,
} from '@frontend/app/nav/navigation';

import { document } from '@frontend/web/server/document';
import { extract as extractCAPI } from '@frontend/model/extract-capi';
import { extract as extractNAV } from '@frontend/model/extract-nav';
import { extract as extractGA } from '@frontend/model/extract-ga';
import { extract as extractConfig } from '@frontend/model/extract-config';
import { extract as extractLinkedData } from '@frontend/model/extract-linked-data';

const editionToLocalEdition = (edition: string): EditionLong => {
    switch (edition) {
        case 'UK':
            return 'uk';
        case 'US':
            return 'us';
        case 'AU':
            return 'au';
        case 'INT':
            return 'international';
        default:
            return 'uk';
    }
};

const getStage = (): string =>
    process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

let navData: any = getNavigationData(getStage())
    .then(data => (navData = data))
    .catch(() => {
        throw Error('Failed to get navigation data');
    });

export const render = ({ body }: express.Request, res: express.Response) => {
    try {
        if (!navData) {
            throw Error('Failed to get navigation data before request');
        }

        const navPos = extractNAV(body);
        const capi = extractCAPI(body);

        const nav = makeGuardianNavigation(
            navData,
            editionToLocalEdition(capi.editionId),
            navPos.currentUrl,
            undefined, // TODO: support custom signposting
            navPos.readerRevenueLinks,
        );

        const resp = document({
            data: {
                site: 'frontend',
                page: 'Article',
                CAPI: capi,
                NAV: nav,
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
