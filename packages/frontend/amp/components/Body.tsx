import React from 'react';
import { InnerContainer } from '@frontend/amp/components/InnerContainer';
import { Elements } from '@frontend/amp/components/lib/Elements';
import { css } from 'emotion';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { TopMetaNews } from '@frontend/amp/components/TopMetaNews';
import { TopMetaOpinion } from '@frontend/amp/components/TopMetaOpinion';
import { SubMeta } from '@frontend/amp/components/SubMeta';
import { pillarPalette } from '../../lib/pillars';
import { palette } from '@guardian/pasteup/palette';

const body = (pillar: Pillar, isOpinion: boolean) => css`
    background-color: ${isOpinion ? palette.opinion.faded : 'white'};
    ${bulletStyle(pillar)}
`;

const bulletStyle = (pillar: Pillar) => css`
    .bullet {
        color: transparent;
        font-size: 1px;
    }

    .bullet:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: 12px;
        width: 12px;
        margin-right: 2px;
        background-color: ${pillarPalette[pillar].main};
        margin-left: 0px;
    }
`;

export const Body: React.FC<{
    pillar: Pillar;
    data: ArticleModel;
    config: ConfigType;
}> = ({ pillar, data, config }) => {
    const tone = data.tags.find(tag => tag.type === 'Tone');
    const isOpinion = tone ? tone.id === 'tone/comment' : false;

    const topMeta = isOpinion ? (
        <TopMetaOpinion articleData={data} />
    ) : (
        <TopMetaNews articleData={data} />
    );

    return (
        <InnerContainer className={body(pillar, isOpinion)}>
            {topMeta}
            <Elements
                pillar={pillar}
                elements={data.elements}
                // stuff for ads
                edition={data.editionId}
                section={data.sectionName}
                contentType={data.contentType}
                switches={config.switches}
                commercialProperties={data.commercialProperties}
                isImmersive={data.isImmersive}
            />
            <SubMeta
                sections={data.subMetaSectionLinks}
                keywords={data.subMetaKeywordLinks}
                pillar={pillar}
                sharingURLs={data.sharingUrls}
                pageID={data.pageId}
                isCommentable={data.isCommentable}
                guardianBaseURL={data.guardianBaseURL}
            />
        </InnerContainer>
    );
};
