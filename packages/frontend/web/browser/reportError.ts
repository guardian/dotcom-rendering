/*
 * Report errors to Sentry with optional tags metadata
 * Preserved for react components for now
 */

export type ReportedError = Error & {
    reported?: boolean;
};

export const reportError = (
    err: ReportedError,
    tags: { [key: string]: string },
    shouldThrow: boolean = true,
): void => {
    if (window.guardian.modules.raven) {
        window.guardian.modules.raven.reportError(err, tags, shouldThrow);
    } else {
        // tslint:disable-next-line: no-console
        console.log(
            `Attempting to log error without having registered raven.\nError is: ${err.message}`,
        );
    }
};
