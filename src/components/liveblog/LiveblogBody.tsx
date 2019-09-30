import React from 'react';
import { PillarStyles } from '../../styles';
import LiveblogBlock from './LiveblogBlock';
import LiveblogLoadMore from './LiveblogLoadMore';
import { render } from 'renderBlocks';
import { Block } from 'types/Capi';

interface LiveblogBodyProps {
    pillarStyles: PillarStyles;
    bodyElements: [Block];
}

const LiveblogBody= ({ pillarStyles, bodyElements }: LiveblogBodyProps): JSX.Element => {
    const initialBlocks = bodyElements.slice(0, 10);
    const LoadMore = (props: {}): JSX.Element | null => bodyElements.length > 10 
        ? <LiveblogLoadMore pillarStyles={pillarStyles}/> 
        : null;

    return (
        <article>
            {
                initialBlocks.map((block: Block) => {
                    return <LiveblogBlock
                        key={block.id}
                        pillarStyles={pillarStyles} 
                        highlighted={block.attributes.keyEvent as boolean} 
                        title={block.title}>
                            <React.Fragment>
                                {render(block.elements).html}
                            </React.Fragment>
                        </LiveblogBlock>
                })
            }
            <LoadMore />
        </article>
    )
}

export default LiveblogBody;
