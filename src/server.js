// @flow
import renderToString from './renderToString';
import extractCriticalCss from './extractCriticalCss';

const startServer = () => {
    return {
        renderToString(node: React.Element<any>): string {
            return renderToString(node);
        },
        extractCriticalCss(body: string): string {
            return extractCriticalCss(body);
        },
    };
};

export default startServer;
