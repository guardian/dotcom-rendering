import React from 'react';

export const Interactive: React.SFC<{
    html?: string;
    styles?: string;
    js?: string;
}> = ({ html, styles, js }) => {
    const css = styles ? `<style>${styles}</style>` : '';
    const scripts = js ? `<script>${js}</script>` : '';

    const body = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charSet="utf-8" />
        <meta
            name="viewport"
            content="width=device-width,minimum-scale=1,initial-scale=1"
        />

        ${css}
    </head>

    <body>
        ${html}
        ${scripts}
    </body>
    </html>
`;

    return (
        <amp-iframe
            layout="responsive"
            height="1"
            width="5"
            sandbox="allow-scripts"
            srcdoc={body}
            resizable=""
        >
            <div overflow="">See the full visual</div>
        </amp-iframe>
    );
};
