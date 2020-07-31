import React from 'react';
import { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { css } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import { Option, withDefault, map, fromNullable } from '@guardian/types/option';
import { makeRelativeDate } from 'date';
import { pipe2 } from 'lib';
import { text, neutral } from '@guardian/src-foundations/palette';

interface Props {
    item: RelatedItem;
}

const styles = css`
    background: white;
    margin-right: ${remSpace[4]};
    min-width: 250px;
    width: 25%;
    position: relative;
    color: ${neutral[7]};
    text-decoration: none;

    div {
        padding-bottom: 56.25%;
        position: relative
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
        margin: 0 0 ${remSpace[12]} 0;
        padding: ${remSpace[2]};
    }

    time {
        ${textSans.small()};
        float: left;
        color: ${text.supporting};
        margin-top: ${remSpace[4]};
        position: absolute;
        bottom: ${remSpace[2]};
        left: ${remSpace[2]};
    }
`

const relativeFirstPublished = (date: Option<Date>): JSX.Element | null => pipe2(
    date,
    map(date => <time>{makeRelativeDate(date)}</time>),
    withDefault<JSX.Element | null>(null),
);

const Card = ({ item }: Props): JSX.Element => {
    return <a css={styles} href={item.link}>
        <li>
            <div>
                <img alt={item.title} src={item.headerImage?.url} />
            </div>
            <h2>{item.title}</h2>
            {relativeFirstPublished(fromNullable(new Date(item.lastModified?.iso8601 ?? 0)))}
        </li>
    </a>
}


export default Card;
