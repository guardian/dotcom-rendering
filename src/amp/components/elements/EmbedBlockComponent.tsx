import React from 'react';

export const EmbedBlockComponent: React.FC<{
    element: EmbedBlockElement;
}> = ({ element }) => {
    if (element.isMandatory && !element.url) {
        throw new Error(
            'This page cannot be rendered due to incompatible content that is marked as mandatory.',
        );
    }
    if (element.url) {
        return (
            <figure>
                <script
                    async={true}
                    custom-element="amp-embedly-card"
                    src="https://cdn.ampproject.org/v0/amp-embedly-card-0.1.js"
                />
                <amp-embedly-card
                    data-url={element.url}
                    layout="responsive"
                    height="100"
                    width="320"
                />
            </figure>
        );
    }
    return null;
};
