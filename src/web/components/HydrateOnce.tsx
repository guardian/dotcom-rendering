import { useState } from 'react';
import ReactDOM from 'react-dom';

import { initPerf } from '@root/src/web/browser/initPerf';

type Props = {
    root: IslandType;
    children: JSX.Element;
    index?: number;
    waitFor?: unknown[];
};

const isReady = (dependencies: unknown[]): boolean => {
    return dependencies.every((dep) => dep !== undefined);
};

/**
 * Finds the element with the same id as `root` and calls `ReactDOM.hydrate(children, element)`. Only
 * executes once and only after all variables in `waitFor` are defined.
 * @param {String} root - The id of the element to hydrate
 * @param children - The react elements passed to ReactDOM.hydrate()
 * @param {number} index - Used when there are multiple elements the same (eg. RichLinks)
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const HydrateOnce = ({ root, children, index, waitFor = [] }: Props) => {
    const [alreadyHydrated, setAlreadyHydrated] = useState(false);
    if (alreadyHydrated) return null;
    if (!isReady(waitFor)) return null;
    const rootId = index === 0 || index ? `${root}-${index}` : root;
    const { start, end } = initPerf(`${rootId}-hydrate`);
    const element = document.getElementById(rootId);
    if (!element) return null;
    start();
    ReactDOM.hydrate(children, element, () => {
        end();
    });
    setAlreadyHydrated(true);
    return null;
};
