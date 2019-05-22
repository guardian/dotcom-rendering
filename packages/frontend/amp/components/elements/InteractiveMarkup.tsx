import React from 'react';
import { ShowMoreButton } from '@frontend/amp/components/ShowMoreButton';
import { css } from 'emotion';

const iframeStyle = css`
    margin-top: 16px;
    margin-bottom: 12px;
`;

const showMore = css`
    &[overflow] {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
`;

export const InteractiveMarkup: React.SFC<{
    html?: string;
    styles?: string;
    js?: string;
}> = ({ html, styles, js }) => {
    const styleTag = styles ? `<style>${styles}</style>` : '';
    const scripts = js ? `<script>${js}</script>` : '';

    const resizeScript = `
<script>
    var height = Math.max(
        body.scrollHeight,
        body.offsetHeight, 
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );
    
    window.parent.postMessage({
        sentinel: 'amp',
        type: 'embed-size',
        height: height
    }, '*');
    
    console.log(height);
</script>`;

    const body = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charSet="utf-8" />
        <meta
            name="viewport"
            content="width=device-width,minimum-scale=1,initial-scale=1"
        />

        ${styleTag}
    </head>

    <body>
        ${html}
        ${scripts}
        ${resizeScript}
    </body>
    </html>
`;

    return (
        <amp-iframe
            class={iframeStyle}
            layout="responsive"
            height="1"
            width="8"
            sandbox="allow-scripts"
            srcdoc={body}
            resizable=""
        >
            <div overflow="" className={showMore}>
                <ShowMoreButton />
            </div>
        </amp-iframe>
    );
};
