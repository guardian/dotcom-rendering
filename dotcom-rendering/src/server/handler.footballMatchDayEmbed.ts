import type { RequestHandler } from 'express';
import { renderFootballMatchDayEmbed } from './render.footballMatchDayEmbed';

export const handleFootballMatchDayEmbed: RequestHandler = (_, res) => {
	const { html } = renderFootballMatchDayEmbed();
	res.status(200).send(html);
};
