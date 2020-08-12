import React from 'react';
import { css } from 'emotion';

export const SpotifyBlockComponent: React.FC<{
    embedUrl?: string;
    title?: string;
    height?: number;
    width?: number;
}> = ({ embedUrl, title, width, height }) => {
    return (
        <>
            {embedUrl && title && width && height && (
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
            )}
        </>
    );
};
