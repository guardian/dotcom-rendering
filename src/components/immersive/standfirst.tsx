// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';

import { headlineFont, darkModeCss, basePx, linkStyle } from 'styles';
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
    standfirst: DocumentFragment;
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

    const content = bylineHtml.map(html => {
        if (byline !== '' && standfirst.textContent?.includes(byline)) {
            return <div>{renderText(standfirst, pillar)}</div>;
        } else {
            return (
                <div>
                    <div>{renderText(standfirst, pillar)}</div>
                    <address>
                        <span>By </span>
                        {renderText(html, pillar)}
                    </address>
                </div>
            );
        }
    }).withDefault(<div>{ renderText(standfirst, pillar) }</div>)

    return (
        <div css={[ className, Styles(pillarStyles), DarkStyles(pillarStyles) ]}>
            { content }
        </div>
    );
}


// ----- Exports ----- //

export default Standfirst;
