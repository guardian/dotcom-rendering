import React from 'react';
import { css } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette } from '../../../pillars';

// tslint:disable:react-no-dangerous-html
const style = (pillar: Pillar) => css`
    p {
        margin: 0 0 12px;
        padding: 0;
        font-size: 16px;
        font-weight: 300;
        word-wrap: break-word;
        color: ${palette.neutral[7]};
    }
    a {
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        border-bottom: 1px solid #dcdcdc;

        :hover {
            border-bottom: 1px solid ${pillarPalette[pillar].main};
        }
    }
`;
export const TextBlockComponent: React.SFC<{
    html: string;
    pillar: Pillar;
}> = ({ html, pillar }) => (
    <span
        className={style(pillar)}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
