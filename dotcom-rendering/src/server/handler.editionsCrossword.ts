import type { RequestHandler } from 'express';
import { validateAsEditionsCrosswordType } from '../model/validate';

export const handleEditionsCrossword: RequestHandler = ({ body }, res) => {
	const editionsCrosswords = validateAsEditionsCrosswordType(body);
	console.log(editionsCrosswords);
	res.sendStatus(200);
};
