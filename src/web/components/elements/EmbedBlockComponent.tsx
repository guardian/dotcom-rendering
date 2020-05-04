import React from 'react';

import { unescapeData } from '@root/src/lib/escapeData';
import { css } from 'emotion';

type Props = {
    html: string;
    alt?: string;
};

const widthOverride = css`
    iframe {
        /* Some embeds can hijack the iframe and calculate an incorrect width, which pushes the body out */
        width: 100% !important;
    }
`;

export const EmbedBlockComponent = ({ html, alt }: Props) => {
    const isEmailEmbed = html.includes('email/form');
    return (
        <div className={widthOverride}>
            <div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />
            {isEmailEmbed && alt && <div>{alt}</div>}
        </div>
    );
};
