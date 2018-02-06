// @flow
import normalize from 'normalize.css';

console.log( `CSS ----> ${normalize}` );

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
            <title>My Universal App</title>
            <style>
                body {
                    margin: 0;
                }
            </style>
            ${stylesForHead}
            <script src="/assets/javascript/app.browser.js" async></script>
        </head>
        <body>
            <div id='app'>${html}</div>
        </body>
    </html>
`;
