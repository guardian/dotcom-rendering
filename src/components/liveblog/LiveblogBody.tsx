import React from 'react';
import { PillarStyles, bulletStyles, commonArticleStyles } from '../../styles';
import LiveblogBlock from './LiveblogBlock';
import LiveblogLoadMore from './LiveblogLoadMore';
import { render } from 'renderBlocks';
import { Block } from 'types/v1_types';

import { css, SerializedStyles } from '@emotion/core'

const LiveBodyStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    .rich-link,
    .element-membership {
        width: calc(100% - 16px);
        margin: 1em 0;
    }

    ${commonArticleStyles(pillarStyles)}
    ${bulletStyles(pillarStyles.kicker)}
`;

interface LiveblogBodyProps {
    pillarStyles: PillarStyles;
    bodyElements: any;
    imageSalt: string;
}

const LiveblogBody= ({ pillarStyles, bodyElements, imageSalt }: LiveblogBodyProps): JSX.Element => {
    const initialBlocks = bodyElements.slice(0, 7);
    const LoadMore = ({ total }: { total: number }): JSX.Element | null => total > 10
        ? <LiveblogLoadMore pillarStyles={pillarStyles}/> 
        : null;

    return (
        <article css={LiveBodyStyles(pillarStyles)}>
            {
                initialBlocks.map((block: Block) => {
                    return <LiveblogBlock
                        key={block.id}
                        pillarStyles={pillarStyles} 
                        highlighted={!!block.attributes.keyEvent}
                        title={block.title}
                        firstPublishedDate={block.firstPublishedDate}
                        lastModifiedDate={block.lastModifiedDate}>
                            <>{render(block.elements, imageSalt).html}</>
                        </LiveblogBlock>
                })
            }
            <LoadMore total={bodyElements.length}/>
        </article>
    )
}

export default LiveblogBody;
