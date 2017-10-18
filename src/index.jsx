//@flow
import { render as renderPreact } from 'preact';

const render = (node, parent, mergeWith) => {
    return renderPreact(
        <StyletronProvider styletron={
            new StyletronClient(
                document.getElementsByClassName('_styletron_hydrate_')
            )
        }>
            {node}
        </StyletronProvider>,
        parent,
        mergeWith);
};

export { render };
