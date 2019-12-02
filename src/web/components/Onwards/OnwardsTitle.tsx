import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

export const OnwardsTitle = ({ title }: { title: string }) => (
    <h2
        className={css`
            ${headline.xsmall()};
            color: ${palette.neutral[7]};
            font-weight: 900;
            padding-right: 5px;
            padding-bottom: 14px;
            padding-top: 3px;

            ${from.leftCol} {
                ${headline.xsmall()};
                font-weight: 900;
            }

            ${from.wide} {
                font-weight: 900;
            }
        `}
    >
        {title}
    </h2>
);
