import React from 'react';
import { RelatedContent } from '@guardian/apps-rendering-api-models/relatedContent';
import { Option, map, withDefault } from 'types/option';
import { pipe2 } from 'lib';
import Card from 'components/shared/card';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';

interface Props {
    content: Option<RelatedContent>;
}

const styles = css`
    padding: ${remSpace[6]} 0;

    h1 {
        ${headline.xsmall({ fontWeight: 'bold' })}
        margin: 0 0 ${remSpace[4]} 0;
    }

    ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        margin: 0;
        padding: 0;
        overflow-x: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
    }
`

const RelatedContent = ({ content }: Props): JSX.Element => {
    return pipe2(
        content,
        map(({ title, relatedItems }) => {
            return <section css={styles}>
                <h1>{title}</h1>
                <ul>
                    {
                        relatedItems.map((item, key) => {
                            return <Card key={key} item={item}/>
                        })
                    }
                </ul>
            </section>
        }),
        withDefault(<></>)
    )
}


export default RelatedContent;
