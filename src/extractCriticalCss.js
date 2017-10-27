// @flow
import { extractCritical } from 'emotion-server';

const extractCriticalCss = (body: string): string =>
    `<style>${extractCritical(body).css}</style>`;

export default extractCriticalCss;
