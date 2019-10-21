import React from 'react';
import { MainImageComponent } from '@frontend/web/components/elements/MainImageComponent';

export const MainMedia: React.FC<{ element: CAPIElement; pillar: Pillar }> = ({
    element,
    pillar,
}) => {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
            return <MainImageComponent element={element} pillar={pillar} />;
        default:
            return null;
    }
};
