import React from 'react';
import { css } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import { textSans } from '@guardian/src-foundations/typography';

const style = (pillar: Pillar) => css`
    ${textSans.small()};

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
