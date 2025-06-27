import { Router } from 'express';
import { Article } from '../docs/article';
import { CricketScorecard } from '../docs/cricketScorecard';
import { FootballFixtures } from '../docs/footballFixtures';
import { FootballLive } from '../docs/footballLive';
import { FootballMatchSummary } from '../docs/footballMatchSummary';
import { FootballResults } from '../docs/footballResults';
import { FootballTables } from '../docs/footballTables';
import { Front } from '../docs/front';
import { Interactive } from '../docs/interactive';
import { Newsletters } from '../docs/newsletters';
import { Pages } from '../docs/pages';
import { TagPage } from '../docs/tagPage';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/article', sendReact('Article', Article));
pages.get('/front', sendReact('Front', Front));
pages.get('/tag-page', sendReact('Tag Page', TagPage));
pages.get('/interactive', sendReact('Interactive', Interactive));
pages.get('/newsletters', sendReact('All Newsletters', Newsletters));
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
pages.get(
	'/cricket-scorecard',
	sendReact('Cricket Scorecard', CricketScorecard),
);

export { pages };
