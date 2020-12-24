import ReactDOM from 'react-dom';

type Props = {
    root: IslandType;
    index?: number;
    children: JSX.Element;
};

export const Hydrate = ({ root, index, children }: Props) => {
    const rootWithIndex = index === 0 || index ? `${root}-${index}` : root;
    const element = document.getElementById(rootWithIndex);
    if (!element) return null;
    window.performance?.mark(`${rootWithIndex}-hydrate-start`);
    ReactDOM.hydrate(children, element);
    window.performance?.mark(`${rootWithIndex}-hydrate-end`);
    window.performance?.measure(
        `${rootWithIndex}-hydrate`,
        `${rootWithIndex}-hydrate-start`,
        `${rootWithIndex}-hydrate-end`,
    );
    return null;
};
