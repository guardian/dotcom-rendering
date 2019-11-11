import React from 'react';
import { css } from 'emotion';
import Quote from '@frontend/static/icons/quote.svg';
import { pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/__experimental__typography';

const styles = (pillar: Pillar) => css`
    background-color: ${palette.neutral[97]};
    padding: 0.375rem 0.625rem 0.75rem;
    margin-bottom: 0.75rem;
    display: block;
    color: ${pillarPalette[pillar].dark};
    ${body.medium()};

    svg {
        fill: ${pillarPalette[pillar].dark};
    }
`;

export const PullQuote: React.FC<{
    html: string;
    pillar: Pillar;
}> = ({ html, pillar }) => (
    <aside className={styles(pillar)}>
        <Quote />{' '}
        <span // tslint:disable-line:react-no-dangerous-html
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
    </aside>
);
