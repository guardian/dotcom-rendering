import React from 'react';
import { css } from 'emotion';

import { Caption } from '@root/src/web/components/Caption';
import { YouTubeEmbed } from '@root/src/web/components/YouTubeEmbed';

type Props = {
    children: JSX.Element | JSX.Element[];
};

const Margins = ({ children }: Props) => (
    <div
        className={css`
            margin-top: 16px;
            margin-bottom: 12px;
        `}
    >
        {children}
    </div>
);

export const YouTubeComponent: React.FC<{
    element: YoutubeBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
    role: RoleType;
    adTargeting?: AdTargeting;
}> = ({ element, pillar, hideCaption, role, adTargeting }) => {
    if (hideCaption) {
        return (
            <Margins>
                <YouTubeEmbed
                    assetId={element.assetId}
                    pillar={pillar}
                    adTargeting={adTargeting}
                    duration={element.duration}
                    title={element.mediaTitle}
                />
            </Margins>
        );
    }
    return (
        <Margins>
            <Caption
                captionText={element.mediaTitle || ''}
                pillar={pillar}
                dirtyHtml={true}
                displayCredit={false}
                role={role}
            >
                <YouTubeEmbed
                    assetId={element.assetId}
                    pillar={pillar}
                    adTargeting={adTargeting}
                    duration={element.duration}
                    title={element.mediaTitle}
                />
            </Caption>
        </Margins>
    );
};
