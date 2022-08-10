import { Newsletter, Item } from 'item';
import fetch from 'node-fetch';
import { Result, ResultKind } from '@guardian/types';
import { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import { ArticleDesign } from '@guardian/libs';
import { Content } from '@guardian/content-api-models/v1/content';
import { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';

const interval = 1000 * 60 * 1;
const newsletterApiUrl = 'https://newsletters.guardianapis.com/newsletters';
const NEWSLETTER_TAG_PREFIX = 'campaign/email/';
let updateTime = 0;
let storedData: NewsletterResponse[] = [];

// not the full set of properties on the response
interface NewsletterResponse {
	identityName: string;
	name: string;
	cancelled: boolean;
	frequency: string;
	description: string;
	group: string;
	theme: string;
}

const getNewsletterFromTag = async (
	content: Content,
): Promise<Newsletter | undefined> => {
	const newsletterTag = content.tags?.find((tag) =>
		tag.id.startsWith(NEWSLETTER_TAG_PREFIX),
	);
	const newsletterId = newsletterTag?.id.split('/').reverse()[0];
	if (newsletterId) {
		return await getNewsletterData(newsletterId);
	}
	return undefined;
};

const newsletterResponseToNewsletter = (
	data: NewsletterResponse,
): Newsletter => ({
	id: data.identityName,
	frequency: data.frequency,
	displayName: data.name,
	description: data.description,
	group: data.group,
	theme: data.theme,
});

const loadData = async (): Promise<NewsletterResponse[]> => {
	const sinceLastUpdate = Date.now() - updateTime;

	if (sinceLastUpdate < interval) {
		return storedData;
	}

	try {
		const apiResponse = await fetch(newsletterApiUrl);
		const json = (await apiResponse.json()) as NewsletterResponse[];
		storedData = json;
		updateTime = Date.now();
		return storedData;
	} catch (error) {
		console.warn(error);
		return storedData;
	}
};

const getNewsletterData = async (
	id: string,
): Promise<Newsletter | undefined> => {
	const data = await loadData();
	const dataForId = data.find((_) => _.identityName === id);
	return dataForId ? newsletterResponseToNewsletter(dataForId) : undefined;
};

const insertNewsletterIntoStandard = (
	body: Array<Result<string, BodyElement>>,
	newsletter: Newsletter,
): Array<Result<string, BodyElement>> => {
	const element: BodyElement = {
		kind: ElementKind.NewsletterSignUp,
		...newsletter,
	};

	body.unshift({
		kind: ResultKind.Ok,
		value: element,
	});
	return body;
};

export const insertNewsletterIntoItem = (
	item: Item,
	promotedNewsletter?: Newsletter,
): Item => {
	if (!promotedNewsletter) {
		return item;
	}

	switch (item.design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Review:
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Feature:
		case ArticleDesign.Recipe:
		case ArticleDesign.MatchReport:
		case ArticleDesign.Interview:
		case ArticleDesign.Editorial:
		case ArticleDesign.Obituary:
			item.body = insertNewsletterIntoStandard(
				item.body,
				promotedNewsletter,
			);
			break;
	}

	return item;
};

export const providePromotedNewsletter = async (
	renderingRequest: RenderingRequest,
	content: Content,
): Promise<RenderingRequest & { promotedNewsletter?: Newsletter }> => {
	const newsletter = await getNewsletterFromTag(content);
	return { ...renderingRequest, promotedNewsletter: newsletter };
};
