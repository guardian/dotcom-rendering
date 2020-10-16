import { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { Option, map, withDefault } from '@guardian/types/option';
import { darkModeCss } from 'styles';
import { getPillarStyles } from 'pillarStyles';
import { Format } from '@guardian/types/Format';
import { headline } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import { pipe2 } from 'lib';
import { SvgQuote } from '@guardian/src-icons/quote';
import React from 'react';


const styles = (format: Format): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(format.pillar);
    return css`
        color: ${kicker};
        margin: 0;
        ${headline.xsmall({ fontWeight: 'light' })};
        ${darkModeCss`color: ${inverted};`}

    `;
};

const quoteStyles =  (format: Format): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(format.pillar);

    return css`
        margin: ${remSpace[4]} 0 ${remSpace[2]} 0;

        svg {
            margin-bottom: -0.6rem;
            height: 2.3rem;
            margin-left: -0.3rem;
            line-height: 1.2;
            fill: ${kicker};
            ${darkModeCss`fill: ${inverted};`}
        }
`;}

const citeStyles = css`
    font-style: normal;
`;

type Props = {
    quote: string;
    format: Format;
    attribution: Option<string>;
};

const blockQuoteStyles = css`
    margin-left: 0;
`

const Pullquote: FC<Props> = ({ quote, attribution, format }) => {
    const quoteElement = (
        <p css={quoteStyles(format)}>
            <SvgQuote/>
            {quote}
        </p>
    );
    const children = pipe2(
        attribution,
        map(attribution =>
            ([quoteElement, <cite key={attribution} css={citeStyles}>{attribution}</cite>])),
        withDefault<ReactNode>([quoteElement]));

    return (
        <aside css= {styles(format)}>
            <blockquote css={blockQuoteStyles}>{children}</blockquote>
        </aside>
    );
}

export default Pullquote;