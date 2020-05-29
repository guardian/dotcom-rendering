import React, { useState } from 'react';
import LiveblogBlock from './block';
import LiveblogLoadMore from './loadMore';
import { Pillar, Format } from 'format';
import { LiveBlock } from 'liveBlock';
import { renderAll } from 'renderer';
import { partition } from 'types/result';

interface LiveblogBodyProps {
    format: Format;
    blocks: LiveBlock[];
    totalBodyBlocks: number;
}

const LoadMore = ({ total, pillar }: { total: number; pillar: Pillar }): JSX.Element | null =>
    total > 7
        ? <LiveblogLoadMore onLoadMore={(): Promise<void> => Promise.resolve()} pillar={pillar}/>
        : null;

const LiveblogBody = (props: LiveblogBodyProps): JSX.Element => {
    const { format, blocks: initialBlocks, totalBodyBlocks } = props;
    const [blocks] = useState(initialBlocks);

    return (
        <>
            {
                blocks.map((block: LiveBlock) => {
                    return <LiveblogBlock
                        key={block.id}
                        pillar={format.pillar} 
                        highlighted={block.isKeyEvent}
                        title={block.title}
                        firstPublishedDate={block.firstPublished}
                        lastModifiedDate={block.lastModified}>
                            <>{ renderAll(format, partition(block.body).oks) }</>
                        </LiveblogBlock>
                })
            }
            <LoadMore total={totalBodyBlocks} pillar={format.pillar}/>
        </>
    );

}

export default LiveblogBody;
