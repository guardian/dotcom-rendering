// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';

import { Format } from 'item';
import { getPillarStyles } from 'pillar';
import { Contributor, isSingleContributor } from 'contributor';


// ----- Component ----- //

interface Props extends Format {
    contributors: Contributor[];
}

const styles = (colour: string): SerializedStyles => css`
    ${textSans.xsmall()}
    color: ${colour};
    display: block;
    padding: 0;
    border: none;
    background: none;
`;

function getStyles({ pillar }: Format): SerializedStyles {
    const colours = getPillarStyles(pillar);

    return styles(colours.kicker);
}

function Follow({ contributors, ...format }: Props): JSX.Element | null {

    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.apiUrl !== '') {
        return (
            <button className="js-follow" css={getStyles(format)} data-id={contributor.id}>
                <span className="js-status">Follow </span>
                { contributor.webTitle }
            </button>
        );
    }

    return null;

}


// ----- Exports ----- //

export default Follow;
