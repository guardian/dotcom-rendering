// ----- Imports ----- //

import React from 'react';
import { css } from '@emotion/core'
import { neutral, opinion, background } from '@guardian/src-foundations/palette'
import { until } from '@guardian/src-foundations/mq';

import { basePx, headlineFont, darkModeCss, headlineFontStyles } from 'styles';
import { Pillar } from 'pillar';
import Author from 'components/shared/author';
import { Option } from 'types/option';


// ----- Styles ----- //

const Styles = css`
    padding: ${basePx(0, 0, 4, 0)};
    
    ${until.wide} {
        padding: ${basePx(0, 1, 4, 1)};
    }

    ${headlineFont}

    h1 {
        font-weight: 300;
        ${headlineFontStyles}
        color: ${neutral[7]};
    }

    address a {
        font-style: italic;
        font-weight: 100;
        ${headlineFontStyles}
        color: ${opinion[400]};
        background: none;
    }
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
    h1 {
        color: ${neutral[86]};
    }
`;


// ----- Component ----- //

interface Props {
    byline: Option<DocumentFragment>;
    headline: string;
    pillar: Pillar;
}

const Headline = ({ byline, headline, pillar }: Props): JSX.Element =>
    <div css={[Styles, DarkStyles]}>
        <h1>{headline}</h1>
        <Author byline={byline} pillar={pillar} />
    </div>


// ----- Exports ----- //

export default Headline;
