import React from 'react';
import { Caption } from '@root/src/web/components/Caption';
import { YouTubeEmbed } from '@root/src/web/components/YouTubeEmbed';

export const YouTubeComponent: React.FC<{
    element: YoutubeBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
    role: RoleType;
}> = ({ element, pillar, hideCaption, role }) => {
    if (hideCaption) {
        return <p>def</p>;
    }
    return (
        <Caption
            captionText={element.mediaTitle || ''}
            pillar={pillar}
            dirtyHtml={true}
            displayCredit={false}
            role={role}
        >
            <YouTubeEmbed assetId={element.assetId} />
        </Caption>
    );
};
