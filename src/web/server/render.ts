import express from 'express';
import { extractNAV } from '@root/src/model/extract-nav';

import { document } from '@root/src/web/server/document';
import { validateAsCAPIType } from '@root/src/model/validate';
import { addDividers } from '@root/src/model/add-dividers';
import { enhanceDots } from '@root/src/model/add-dots';
import { setIsDev } from '@root/src/model/set-is-dev';
import { enhanceImages } from '@root/src/model/enhance-images';
import { enhanceNumberedLists } from '@root/src/model/enhance-numbered-lists';
import { enhanceBlockquotes } from '@root/src/model/enhance-blockquotes';
import { enhanceAnniversaryAtom } from '@root/src/model/enhance-AnniversaryInteractiveAtom';
import { enhanceEmbeds } from '@root/src/model/enhance-embeds';
import { extract as extractGA } from '@root/src/model/extract-ga';
import { Article as ExampleArticle } from '@root/fixtures/generated/articles/Article';

class CAPIEnhancer {
	capi: CAPIType;

	constructor(capi: CAPIType) {
		this.capi = capi;
	}

	addDividers() {
		this.capi = addDividers(this.capi);
		return this;
	}

	enhanceDots() {
		this.capi = enhanceDots(this.capi);
		return this;
	}

	enhanceImages() {
		this.capi = enhanceImages(this.capi);
		return this;
	}

	enhanceNumberedLists() {
		this.capi = enhanceNumberedLists(this.capi);
		return this;
	}

	enhanceBlockquotes() {
		this.capi = enhanceBlockquotes(this.capi);
		return this;
	}

	enhanceEmbeds() {
		this.capi = enhanceEmbeds(this.capi);
		return this;
	}

	validateAsCAPIType() {
		this.capi = validateAsCAPIType(this.capi);
		return this;
	}

	setIsDev() {
		this.capi = setIsDev(this.capi);
		return this;
	}

	enhanceAnniversaryAtom() {
		this.capi = enhanceAnniversaryAtom(this.capi);
		return this;
	}
}

const buildCAPI = (body: CAPIType): CAPIType => {
	return new CAPIEnhancer(body)
		.validateAsCAPIType()
		.addDividers()
		.enhanceBlockquotes()
		.enhanceDots()
		.enhanceImages()
		.enhanceNumberedLists()
		.enhanceEmbeds()
		.enhanceAnniversaryAtom().capi;
};

export const render = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	try {
		const CAPI = buildCAPI(body);
		const resp = document({
			data: {
				CAPI,
				site: 'frontend',
				page: 'Article',
				NAV: extractNAV(CAPI.nav),
				GA: extractGA(CAPI),
				linkedData: CAPI.linkedData,
			},
		});

		res.status(200).send(resp);
	} catch (e) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).send(`<pre>${e.stack}</pre>`);
	}
};

export const renderArticleJson = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	try {
		const CAPI = buildCAPI(body);
		const resp = {
			data: {
				CAPI,
				site: 'frontend',
				page: 'Article',
				NAV: extractNAV(CAPI.nav),
				GA: extractGA(CAPI),
				linkedData: CAPI.linkedData,
			},
		};

		res.status(200).send(resp);
	} catch (e) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).send(`<pre>${e.stack}</pre>`);
	}
};

export const renderPerfTest = (
	req: express.Request,
	res: express.Response,
): void => {
	req.body = ExampleArticle;
	render(req, res);
};
