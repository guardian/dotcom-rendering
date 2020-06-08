import { IBlockElement as BlockElement, IAtoms as Atoms } from "mapiThriftModels";
import { Result, Err, Ok } from "types/result";
import { BodyElement, ElementKind } from "bodyElement";
import { fromNullable } from "types/option";

function parseAtom(element: BlockElement, atoms: Atoms): Result<string, BodyElement> {
    const id = element.contentAtomTypeData?.atomId

    switch (element.contentAtomTypeData?.atomType) {
        case "interactive": {
            const atom = atoms.interactives?.find(interactive => interactive.id === id);

            if (!atom?.data?.interactive) {
                return new Err(`No atom matched this id: ${id}`);
            }

            const { html, css, mainJS: js } = atom?.data?.interactive;

            if (!html || !css) {
                return new Err(`No html or css for atom: ${id}`);
            }

            return new Ok({
                kind: ElementKind.InteractiveAtom,
                html,
                css,
                js: fromNullable(js)
            });
        }

        case "explainer": {
            const atom = atoms.explainers?.find(explainer => explainer.id === id);

            if (!atom?.data?.explainer || !id) {
                return new Err(`No atom matched this id: ${id}`);
            }

            const { title, body } = atom?.data?.explainer;

            if (!title || !body) {
                return new Err(`No title or body for atom: ${id}`);
            }

            return new Ok({ kind: ElementKind.ExplainerAtom, html: body, title, id });
        }

        default: {
            return new Err(`Atom type not supported: ${element.contentAtomTypeData?.atomType}`);
        }
    }
}

export {
    parseAtom
}