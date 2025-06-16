import { Router } from 'express';
import { CricketScorecard } from '../docs/cricketScorecard';
import { Pages } from '../docs/pages';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get(
	'/cricket-scorecard',
	sendReact('Cricket Scorecard', CricketScorecard),
);

export { pages };
