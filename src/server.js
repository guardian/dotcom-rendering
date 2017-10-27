// @flow
import { render as renderToStringPreact } from 'preact-render-to-string';
import { extractCritical } from 'emotion-server';

type GuuiServer = {
    renderToString: (React.Element<any>) => string,
    extractCriticalCss: string => string,
};

const startServer = (): GuuiServer => ({
    renderToString(node: React.Element<any>): string {
        return renderToStringPreact(node);
    },
    extractCriticalCss(body: string): string {
        return `<style>${extractCritical(body).css}</style>`;
    },
});

export default startServer;
