import type { RequestHandler } from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { NotRenderableInDCR } from '../../lib/errors/not-renderable-in-dcr';
import { findBySubsection } from '../../model/article-sections';
import { extractNAV } from '../../model/extract-nav';
import { validateAsCAPIType } from '../../model/validate';
import type { AnalyticsModel } from '../components/Analytics';
import { isAmpSupported } from '../components/Elements';
import type { PermutiveModel } from '../components/Permutive';
import { generatePermutivePayload } from '../lib/permutive';
import { extractScripts } from '../lib/scripts';
import { Article } from '../pages/Article';
import { getAmpExperimentCache } from './ampExperimentCache';
import { document } from './document';

export const handleAMPArticle: RequestHandler = ({ body }, res) => {
	try {
		const CAPIArticle = validateAsCAPIType(body);
		const { linkedData } = CAPIArticle;
		const { config } = CAPIArticle;
		const elements = CAPIArticle.blocks.flatMap((block) => block.elements);

		if (
			!isAmpSupported({
				format: CAPIArticle.format,
				tags: CAPIArticle.tags,
				elements,
				switches: CAPIArticle.config.switches,
				main: CAPIArticle.main,
			})
		) {
			throw new NotRenderableInDCR();
		}

		const scripts = [
			...extractScripts(elements, CAPIArticle.mainMediaElements),
		];

		const sectionName = CAPIArticle.sectionName ?? '';
		const neilsenAPIID = findBySubsection(sectionName).apiID;

		const permutive: PermutiveModel = {
			projectId: 'd6691a17-6fdb-4d26-85d6-b3dd27f55f08',
			apiKey: '359ba275-5edd-4756-84f8-21a24369ce0b',
			payload: generatePermutivePayload(config),
		};

		const analytics: AnalyticsModel = {
			gaTracker: 'UA-78705427-1',
			title: CAPIArticle.headline,
			comscoreID: '6035250',
			section: sectionName,
			contentType: CAPIArticle.contentType,
			id: CAPIArticle.pageId,
			neilsenAPIID,
			domain: 'amp.theguardian.com',
			ipsosSectionName: config.ipsosTag ?? 'guardian',
		};

		const metadata = {
			description: CAPIArticle.trailText,
			canonicalURL: CAPIArticle.webURL,
		};

		const resp = document({
			linkedData,
			scripts,
			metadata,
			title: `${CAPIArticle.headline} | ${CAPIArticle.sectionLabel} | The Guardian`,
			body: (
				<Article
					experimentsData={getAmpExperimentCache()}
					articleData={CAPIArticle}
					nav={extractNAV(CAPIArticle.nav)}
					analytics={analytics}
					permutive={permutive}
					config={config}
				/>
			),
		});

		res.status(200).send(resp);
	} catch (e) {
		// a validation error
		if (e instanceof TypeError) {
			res.status(400).send(`<pre>${e.message}</pre>`);
		} else if (e instanceof NotRenderableInDCR) {
			res.status(415).send(`<pre>${e.message}</pre>`);
		} else if (e instanceof Error) {
			res.status(500).send(`<pre>${e.message}</pre>`);
		} else {
			res.status(500).send(`<pre>Unknown error</pre>`);
		}
	}
};

export const handlePerfTest: RequestHandler = (req, res, next) => {
	req.body = ExampleArticle;
	handleAMPArticle(req, res, next);
};
