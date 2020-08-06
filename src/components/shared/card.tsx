import React from 'react';
import { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { css } from '@emotion/core';
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

interface Props {
    item: RelatedItem;
    image: Option<Image>;
}

const styles = css`
    background: white;
    margin-right: ${remSpace[3]};
    min-width: 175px;
    width: 25%;
    position: relative;
    color: ${neutral[7]};
    text-decoration: none;

    ${darkModeCss`
        color: ${neutral[86]};
        background: ${neutral[20]};
    `}

    li {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    div {
        padding-bottom: 56.25%;
        position: relative;
    }

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    h2 {
        ${headline.xxxsmall()};
        margin: 0 0 0;
        padding: ${remSpace[2]};
        min-height: 150px;
    }

    time {
        ${textSans.small()};
        color: ${text.supporting};
        text-align: right;
        width: calc(100% - ${remSpace[2]});
        display: inline-block;
    }
`

const relativeFirstPublished = (date: Option<Date>): JSX.Element | null => pipe2(
    date,
    map(date => <time>{makeRelativeDate(date)}</time>),
    withDefault<JSX.Element | null>(null),
);

const Card = ({ item, image }: Props): JSX.Element => {
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
        withDefault(<></>)
    )

    const lastModified = item.lastModified?.iso8601;
    const date = lastModified ? relativeFirstPublished(fromNullable(new Date(lastModified))) : null;

    return <a css={styles} href={item.link}>
        <li>
            <h2>{item.title}</h2>
            <section>
                {date}
                <div>{img}</div>
            </section>
        </li>
    </a>
}


export default Card;
