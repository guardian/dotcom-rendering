import type { RequestHandler } from 'express';
import { fromValibot } from '../lib/result';
import { safeParse } from 'valibot';
import { feSubNavSchema } from '../frontend/feEmbeds';
import { renderFootballSubNavEmbed } from './render.footballEmbed';

export const handleFootballSubNavEmbed: RequestHandler = ({ body }, res) => {
	const feData = fromValibot(safeParse(feSubNavSchema, body));
	if (!feData.ok) {
		throw new Error('Failed to validate football subnav embed data');
	}

	const { html } = renderFootballSubNavEmbed(feData.value);

	res.status(200).send(html);
};
