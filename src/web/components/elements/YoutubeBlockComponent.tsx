import React from 'react';

import { Caption } from '@root/src/web/components/Caption';
import { YouTubeEmbed } from '@root/src/web/components/YouTubeEmbed';

type Props = {
    display: Display;
    designType: DesignType;
    element: YoutubeBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
    role: RoleType;
    adTargeting?: AdTargeting;
    isMainMedia?: boolean;
    children?: JSX.Element | JSX.Element[];
};

export const YoutubeBlockComponent = ({
    display,
    designType,
    element,
    pillar,
    hideCaption,
    role,
    adTargeting,
    isMainMedia,
}: Props) => {
    const shouldLimitWidth =
        !isMainMedia &&
        (role === 'showcase' || role === 'supporting' || role === 'immersive');

    if (hideCaption) {
        return (
            <YouTubeEmbed
                assetId={element.assetId}
                pillar={pillar}
                adTargeting={adTargeting}
                duration={element.duration}
                title={element.mediaTitle}
            />
        );
    }
    return (
        <>
            <YouTubeEmbed
                assetId={element.assetId}
                pillar={pillar}
                adTargeting={adTargeting}
                duration={element.duration}
                title={element.mediaTitle}
            />
            <Caption
                display={display}
                designType={designType}
                captionText={element.mediaTitle || ''}
                pillar={pillar}
                displayCredit={false}
                shouldLimitWidth={shouldLimitWidth}
            />
        </>
    );
};
