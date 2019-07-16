import React from 'react';
import { ImageBlockComponent } from '@frontend/web/components/elements/ImageBlockComponent';

export const MainMedia: React.FC<{ element: CAPIElement; pillar: Pillar }> = ({
    element,
    pillar,
}) => {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
            return <ImageBlockComponent element={element} pillar={pillar} />;
        default:
            return null;
    }
};
