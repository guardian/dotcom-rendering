import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

const linkStyles = css`
    text-decoration: none;
    color: ${palette.neutral[7]};

    :hover {
        text-decoration: underline;
    }
`;

const headerStyles = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
    color: ${palette.neutral[7]};
    padding-bottom: 14px;
    padding-top: 6px;
    margin-left: 10px;

    ${from.leftCol} {
        margin-left: 0;
    }
`;

const descriptionStyles = css`
    ${headline.xxxsmall({ fontWeight: 'medium' })};
    color: ${palette.neutral[46]};
    p {
        margin-bottom: 8px;
    }
`;

export const OnwardsTitle = ({
    title,
    description,
    url,
}: {
    title: string;
    description?: string;
    url?: string;
}) => (
    <>
        {url ? (
            <a className={linkStyles} href={url}>
                <h2 className={headerStyles}>{title}</h2>
            </a>
        ) : (
            <h2 className={headerStyles}>{title}</h2>
        )}
        {description && (
            <p
                className={descriptionStyles}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        )}
    </>
);
