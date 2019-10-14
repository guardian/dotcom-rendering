import React from 'react';
import { css } from 'emotion';
import { body } from '@guardian/pasteup/typography';
import { unescapeData } from '@frontend/web/server/escapeData';
// tslint:disable:react-no-dangerous-html

const para = css`
    margin-bottom: 16px;
    ${body(2)};
`;

const innerPara = css`
    p {
        ${para}
    }
`;

export const TextBlockComponent: React.FC<{ html: string }> = ({ html }) => {
    const prefix = '<p>';
    const suffix = '</p>';

    // Ideally we want to want to avoid an unnecessary 'span' wrapper,
    // which also will cause issues with ads (spacefinder rules). React
    // requires a wrapping element for dangerouslySetInnerHTML so we
    // strip the original p markup and rewrap. The fallback case is
    // added for safety but should never happen. If it does happen
    // though it will cause issues with commercial JS which expects
    // paras to be top-level.
    if (html.startsWith(prefix) && html.endsWith(suffix)) {
        return (
            <p
                className={para}
                dangerouslySetInnerHTML={{
                    __html: unescapeData(
                        html.slice(prefix.length, html.length - suffix.length),
                    ),
                }}
            />
        );
    }

    return (
        <span
            className={innerPara}
            dangerouslySetInnerHTML={{
                __html: unescapeData(html),
            }}
        />
    );
};
