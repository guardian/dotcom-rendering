import type express from 'express';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { NotRenderableInDCR } from '../../lib/errors/not-renderable-in-dcr';
import { findBySubsection } from '../../model/article-sections';
import { extractNAV } from '../../model/extract-nav';
import { validateAsCAPIType } from '../../model/validate';
import type { AnalyticsModel } from '../components/Analytics';
import { generatePermutivePayload } from '../lib/permutive';
import { extractScripts } from '../lib/scripts';
import { Article } from '../pages/Article';
import { getAmpExperimentCache } from './ampExperimentCache';
import { document } from './document';

export const render = ({ body }: express.Request, res: express.Response) => {
	try {
		const CAPIArticle = validateAsCAPIType(body);
		const { linkedData } = CAPIArticle;
		const { config } = CAPIArticle;
		const elements = CAPIArticle.blocks.flatMap((block) => block.elements);

		const scripts = [
			...extractScripts(elements, CAPIArticle.mainMediaElements),
		];

		const sectionName = CAPIArticle.sectionName || '';
		const neilsenAPIID = findBySubsection(sectionName).apiID;

		const analytics: AnalyticsModel = {
			gaTracker: 'UA-78705427-1',
			title: CAPIArticle.headline,
			fbPixelaccount: '279880532344561',
			comscoreID: '6035250',
			section: sectionName,
			contentType: CAPIArticle.contentType,
			id: CAPIArticle.pageId,
			neilsenAPIID,
			domain: 'amp.theguardian.com',
			permutive: {
				namespace: 'guardian',
				apiKey: '359ba275-5edd-4756-84f8-21a24369ce0b',
				payload: generatePermutivePayload(config),
			},
			ipsosSectionName: config.ipsosTag || 'guardian',
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

export const renderPerfTest = (req: express.Request, res: express.Response) => {
	req.body = ExampleArticle;
	render(req, res);
};
