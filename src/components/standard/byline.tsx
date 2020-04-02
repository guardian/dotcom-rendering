// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';

import { textSans, darkModeCss, basePx } from 'styles';
import Avatar from 'components/shared/avatar';
import Follow from 'components/shared/follow';
import { PillarStyles, getPillarStyles } from 'pillar';
import { Standard, Review } from 'item';
import Author from 'components/shared/author';
import Dateline from 'components/dateline';


// ----- Styles ----- //

const Styles = ({ kicker }: PillarStyles): SerializedStyles => css`
    width: 80%;
    float: left;
    display: inline-block;
    margin-bottom: ${basePx(2)};

    .author {
        address {
            font-style: italic;

            a {
                text-decoration: none;
                font-weight: 700;
                background: none;
                font-style: normal;
            }
        }

        address, .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${textSans}
        }

        time {
            ${textSans.small()};
            color: ${neutral[46]};
        }
    }
`;

const DarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    .author {
        address, .follow, a {
            color: ${inverted};
        }

        time {
            color: ${neutral[86]};
        }
    }
`;


// ----- Component ----- //

interface Props {
    item: Standard | Review;
    imageSalt: string;
}

function Byline({ item, imageSalt }: Props): JSX.Element {
    const pillarStyles = getPillarStyles(item.pillar);

    return (
        <div
            css={[Styles(pillarStyles), DarkStyles(pillarStyles)]}
        >
            <div>
                <Avatar
                    contributors={item.contributors}
                    bgColour={pillarStyles.inverted}
                    imageSalt={imageSalt}
                />
                <div className="author">
                    <Author byline={item.bylineHtml} pillar={item.pillar} />
                    <Dateline date={item.publishDate} />
                    <Follow contributors={item.contributors} />
                </div>
            </div>
        </div>
    );
}


// ----- Exports ----- //

export default Byline;
