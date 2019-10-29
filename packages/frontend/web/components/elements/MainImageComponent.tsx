import React from 'react';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';

export const MainImageComponent: React.FC<{
    element: ImageBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
}> = ({ element, pillar, hideCaption }) => {
    return (
        <ImageComponent
            element={element}
            pillar={pillar}
            hideCaption={hideCaption}
        />
    );
};
