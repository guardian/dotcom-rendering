import { Router } from 'express';
import { Article } from '../docs/article';
import { Dotcom } from '../docs/dotcom';
import { FootballFixtures } from '../docs/footballFixtures';
import { FootballLive } from '../docs/footballLive';
import { FootballMatchSummary } from '../docs/footballMatchSummary';
import { FootballResults } from '../docs/footballResults';
import { FootballTables } from '../docs/footballTables';
import { Front } from '../docs/front';
import { Interactive } from '../docs/interactive';
import { Newsletters } from '../docs/newsletters';
import { TagPage } from '../docs/tagPage';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/article', sendReact('Article', Article));
dotcom.get('/front', sendReact('Front', Front));
dotcom.get('/tag-page', sendReact('Tag Page', TagPage));
dotcom.get('/interactive', sendReact('Interactive', Interactive));
dotcom.get('/newsletters', sendReact('All Newsletters', Newsletters));
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
