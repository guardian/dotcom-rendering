import React from 'react';
import { body } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';
import { css } from 'emotion';

const style = (pillar: Pillar) => css`
    ${body.small()};

    a {
        color: ${pillarPalette[pillar].dark};
    }

    sup {
        font-size: 12.75px;
    }
`;

export const DisclaimerBlockComponent: React.FC<{
    html: string;
    pillar: Pillar;
}> = ({ html, pillar }) => (
    <div
        className={style(pillar)}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
