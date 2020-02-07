import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';

export const Border = () => (
    <div
        className={css`
            border-left: 1px solid ${palette.neutral[86]};
            height: 100%;
        `}
    />
);
