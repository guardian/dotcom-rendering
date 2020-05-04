import React from 'react';

import { unescapeData } from '@root/src/lib/escapeData';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { text } from '@guardian/src-foundations/palette';

type Props = {
    html: string;
    alt?: string;
};

const emailCaptionStyle = css`
    ${textSans.xsmall()};
    word-wrap: break-word;
    color: ${text.supporting};
`;

const widthOverride = css`
    iframe {
        /* Some embeds can hijack the iframe and calculate an incorrect width, which pushes the body out */
        width: 100% !important;
    }
    margin-bottom: 16px;
`;

export const EmbedBlockComponent = ({ html, alt }: Props) => {
    const isEmailEmbed = html.includes('email/form');
    return (
        <div className={widthOverride}>
            <div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />
            {isEmailEmbed && alt && (
                <div className={emailCaptionStyle}>{alt}</div>
            )}
        </div>
    );
};
