import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

type Props = {
    html: string;
    alt: string;
    index: number;
};

const fullWidthStyles = css`
    width: 100%;
`;

const unsafeEmbedWrapperStyles = css`
    position: relative;
    float: left;
    width: 300px;
    margin-top: ${space[1]}px;
    margin-bottom: ${space[3]}px;
    margin-right: ${space[5]}px;

    &.img--landscape {
        margin-right: ${space[5]}px;
    }
    ${from.leftCol} {
        margin-left: -${space[9]}px;
    }
    ${from.wide} {
        width: 380px;
    }
`;

export const UnsafeEmbedBlockComponent = ({ html, alt, index }: Props) => (
    <figure className={unsafeEmbedWrapperStyles}>
        <iframe
            className={`${fullWidthStyles} js-embed__iframe`}
            title={alt}
            // name is used to identify each unique iframe on the page to resize
            // we therefore use the "unsafe-embed-" prefix followed by index to
            // construct a unique ID
            name={`unsafe-embed-${index}`}
            data-cy="embed-block"
            srcDoc={`${html}
            <script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
            <gu-script>iframeMessenger.enableAutoResize();</gu-script>`}
        />
    </figure>
);
