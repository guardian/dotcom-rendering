// @flow
import { extractCritical } from 'emotion-server';

const extractCriticalCss = (styletron: Object, body: string) =>
    [
        styletron.getStylesheetsHtml(),
        `<style expensive-css>${extractCritical(body).css}</style>`,
    ].join('\n');

export default extractCriticalCss;
