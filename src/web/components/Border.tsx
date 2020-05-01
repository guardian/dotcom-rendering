import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';
import { until } from '@guardian/src-foundations/mq';

export const Border = () => (
    <div
        className={css`
            ${until.leftCol} {
                visibility: collapse;
            }

            border-left: 1px solid ${border.secondary};
            height: 100%;
        `}
    />
);
