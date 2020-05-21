// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';

import { Format } from 'format';
import { getPillarStyles } from 'pillarStyles';
import { Contributor, isSingleContributor } from 'contributor';
import { darkModeCss } from 'styles';
import { Design } from '@guardian/types/Format';


// ----- Component ----- //

interface Props extends Format {
    contributors: Contributor[];
}

const styles = (kicker: string, inverted: string): SerializedStyles => css`
    ${textSans.small()}
    color: ${kicker};
    display: block;
    padding: 0;
    border: none;
    background: none;
    margin-left: 0;

    ${darkModeCss`
        color: ${inverted};
    `}
`;

function getStyles({ pillar }: Format): SerializedStyles {
    const { kicker, inverted } = getPillarStyles(pillar);

    return styles(kicker, inverted);
}

function Follow({ contributors, ...format }: Props): JSX.Element | null {

    const [contributor] = contributors;

    if (
        isSingleContributor(contributors) &&
        contributor.apiUrl !== '' &&
        format.design !== Design.AdvertisementFeature
    ) {
        return (
            <button
                className="js-follow"
                css={getStyles(format)}
                data-id={contributor.id}
                data-display-name={contributor.name}
            >
                <span className="js-status">Follow </span>
                { contributor.name }
            </button>
        );
    }

    return null;

}


// ----- Exports ----- //

export default Follow;
