import React from 'react';
import { css } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { textSans } from '@guardian/pasteup/typography';

const style = (pillar: Pillar) => css`
    ${textSans(2)};
    line-height: 24px;

    a {
        color: ${pillarPalette[pillar].dark};
    }
`;

export const Disclaimer: React.FC<{
    html: string;
    pillar: Pillar;
}> = ({ html, pillar }) => (
    // tslint:disable-next-line:react-no-dangerous-html
    <span
        className={style(pillar)}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
