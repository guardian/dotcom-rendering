import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';
import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';
// tslint:disable:react-no-dangerous-html

type Props = {
    html: string;
};

export const BlockquoteComponent: React.FC<Props> = ({ html }: Props) => {
    const blockquote = css`
        margin-bottom: 16px;
        ${body.medium()};
        font-style: italic;
    `;

    const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml(
        '<blockquote class="quoted">',
        '</blockquote>',
        html,
    );

    return (
        <RewrappedComponent
            isUnwrapped={isUnwrapped}
            html={unwrappedHtml}
            elCss={blockquote}
            tagName="blockquote"
        />
    );
};
