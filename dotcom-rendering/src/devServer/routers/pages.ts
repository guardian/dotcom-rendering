import { Router } from 'express';
import { EditionsCrosswords } from '../docs/editionsCrosswords';
import { Pages } from '../docs/pages';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get(
	'/editions-crosswords',
	sendReact('Editions Crosswords', EditionsCrosswords),
);

export { pages };
