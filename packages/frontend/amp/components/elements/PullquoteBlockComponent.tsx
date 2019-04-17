import React from 'react';
import { css } from 'emotion';
import Quote from '@guardian/pasteup/icons/quote.svg';
import { pillarPalette } from '@frontend/lib/pillars';
import { palette } from '@guardian/pasteup/palette';
import { body } from '@guardian/pasteup/typography';

const styles = (pillar: Pillar) => css`
    background-color: ${palette.neutral[97]};
    padding: 0.375rem 0.625rem 0.75rem;
    margin-bottom: 0.75rem;
    display: block;
    color: ${pillarPalette[pillar].dark};
    ${body(2)};

    svg {
        fill: ${pillarPalette[pillar].dark};
    }
`;

export const PullquoteBlockComponent: React.FC<{
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
