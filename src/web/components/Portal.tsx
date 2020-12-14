import ReactDOM from 'react-dom';

type Props = {
    root: IslandType;
    children: React.ReactNode;
    richLinkIndex?: number;
};

export const Portal = ({ root, children, richLinkIndex }: Props) => {
    const rootId = richLinkIndex ? `${root}-${richLinkIndex}` : root;
    const element = document.getElementById(rootId);
    if (!element) return null;
    const perf = window && window.performance;
    if (perf) perf.mark(`${rootId}-portal-start`);

    // he root divs where the Portal is being inserted so the page is rendered with the placeholder
    // showing (to reduce jank). But ReactDOM.createPortal won't replace content so we need to
    // manually remove it here.
    const placeholderElement = element.querySelector(
        '[data-name="placeholder"]',
    );
    if (placeholderElement) placeholderElement.remove();

    const result = ReactDOM.createPortal(children, element);
    if (perf) perf.mark(`${rootId}-portal-end`);
    if (perf)
        perf.measure(
            `${rootId}-portal`,
            `${rootId}-portal-start`,
            `${rootId}-portal-end`,
        );
    return result;
};
