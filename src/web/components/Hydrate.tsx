import { useState } from 'react';
import ReactDOM from 'react-dom';

import { initPerf } from '@root/src/web/browser/initPerf';

type Props = {
    root: IslandType;
    dependencies?: unknown[];
    children: JSX.Element;
    index?: number;
};

const isReady = (dependencies: unknown[]): boolean => {
    return dependencies.every((dep) => dep !== undefined);
};

export const Hydrate = ({
    root,
    index,
    dependencies = [],
    children,
}: Props) => {
    const [alreadyHydrated, setAlreadyHydrated] = useState(false);
    if (alreadyHydrated) return null;
    if (!isReady(dependencies)) return null;
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
