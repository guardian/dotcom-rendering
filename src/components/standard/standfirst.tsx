// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';

import { sidePadding, headlineFont, darkModeCss } from 'styles';
import { getPillarStyles } from 'pillar';
import { renderText } from 'renderer';
import { Article, Layout } from 'article';


// ----- Styles ----- //

const FeatureStyles = `
    color: ${neutral[46]};
    ${headlineFont}
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.4rem;
`;

function Styles({ layout }: Article): SerializedStyles {
    const includeFeatureStyles = layout === Layout.Feature
        || layout === Layout.Review
        || layout === Layout.Opinion;

    return css`
        padding-bottom: 6px;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2rem;

        p, ul {
            margin: 0;
        }

        ${sidePadding}
        ${includeFeatureStyles ? FeatureStyles : null}
    `;
}

const DarkStyles = ({ pillar }: Article): SerializedStyles => darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    a {
        color: ${getPillarStyles(pillar).inverted};
    }
`;


// ----- Component ----- //

interface Props {
    article: Article;
    className: SerializedStyles;
}

const Standfirst = ({ article, className }: Props): JSX.Element | null =>
    article.standfirst.fmap<JSX.Element | null>(standfirst =>
        <div css={[className, Styles(article), DarkStyles(article)]}>
            {renderText(standfirst, article.pillar)}
        </div>
    ).withDefault(null);

// ----- Exports ----- //

export default Standfirst;
