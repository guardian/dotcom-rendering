import React, { ReactNode } from 'react';
import { textSans, basePx } from 'styles';
import { Keyline } from '../shared/keyline';
import { css, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import Avatar from './avatar';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { CommentCount } from './commentCount';
import { Liveblog } from 'item';
import { renderText } from 'renderer';
import Dateline from 'components/dateline';
import { ImageMappings } from 'components/shared/page';

const styles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    padding-bottom: ${basePx(1)};

    .author {
        padding-bottom: 4px;

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
            color: ${neutral[100]};
        }

        time, .follow {
            ${textSans}
        }

        time {
            ${textSans.small()};
            color: ${neutral[93]};
            opacity: .8;
        }
    }

    section {
        margin-top: ${basePx(-1)};

        .metadata {
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

interface Props {
    item: Liveblog;
    imageMappings: ImageMappings;
}

const Metadata = ({ item, imageMappings}: Props): JSX.Element => {
    const pillarStyles = getPillarStyles(item.pillar);

    const byline = item.bylineHtml.fmap<ReactNode>(html =>
        <address>{ renderText(html, item.pillar) }</address>
    ).withDefault(null);

    return (
        <div css={[styles(pillarStyles)]}>
            <Keyline {...item} />
            <LeftColumn>
                <section>
                    <div className="metadata">
                        <Avatar
                            contributors={item.contributors}
                            bgColour={pillarStyles.featureHeadline}
                            imageMappings={imageMappings}
                        />
                        <div className="author">
                            { byline }
                            <Dateline date={item.publishDate} />
                            <div className="follow">Get alerts on this story</div>
                        </div>
                    </div>

                    {item.commentable
                        ? <CommentCount
                            count={0}
                            colour={neutral[100]}
                            className={commentCount(pillarStyles)}
                          />
                        : null}
                </section>
            </LeftColumn>
        </div>
    )
}

export default Metadata;
