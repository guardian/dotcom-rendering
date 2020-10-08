import React from 'react';

import { Caption } from '@root/src/web/components/Caption';
import { Display } from '@root/src/lib/display';
import { YoutubeAtom } from '@guardian/atoms-rendering';
import { asFormat } from '@root/src/lib/format';

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
