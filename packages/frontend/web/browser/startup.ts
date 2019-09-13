export interface Reporter {
    report: (
        err: Error,
        tags: { [key: string]: string },
        shouldThrow: boolean,
    ) => void;
}

const modulesStarted = window.guardian.config.modules.started;

const measure = (name: string, task: () => Promise<void>): void => {
    const perf = window.performance;
    const start = `${name}-start`;
    const end = `${name}-end`;

    perf.mark(start);

    task().finally(() => {
        perf.mark(end);
        perf.measure(name, start, end);

        // Keep track of the module names that have been initialised
        modulesStarted.push(name);

        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(perf.getEntriesByName(name)));
    });
};

export const startup = <A>(
    name: string,
    helpers: A,
    task: (helpers: A) => Promise<void>,
): void => {
    const measureMe = () => {
        measure(name, task.bind(null, helpers));
    };
    if (window.guardian.mustardCut || window.guardian.polyfilled) {
        measureMe();
    } else {
        window.guardian.queue.push(measureMe);
    }
};
