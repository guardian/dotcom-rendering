// @flow
import { h, render as renderPreact } from 'preact';
import { StyletronProvider } from 'styletron-preact';
import StyletronClient from 'styletron-client';

const render = (node, parent, mergeWith) =>
    renderPreact(
        <StyletronProvider
            styletron={
                new StyletronClient(
                    document.getElementsByClassName('_styletron_hydrate_')
                )
            }>
            {node}
        </StyletronProvider>,
        parent,
        mergeWith
    );

export default render;
