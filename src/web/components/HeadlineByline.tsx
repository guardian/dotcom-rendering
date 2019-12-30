import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';

import { BylineLink } from '@root/src/web/components/BylineLink';

const wrapperStyles = css`
    margin-left: 6px;
    margin-top: 5px;
    /* Without z-index here the byline appears behind the main image for showcase views */
    z-index: 1;
`;

const headlineBylineStyles = css`
    ${headline.xxsmall({
        fontWeight: 'regular',
        lineHeight: 'loose',
    })}
    font-style: italic;
    background-color: ${palette.brandYellow.main};
    box-shadow: 4px 0 0 ${palette.brandYellow.main},
        -6px 0 0 ${palette.brandYellow.main};
    display: inline-block;
    box-decoration-break: clone;

    a {
        color: inherit;
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;

type Props = {
    byline: string;
    tags: TagType[];
};

export const HeadlineByline = ({ byline, tags }: Props) => (
    <div className={wrapperStyles}>
        <div className={headlineBylineStyles}>
            <BylineLink byline={byline} tags={tags} />
        </div>
    </div>
);
