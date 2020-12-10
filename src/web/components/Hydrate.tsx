import ReactDOM from 'react-dom';

import { initPerf } from '@root/src/web/browser/initPerf';

type Props = {
    root: IslandType;
    index?: number;
    children: JSX.Element;
};

export const Hydrate = ({ root, index, children }: Props) => {
    const rootId = index === 0 || index ? `${root}-${index}` : root;
    const { start, end } = initPerf(`${rootId}-hydrate`);
    const element = document.getElementById(rootId);
    if (!element) return null;
    start();
    ReactDOM.hydrate(children, element, () => {
        end();
    });
    return null;
};
