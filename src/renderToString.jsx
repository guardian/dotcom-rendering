// @flow
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import { render as renderToStringPreact } from 'preact-render-to-string';

const renderToString = (node: React.Element<any>): string =>
    renderToStringPreact(node);

export default renderToString;
