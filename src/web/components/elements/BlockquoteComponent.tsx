import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';

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

    return (
        <RewrappedComponent
            prefix='<blockquote class="quoted">'
            suffix="</blockquote>"
            html={html}
            elCss={blockquote}
            tagName="blockquote"
        />
    );
};
