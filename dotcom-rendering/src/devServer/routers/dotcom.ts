import { Router } from 'express';
import { Dotcom } from '../docs/dotcom';
import { FootballFixtures } from '../docs/footballFixtures';
import { FootballLive } from '../docs/footballLive';
import { FootballMatchSummary } from '../docs/footballMatchSummary';
import { FootballResults } from '../docs/footballResults';
import { FootballTables } from '../docs/footballTables';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/football-live', sendReact('Football Live', FootballLive));
dotcom.get(
	'/football-fixtures',
	sendReact('Football Fixtures', FootballFixtures),
);
dotcom.get('/football-results', sendReact('Football Results', FootballResults));
dotcom.get('/football-tables', sendReact('Football Tables', FootballTables));
dotcom.get(
	'/football-match-summary',
	sendReact('Football Match Summary', FootballMatchSummary),
);

export { dotcom };
