import { TextBlockComponent } from '../elements/TextBlockComponent';
import { ImageBlockComponent } from '../elements/ImageBlockComponent';
import React from 'react';

export const ArticleRenderer: React.SFC<{ elements: CAPIElement[] }> = ({
    elements,
}) => {
    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.dotcomrendering.pageElements.TextBlockElement':
                    return <TextBlockComponent key={i} html={element.html} />;
                case 'model.dotcomrendering.pageElements.ImageBlockElement':
                    return <ImageBlockComponent key={i} element={element} />;
                default:
                    return null;
            }
        })
        .filter(_ => _ != null);
    return <>{output}</>;
};
