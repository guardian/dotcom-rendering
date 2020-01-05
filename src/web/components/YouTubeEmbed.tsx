import React from 'react';

type Props = {
    assetId: string;
};

export const YouTubeEmbed = ({ assetId }: Props) => (
    <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube video player"
        width="100%"
        height="350px"
        src={`https://www.youtube.com/embed/${assetId}`}
    />
);
