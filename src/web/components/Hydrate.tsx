import ReactDOM from 'react-dom';

type Props = {
    root: IslandType;
    children: JSX.Element;
};

export const Hydrate = ({ root, children }: Props) => {
    const element = document.getElementById(root);
    if (!element) return null;
    window.performance.mark(`${root}-hydrate-start`);
    ReactDOM.hydrate(children, element);
    window.performance.mark(`${root}-hydrate-end`);
    window.performance.measure(
        `${root}-hydrate`,
        `${root}-hydrate-start`,
        `${root}-hydrate-end`,
    );
    return null;
};
