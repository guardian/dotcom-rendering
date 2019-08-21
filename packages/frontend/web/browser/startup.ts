export interface Reporter {
    report: (
        err: Error,
        tags: { [key: string]: string },
        shouldThrow: boolean,
    ) => void;
}

const measure = (name: string, task: () => Promise<void>): void => {
    const perf = window.performance;
    const start = `${name}-start`;
    const end = `${name}-end`;

    perf.mark(start);

    task().finally(() => {
        perf.mark(end);
        perf.measure(name, start, end);

        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(perf.getEntriesByName(name)));
    });
};

export const startup = <A>(
    name: string,
    helpers: A,
    task: (helpers: A) => Promise<void>,
): void => {
    measure(name, task.bind(null, helpers));
};
