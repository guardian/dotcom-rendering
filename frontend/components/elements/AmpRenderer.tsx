import { RawComponent } from './RawComponent';
import { ImageBlockComponent } from './ImageBlockComponent/amp';
import React from 'react';
import { FailRenderingComponent } from './FailRenderingComponent';
export const AMPRenderer: React.SFC<{ elements: CAPIElement[] }> = ({
    elements,
}) => {
    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.liveblog.TextBlockElement':
                    return <RawComponent key={i} html={element.html} />;
                case 'model.liveblog.TweetBlockElement':
                    return <FailRenderingComponent element={element} />;
                case 'model.liveblog.ImageBlockElement':
                    return <ImageBlockComponent key={i} element={element} />;
                default:
                    return null;
            }
        })
        .filter(_ => _ != null);
    return <>{output}</>;
};
// make crash component
