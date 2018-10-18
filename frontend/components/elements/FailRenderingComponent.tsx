import React from 'react';

export const FailRenderingComponent: React.SFC<{
    element: CAPIElement;
}> = ({ element }) => {
    throw new Error(`We were unable to render ${element._type} with contents:
    ${JSON.stringify(element)}`);
};
