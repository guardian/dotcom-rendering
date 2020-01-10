import React from 'react';
import { textSans, basePx } from 'styles';
import { Keyline } from '../shared/keyline';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { Contributor } from '../../capi';
import { formatDate } from 'date';
import Avatar from 'components/shared/avatar';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles } from 'pillar';
import { componentFromHtml } from 'renderBlocks';
import { CommentCount } from 'components/shared/commentCount';
import { Article } from 'article';

const LiveblogBylineStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    padding-bottom: ${basePx(1)};

    .author {
        padding-bottom: 4px;
        line-height: 2.2rem;

        address {
            font-style: inherit;
            a {
                text-decoration: none;
                font-weight: 500;
                padding-top: 4px;
                display: block;
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
    byline?: string;
    pillarStyles: PillarStyles;
    publicationDate: string;
    contributors: Contributor[];
    article: Article;
    imageSalt: string;
    commentable: boolean;
}

const LiveblogByline = ({
    byline,
    pillarStyles,
    publicationDate,
    contributors,
    article,
    imageSalt,
    commentable
}: LiveblogBylineProps): JSX.Element => {
    
    return (
        <div css={[LiveblogBylineStyles(pillarStyles)]}>
            <Keyline {...article} />
            <LeftColumn>
                <section>
                    <div className="byline">
                        <Avatar
                            contributors={contributors}
                            bgColour={pillarStyles.featureHeadline}
                            imageSalt={imageSalt}
                        />
                        <div className="author">
                            { byline ? <address>{componentFromHtml(byline)}</address> : null }
                            <time>{ formatDate(new Date(publicationDate)) }</time>
                            <div className="follow">Get alerts on this story</div>
                        </div>
                    </div>

                    {commentable
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
