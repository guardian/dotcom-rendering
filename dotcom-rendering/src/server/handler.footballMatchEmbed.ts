import type { RequestHandler } from 'express';
import { renderFootballMatchEmbed } from './render.footballMatchEmbed';

export const handleFootballMatchEmbed: RequestHandler = (_, res) => {
	const { html } = renderFootballMatchEmbed();
	res.status(200).send(html);
};
