import React from 'react';
import { sidePadding, textSans, darkModeCss } from 'styles';

import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { formatDate } from 'date';
import Avatar from 'components/shared/avatar';
import Follow from 'components/shared/follow';
import { PillarStyles, getPillarStyles, Pillar } from 'pillar';
import { Option } from 'types/option';
import { renderText } from 'renderer';
import { Article } from 'article';

const ArticleBylineStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    width: 80%;
    float: left;
    display: inline-block;

    .author {
        address {
            line-height: 2.2rem;
            font-style: inherit;

            a {
                text-decoration: none;
                font-weight: 500;
            }
        }

        address, .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${textSans}
        }

        time {
            font-size: 1.4rem;
            color: ${palette.neutral[46]};
        }
    }
`;

const ArticleBylineDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    .author {
        address, .follow, a {
            color: ${inverted};
        }

        time {
            color: ${palette.neutral[60]};
        }
    }
`;

const Author = (props: { byline: Option<DocumentFragment>; pillar: Pillar }): JSX.Element | null =>
    props.byline.map<JSX.Element | null>((bylineHtml: DocumentFragment) =>
        // This is not an iterator, ESLint is confused
        // eslint-disable-next-line react/jsx-key
        <address>{renderText(bylineHtml, props.pillar)}</address>
    ).withDefault(null);

interface ArticleBylineProps {
    article: Article;
    imageSalt: string;
}

function ArticleByline({ article, imageSalt }: ArticleBylineProps): JSX.Element {
    const pillarStyles = getPillarStyles(article.pillar);

    return (
        <div
            css={[ArticleBylineStyles(pillarStyles), ArticleBylineDarkStyles(pillarStyles)]}
        >
            <div css={sidePadding}>
                <Avatar
                    contributors={article.contributors}
                    bgColour={pillarStyles.inverted}
                    imageSalt={imageSalt}
                />
                <div className="author">
                    <Author byline={article.bylineHtml} pillar={article.pillar} />
                    <time className="date">{ formatDate(new Date(article.publishDate)) }</time>
                    <Follow contributors={article.contributors} />
                </div>
            </div>
        </div>
    );
}

export default ArticleByline;
