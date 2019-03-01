// import Loadable from 'react-loadable';
import React from 'react';

interface IslandProps<P> {
    component: React.ComponentType<P>;
    from: string;
    data: P;
}

/**
 * Hydrates a component in the client by async loading the exported component.
 * This does not take children.
 * THE COMPONENT MUST BE A DEFAULT EXPORT FOR NOW.
 * i am aware that this makes me hypocritical
 *
 * @param component - The component as it is exported.
 * @param from - The location of the component in /components.
 * @param data - What you want fed into the component.
 *
 */
export const Island: <P>(
    _: IslandProps<P>,
) => React.ReactElement<IslandProps<P>> = ({ component, from, data }) => (
    <div
        className="js-island"
        data-island={from}
        data-data={JSON.stringify(data)}
    >
        {React.createElement(component, data)}
    </div>
);
