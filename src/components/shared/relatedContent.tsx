import React from 'react';
import { Option, map, withDefault } from '@guardian/types/option';
import { pipe2 } from 'lib';
import Card from 'components/shared/card';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { remSpace, neutral } from '@guardian/src-foundations';
import { ResizedRelatedContent } from 'item';
import { darkModeCss } from 'styles';

interface Props {
    content: Option<ResizedRelatedContent>;
}

const styles = css`
    padding: ${remSpace[6]} 0;
`;

const headingStyles = css`
    ${headline.xsmall({ fontWeight: 'bold' })}
    margin: 0 0 ${remSpace[4]} 0;

    ${darkModeCss`
        color: ${neutral[86]};
    `}
`;

const listStyles = css`
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const RelatedContent = ({ content }: Props): JSX.Element | null => {
    return pipe2(
        content,
        map(({ title, relatedItems, resizedImages }) => {
            return <section css={styles}>
                <h1 css={headingStyles}>{title}</h1>
                <ul css={listStyles}>
                    {
                        relatedItems.map((relatedItem, key) => {
                            return <Card
                                key={key}
                                relatedItem={relatedItem}
                                image={resizedImages[key]}
                            />
                        })
                    }
                </ul>
            </section>
        }),
        withDefault<JSX.Element | null>(null)
    )
}


export default RelatedContent;
