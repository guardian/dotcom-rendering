// @flow
// eslint-disable-next-line no-unused-vars
import { h, render as renderPreact } from 'preact';

const render = (
    node: React.Element<any>,
    parent: Element,
    mergeWith: Element
): void => renderPreact(node, parent, mergeWith);

export default render;
