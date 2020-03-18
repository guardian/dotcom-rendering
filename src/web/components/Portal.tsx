import ReactDOM from 'react-dom';

type Props = {
    root: IslandType;
    children: JSX.Element;
    richLinkIndex?: number;
};

export const Portal = ({ root, children, richLinkIndex }: Props) => {
    const rootId = richLinkIndex ? `${root}-${richLinkIndex}` : root;
    const element = document.getElementById(rootId);
    if (!element) return null;
    window.performance.mark(`${rootId}-portal-start`);
    return ReactDOM.createPortal(children, element);
    window.performance.mark(`${rootId}-portal-end`);
    window.performance.measure(
        `${rootId}-portal`,
        `${rootId}-portal-start`,
        `${rootId}-portal-end`,
    );
};
