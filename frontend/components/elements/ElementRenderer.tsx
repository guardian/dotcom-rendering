import { RawComponent } from '../elements/RawComponent';
import { ImageBlockComponent } from '../elements/ImageBlockComponent';
import React from 'react';
import { css } from 'emotion';
export const ArticleRenderer: React.SFC<{ elements: CAPIElement[] }> = ({
    elements,
}) => {
    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.liveblog.TextBlockElement':
                    return <RawComponent key={i} html={element.html} />;
                case 'model.liveblog.TweetBlockElement':
                    return (
                        <div
                            className={css`
                                width: 100%;
                                background: aqua;
                            `}
                        >
                            <RawComponent key={i} html={element.html} />
                        </div>
                    );
                case 'model.liveblog.ImageBlockElement':
                    return <ImageBlockComponent key={i} element={element} />;
                default:
                    return null;
            }
        })
        .filter(_ => _ != null);
    return <>{output}</>;
};
