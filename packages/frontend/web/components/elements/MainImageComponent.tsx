import React from 'react';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';

export const MainImageComponent: React.FC<{
    element: ImageBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    return <ImageComponent element={element} pillar={pillar} />;
};
