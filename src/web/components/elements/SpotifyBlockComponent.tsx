import React from 'react';
import { css } from 'emotion';

export const SpotifyBlockComponent: React.FC<{
    embedUrl?: string;
    title?: string;
    height?: number;
    width?: number;
}> = ({ embedUrl, width, height, title }) => {
    return (
        <div
            className={css`
                iframe {
                    width: 100%;
                }
                margin-bottom: 16px;
            `}
            data-cy="spotify-embed"
        >
            <iframe
                src={embedUrl}
                title={title}
                height={height}
                width={width}
                allowFullScreen={true}
            />
        </div>
    );
};
