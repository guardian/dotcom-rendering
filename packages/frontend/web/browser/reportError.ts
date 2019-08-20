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
    // tslint:disable-next-line: no-console
    console.log('This is a stub - not for PROD.');
};
