// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';

import { sidePadding, textSans, darkModeCss, basePx } from 'styles';
import { formatDate } from 'date';
import { Contributor } from 'capi';
import Follow from 'components/shared/follow';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';
import { Option } from 'types/option';

// ----- Styles ----- //

const Styles = ({ kicker }: PillarStyles): SerializedStyles => css`
    width: 80%;
    float: left;
    display: inline-block;

    .author {
        margin: ${basePx(0, 0, 2, 0)};

        .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${textSans}
        }

        time {
            font-size: 1.4rem;
            color: ${neutral[46]};
        }
    }
`;

const DarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    .author {
        .follow, a {
            color: ${inverted};
        }

        time {
            color: ${neutral[60]};
        }
    }
`;


// ----- Component ----- //

interface Props {
    pillar: Pillar;
    publicationDate: Option<Date>;
    contributors: Contributor[];
}

const Byline = ({ pillar, publicationDate, contributors }: Props): JSX.Element => {
    const pillarStyles = getPillarStyles(pillar);

    return (
        <div css={[Styles(pillarStyles), DarkStyles(pillarStyles)]}>
            <div css={sidePadding}>
                <div className="author">
                    { publicationDate
                        .fmap<JSX.Element | null>(date => <time>{formatDate(date)}</time>)
                        .withDefault(null) }
                    <Follow contributors={contributors} />
                </div>
            </div>
        </div>
    );
};


// ----- Exports ----- //

export default Byline;
