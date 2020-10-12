import React, { useState, FC } from 'react';
import LiveblogBlock from './block';
import LiveblogLoadMore from './loadMore';
import { Pillar, Format } from '@guardian/types/Format';
import { LiveBlock } from 'liveBlock';
import { renderAll } from 'renderer';
import { partition } from '@guardian/types/result';
import { remSpace } from '@guardian/src-foundations';
import { css } from '@emotion/core';
import { until } from '@guardian/src-foundations/mq';

interface LiveblogBodyProps {
    format: Format;
    blocks: LiveBlock[];
    totalBodyBlocks: number;
}

const styles = css`
    margin: ${remSpace[6]} 0 ${remSpace[2]} 0;

    ${until.wide} {
        margin-left: ${remSpace[2]};
    }
`
interface LoadMoreProps { 
    total: number; 
    pillar: Pillar;
}

const LoadMore: FC<LoadMoreProps> = ({total, pillar}) => 
    total > 7
        ? <LiveblogLoadMore onLoadMore={(): Promise<void> => Promise.resolve()} pillar={pillar}/>
        : null;

const LiveblogBody: FC<LiveblogBodyProps> = (props) => {
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
            <div css={styles}>
                <LoadMore total={totalBodyBlocks} pillar={format.pillar}/>
            </div>
        </>
    );

}

export default LiveblogBody;
