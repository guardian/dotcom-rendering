import React from 'react';
import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';

import { Display } from '@guardian/types/Format';

type Props = {
    display: Display;
    designType: DesignType;
    element: ImageBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
    title?: string;
};

export const ImageBlockComponent = ({
    display,
    designType,
    element,
    pillar,
    hideCaption,
    title,
}: Props) => {
    const { role } = element;
    return (
        <ImageComponent
            display={display}
            designType={designType}
            element={element}
            pillar={pillar}
            hideCaption={hideCaption}
            role={role}
            title={title}
        />
    );
};
