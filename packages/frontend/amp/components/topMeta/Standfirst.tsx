import React from 'react';
import { css, cx } from 'emotion';
import { palette, headline, textSans } from '@guardian/src-foundations';
import { pillarPalette } from '@frontend/lib/pillars';
import { composeLabsCSS } from '@frontend/amp/lib/compose-labs-css';
import { ListStyle, LinkStyle } from '@frontend/amp/components/elements/Text';

const standfirstCss = (pillar: Pillar) => css`
    ${headline({ level: 1 })};
    font-weight: 100;
    color: ${palette.neutral[7]};
    margin-bottom: 12px;

    p {
        margin-bottom: 8px;
        font-weight: 200;
    }
    strong {
        font-weight: 700;
    }

    ${ListStyle(pillarPalette[pillar].neutral.border)};
    ${LinkStyle(pillar)};
`;

// Labs paid content only
const labsStyle = css`
    p,
    li {
        font-weight: 700;
        ${textSans({ level: 4 })}
    }
`;

export const Standfirst: React.SFC<{
    text: string;
    pillar: Pillar;
}> = ({ text, pillar }) => {
    return (
        <div // tslint:disable-line:react-no-dangerous-html
            className={composeLabsCSS(
                pillar,
                cx(standfirstCss(pillar)),
                labsStyle,
            )}
            dangerouslySetInnerHTML={{
                __html: text,
            }}
        />
    );
};
