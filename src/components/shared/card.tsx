import React, { ReactElement, FC } from 'react';
import { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { remSpace, breakpoints, palette } from '@guardian/src-foundations';
import { Option, withDefault, map, fromNullable, OptionKind } from '@guardian/types/option';
import { makeRelativeDate, formatSeconds } from 'date';
import { pipe2 } from 'lib';
import { text, neutral, background, opinion } from '@guardian/src-foundations/palette';
import { Design, Display, Format } from '@guardian/types/Format';
import { Image } from 'image';
import { darkModeCss } from 'styles';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { getPillarStyles, pillarFromString } from 'pillarStyles';
import Img from 'components/img';
import { border } from 'editorialPalette';
import { SvgCamera, SvgVideo, SvgAudio, SvgQuote } from '@guardian/src-icons';
import { stars } from 'components/starRating';


interface Props {
    relatedItem: RelatedItem;
    image: Option<Image>;
}

const borderColor = (itemType: RelatedItemType, format: Format): SerializedStyles => {
    if (itemType === RelatedItemType.ADVERTISEMENT_FEATURE){
        return css`1px solid ${palette.labs[300]}`
    } else {
        return css`1px solid ${getPillarStyles(format.pillar).kicker}`
    }
}

const listStyles = (itemType: RelatedItemType, format: Format): SerializedStyles => {
    return css`
        background: white;
        margin-right: ${remSpace[3]};
        flex: 0 0 15rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-top : ${borderColor(itemType, format)};

        &.fade {
            opacity: .7;
        }

        ${darkModeCss`
            background: ${neutral[7]};
        `}
    `;
}


const fullWidthImage = css`
    img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const timeStyles = css`
    ${textSans.small()};
    color: ${text.supporting};
    text-align: right;
    display: inline-block;
    vertical-align: top;
`;

const durationStyles = css`
    margin-left: ${remSpace[2]};
`;

const dateStyles = css`
    float: right;
`

const anchorStyles = css`
    color: ${neutral[7]};
    text-decoration: none;
    ${darkModeCss`
        color: ${neutral[86]};
    `}
`;

const headingWrapperStyles = css`
    padding: ${remSpace[2]};
    min-height: 10rem;
`

const headingStyles = (itemType: RelatedItemType): SerializedStyles => {
    if (itemType === RelatedItemType.ADVERTISEMENT_FEATURE){
        return css`
            ${textSans.medium({ lineHeight: 'regular' })}
            margin: 0 0 ${remSpace[2]} 0;
        `;
    } else {
        return css`
            ${headline.xxsmall()}
            margin: 0 0 ${remSpace[2]} 0;
        `;
    }
}

const imageWrapperStyles = css`
    padding-bottom: 8.25rem;
    position: relative;
`;

const imageBackground = css`
    background: ${neutral[86]};
`;

const relativeFirstPublished = (date: Option<Date>): JSX.Element | null => pipe2(
    date,
    map(date => <time css={[timeStyles, dateStyles]}>{makeRelativeDate(date)}</time>),
    withDefault<JSX.Element | null>(null),
);

const cardStyles = (itemType: RelatedItemType, format: Format): SerializedStyles => {
    switch (itemType) {
        case RelatedItemType.FEATURE: {
            const { kicker } = getPillarStyles(format.pillar);

            return css`
                h2 {
                    ${headline.xxxsmall({ fontWeight: 'bold' })}
                    color: ${kicker};
                }
            `;
        }

        case RelatedItemType.ANALYSIS: {
            return css`
                ${headline.xxxsmall({ lineHeight: 'regular', fontWeight: 'light' })};
                h3 {
                    box-shadow: inset 0 -0.025rem ${border.primary(format)};
                    display: inline;

                    ${darkModeCss`
                        box-shadow: inset 0 -0.025rem ${neutral[46]};
                    `}
                }
            `;
        }

        case RelatedItemType.VIDEO:
        case RelatedItemType.AUDIO:
        case RelatedItemType.GALLERY: {
            return css`
                background: ${background.inverse};
                h3 {
                    color: ${text.ctaPrimary};
                }
            `;
        }

        case RelatedItemType.SPECIAL: {
            return css``;
        }

        case RelatedItemType.LIVE: {
            const { kicker, liveblogDarkBackground } = getPillarStyles(format.pillar);
            return css`
                background: ${kicker};
                h3, time {
                    color: ${text.ctaPrimary};
                }
                ${darkModeCss`
                    background: ${liveblogDarkBackground};
                `}
            `;
        }

        case RelatedItemType.ADVERTISEMENT_FEATURE: {
            return css`
                background-color : ${neutral[93]};
                ${textSans.large()}
            `;
        }

        case RelatedItemType.COMMENT: {
            return css`
                background-color : ${opinion[800]};
                ${headline.xxsmall()}
            `;
        }

        default: {
            return css``;
        }
    }
}

const parentIconStyles: SerializedStyles = css`
    display:inline-block;
    svg {
        width: 1rem;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.25rem;
        display: block;
    }
`;

const iconStyles = (format: Format): SerializedStyles => {
    const { inverted } = getPillarStyles(format.pillar);
    return css`
        width: 1.5rem;
        height: 1.5rem;
        display: inline-block;
        background-color: ${inverted};
        border-radius: 50%;
    `;
}

const commentIconStyle: SerializedStyles = css`
    width: 2.0rem;
    height: 1.4375rem;
    display: inline-block;
    fill: ${opinion[400]};
    vertical-align: text-top;
    margin-top: -3px;
    margin-right: -2px;
`;

const icon = (itemType: RelatedItemType, format: Format): ReactElement | null => {
    switch (itemType){
        case RelatedItemType.GALLERY:
            return <span css={iconStyles(format)}>< SvgCamera /></span>;
        case RelatedItemType.AUDIO:
            return <span css={iconStyles(format)}>< SvgAudio /></span>;
        case RelatedItemType.VIDEO:
            return <span css={iconStyles(format)}>< SvgVideo /></span>
        default:
            return null;
    }
}

const quotationComment = (itemType: RelatedItemType, format: Format): ReactElement | null => {
    if (itemType === RelatedItemType.COMMENT){
        return <span css={commentIconStyle}>< SvgQuote /></span>;
    } else {
        return null
    }
}

const metadataStyles: SerializedStyles = css`
    padding: 0 ${remSpace[2]};
    min-height: 2rem;
`;

const bylineStyles: SerializedStyles = css`
    color: ${opinion[400]};
`;

const durationMedia = (duration: Option<string>): ReactElement | null => {
    return pipe2(
        duration,
        map(length => {
            const seconds = formatSeconds(length);
            if (seconds.kind === OptionKind.Some) {
                return <time css={[timeStyles, durationStyles]}>
                    {seconds.value}
                </time>
            } else {
                return null;
            }
        }),
        withDefault<ReactElement | null>(null)
    )
}

const byline = (relatedItem: RelatedItem): ReactElement | null => {
    if (relatedItem.type !== RelatedItemType.COMMENT){
        return null;
    }

    return pipe2(
        fromNullable(relatedItem.byline),
        map(byline => {
            return <div css={bylineStyles}>{byline}</div>
        }),
        withDefault<ReactElement | null>(null)
    )
}

const cardImage = (image: Option<Image>, relatedItem: RelatedItem): ReactElement | null => {
    const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100%`;
    const format = {
        pillar: pillarFromString(relatedItem.pillar.id),
        design: Design.Article,
        display: Display.Standard
    }

    return pipe2(
        image,
        map(img => {
            return <div css={[fullWidthImage, imageWrapperStyles]}><Img
                image={img}
                sizes={sizes}
                format={format}
            /></div>
        }),
        withDefault<ReactElement | null>(<div css={[imageWrapperStyles, imageBackground]}></div>)
    )
}

const Card: FC<Props> = ({ relatedItem, image }) => {
    const format = {
        pillar: pillarFromString(relatedItem.pillar.id),
        design: Design.Article,
        display: Display.Standard
    }

    const img = cardImage(image, relatedItem);

    const lastModified = relatedItem.lastModified?.iso8601;
    const date = (lastModified && relatedItem.type !== RelatedItemType.ADVERTISEMENT_FEATURE)
        ? relativeFirstPublished(fromNullable(new Date(lastModified))) : null;
    const starRating = relatedItem.starRating && !Number.isNaN(parseInt(relatedItem.starRating))
        ? stars(parseInt(relatedItem.starRating)) : null;
    const articleId = relatedItem.link.split('.com/').pop();

    return (
        <li
            className="js-card"
            data-article-id={articleId}
            css={[listStyles(relatedItem.type, format), cardStyles(relatedItem.type, format)]}
        >
            <a css={anchorStyles} href={relatedItem.link}>
                <section css={headingWrapperStyles}>
                    <h3 css={headingStyles(relatedItem.type)}>
                        {quotationComment(relatedItem.type, format)}
                        {relatedItem.title}
                        {byline(relatedItem)}
                    </h3>
                    {starRating}
                </section>
                <section>
                    <div css={metadataStyles}>
                        <section css={parentIconStyles}>
                            {icon(relatedItem.type, format)}
                        </section>
                        {durationMedia(fromNullable(relatedItem.mediaDuration))}
                        {date}
                    </div>
                    {img}
                </section>
            </a>
        </li>
    )
}

export default Card;
