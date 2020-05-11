export interface Reporter {
    report: (err: Error, tags: { [key: string]: string }) => void;
}

export const initPerf = (name: string) => {
    const perf = window.performance;
    const startKey = `${name}-start`;
    const endKey = `${name}-end`;

    const start = () => {
        perf.mark(startKey);
    };
    const end = () => {
        perf.mark(endKey);
        perf.measure(name, startKey, endKey);
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(perf.getEntriesByName(name)));
    };

    return {
        start,
        end,
    };
};

const measure = (name: string, task: () => Promise<void>): void => {
    const { start, end } = initPerf(name);

    start();

    task()
        // You could use 'finally' here to prevent this duplication but finally isn't supported
        // in Chrome 59 which is used by Cypress in headless mode so if you do it will
        // break the Cypress tests on CI
        // See: https://github.com/cypress-io/cypress/issues/2651#issuecomment-432698837
        .then(end)
        .catch(end);
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
