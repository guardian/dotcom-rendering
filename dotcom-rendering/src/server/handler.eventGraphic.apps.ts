import type { RequestHandler } from 'express';
import * as v from 'valibot';
import { GraphicSchema } from '../components/DecideContainer';
import {
	type FEAppsComponentEventGraphic,
	isEventGraphic,
} from '../frontend/feAppsComponentEventGraphic';
import { isEditionId } from '../lib/edition';
import { validateAsFEAppsComponentEventGraphic } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderEventGraphic } from './render.eventGraphic.apps';

export const handleAppsEventGraphic: RequestHandler = ({ body }, res) => {
	const data: FEAppsComponentEventGraphic =
		validateAsFEAppsComponentEventGraphic(body);

	const editionId = isEditionId(data.config.edition)
		? data.config.edition
		: 'UK';

	if (!isEventGraphic(data.config.pageId)) {
		res.status(404).send(
			`Invalid event graphic name: ${data.config.pageId}`,
		);
		return;
	}

	const eventGraphic = v.safeParse(GraphicSchema, {
		electionDataUrl: data.dataUrl,
		kind: data.graphicKind,
		electionComponents: data.eventData,
		liveEffects: true,
	});

	if (!eventGraphic.success) {
		res.status(400).send(
			`Invalid event graphic data for: ${data.config.pageId}`,
		);
		return;
	}
	const { html, prefetchScripts } = renderEventGraphic(
		eventGraphic.output,
		editionId,
	);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
