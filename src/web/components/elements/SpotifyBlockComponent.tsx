import React from 'react';
import { css } from 'emotion';
import { Caption } from '@root/src/amp/components/Caption';

export const SpotifyBlockComponent: React.FC<{
    embedUrl?: string;
    height?: number;
    width?: number;
    title?: string;
    pillar: Pillar;
    caption?: string;
}> = ({ embedUrl, width, height, title, pillar, caption }) => {
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
                    {caption && (
                        <Caption captionText={caption} pillar={pillar} />
                    )}
                </div>
            )}
        </>
    );
};
