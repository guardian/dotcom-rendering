import { Router } from 'express';
import { CricketScorecard } from '../docs/cricketScorecard';
import { Dotcom } from '../docs/dotcom';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get(
	'/cricket-scorecard',
	sendReact('Cricket Scorecard', CricketScorecard),
);

export { dotcom };
