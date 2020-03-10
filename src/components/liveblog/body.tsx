import React, { useState } from 'react';
import LiveblogBlock from './block';
import LiveblogLoadMore from './loadMore';
import { css, SerializedStyles } from '@emotion/core'
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';
import { LiveBlock } from 'item';
import { renderAll } from 'renderer';
import { partition } from 'types/result';

const LiveBodyStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    .rich-link,
    .element-membership {
        width: calc(100% - 16px);
        margin: 1em 0;
    }

    figure {
        margin: 1rem 0;
    }

    .image, figcaption {
        padding: 0;
    }
`;

interface LiveblogBodyProps {
    pillar: Pillar;
    blocks: LiveBlock[];
    totalBodyBlocks: number;
    imageSalt: string;
}

const LiveblogBody = (props: LiveblogBodyProps): JSX.Element => {
    const { pillar, blocks: initialBlocks, imageSalt, totalBodyBlocks } = props;
    const [blocks] = useState(initialBlocks);

    const loadMoreBlocks = (): void => {
        /* setBlocks(parseNewBlocks(browserParser)(resp.blocks)) */
        fetch('?date=2020-03-09T11%3A11%3A49Z&filter=newer')
            .then(resp => resp.json())
            .then(resp => console.log(resp))
    }

    const LoadMore = ({ total }: { total: number }): JSX.Element | null => total > 7
        ? <LiveblogLoadMore onLoadMore={loadMoreBlocks} pillar={pillar}/>
        : null;

    return (
        <article id="blocks" css={LiveBodyStyles(getPillarStyles(pillar))}>
            {
                blocks.map((block: LiveBlock) => {
                    return <LiveblogBlock
                        key={block.id}
                        pillar={pillar} 
                        highlighted={block.isKeyEvent}
                        title={block.title}
                        firstPublishedDate={block.firstPublished}
                        lastModifiedDate={block.lastModified}>
                            <>{ renderAll(imageSalt)(pillar, partition(block.body).oks) }</>
                        </LiveblogBlock>
                })
            }
            <LoadMore total={totalBodyBlocks}/>
        </article>
    );

}

export default LiveblogBody;
