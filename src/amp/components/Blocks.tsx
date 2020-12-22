import React from 'react';
import { Elements } from '@root/src/amp/components/Elements';
import { css } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { blockLink } from '@root/src/amp/lib/block-link';
import { findBlockAdSlots } from '@root/src/amp/lib/find-adslots';
import { WithAds } from '@root/src/amp/components/WithAds';

const blockStyle = (pillar: Pillar) => css`
    padding: 6px 10px 12px;
    background-color: ${palette.neutral[100]};
    border-top: 1px solid ${pillarPalette[pillar].dark};
    border-bottom: 1px solid ${palette.neutral[93]};
    margin-bottom: 12px;
`;

const firstPublishedStyle = css`
    color: ${palette.neutral[7]};
    margin-bottom: 10px;
    text-decoration: none;
    font-weight: bold;
    ${textSans.xsmall()};
`;

const lastUpdatedStyle = css`
    ${textSans.xsmall()};
    color: ${palette.neutral[60]};
    text-align: right;
    padding-right: 15px;
`;

const clearBoth = css`
    clear: both;
`;

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
    const liveBlogBlocks = blocks.map((block) => {
        return (
            <div
                id={block.id}
                data-sort-time={block.blockFirstPublished}
                key={block.id}
                className={blockStyle(pillar)}
            >
                {block.blockFirstPublishedDisplay && (
                    <a
                        className={firstPublishedStyle}
                        href={blockLink(url, block.id)}
                    >
                        {block.blockFirstPublishedDisplay}
                    </a>
                )}
                {block.title && <h2>{block.title}</h2>}
                {Elements(block.elements, pillar, false)}
                {/* Some elements float (e.g. rich links) */}
                <div className={clearBoth} />{' '}
                {block.blockLastUpdatedDisplay && (
                    <div className={lastUpdatedStyle}>
                        Updated at {block.blockLastUpdatedDisplay}
                    </div>
                )}
            </div>
        );
    });

    if (shouldHideAds) {
        return <>{liveBlogBlocks}</>;
    }

    const slotIndexes = findBlockAdSlots(liveBlogBlocks);
    const adInfo = {
        section,
        edition,
        contentType,
        commercialProperties,
        switches: {
            ampPrebid: switches.ampPrebid,
            permutive: switches.permutive,
        },
    };

    return (
        <>
            <WithAds
                items={liveBlogBlocks}
                adSlots={slotIndexes}
                adClassName=""
                adInfo={adInfo}
            />
        </>
    );
};
