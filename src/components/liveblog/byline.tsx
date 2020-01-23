import React, { ReactNode } from 'react';
import { textSans, basePx } from 'styles';
import { Keyline } from '../shared/keyline';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { formatDate } from 'date';
import Avatar from 'components/shared/avatar';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillar';
import { CommentCount } from 'components/shared/commentCount';
import { Article } from 'article';
import { renderText } from 'renderer';

const LiveblogBylineStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    padding-bottom: ${basePx(1)};

    .author {
        padding-bottom: 4px;
        line-height: 2.2rem;

        address {
            font-style: italic;
            a {
                text-decoration: none;
                font-style: normal;
                font-weight: 500;
                padding-top: 4px;
            }
        }

        address, .follow, a {
            color: ${palette.neutral[100]};
        }

        time, .follow {
            ${textSans}
        }

        time {
            font-size: 1.4rem;
            color: ${palette.neutral[93]};
            opacity: .8;
        }
    }

    section {
        margin-top: ${basePx(-1)};

        .byline {
            width: 80%;
            float: left;
            display: inline-block;

            a {
                background: none;
            }
        }
    }
`;

const commentCount = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    border-left: solid 1px rgba(220,220,218,.4);
    button {
        background: ${liveblogBackground};
    }
`

interface LiveblogBylineProps {
    article: Article;
    imageSalt: string;
}

const LiveblogByline = ({ article, imageSalt}: LiveblogBylineProps): JSX.Element => {
    const pillarStyles = getPillarStyles(article.pillar);

    const byline = article.bylineHtml.map<ReactNode>(html =>
        // This is not an iterator, ESLint is confused
        // eslint-disable-next-line react/jsx-key
        <address>{ renderText(html, article.pillar) }</address>
    ).withDefault(null);

    const date = article.publishDate.map<ReactNode>(date =>
        // This is not an iterator, ESLint is confused
        // eslint-disable-next-line react/jsx-key
        <time>{ formatDate(new Date(date)) }</time>
    ).withDefault(null)

    return (
        <div css={[LiveblogBylineStyles(pillarStyles)]}>
            <Keyline {...article} />
            <LeftColumn>
                <section>
                    <div className="byline">
                        <Avatar
                            contributors={article.contributors}
                            bgColour={pillarStyles.featureHeadline}
                            imageSalt={imageSalt}
                        />
                        <div className="author">
                            { byline }
                            { date }
                            <div className="follow">Get alerts on this story</div>
                        </div>
                    </div>

                    {article.commentable
                        ? <CommentCount
                            count={0}
                            colour={palette.neutral[100]}
                            className={commentCount(pillarStyles)}
                          />
                        : null}
                </section>
            </LeftColumn>
        </div>
    )
}

export default LiveblogByline;
