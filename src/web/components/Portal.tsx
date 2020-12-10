import { useState } from 'react';
import ReactDOM from 'react-dom';

import { initPerf } from '@root/src/web/browser/initPerf';

type Props = {
    root: IslandType;
    children: React.ReactNode;
    dependencies?: unknown[];
    richLinkIndex?: number;
};

const isReady = (dependencies: unknown[]): boolean => {
    return dependencies.every((dep) => dep !== undefined);
};

export const Portal = ({
    root,
    children,
    dependencies = [],
    richLinkIndex,
}: Props) => {
    const [alreadyCreated, setAlreadyCreated] = useState(false);
    if (alreadyCreated) return null;
    if (!isReady(dependencies)) return null;
    const rootId = richLinkIndex ? `${root}-${richLinkIndex}` : root;
    const { start, end } = initPerf(`${rootId}-portal`);
    const element = document.getElementById(rootId);
    if (!element) return null;
    start();
    // First remove any placeholder. Why? Because we sometimes server side render Placeholders in
    // the root divs where the Portal is being inserted so the page is rendered with the placeholder
    // showing (to reduce jank). But ReactDOM.createPortal won't replace content so we need to
    // manually remove it here.
    const placeholderElement = element.querySelector(
        '[data-name="placeholder"]',
    );
    if (placeholderElement) placeholderElement.remove();
    const result = ReactDOM.createPortal(children, element);
    end();
    setAlreadyCreated(true);
    return result;
};
