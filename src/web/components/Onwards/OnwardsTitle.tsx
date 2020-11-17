import React from 'react';
import { css } from 'emotion';

import { text } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { between, from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

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
    padding-bottom: ${space[2]}px;
    padding-top: ${space[1]}px;
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

    ${between.tablet.and.leftCol} {
        margin-left: 10px;
    }

    ${until.leftCol} {
        margin-bottom: ${space[3]}px;
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
