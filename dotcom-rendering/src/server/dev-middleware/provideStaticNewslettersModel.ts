import type { NextFunction, Request, Response } from 'express';
import type { NewslettersPageModel } from '../../model/pageModel';
import { STATIC_CONFIG, STATIC_FOOTER, STATIC_NAV } from './defaultData';

const TEST_NEWSLETTERS: Newsletter[] = [
	{
		identityName: 'morning-mail',
		name: "Guardian Australia's Morning Mail",
		theme: 'news',
		description:
			'Our Australian morning briefing email breaks down the key national and international stories of the day and why they matter',
		frequency: 'Every weekday',
		listId: 4148,
		group: 'News in depth',
		successDescription:
			"We'll send you Guardian Australia's Morning Mail every weekday",
		regionFocus: 'AU',
	},
	{
		identityName: 'moving-the-goalposts',
		name: 'Moving the Goalposts',
		theme: 'sport',
		description:
			'Informative, passionate, entertaining. Sign up to our weekly round-up of women’s football now.',
		frequency: 'Weekly',
		listId: 6020,
		group: 'Sport',
		successDescription: "We'll send you Moving the Goalposts every week",
	},
	{
		listId: 123,
		identityName: 'patriarchy',
		description:
			'Reviewing the most important stories on feminism and sexism and those fighting for equality',
		name: 'The Week in Patriarchy',
		frequency: 'Weekly',
		successDescription: 'You have signed up, but the newsletter is fake',
		theme: 'opinion',
		group: 'Opinion',
	},
];

const STATIC_NEWSLETTERS_MODEL: NewslettersPageModel = {
	newsletters: TEST_NEWSLETTERS,
	footer: STATIC_FOOTER,
	nav: STATIC_NAV,
	config: {
		...STATIC_CONFIG,
		pageId: 'static-email-newsletters',
	},
	editionId: 'UK',
	webTitle: 'email newsletters',
	description:
		"Scroll less and understand more about the subjects you care about with the Guardian's brilliant email newsletters, free to your inbox.",
	beaconURL: '//phar.gu-web.net',
	subscribeUrl: '/',
	contributionsServiceUrl: 'https://contributions.guardianapis.com',
};

export const provideStaticDataMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const body = req.body as Record<string, unknown>;
	body.model = STATIC_NEWSLETTERS_MODEL;
	next();
};
