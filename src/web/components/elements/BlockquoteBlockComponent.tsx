import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';
import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';
import { pillarPalette } from '@root/src/lib/pillars';
import { neutral } from '@guardian/src-foundations/palette';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';

type Props = {
    html: string;
    pillar: Pillar;
};

export const BlockquoteBlockComponent: React.FC<Props> = ({
    html,
    pillar,
}: Props) => {
    const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml({
        fixes: [{ prefix: '<blockquote>', suffix: '</blockquote>' }],
        html,
    });

    return (
        <blockquote
            className={css`
                display: flex;
                flex-direction: row;
            `}
        >
            <QuoteIcon colour={pillarPalette[pillar].main} size="large" />
            <RewrappedComponent
                isUnwrapped={isUnwrapped}
                html={unwrappedHtml}
                elCss={css`
                    margin-bottom: 16px;
                    ${body.medium()};
                    font-style: italic;
                    color: ${neutral[46]};
                `}
                tagName="blockquote"
            />
        </blockquote>
    );
};
