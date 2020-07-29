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
        font-size: 85%;
    }
`;

export const DisclaimerBlockComponent: React.FC<{
    html: string;
    pillar: Pillar;
}> = ({ html, pillar }) => (
    <span
        className={style(pillar)}
        data-cy="affiliate-disclaimer"
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
