// @flow
import { render as renderToStringPreact } from 'preact-render-to-string';
import extractCriticalCss from './extractCriticalCss';

const startServer = () => {
    return {
        renderToString(node: React.Element<any>): string {
            return renderToStringPreact(node);
        },
        extractCriticalCss(body: string): string {
            return extractCriticalCss(body);
        },
    };
};

export default startServer;
