import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { NotRenderableInDCR } from '../../lib/errors/not-renderable-in-dcr';
import { findBySubsection } from '../../model/article-sections';
import { extractArticleNav } from '../../web/server/articleToHtml';
import { validateAsArticleType } from '../../model/validate';
import type { AnalyticsModel } from '../components/Analytics';
import { isAmpSupported } from '../components/Elements';
import type { PermutiveModel } from '../components/Permutive';
import { enhance } from '../lib/enhance';
import { generatePermutivePayload } from '../lib/permutive';
import { extractScripts } from '../lib/scripts';
import { Article } from '../pages/Article';
import { getAmpExperimentCache } from './ampExperimentCache';
import { document } from './document';

export const handleAMPArticle: RequestHandler = ({ body }, res, next) => {
	(async () => {
		const article = validateAsArticleType(body);
		const { linkedData } = article;
		const { config } = article;
		const elements = await enhance(
			article.blocks.flatMap((block) => block.elements),
		);

		if (
			!isAmpSupported({
				format: article.format,
				tags: article.tags,
				elements,
				switches: article.config.switches,
				main: article.main,
			})
		) {
			throw new NotRenderableInDCR();
		}

		const scripts = [
			...extractScripts(elements, article.mainMediaElements),
		];

		const sectionName = article.sectionName ?? '';
		const neilsenAPIID = findBySubsection(sectionName).apiID;

		const permutive: PermutiveModel = {
			projectId: 'd6691a17-6fdb-4d26-85d6-b3dd27f55f08',
			apiKey: '359ba275-5edd-4756-84f8-21a24369ce0b',
			payload: generatePermutivePayload(config),
		};

		const analytics: AnalyticsModel = {
			gaTracker: 'UA-78705427-1',
			title: article.headline,
			comscoreID: '6035250',
			section: sectionName,
			contentType: article.contentType,
			id: article.pageId,
			neilsenAPIID,
			domain: 'amp.theguardian.com',
			ipsosSectionName: config.ipsosTag ?? 'guardian',
		};

		const metadata = {
			description: article.trailText,
			canonicalURL: article.webURL,
		};

		const resp = document({
			linkedData,
			scripts,
			metadata,
			title: `${article.headline} | ${article.sectionLabel} | The Guardian`,
			body: (
				<Article
					experimentsData={getAmpExperimentCache()}
					articleData={article}
					nav={extractArticleNav(article)}
					analytics={analytics}
					permutive={permutive}
					config={config}
				/>
			),
		});

		res.status(200).send(resp);
	})().catch(next);
};

export const handlePerfTest: RequestHandler = (req, res, next) => {
	req.body = ExampleArticle;
	handleAMPArticle(req, res, next);
};
