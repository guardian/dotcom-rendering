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
