import React from 'react';
import { InnerContainer } from '@frontend/amp/components/InnerContainer';
import { Elements } from '@frontend/amp/components/lib/Elements';
import { css } from 'emotion';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { TopMeta } from '@frontend/amp/components/TopMeta';
import { SubMeta } from '@frontend/amp/components/SubMeta';
import { getToneType, StyledTone } from '@frontend/amp/lib/tag-utils';
import { pillarPalette } from '@frontend/lib/pillars';
import { palette } from '@guardian/pasteup/palette';

// TODO move into shared place
const body = (pillar: Pillar, tone: StyledTone) => {
    const bgColorMap = {
        'default-tone': palette.neutral[100],
        'tone/comment': palette.opinion.faded,
        'tone/advertisement-features': palette.neutral[100],
    };
    return css`
        background-color: ${bgColorMap[tone]};
        ${bulletStyle(pillar)}
    `;
};

// TODO move into shared place
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

const blockStyle = (pillar: Pillar) => css`
    adding-top: 0.375rem;
    padding-bottom: 0.75rem;
    background-color: ${palette.neutral[100]};
    border-top: 0.0625rem solid ${pillarPalette[pillar].dark};
    border-top-color: rgb(220, 220, 220);
    border-bottom: 0.0625rem solid ${palette.neutral[93]};
`;

// TODO add handling (currently done in elements, which is wrong, so let's lift
// that out and have an Ad element type we match against
const Blocks: React.SFC<{
    blocks: Block[];
    pillar: Pillar;
    edition: Edition;
    section?: string;
    contentType: string;
    switches: Switches;
    commercialProperties: CommercialProperties;
}> = ({
    blocks,
    pillar,
    edition,
    section,
    contentType,
    switches,
    commercialProperties,
}) => {
    // TODO add last updated for blocks to show here
    const transformedBlocks = blocks.map(block => {
        return (
            <div key={block.id} className={blockStyle(pillar)}>
                <Elements
                    pillar={pillar}
                    elements={block.elements}
                    // stuff for ads
                    edition={edition}
                    section={section}
                    contentType={contentType}
                    switches={switches}
                    commercialProperties={commercialProperties}
                    isImmersive={false}
                />
            </div>
        );
    });

    return <>{transformedBlocks}</>;
};

export const Body: React.FC<{
    pillar: Pillar;
    data: ArticleModel;
    config: ConfigType;
}> = ({ pillar, data, config }) => {
    const tone = getToneType(data.tags);

    return (
        <InnerContainer className={body(pillar, tone)}>
            <TopMeta tone={tone} data={data} />
            <Blocks
                pillar={pillar}
                blocks={data.blocks}
                // stuff for ads
                edition={data.editionId}
                section={data.sectionName}
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
                guardianBaseURL={data.guardianBaseURL}
            />
        </InnerContainer>
    );
};
