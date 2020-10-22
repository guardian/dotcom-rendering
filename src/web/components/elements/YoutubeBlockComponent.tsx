import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';

import { Caption } from '@root/src/web/components/Caption';
import { Display } from '@root/src/lib/display';
import { YoutubeAtom } from '@guardian/atoms-rendering';
import { asFormat } from '@root/src/lib/format';

const expiredFallbackTextStyles = css`
    position: absolute;
    display: table-cell;
    padding-top: 18px;
    padding-bottom: 18px;
    padding-left: 60px;
    padding-right: 60px;
    ${body.medium({ lineHeight: 'tight' })}
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

type Props = {
    display: Display;
    designType: DesignType;
    element: YoutubeBlockElement;
    pillar: Pillar;
    role: RoleType;
    hideCaption?: boolean;
    overlayImage?: string;
    adTargeting?: AdTargeting;
    isMainMedia?: boolean;
    height?: number;
    width?: number;
    title?: string;
    duration?: number; // in seconds
};

export const YoutubeBlockComponent = ({
    display,
    designType,
    element,
    pillar,
    hideCaption,
    overlayImage,
    role,
    adTargeting,
    isMainMedia,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
}: Props) => {
    const shouldLimitWidth =
        !isMainMedia &&
        (role === 'showcase' || role === 'supporting' || role === 'immersive');

    if (element.expired) {
        return (
            <figure
                className={css`
                    margin-top: 16px;
                    margin-bottom: 16px;
                `}
            >
                <div
                    className={css`
                        position: relative;
                        background-image: url(${element.overrideImage});
                        background-size: cover;
                        background-repeat: no-repeat;
                        padding-bottom: 56%;
                    `}
                >
                    <div className={expiredFallbackTextStyles}>
                        This video has been removed. This could be because it
                        launched early, our rights have expired, there was a
                        legal issue, or for another reason.
                    </div>
                </div>
                {!hideCaption && (
                    <Caption
                        display={display}
                        designType={designType}
                        captionText={element.mediaTitle || ''}
                        pillar={pillar}
                        displayCredit={false}
                        shouldLimitWidth={shouldLimitWidth}
                    />
                )}
            </figure>
        );
    }

    return (
        <div data-chromatic="ignore">
            <YoutubeAtom
                format={asFormat(pillar, display, designType)}
                videoMeta={element}
                overlayImage={overlayImage}
                adTargeting={adTargeting}
                height={height}
                width={width}
                title={title}
                duration={duration}
            />
            {!hideCaption && (
                <Caption
                    display={display}
                    designType={designType}
                    captionText={element.mediaTitle || ''}
                    pillar={pillar}
                    displayCredit={false}
                    shouldLimitWidth={shouldLimitWidth}
                />
            )}
        </div>
    );
};
