import type { RequestHandler } from 'express';
import type { AnalyticsModel } from '../components/Analytics.amp';
import { AmpArticlePage } from '../components/ArticlePage.amp';
import { isAmpSupported } from '../components/Elements.amp';
import type { PermutiveModel } from '../components/Permutive.amp';
import { ArticleDesign, decideFormat } from '../lib/articleFormat';
import { enhance } from '../lib/enhance.amp';
import { NotRenderableInDCR } from '../lib/errors/not-renderable-in-dcr';
import { generatePermutivePayload } from '../lib/permutive.amp';
import { extractScripts } from '../lib/scripts.amp';
import { findBySubsection } from '../model/article-sections';
import { extractNAV } from '../model/extract-nav';
import { validateAsFEArticle } from '../model/validate';
import { getAmpExperimentCache } from './AMPExperimentCache.amp';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderArticle } from './render.article.amp';

export const handleAMPArticle: RequestHandler = ({ body }, res, next) => {
	(async () => {
		recordTypeAndPlatform('article', 'amp');
		const article = validateAsFEArticle(body);
		const format = decideFormat(article.format);

		if (
			format.design === ArticleDesign.Interactive ||
			format.design === ArticleDesign.FullPageInteractive
		) {
			throw new NotRenderableInDCR();
		}

		const { linkedData } = article;
		const { config } = article;
		const elements = await enhance(
			article.blocks.flatMap((block) => block.elements),
		);

		if (
			!isAmpSupported({
				format,
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
			comscoreID: '6035250',
			section: sectionName,
			neilsenAPIID,
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
