import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';
import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';
import { pillarPalette } from '@root/src/lib/pillars';
import { neutral, background } from '@guardian/src-foundations/palette';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';

type Props = {
    html: string;
    pillar: Pillar;
    quoted?: boolean;
};

const Row = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
        `}
    >
        {children}
    </div>
);

const blockquoteStyles = css`
    margin-bottom: 16px;
    ${body.medium()};
    font-style: italic;
    color: ${neutral[46]};
`;

const blockStyles = css`
    ${body.medium({ lineHeight: 'tight' })};
    background-color: ${background.secondary};
    padding-top: 8px;
    padding-bottom: 16px;
    padding-left: 12px;
    padding-right: 12px;
`;

export const BlockquoteBlockComponent: React.FC<Props> = ({
    html,
    pillar,
    quoted = true,
}: Props) => {
    const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml({
        prefix: '<blockquote>',
        suffix: '</blockquote>',
        html,
    });

    return (
        <Row>
            {quoted && (
                <QuoteIcon colour={pillarPalette[pillar].main} size="large" />
            )}
            <RewrappedComponent
                isUnwrapped={isUnwrapped}
                html={unwrappedHtml}
                elCss={quoted ? blockquoteStyles : blockStyles}
                tagName="blockquote"
            />
        </Row>
    );
};
