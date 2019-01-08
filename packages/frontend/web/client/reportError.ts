/*
   Report errors to Sentry with optional tags metadata
*/

import { getRaven } from '@frontend/web/client/raven';

type ReportedError = Error & {
    reported?: boolean;
};

export const reportError = (
    err: ReportedError,
    tags: { [key: string]: string },
    shouldThrow: boolean = true,
): void => {
    getRaven().then(raven => {
        raven.captureException(err, { tags });

        if (shouldThrow) {
            // Flag to ensure it is not reported to Sentry again via global handlers
            const error = err;
            error.reported = true;
            throw error;
        }
    });
};
