import { Atoms } from "@guardian/content-api-models/v1/atoms";
import { BlockElement } from "@guardian/content-api-models/v1/blockElement";
import { Result, err, ok } from 'types/result';
import { BodyElement, ElementKind } from "bodyElement";
import { fromNullable } from "types/option";

function parseAtom(element: BlockElement, atoms: Atoms): Result<string, BodyElement> {
    const id = element.contentAtomTypeData?.atomId
    switch (element.contentAtomTypeData?.atomType) {
        case "interactive": {
            const atom = atoms.interactives?.find(interactive => interactive.id === id);

            if (atom?.data?.kind !== "interactive") {
                return err(`No atom matched this id: ${id}`);
            }

            const { html, css, mainJS: js } = atom?.data?.interactive;

            if (!html || !css) {
                return err(`No html or css for atom: ${id}`);
            }

            return ok({
                kind: ElementKind.InteractiveAtom,
                html,
                css,
                js: fromNullable(js)
            });
        }

        case "explainer": {
            const atom = atoms.explainers?.find(explainer => explainer.id === id);

            if (atom?.data?.kind !== "explainer" || !id) {
                return err(`No atom matched this id: ${id}`);
            }

            const { title, body } = atom?.data?.explainer;

            if (!title || !body) {
                return err(`No title or body for atom: ${id}`);
            }

            return ok({ kind: ElementKind.ExplainerAtom, html: body, title, id });
        }

        case "media": {
            const atom = atoms.media?.find(media => media.id === id);

            if (atom?.data?.kind !== "media") {
                return err(`No atom matched this id: ${id}`);
            }

            const { posterUrl, duration, assets, activeVersion } = atom?.data?.media;
            const videoId = assets
                .find((asset) => asset.version.toNumber() === activeVersion?.toNumber())?.id;

            if (!posterUrl) {
                return err(`No posterUrl for atom: ${id}`);
            }

            if (!videoId) {
                return err(`No videoId for atom: ${id}`);
            }

            return ok({
                kind: ElementKind.MediaAtom,
                posterUrl,
                videoId,
                duration: fromNullable(duration?.toNumber()),
            });
        }

        default: {
            return err(`Atom type not supported: ${element.contentAtomTypeData?.atomType}`);
        }
    }
}

export {
    parseAtom
}
