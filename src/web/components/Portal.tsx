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
    // Remove any children. Why? Because we sometimes server render Placeholders in
    // the root divs where the Portal is being inserted and we want to remove then
    // when we load in the client side content
    // See: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    element.textContent = '';
    return ReactDOM.createPortal(children, element);
    window.performance.mark(`${rootId}-portal-end`);
    window.performance.measure(
        `${rootId}-portal`,
        `${rootId}-portal-start`,
        `${rootId}-portal-end`,
    );
};
