import React from 'react';
import { textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { css } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import TriangleIcon from '@guardian/pasteup/icons/triangle.svg';

const figureStyle = css`
    margin-bottom: 8px;
`;
const captionStyle = css`
    padding: 8px 10px 0;
    ${textSans(1)};
    word-wrap: break-word;
    color: ${palette.neutral[46]};
`;

export const YoutubeVideo: React.FC<{
    element: YoutubeBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    // https://www.ampproject.org/docs/reference/components/amp-youtube
    // https://developers.google.com/youtube/player_parameters
    const attributes = {
        id: `gu-video-youtube-${element.id}`,
        'data-videoid': element.assetId,
        layout: 'responsive',
        width: '16',
        height: '9',
        'data-param-modestbranding': true, // Remove YouTube logo
        'data-param-rel': '0', // Show the channel's related videos
        'data-param-listType': 'playlist', // Related videos from playlist
        'data-param-list': element.channelId, // Use specific channel ID for related videos
    };

    const iconStyle = css`
        fill: ${pillarPalette[pillar].main};
        padding-right: 3px;
    `;

    return (
        <figure className={figureStyle}>
            <amp-youtube {...attributes} />
            {element.mediaTitle && (
                <>
                    <figcaption className={captionStyle}>
                        <span className={iconStyle}>
                            <TriangleIcon />
                        </span>
                        {element.mediaTitle}
                    </figcaption>
                </>
            )}
        </figure>
    );
};
