import Loadable from 'react-loadable';
import React from 'react';
// tslint:disable-file:react-no-dangerous-html

export const Island: React.FC<{ s: React.Component; c: string; data: any }> = ({
    s,
    c,
    data,
}) => {
    const L = Loadable({
        loader: () => import(c),
        loading() {
            return s(data);
        },
    });
    return (
        <div className="js-island" data-island={c} data-data={JSON.stringify(data)}>
            {s(data)}
        </div>
    );
};
