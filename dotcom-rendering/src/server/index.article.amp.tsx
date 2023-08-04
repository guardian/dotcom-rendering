import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard.ts';
import type { AnalyticsModel } from '../components/Analytics.amp.ts';
import { AmpArticlePage } from '../components/ArticlePage.amp.tsx';
import { isAmpSupported } from '../components/Elements.amp.tsx';
import type { PermutiveModel } from '../components/Permutive.amp.ts';
import { enhance } from '../lib/enhance.amp.ts';
import { NotRenderableInDCR } from '../lib/errors/not-renderable-in-dcr.ts';
import { generatePermutivePayload } from '../lib/permutive.amp.ts';
import { extractScripts } from '../lib/scripts.amp.ts';
import { findBySubsection } from '../model/article-sections.ts';
import { extractNAV } from '../model/extract-nav.ts';
import { validateAsArticleType } from '../model/validate.ts';
import { recordTypeAndPlatform } from '../server/lib/logging-store.ts';
import { getAmpExperimentCache } from './AMPExperimentCache.amp.ts';
import { renderArticle } from './render.article.amp.tsx';

export const handleAMPArticle: RequestHandler = ({ body }, res, next) => {
	(async () => {
		recordTypeAndPlatform('article', 'amp');
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

		const resp = renderArticle({
			linkedData,
			scripts,
			metadata,
			title: `${article.headline} | ${article.sectionLabel} | The Guardian`,
			body: (
				<AmpArticlePage
					experimentsData={getAmpExperimentCache()}
					articleData={article}
					nav={extractNAV(article.nav)}
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
