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

const TitleWrapper = ({
    url,
    children,
}: {
    url?: string;
    children: JSXElements;
}) =>
    url ? (
        <a className={linkStyles} href={url}>
            {children}
        </a>
    ) : (
        <>{children}</>
    );

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
        <TitleWrapper url={url}>
            <h2
                className={css`
                    ${headline.xsmall()};
                    color: ${palette.neutral[7]};
                    font-weight: 900;
                    padding-bottom: 14px;
                    padding-top: 6px;

                    ${from.leftCol} {
                        ${headline.xsmall()};
                        font-weight: 900;
                    }

                    ${from.wide} {
                        font-weight: 900;
                    }

                    margin-left: 10px;
                    ${from.leftCol} {
                        margin-left: 0;
                    }
                `}
            >
                {title}
            </h2>
        </TitleWrapper>
        {description && (
            <h3
                className={css`
                    ${headline.xxxsmall()};
                    color: ${palette.neutral[46]};
                    font-weight: 500;
                `}
            >
                {description}
            </h3>
        )}
    </>
);
