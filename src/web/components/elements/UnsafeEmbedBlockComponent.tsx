import React from 'react';
import { css } from 'emotion';

type Props = {
    html: string;
    alt: string;
    index: number;
};

const fullWidthStyles = css`
    width: 100%;
`;
export const UnsafeEmbedBlockComponent = ({ html, alt, index }: Props) => (
    <iframe
        className={`${fullWidthStyles} atom__iframe`}
        title={alt}
        name={`unsafe-embed-${index}`}
        data-cy="embed-block"
        srcDoc={`${html}
        <script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
        <gu-script>iframeMessenger.enableAutoResize();</gu-script>`}
    />
);
