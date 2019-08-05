import React from 'react';
import { css } from 'emotion';
import { body } from '@guardian/pasteup/typography';
import { sanitise } from '@frontend/lib/sanitise-html';
// tslint:disable:react-no-dangerous-html

const para = css`
    p {
        margin-bottom: 16px;
        ${body(2)};
    }
`;

const sanitiserOptions = {
    // Defaults: https://www.npmjs.com/package/sanitize-html#what-are-the-default-options
    allowedTags: false, // Leave tags from CAPI alone
    allowedAttributes: false, // Leave attributes from CAPI alone
    transformTags: {
        a: (tagName: string, attribs: {}) => ({
            tagName, // Just return anchors as is
            attribs: {
                ...attribs, // Merge into the existing attributes
                ...{
                    'data-link-name': 'in body link', // Add the data-link-name for Ophan to anchors
                },
            },
        }),
    },
};

export const TextBlockComponent: React.FC<{ html: string }> = ({ html }) => (
    <span
        className={para}
        dangerouslySetInnerHTML={{
            __html: sanitise(html, sanitiserOptions),
        }}
    />
);
