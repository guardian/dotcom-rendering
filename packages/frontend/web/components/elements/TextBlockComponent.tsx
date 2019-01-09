import React from 'react';
import { css } from 'emotion';
import { body } from '@guardian/pasteup/typography';
// tslint:disable:react-no-dangerous-html

const para = css`
    p {
        margin-bottom: 16px;
        ${body(2)};
    }
`;

export const TextBlockComponent: React.SFC<{ html: string }> = ({ html }) => (
    <span
        className={para}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
