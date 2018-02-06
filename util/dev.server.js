// @flow
/* eslint-disable global-require,import/no-dynamic-require */
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import decamelize from 'decamelize';

const srcDir = path.resolve(__dirname, '..', 'src');

export default (componentPath: string): string => {
    const styletron = new Styletron();

    let demos;
    let Message = () => null;

    try {
        demos = require(`${srcDir}/${componentPath}.demo`);
    } catch (e) {
        Message = () => (
            <div className="component-demo component-message">
                <p>There is no demo for {componentPath}.</p>
                <p>Rendering the actual component instead...</p>
            </div>
        );

        try {
            demos = require(`${srcDir}/${componentPath}`);
        } catch (e2) {
            console.log(e2);
            demos = {};
        }
    }

    const html = renderToString(
        <StyletronProvider styletron={styletron}>
            <div>
                <h2 className="component-demo">{componentPath}</h2>
                <Message />
                {Object.keys(demos).map(demo => {
                    const Demo = demos[demo];

                    return (
                        <div key={demo} className="component">
                            <h3 className="component-demo">
                                {decamelize(demo, ' ')}
                            </h3>
                            <div className="component-container">
                                <Demo />
                            </div>
                        </div>
                    );
                })}
            </div>
        </StyletronProvider>,
    );

    const stylesForHead = styletron.getStylesheetsHtml();

    return `
        <!doctype html>
        <html>
            <head>
                <title>✍️ The Guardian</title>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
                <link rel="stylesheet" href="https://pasteup.guim.co.uk/0.0.8/css/fonts.pasteup.min.css">
                <style>
                body {
                    padding: 2rem;
                    background-color: #efefef;
                }
                .component-demo {
                    font-family: "Guardian Agate Sans";
                    font-size: 13px ;
                }
                h3.component-demo {
                    font-weight: normal;
                }
                .component-message:after {
                    content: "";
                    display: table;
                    clear: both;
                }
                .component-message p {
                    margin: 0;
                    background-color: yellow;
                    clear: left;
                    float: left;
                }
                .component {
                    padding-top: 1rem;
                }
                .component-container {
                    background-color: white;
                }
                </style>
                ${stylesForHead}
            </head>
            <body>
                <div id='app'>${html}</div>
            </body>
        </html>
    `;
};
