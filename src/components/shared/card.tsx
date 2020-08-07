import React, { ReactElement } from 'react';
import { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import { Option, withDefault, map, fromNullable } from '@guardian/types/option';
import { makeRelativeDate } from 'date';
import { pipe2 } from 'lib';
import { text, neutral } from '@guardian/src-foundations/palette';
import BodyImage from 'components/bodyImage';
import { Pillar, Design, Display } from '@guardian/types/Format';
import { Image } from 'image';
import { darkModeCss } from 'styles';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { Pillar as contentPillar } from '@guardian/content-api-models/v1/pillar';
import { getPillarStyles, pillarFromString } from 'pillarStyles';



interface Props {
    relatedItem: RelatedItem;
    image: Option<Image>;
}

const listStyles = css`
    background: white;
    margin-right: ${remSpace[3]};
    flex: 0 0 15rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    time {
        ${textSans.small()};
        color: ${text.supporting};
        text-align: right;
        width: calc(100% - ${remSpace[2]});
        display: inline-block;
    }
`

const anchorStyles = css`
    color: ${neutral[7]};
    text-decoration: none;
    ${darkModeCss`
        color: ${neutral[86]};
        background: ${neutral[20]};
    `}
`;

const headingStyles = css`
    ${headline.xxxsmall()};
    margin: 0;
    padding: ${remSpace[2]};
    min-height: 150px;
`;

const imageWrapperStyles = css`
    padding-bottom: 56.25%;
    position: relative;
`;

const relativeFirstPublished = (date: Option<Date>): JSX.Element | null => pipe2(
    date,
    map(date => <time>{makeRelativeDate(date)}</time>),
    withDefault<JSX.Element | null>(null),
);

const cardStyles = (type: RelatedItemType, pillar: contentPillar): SerializedStyles => {
    switch(type) {
        case RelatedItemType.ARTICLE: {
            return css``;
        }

        case RelatedItemType.FEATURE: {
            const { kicker } = getPillarStyles(pillarFromString(pillar.id))

            return css`
                h2 {
                    ${headline.xxxsmall({ fontWeight: 'bold' })}
                    color: ${kicker};
                }
            `;
        }

        case RelatedItemType.ANALYSIS: {

        }

        case RelatedItemType.GALLERY: {

        }

        case RelatedItemType.SPECIAL: {

        }

        case RelatedItemType.AUDIO: {

        }

        case RelatedItemType.LIVE: {

        }

        case RelatedItemType.VIDEO: {

        }

        case RelatedItemType.REVIEW: {

        }

        case RelatedItemType.ADVERTISEMENT_FEATURE: {

        }

        case RelatedItemType.COMMENT: {

        }
    }

    return css``;
}

const Card = ({ relatedItem, image }: Props): JSX.Element => {

    const format = {
        pillar: Pillar.News,
        design: Design.Article,
        display: Display.Standard
    }

    const img = pipe2(
        image,
        map(img => {
            return <BodyImage image={img} format={format}/>
        }),
        withDefault<ReactElement | null>(null)
    )

    const lastModified = relatedItem.lastModified?.iso8601;
    const date = lastModified ? relativeFirstPublished(fromNullable(new Date(lastModified))) : null;

    return <li css={[listStyles, cardStyles(relatedItem.type, relatedItem.pillar)]}>
            <a css={anchorStyles}href={relatedItem.link}>
                <h2 css={headingStyles}>{relatedItem.title}</h2>
                <section>
                    {date}
                    <div css={imageWrapperStyles}>{img}</div>
                </section>
            </a>
        </li>
}


export default Card;
