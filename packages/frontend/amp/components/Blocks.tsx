import React from 'react';
import { Elements } from '@frontend/amp/components/Elements';
import { css } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { palette } from '@guardian/pasteup/palette';
import { blockLink } from '@frontend/amp/lib/block-link';
import { Ad } from '@frontend/amp/components/Ad';
import { findBlockAdSlots } from '@frontend/amp/lib/find-adslots';
import { textSans } from '@guardian/pasteup/typography';

const blockStyle = (pillar: Pillar) => css`
    padding: 6px 10px 12px;
    background-color: ${palette.neutral[100]};
    border-top: 1px solid ${pillarPalette[pillar].dark};
    border-bottom: 1px solid ${palette.neutral[93]};
    margin-bottom: 12px;
    blockquote {
        margin-left: 40px;
    }
`;

const blockCreatedOnStyle = css`
    color: ${palette.neutral[7]};
    line-height: 2rem;
    margin-bottom: 10px;
    text-decoration: none;
    font-weight: bold;
`;

const lastUpdatedStyle = css`
    ${textSans(1)};
    color: ${palette.neutral[60]};
    text-align: right;
    padding-right: 15px;
`;

const withAds = (
    blocks: JSX.Element[],
    edition: Edition,
    contentType: string,
    commercialProperties: CommercialProperties,
    switches: Switches,
    section?: string,
): JSX.Element[] => {
    const commercialConfig = {
        useKrux: switches.krux,
        usePrebid: switches.ampPrebid,
    };

    const ad = (
        <Ad
            edition={edition}
            section={section}
            contentType={contentType}
            config={commercialConfig}
            commercialProperties={commercialProperties}
        />
    );

    const adSlots = findBlockAdSlots(blocks);

    return blocks.map((block, i) => {
        if (adSlots.includes(i)) {
            return (
                <>
                    {ad}
                    {block}
                </>
            );
        }

        return block;
    });
};

// TODO ad handling (currently done in elements, which is wrong, so let's lift
// that out and have an Ad element type we match against
export const Blocks: React.SFC<{
    blocks: Block[];
    pillar: Pillar;
    edition: Edition;
    section?: string;
    contentType: string;
    switches: Switches;
    commercialProperties: CommercialProperties;
    url: string;
    shouldHideAds: boolean;
}> = ({
    blocks,
    pillar,
    edition,
    section,
    contentType,
    switches,
    commercialProperties,
    url,
    shouldHideAds,
}) => {
    // TODO add last updated for blocks to show here
    const liveBlogBlocks = blocks.map(block => {
        return (
            <div
                id={block.id}
                data-sort-time={block.createdOn}
                key={block.id}
                className={blockStyle(pillar)}
            >
                {block.createdOnDisplay && (
                    <a
                        className={blockCreatedOnStyle}
                        href={blockLink(url, block.id)}
                    >
                        {block.createdOnDisplay}
                    </a>
                )}
                {block.title && <h2>{block.title}</h2>}
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
                    shouldHideAds={false}
                />
                {block.lastUpdatedDisplay && (
                    <div className={lastUpdatedStyle}>
                        Updated at {block.lastUpdatedDisplay}
                    </div>
                )}
            </div>
        );
    });

    if (shouldHideAds) {
        return <>{liveBlogBlocks}</>;
    }

    return (
        <>
            {withAds(
                liveBlogBlocks,
                edition,
                contentType,
                commercialProperties,
                switches,
                section,
            )}
        </>
    );
};
