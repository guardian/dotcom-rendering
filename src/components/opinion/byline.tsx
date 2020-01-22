// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';

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
            color: ${palette.neutral[46]};
        }
    }
`;

const DarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    .author {
        .follow, a {
            color: ${inverted};
        }

        time {
            color: ${palette.neutral[60]};
        }
    }
`;


// ----- Component ----- //

interface Props {
    pillar: Pillar;
    publicationDate: Option<string>;
    contributors: Contributor[];
}

const Byline = ({ pillar, publicationDate, contributors }: Props): JSX.Element => {
    const pillarStyles = getPillarStyles(pillar);

    return (
        <div css={[Styles(pillarStyles), DarkStyles(pillarStyles)]}>
            <div css={sidePadding}>
                <div className="author">
                    { publicationDate
                        .map<JSX.Element | null>(date => <time>{ formatDate(new Date(date)) }</time>)
                        .withDefault(null) }
                    <Follow contributors={contributors} />
                </div>
            </div>
        </div>
    );
};


// ----- Exports ----- //

export default Byline;
