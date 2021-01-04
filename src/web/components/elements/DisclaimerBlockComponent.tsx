import React from 'react';
import { body } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';
import { css } from 'emotion';

const style = (pillar: CAPIPillar) => css`
    ${body.small()};

    a {
        color: ${pillarPalette[pillar].dark};
    }

    sup {
        font-size: 85%;
    }

    margin-bottom: 16px;
`;

export const DisclaimerBlockComponent: React.FC<{
    html: string;
    pillar: CAPIPillar;
}> = ({ html, pillar }) => (
    <footer
        className={style(pillar)}
        data-cy="affiliate-disclaimer"
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
