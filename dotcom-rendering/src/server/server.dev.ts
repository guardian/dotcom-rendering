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
renderer.get('/Article/*', handleArticle);
renderer.get('/ArticleJson/*', handleArticleJson);
renderer.get('/AMPArticle/*', handleAMPArticle);
renderer.get('/Interactive/*', handleInteractive);
renderer.get('/AMPInteractive/*', handleAMPArticle);
renderer.get('/Blocks/*', handleBlocks);
renderer.get('/Front/*', handleFront);
renderer.get('/FrontJSON/*', handleFrontJson);
renderer.get('/TagPage/*', handleTagPage);
renderer.get('/TagPageJSON/*', handleTagPageJson);
renderer.get('/EmailNewsletters/*', handleAllEditorialNewslettersPage);
renderer.get('/AppsArticle/*', handleAppsArticle);
renderer.get('/AppsInteractive/*', handleAppsInteractive);
renderer.get('/AppsBlocks/*', handleAppsBlocks);
renderer.get('/EditionsCrossword/*', handleEditionsCrossword);
renderer.get('/FootballMatchListPage/*', handleFootballMatchListPage);
renderer.get('/FootballTablesPage/*', handleFootballTablesPage);
renderer.get('/CricketMatchPage/*', handleCricketMatchPage);
renderer.get('/FootballMatchSummaryPage/*', handleFootballMatchPage);

const router = Router();
router.use('/pages', pages);
router.use('/targets', targets);
router.use(renderer);
router.use(redirects);

// see https://www.npmjs.com/package/webpack-hot-server-middleware
// for more info
export const devServer = (): Handler => router;
