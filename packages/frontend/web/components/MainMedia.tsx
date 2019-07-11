import React from 'react';
import { ImageBlockComponent } from '@frontend/web/components/elements/ImageBlockComponent';

export const MainMedia: React.FC<{ element: GenericElement }> = ({
    element,
}) => {
    const capiElement = element as CAPIElement;

    switch (capiElement._type) {
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
            return <ImageBlockComponent element={capiElement} />;
        default:
            return null;
    }
};
