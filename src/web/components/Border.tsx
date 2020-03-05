import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';

export const Border = () => (
    <div
        className={css`
            border-left: 1px solid ${border.secondary};
            height: 100%;
        `}
    />
);
