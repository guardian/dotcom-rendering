import React from 'react';
import { PillarStyles } from '../../styles';
import LiveblogBlock from './LiveblogBlock';
import LiveblogLoadMore from './LiveblogLoadMore';
import { render } from 'renderBlocks';
import { Block } from 'types/Capi';

interface LiveblogBodyProps {
    pillarStyles: PillarStyles;
    bodyElements: Block[];
}

const LiveblogBody= ({ pillarStyles, bodyElements }: LiveblogBodyProps): JSX.Element => {
    const initialBlocks = bodyElements.slice(0, 10);
    const LoadMore = ({ total }: { total: number }): JSX.Element | null => total > 10
        ? <LiveblogLoadMore pillarStyles={pillarStyles}/> 
        : null;

    return (
        <article>
            {
                initialBlocks.map((block: Block) => {
                    return <LiveblogBlock
                        key={block.id}
                        pillarStyles={pillarStyles} 
                        highlighted={!!block.attributes.keyEvent}
                        title={block.title}
                        firstPublishedDate={block.firstPublishedDate}
                        lastModifiedDate={block.lastModifiedDate}>
                            <>{render(block.elements).html}</>
                        </LiveblogBlock>
                })
            }
            <LoadMore total={bodyElements.length}/>
        </article>
    )
}

export default LiveblogBody;
