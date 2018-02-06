// @flow
export default ({
    stylesForHead,
    html,
}: {
    stylesForHead: string,
    html: string,
}) => `
    <!doctype html>
    <html>
        <head>
            <title>The Guardian</title>
            ${stylesForHead}
            <script src="/assets/javascript/app.browser.js" async></script>
        </head>
        <body>
            <div id='app'>${html}</div>
        </body>
    </html>
`;
