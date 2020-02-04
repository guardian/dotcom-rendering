import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

export const OnwardsTitle = ({
    title,
    description,
}: {
    title: string;
    description?: string;
}) => (
    <>
        <h2
            className={css`
                ${headline.xsmall({ fontWeight: 'bold' })};
                color: ${palette.neutral[7]};
                padding-bottom: 14px;
                padding-top: 6px;
                margin-left: 10px;

                ${from.leftCol} {
                    margin-left: 0;
                }
            `}
        >
            {title}
        </h2>
        {description && (
            <p
                className={css`
                    ${headline.xxxsmall({ fontWeight: 'medium' })};
                    color: ${palette.neutral[46]};
                    p {
                        margin-bottom: 8px;
                    }
                `}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        )}
    </>
);
