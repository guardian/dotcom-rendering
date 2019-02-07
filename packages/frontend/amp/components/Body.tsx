import React from 'react';
import { InnerContainer } from '@frontend/amp/components/InnerContainer';
import { Elements } from '@frontend/amp/components/lib/Elements';
import { css } from 'emotion';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { TopMeta } from '@frontend/amp/components/TopMeta';
import { SubMeta } from '@frontend/amp/components/SubMeta';

const body = css`
    background-color: white;
`;

export const Body: React.FC<{
    pillar: Pillar;
    data: ArticleModel;
    config: ConfigType;
}> = ({ pillar, data, config }) => (
    <InnerContainer className={body}>
        <TopMeta config={config} articleData={data} />
        <Elements
            pillar={pillar}
            elements={data.elements}
            // stuff for ads
            edition={data.editionId}
            section={data.sectionName}
            dfpAccountId={config.dfpAccountId}
            contentType={data.contentType}
            switches={config.switches}
            commercialProperties={data.commercialProperties}
        />
        <SubMeta
            sections={data.subMetaSectionLinks}
            keywords={data.subMetaKeywordLinks}
            pillar={pillar}
            sharingURLs={data.sharingUrls}
            pageID={data.pageId}
            isCommentable={data.isCommentable}
        />
    </InnerContainer>
);
