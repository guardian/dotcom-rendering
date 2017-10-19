// @flow
import StyletronServer from 'styletron-server';
import renderToString from './renderToString';
import extractCriticalCss from './extractCriticalCss';

const startServer = () => {
    const server = new StyletronServer();

    return {
        renderToString(node): string {
            return renderToString(server, node);
        },
        extractCriticalCss(body: string): string {
            return extractCriticalCss(server, body);
        },
    };
};

export default startServer;
