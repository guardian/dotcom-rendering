import React, { useState } from 'react';
import LiveblogBlock from './block';
import LiveblogLoadMore from './loadMore';
import { css } from '@emotion/core'
import { Pillar, Format } from 'format';
import { LiveBlock } from 'liveBlock';
import { renderAll } from 'renderer';
import { partition } from 'types/result';
import { BufferedTransport, CompactProtocol } from '@creditkarma/thrift-server-core';
import { Blocks } from 'mapiThriftModels';
import { ImageMappings } from 'components/shared/page';
import { remSpace } from '@guardian/src-foundations';

const LiveBodyStyles = css`
    .rich-link,
    .element-membership {
        width: calc(100% - 16px);
        margin: 1em 0;
    }

    figure {
        margin: ${remSpace[4]} 0;
    }
`;

interface LiveblogBodyProps {
    format: Format;
    blocks: LiveBlock[];
    totalBodyBlocks: number;
    imageMappings: ImageMappings;
}

async function loadMoreBlocks(): Promise<void> {
    const response = await fetch('?date=2020-03-09T11%3A11%3A49Z&filter=newer');
    const buffer = Buffer.from(await response.arrayBuffer());
    const transport = new BufferedTransport(buffer);
    const protocol = new CompactProtocol(transport);
    const blocks: Blocks = Blocks.read(protocol);
    console.log(blocks);
}

const LoadMore = ({ total, pillar }: { total: number; pillar: Pillar }): JSX.Element | null =>
    total > 7
        ? <LiveblogLoadMore onLoadMore={loadMoreBlocks} pillar={pillar}/>
        : null;

const LiveblogBody = (props: LiveblogBodyProps): JSX.Element => {
    const { format, blocks: initialBlocks, imageMappings, totalBodyBlocks } = props;
    const [blocks] = useState(initialBlocks);

    return (
        <article id="blocks" css={LiveBodyStyles}>
            {
                blocks.map((block: LiveBlock) => {
                    return <LiveblogBlock
                        key={block.id}
                        pillar={format.pillar} 
                        highlighted={block.isKeyEvent}
                        title={block.title}
                        firstPublishedDate={block.firstPublished}
                        lastModifiedDate={block.lastModified}>
                            <>{ renderAll(imageMappings)(format, partition(block.body).oks) }</>
                        </LiveblogBlock>
                })
            }
            <LoadMore total={totalBodyBlocks} pillar={format.pillar}/>
        </article>
    );

}

export default LiveblogBody;
