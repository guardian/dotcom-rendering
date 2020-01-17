import React from 'react';
import { bulletStyles, commonArticleStyles } from 'styles';
import LiveblogBlock from './block';
import LiveblogLoadMore from './loadMore';

import { css, SerializedStyles } from '@emotion/core'
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';
import { LiveBlock } from 'article';
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

    ${commonArticleStyles(pillarStyles)}
    ${bulletStyles(pillarStyles.kicker)}

    .image, figcaption {
        padding: 0;
    }
`;

interface LiveblogBodyProps {
    pillar: Pillar;
    blocks: LiveBlock[];
    imageSalt: string;
}

const LiveblogBody = ({ pillar, blocks, imageSalt }: LiveblogBodyProps): JSX.Element => {

    const initialBlocks = blocks.slice(0, 7);
    const LoadMore = ({ total }: { total: number }): JSX.Element | null => total > 10
        ? <LiveblogLoadMore pillar={pillar}/> 
        : null;

    return (
        <article css={LiveBodyStyles(getPillarStyles(pillar))}>
            {
                initialBlocks.map((block: LiveBlock) => {
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
            <LoadMore total={blocks.length}/>
        </article>
    );

}

export default LiveblogBody;
