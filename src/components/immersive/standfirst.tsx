// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';

import { bulletStyles, headlineFont, darkModeCss, basePx, linkStyle } from 'styles';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';
import { renderText } from 'renderer';
import { Option } from 'types/option';


// ----- Styles ----- //

const Styles = ({ kicker }: PillarStyles): SerializedStyles => css`
    ${headlineFont}
    color: ${palette.neutral[46]};
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.4rem;

    ${linkStyle(kicker)}

    p, ul {
        margin: 0;
    }

    address {
        font-style: normal;
    }

    padding: ${basePx(1)};
    ${bulletStyles(kicker)}
`;

const DarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    a {
        color: ${inverted};
    }
`;


// ----- Component ----- //

interface Props {
    standfirst: Option<DocumentFragment>;
    byline: string;
    bylineHtml: Option<DocumentFragment>;
    pillar: Pillar;
    className: SerializedStyles;
}

const Standfirst = ({
    standfirst,
    byline,
    bylineHtml,
    pillar,
    className,
}: Props): JSX.Element => {
    const pillarStyles = getPillarStyles(pillar);

    const standfirstHtml = standfirst.map<ReactNode>(html =>
        // This is not an iterator, ESLint is confused
        // eslint-disable-next-line react/jsx-key
        renderText(html, pillar)
    ).withDefault(null)

    const standfirstIncludesByline = standfirst
        .map(doc => doc.textContent?.includes(byline)).withDefault(false);

    const content = bylineHtml.map<ReactNode>(html => {
        if (byline !== '' && standfirstIncludesByline) {
            return <div>{standfirstHtml}</div>;
        } else {
            return (
                <div>
                    <div>{standfirstHtml}</div>
                    <address>
                        <span>By </span>
                        {standfirstHtml}
                    </address>
                </div>
            );
        }
    }).withDefault(standfirstHtml)

    return (
        <div css={[ className, Styles(pillarStyles), DarkStyles(pillarStyles) ]}>
            { content }
        </div>
    );
}


// ----- Exports ----- //

export default Standfirst;
