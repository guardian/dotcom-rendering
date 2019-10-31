export interface Reporter {
    report: (err: Error, tags: { [key: string]: string }) => void;
}

const measure = (name: string, task: () => Promise<void>): void => {
    const perf = window.performance;
    const start = `${name}-start`;
    const end = `${name}-end`;

    perf.mark(start);

    function markEnd() {
        perf.mark(end);
        perf.measure(name, start, end);

        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(perf.getEntriesByName(name)));
    }

    task()
        // You could use 'finally' here to prevent this duplication but finally isn't supported
        // in Chrome 59 which is used by Cypress in headless mode so if you do it will
        // break the Cypress tests on CI
        // See: https://github.com/cypress-io/cypress/issues/2651#issuecomment-432698837
        .then(markEnd)
        .catch(markEnd);
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
