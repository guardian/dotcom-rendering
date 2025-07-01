import { type Handler, Router } from 'express';
import { pages } from '../devServer/routers/pages';
import { targets } from '../devServer/routers/targets';
import { handleAllEditorialNewslettersPage } from './handler.allEditorialNewslettersPage.web';
import { handleAMPArticle } from './handler.article.amp';
import {
	handleAppsArticle,
	handleAppsBlocks,
	handleAppsInteractive,
} from './handler.article.apps';
import {
	handleArticle,
	handleArticleJson,
	handleBlocks,
	handleInteractive,
} from './handler.article.web';
import { handleEditionsCrossword } from './handler.editionsCrossword';
import {
	handleFront,
	handleFrontJson,
	handleTagPage,
	handleTagPageJson,
} from './handler.front.web';
import {
	handleCricketMatchPage,
	handleFootballMatchListPage,
	handleFootballMatchPage,
	handleFootballTablesPage,
} from './handler.sportDataPage.web';
import { getContentFromURLMiddleware } from './lib/get-content-from-url';

/** article URLs contain a part that looks like “2022/nov/25” */
const ARTICLE_URL = /(\/\d{4}\/[a-z]{3}\/\d{2}\/)/;
/** Crossword URLs end with e.g /crosswords/quick/17117 */
const CROSSWORD_URL = /(\/[a-z-]+\/\d+$)/;
/** fronts are a series of lowercase strings, dashes and forward slashes */
const FRONT_URL = /^\/[a-z-/]+(?<!\.css)$/;
/** This is imperfect, but covers *some* cases of tag pages, consider expanding in the future */
const TAG_PAGE_URL = /^\/(tone|series|profile)\/[a-z-]+/;
/** assets are paths like /assets/index.xxx.js */
const ASSETS_URL = /^assets\/.+\.js/;

//editionalise front url to uk
const editionalisefront = (url: string): string => {
	const [, , , frontTitle] = url.split('/');
	const editionalisedFronts = [
		'culture',
		'sport',
		'commentisfree',
		'business',
		'money',
		'travel',
		'lifestyle',
		'lifeandstyle',
	];
	if (frontTitle && editionalisedFronts.includes(frontTitle)) {
		return url.replace(frontTitle, `uk/${frontTitle}`);
	}
	return url;
};

const redirects: Handler = (req, res, next) => {
	const path = req.path.split('/')[1];

	// handle urls with the ?url=… query param
	const sourceUrl = req.url.split('?url=')[1];
	if (path && sourceUrl) {
		return res.redirect(path + '/' + sourceUrl);
	}

	// Do not redirect assets urls
	if (req.url.match(ASSETS_URL)) return next();

	if (req.url.match(ARTICLE_URL) ?? req.url.match(CROSSWORD_URL)) {
		const url = new URL(req.url, 'https://www.theguardian.com/').toString();
		console.info('redirecting to Article:', url);
		return res.redirect(`/Article/${url}`);
	}

	if (req.url.match(TAG_PAGE_URL)) {
		const url = new URL(req.url, 'https://www.theguardian.com/').toString();
		console.info('redirecting to Tag page:', url);
		return res.redirect(`/TagPage/${url}`);
	}

	if (req.url.match(FRONT_URL)) {
		const url = new URL(req.url, 'https://www.theguardian.com/').toString();
		console.info('redirecting to Front:', url);
		return res.redirect(`/Front/${editionalisefront(url)}`);
	}

	next();
};

const renderer = Router();
// populates req.body with the content data from a production
// URL if req.params.url is present
renderer.use(getContentFromURLMiddleware);
renderer.get('/Article/*url', handleArticle);
renderer.get('/ArticleJson/*url', handleArticleJson);
renderer.get('/AMPArticle/*url', handleAMPArticle);
renderer.get('/Interactive/*url', handleInteractive);
renderer.get('/AMPInteractive/*url', handleAMPArticle);
renderer.get('/Blocks/*url', handleBlocks);
renderer.get('/Front/*url', handleFront);
renderer.get('/FrontJSON/*url', handleFrontJson);
renderer.get('/TagPage/*url', handleTagPage);
renderer.get('/TagPageJSON/*url', handleTagPageJson);
renderer.get('/EmailNewsletters/*url', handleAllEditorialNewslettersPage);
renderer.get('/AppsArticle/*url', handleAppsArticle);
renderer.get('/AppsInteractive/*url', handleAppsInteractive);
renderer.get('/AppsBlocks/*url', handleAppsBlocks);
renderer.get('/EditionsCrossword/*url', handleEditionsCrossword);
renderer.get('/FootballMatchListPage/*url', handleFootballMatchListPage);
renderer.get('/FootballTablesPage/*url', handleFootballTablesPage);
renderer.get('/CricketMatchPage/*url', handleCricketMatchPage);
renderer.get('/FootballMatchSummaryPage/*url', handleFootballMatchPage);
// POST routes for running frontend locally
renderer.post('/Article', handleArticle);
renderer.post('/ArticleJson', handleArticleJson);
renderer.post('/AMPArticle', handleAMPArticle);
renderer.post('/Interactive', handleInteractive);
renderer.post('/AMPInteractive', handleAMPArticle);
renderer.post('/Blocks', handleBlocks);
renderer.post('/Front', handleFront);
renderer.post('/FrontJSON', handleFrontJson);
renderer.post('/TagPage', handleTagPage);
renderer.post('/TagPageJSON', handleTagPageJson);
renderer.post('/EmailNewsletters', handleAllEditorialNewslettersPage);
renderer.post('/AppsArticle', handleAppsArticle);
renderer.post('/AppsInteractive', handleAppsInteractive);
renderer.post('/AppsBlocks', handleAppsBlocks);
renderer.post('/EditionsCrossword', handleEditionsCrossword);
renderer.post('/FootballMatchListPage', handleFootballMatchListPage);
renderer.post('/FootballTablesPage', handleFootballTablesPage);
renderer.post('/CricketMatchPage', handleCricketMatchPage);
renderer.post('/FootballMatchSummaryPage', handleFootballMatchPage);

const router = Router();
router.use('/pages', pages);
router.use('/targets', targets);
router.use(renderer);
router.use(redirects);

// see https://www.npmjs.com/package/webpack-hot-server-middleware
// for more info
export const devServer = (): Handler => router;
