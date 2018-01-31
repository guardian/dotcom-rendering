// @flow
export default ({ css, html }: { css: string, html: string }) => `
    <!doctype html>
    <html>
        <head>
            <title>My Universal App</title>
            <style>${css}</style>
            <script src="/assets/javascript/app.js" async></script>
        </head>
        <body>
            <div id='app'>${html}</div>
        </body>
    </html>
`;
