import { Atoms } from "@guardian/content-api-models/v1/atoms";
import { BlockElement } from "@guardian/content-api-models/v1/blockElement";
import { Result, err, ok } from '@guardian/types/result';
import { BodyElement, ElementKind } from "bodyElement";
import { fromNullable } from '@guardian/types/option';
import { DocParser } from "types/parserContext";
import Int64 from 'node-int64';
import { isValidDate } from "date";

function formatDate(date: Int64) {
    return new Date(date.toNumber()).toDateString();
}

function formatOptionalDate(date: Int64 | undefined) {
    if (date === undefined) return undefined;
    const d = new Date(date.toNumber());
    if (!isValidDate(d)) return undefined;
    return d.toDateString();
}

function parseAtom(
    element: BlockElement,
    atoms: Atoms,
    docParser: DocParser,
): Result<string, BodyElement> {
    if (element.contentAtomTypeData === undefined) {
        return err('The atom has no data');
    }

    const id = element.contentAtomTypeData.atomId;

    switch (element.contentAtomTypeData.atomType) {
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

        case "guide": {
            const atom = atoms.guides?.find(guide => guide.id === id);

            if (atom?.data?.kind !== "guide" || !id) {
                return err(`No atom matched this id: ${id}`);
            }

            const { title } = atom;
            const image = atom.data.guide.guideImage?.master?.file;
            const credit = atom.data.guide.guideImage?.master?.credit;
            const { body } = atom.data.guide.items[0];

            if (!title || !body) {
                return err(`No title or body for atom: ${id}`);
            }

            return ok({
                kind: ElementKind.GuideAtom,
                html: body,
                title,
                id,
                image,
                credit
            });
        }

        case "qanda": {
            const atom = atoms.qandas?.find(qanda => qanda.id === id);

            if (atom?.data?.kind !== "qanda" || !id) {
                return err(`No atom matched this id: ${id}`);
            }

            const { title } = atom;
            const { body } = atom.data.qanda.item;
            const image = atom.data.qanda.eventImage?.master?.file;
            const credit = atom.data.qanda.eventImage?.master?.credit;

            if (!title || !body) {
                return err(`No title or body for atom: ${id}`);
            }

            return ok({
                kind: ElementKind.QandaAtom,
                html: body,
                title,
                id,
                image,
                credit
            });
        }

        case "profile": {
            const atom = atoms.profiles?.find(profile => profile.id === id);

            if (atom?.data?.kind !== "profile" || !id) {
                return err(`No atom matched this id: ${id}`);
            }

            const { title } = atom;
            const { body } = atom.data.profile.items[0];
            const image = atom.data.profile.headshot?.master?.file;
            const credit = atom.data.profile.headshot?.master?.credit;

            if (!title || !body) {
                return err(`No title or body for atom: ${id}`);
            }

            return ok({
                kind: ElementKind.ProfileAtom,
                html: body,
                title,
                id,
                image,
                credit
            });
        }

        case "timeline": {
            const atom = atoms.timelines?.find(timeline => timeline.id === id);

            if (atom?.data?.kind !== "timeline" || !id) {
                return err(`No atom matched this id: ${id}`);
            }

            const { title } = atom;
            const events = atom.data.timeline.events.map(event => ({
                title: event.title,
                date: formatDate(event.date),
                body: event.body,
                toDate: formatOptionalDate(event.toDate),
            }));

            const description = atom.data.timeline.description;

            if (!title || !events.length) {
                return err(`No title or body for atom: ${id}`);
            }

            return ok({
                kind: ElementKind.TimelineAtom,
                title,
                id,
                events,
                description
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

            const { posterUrl, duration, assets, activeVersion, title } = atom?.data?.media;
            const videoId = assets
                .find((asset) => asset.version.toNumber() === activeVersion?.toNumber())?.id;
            const caption = docParser(title)
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
                caption: fromNullable(caption)
            });
        }

        default: {
            return err(`Atom type not supported: ${element.contentAtomTypeData.atomType}`);
        }
    }
}

export {
    parseAtom
}
