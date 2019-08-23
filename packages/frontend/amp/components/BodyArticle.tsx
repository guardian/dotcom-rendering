import React from 'react';
import { InnerContainer } from '@frontend/amp/components/InnerContainer';
import { Elements } from '@frontend/amp/components/Elements';
import { css } from 'emotion';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { TopMeta } from '@frontend/amp/components/topMeta/TopMeta';
import { SubMeta } from '@frontend/amp/components/SubMeta';
import { designTypeDefault } from '@frontend/lib/designTypes';
import { pillarPalette } from '@frontend/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { WithAds } from '@frontend/amp/components/WithAds';
import { findAdSlots } from '@frontend/amp/lib/find-adslots';
import { until } from '@guardian/pasteup/breakpoints';
import { getSharingUrls } from '@frontend/model/sharing-urls';

const body = (pillar: Pillar, designType: DesignType) => {
    const defaultStyles: DesignTypesObj = designTypeDefault(
        palette.neutral[100],
    );

    // Extend defaultStyles with custom styles for some designTypes
    const designTypeStyle: DesignTypesObj = {
        ...defaultStyles,
        Comment: palette.opinion.faded,
        AdvertisementFeature: palette.neutral[85],
    };

    return css`
        background-color: ${designTypeStyle[designType]};
        ${bulletStyle(pillar)}
    `;
};

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

const adStyle = css`
    float: right;
    margin: 4px 0 12px 20px;

    ${until.phablet} {
        float: none;
        margin: 0 auto 12px;
    }
`;

export const Body: React.FC<{
    pillar: Pillar;
    data: ArticleModel;
    config: ConfigType;
}> = ({ pillar, data, config }) => {
    const designType = data.designType;
    const capiElements = data.blocks[0] ? data.blocks[0].elements : [];
    const elementsWithoutAds = Elements(capiElements, pillar, data.isImmersive);
    const slotIndexes = findAdSlots(capiElements);
    const adInfo = {
        section: data.sectionName,
        edition: data.editionId,
        contentType: data.contentType,
        commercialProperties: data.commercialProperties,
        switches: {
            krux: config.switches.krux,
            ampPrebid: config.switches.ampPrebid,
        },
    };

    const elements = data.shouldHideAds ? (
        <>{elementsWithoutAds}</>
    ) : (
        <WithAds
            items={elementsWithoutAds}
            adSlots={slotIndexes}
            adClassName={adStyle}
            adInfo={adInfo}
        />
    );

    return (
        <InnerContainer className={body(pillar, designType)}>
            <TopMeta designType={designType} pillar={pillar} data={data} />

            {elements}

            <SubMeta
                sections={data.subMetaSectionLinks}
                keywords={data.subMetaKeywordLinks}
                pillar={pillar}
                sharingURLs={getSharingUrls(data.pageId, data.webTitle)}
                pageID={data.pageId}
                isCommentable={data.isCommentable}
                guardianBaseURL={data.guardianBaseURL}
            />
        </InnerContainer>
    );
};
