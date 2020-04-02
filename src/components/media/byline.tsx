// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { sidePadding, darkModeCss, basePx } from 'styles';
import { PillarStyles, getPillarStyles, Pillar } from 'pillar';
import { Option } from 'types/option';
import Dateline from 'components/dateline';
import { Item } from "../../item";
import { textSans } from "@guardian/src-foundations/typography";


// ----- Styles ----- //

const Styles = ({ kicker }: PillarStyles): SerializedStyles => css`
    .author {
        margin: ${basePx(1, 0, 2, 0)};

        .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${textSans.xsmall()}
        }

        time {
            ${textSans.xsmall()};
            color: ${neutral[86]};
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
            color: ${neutral[86]};
        }
    }
`;


// ----- Component ----- //

interface Props {
    pillar: Pillar;
    publicationDate: Option<Date>;
    className: SerializedStyles;
    item: Item;
}

function Byline({ pillar, publicationDate, className, item }: Props): JSX.Element {
    const pillarStyles = getPillarStyles(pillar);

    return (
        <div css={[className, Styles(pillarStyles), DarkStyles(pillarStyles)]}>
            <div css={sidePadding}>
                <div>
                    <Dateline date={publicationDate} />
                </div>
            </div>
        </div>
    );
}


// ----- Exports ----- //

export default Byline;
