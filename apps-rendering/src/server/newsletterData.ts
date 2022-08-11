import { Newsletter } from 'item';
import fetch from 'node-fetch';
import { Content } from '@guardian/content-api-models/v1/content';
import { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { stringToPillar } from 'themeStyles';

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
	theme: stringToPillar(data.theme),
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

// TO DO - update @guardian/apps-render-api-models,
// have the MAPI response provide the promotedNewsletter
// remove the hacks on the RenderingRequest type
export const providePromotedNewsletter = async (
	renderingRequest: RenderingRequest,
	content: Content,
): Promise<RenderingRequest & { promotedNewsletter?: Newsletter }> => {
	const newsletter = await getNewsletterFromTag(content);
	return { ...renderingRequest, promotedNewsletter: newsletter };
};
