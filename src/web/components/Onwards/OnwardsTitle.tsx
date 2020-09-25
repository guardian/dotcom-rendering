import React from 'react';
import { css } from 'emotion';

import { text } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

const linkStyles = css`
    text-decoration: none;
    color: ${text.anchorSecondary};

    :hover {
        text-decoration: underline;
    }
`;

const headerStyles = css`
    ${headline.xsmall({ fontWeight: 'bold' })};
    color: ${text.primary};
    padding-bottom: 14px;
    padding-top: 6px;
    margin-left: 0;

    ${from.tablet} {
        margin-left: 10px;
    }

    ${from.leftCol} {
        margin-left: 0;
    }
`;

const descriptionStyles = css`
    ${headline.xxxsmall({ fontWeight: 'medium' })};
    color: ${text.supporting};
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
