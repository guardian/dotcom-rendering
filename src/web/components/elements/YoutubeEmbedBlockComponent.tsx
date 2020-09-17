import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import { Caption } from '@root/src/web/components/Caption';
import { MaintainAspectRatio } from '@frontend/web/components/MaintainAspectRatio';
import { Display } from '@root/src/lib/display';

const expiredFallbackTextStyles = css`
    position: absolute;
    display: table-cell;
    width: 100%;
    padding: 1.125rem 3.75rem;

    ${textSans.medium({ fontWeight: 'bold', lineHeight: 'tight' })}
    color: ${palette.neutral[100]};
    background-color: ${palette.neutral[20]};

    ::before {
        content: '';
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgY3g9IjE4IiBjeT0iMTgiIHI9IjE4Ii8+PHBhdGggZD0iTTE0LjcyNyA1LjcyN2wxLjYzNi0xLjYzNmgzLjI3M2wxLjYzNiAxLjYzNi0xLjYzNiAxNS41NDVoLTMuMjczTDE0LjcyNyA1LjcyN202LjU0NSAyMi4wOWMwLTEuOC0xLjQ3My0zLjI3My0zLjI3My0zLjI3M2EzLjI4MyAzLjI4MyAwIDAgMC0zLjI3MyAzLjI3M2MwIDEuOCAxLjQ3MyAzLjI3MyAzLjI3MyAzLjI3M3MzLjI3My0xLjQ3MyAzLjI3My0zLjI3MyIgZmlsbD0iIzMzMyIvPjwvZz48L3N2Zz4=);
        width: 36px;
        height: 36px;
        position: absolute;
        top: 50%;
        left: 10px;
        margin-top: -18px;
    }
`;

export const YoutubeEmbedBlockComponent: React.FC<{
    pillar: Pillar;
    embedUrl?: string;
    height: number;
    width: number;
    caption?: string;
    credit?: string;
    title?: string;
    display: Display;
    designType: DesignType;
    expired: boolean;
    overrideImage?: string;
}> = ({
    embedUrl,
    caption,
    title,
    pillar,
    width,
    height,
    display,
    designType,
    credit,
    expired,
    overrideImage,
}) => {
    // 812 is the full height on an iphone X. This ensures that the embed doesn't display any larger than the available viewport
    // Constrain iframe embeds with a width to their natural width
    // rather than stretch them to the container using
    // a max that would prevent portrait videos from being taller than an iphone X (baseline)
    // More context: https://github.com/guardian/frontend/pull/17902
    const maxHeight = 812;
    const aspectRatio = width / height;
    const maxWidth = maxHeight * aspectRatio;

    const fallbackImageStyles =
        overrideImage && expired
            ? css`
                  background-image: url(${overrideImage});
                  background-size: cover;
                  background-repeat: no-repeat;
              `
            : '';

    const embedContainer = css`
        max-width: ${maxWidth}px;
        width: 100%;
        margin-bottom: ${caption ? `0px` : `6px`};
    `;

    return (
        <div className={embedContainer}>
            <div className={fallbackImageStyles}>
                <MaintainAspectRatio height={height} width={width}>
                    {expired ? (
                        <div className={expiredFallbackTextStyles}>
                            This video has been removed. This could be because
                            it launched early, our rights have expired, there
                            was a legal issue, or for another reason.
                        </div>
                    ) : (
                        <iframe
                            src={embedUrl}
                            title={title}
                            height={height}
                            width={width}
                            allowFullScreen={true}
                        />
                    )}
                </MaintainAspectRatio>
            </div>
            {caption && (
                <Caption
                    captionText={caption}
                    designType={designType}
                    pillar={pillar}
                    display={display}
                    credit={credit}
                />
            )}
        </div>
    );
};
