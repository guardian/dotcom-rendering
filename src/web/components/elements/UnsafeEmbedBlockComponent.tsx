import React from 'react';
import { css } from 'emotion';

type Props = {
    html: string;
    alt: string;
};

const fullWidthStyles = css`
    width: 100%;
`;
export const UnsafeEmbedBlockComponent = ({ html, alt }: Props) => (
    <iframe
        className={`${fullWidthStyles} atom__iframe`}
        title={alt}
        data-cy="embed-block"
        srcDoc={`<script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
            <script>iframeMessenger.enableAutoResize();</script>
            ${html}`}
    />
);
