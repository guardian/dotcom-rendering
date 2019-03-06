import React from 'react';
import { css } from 'emotion';
import { headline } from '@guardian/pasteup/typography';

// tslint:disable:react-no-dangerous-html
const style = css`
    margin-top: 24px;
    margin-bottom: 10px;
    ${headline(3)};
`;

export const SubheadingBlockComponent: React.FC<{
    html: string;
}> = ({ html }) => (
    <span
        className={style}
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
