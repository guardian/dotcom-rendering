import React from 'react';
import { InnerContainer } from '@frontend/amp/components/InnerContainer';
import { Elements } from '@frontend/amp/components/lib/Elements';
import { css } from 'emotion';
import { ArticleModel } from '@frontend/amp/pages/Article';
// import { TopMeta } from '@frontend/amp/components/TopMeta';
import { SubMeta } from '@frontend/amp/components/SubMeta';
import { pillarPalette, tonePalette } from '../../lib/pillars';
import { PaidTopMeta } from './PaidTopMeta';

const body = (pillar: Pillar, tone: tone) => css`
    background-color: ${tonePalette[tone]};

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
    tone: tone;
}> = ({ pillar, data, config, tone }) => (
    <InnerContainer className={body(pillar, tone)}>
        <PaidTopMeta config={config} articleData={data} />
        {/* <TopMeta config={config} articleData={data} /> */}
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
