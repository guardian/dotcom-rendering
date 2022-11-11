import { ArticlePillar } from '@guardian/libs';
import type { NextFunction, Request, Response } from 'express';
import type { NavType } from 'src/model/extract-nav';
import type { ConfigType } from 'src/types/config';
import type { FooterType } from 'src/types/footer';
import type { NewslettersPageModel } from '../../model/pageModel';

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

const STATIC_FOOTER: FooterType = { footerLinks: [[]] };

const STATIC_NAV: NavType = {
	otherLinks: {
		url: '/uk',
		title: 'nav link',
		longTitle: 'this is a nav link',
		children: [],
		mobileOnly: false,
		more: true,
	},
	brandExtensions: [],
	currentNavLink: '/',
	subNavSections: { links: [] },
	readerRevenueLinks: {
		header: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
		footer: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
		sideMenu: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
		ampHeader: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
		ampFooter: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
	},
	pillars: [
		{
			url: '/',
			title: 'News',
			longTitle: 'News',
			pillar: ArticlePillar.News,
		},
		{
			url: '/commentisfree',
			title: 'Opinion',
			longTitle: 'Opinion',
			pillar: ArticlePillar.Opinion,
		},
	],
};

const STATIC_CONFIG = {} as ConfigType;

const STATIC_NEWSLETTERS_MODEL: NewslettersPageModel = {
	newsletters: TEST_NEWSLETTERS,
	footer: STATIC_FOOTER,
	nav: STATIC_NAV,
	config: STATIC_CONFIG,
	editionId: 'UK',

	webTitle: 'email newsletters',
	description:
		"Scroll less and understand more about the subjects you care about with the Guardian's brilliant email newsletters, free to your inbox.",
	contentType: 'static',
	pageId: 'static-email-newsletters',
	beaconURL: '/',
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
