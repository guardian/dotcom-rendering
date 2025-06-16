import { Router } from 'express';
import { FootballFixtures } from '../docs/footballFixtures';
import { FootballLive } from '../docs/footballLive';
import { FootballMatchSummary } from '../docs/footballMatchSummary';
import { FootballResults } from '../docs/footballResults';
import { FootballTables } from '../docs/footballTables';
import { Pages } from '../docs/pages';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/football-live', sendReact('Football Live', FootballLive));
pages.get(
	'/football-fixtures',
	sendReact('Football Fixtures', FootballFixtures),
);
pages.get('/football-results', sendReact('Football Results', FootballResults));
pages.get('/football-tables', sendReact('Football Tables', FootballTables));
pages.get(
	'/football-match-summary',
	sendReact('Football Match Summary', FootballMatchSummary),
);

export { pages };
