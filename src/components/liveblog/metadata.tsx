import React, { ReactNode } from 'react';
import { basePx } from 'styles';
import { Keyline } from '../shared/keyline';
import { css, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import Avatar from './avatar';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { CommentCount } from './commentCount';
import { Liveblog, getFormat } from 'item';
import { renderText } from 'renderer';
import Dateline from 'components/dateline';
import { pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';

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
                color: ${neutral[93]};
                border-bottom: 0.0625rem solid rgb(220, 220, 220, .4);
            }
        }

        address, .follow, a {
            color: ${neutral[100]};
        }

        time, .follow {
            ${textSans.small()};
        }

        time {
            ${textSans.small()};
            color: ${neutral[93]};
            opacity: .8;
        }
    }

    section {
        display: inline-block;
        width: 100%;
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
}

const Metadata = ({ item }: Props): JSX.Element => {
    const pillarStyles = getPillarStyles(item.pillar);

    const byline = pipe2(
        item.bylineHtml,
        map(html => <address>{ renderText(html, getFormat(item)) }</address>),
        withDefault<ReactNode>(null),
    );

    return (
        <div css={[styles(pillarStyles)]}>
            <Keyline {...item} />
            <LeftColumn>
                <section>
                    <div className="metadata">
                        <Avatar
                            contributors={item.contributors}
                            bgColour={pillarStyles.featureHeadline}
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
