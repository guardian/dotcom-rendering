// @flow
import { extractCritical } from 'emotion-server';

const extractCriticalCss = (styletron, body) =>
    [
        styletron.getStylesheetsHtml(),
        `<style expensive-css>${extractCritical(body).css}</style>`,
    ].join('\n');

export default extractCriticalCss;
