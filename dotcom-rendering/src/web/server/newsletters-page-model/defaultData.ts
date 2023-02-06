import type { ConfigType } from '../../../types/config';
import type { FooterType } from '../../../types/footer';
import type { FENewslettersPageType } from '../../../types/newslettersPage';

export const STATIC_FOOTER: FooterType = { footerLinks: [[]] };

export const STATIC_NAV: CAPINavType = {
	currentUrl: '/newsletter-signup-page',
	pillars: [
		{
			title: 'News',
			url: '/',
			longTitle: 'Headlines',
			iconName: 'home',
			children: [],
		},
		{
			title: 'Opinion',
			url: '/commentisfree',
			longTitle: 'Opinion home',
			iconName: 'home',
			children: [],
		},
		{
			title: 'Sport',
			url: '/sport',
			longTitle: 'Sport home',
			iconName: 'home',
			children: [],
		},
		{
			title: 'Culture',
			url: '/culture',
			longTitle: 'Culture home',
			iconName: 'home',
			children: [],
		},
		{
			title: 'Lifestyle',
			url: '/lifeandstyle',
			longTitle: 'Lifestyle home',
			iconName: 'home',
			children: [],
		},
	],
	otherLinks: [
		{
			title: 'The Guardian app',
			url: 'https://www.theguardian.com/mobile/2014/may/29/the-guardian-for-mobile-and-tablet',
		},
		{ title: 'Video', url: '/video' },
		{ title: 'Podcasts', url: '/podcasts' },
		{ title: 'Pictures', url: '/inpictures' },
		{ title: 'Newsletters', url: '/email-newsletters' },
		{ title: "Today's paper", url: '/theguardian', children: [] },
		{
			title: 'Inside the Guardian',
			url: 'https://www.theguardian.com/membership',
		},
		{ title: 'The Observer', url: '/observer', children: [] },
		{
			title: 'Guardian Weekly',
			url: 'https://www.theguardian.com/weekly?INTCMP=gdnwb_mawns_editorial_gweekly_GW_TopNav_UK',
		},
		{ title: 'Crosswords', url: '/crosswords', children: [] },
		{
			title: 'Corrections',
			url: '/theguardian/series/corrections-and-clarifications',
		},
	],
	brandExtensions: [
		{
			title: 'Search jobs',
			url: 'https://jobs.theguardian.com?INTCMP=jobs_uk_web_newheader_dropdown',
		},
		{
			title: 'Hire with Guardian Jobs',
			url: 'https://recruiters.theguardian.com/?utm_source=gdnwb&utm_medium=navbar&utm_campaign=Guardian_Navbar_Recruiters&CMP_TU=trdmkt&CMP_BUNIT=jobs',
		},
		{
			title: 'Holidays',
			url: 'https://holidays.theguardian.com?INTCMP=holidays_uk_web_newheader',
		},
		{
			title: 'Live events',
			url: 'https://membership.theguardian.com/events?INTCMP=live_uk_header_dropdown',
		},
		{ title: 'Masterclasses', url: '/guardian-masterclasses' },
		{
			title: 'Digital Archive',
			url: 'https://theguardian.newspapers.com',
		},
		{
			title: 'Guardian Print Shop',
			url: '/artanddesign/series/gnm-print-sales',
		},
		{
			title: 'Patrons',
			url: 'https://patrons.theguardian.com/?INTCMP=header_patrons',
		},
		{
			title: 'Guardian Puzzles app',
			url: 'https://puzzles.theguardian.com/download',
		},
		{
			title: 'Guardian content licensing site',
			url: 'https://licensing.theguardian.com/',
		},
	],
	readerRevenueLinks: {
		header: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=header_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=header_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=header_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_supporter_cta%22%7D',
		},
		footer: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=footer_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=footer_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=footer_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=footer_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_supporter_cta%22%7D',
		},
		sideMenu: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=side_menu_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=side_menu_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=side_menu_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=mobilenav_print_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22mobilenav_print_cta%22%7D',
		},
		ampHeader: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=header_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=amp_header_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22amp_header_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=header_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_supporter_cta%22%7D',
		},
		ampFooter: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=amp_footer_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=amp_footer_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=footer_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=amp_footer_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_supporter_cta%22%7D',
		},
	},
};

export const STATIC_CONFIG: ConfigType = {
	isPaidContent: false,
	pageId: 'unknown-page',
	contentType: 'static',
	ampIframeUrl:
		'https://assets.guim.co.uk/data/vendor/b242a49b1588bb36bdaacefe001ca77a/amp-iframe.html',
	ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
	shortUrlId: '/p/d8ex5',
	switches: {},
	keywordIds: '',
	sharedAdTargeting: {},
	dcrSentryDsn: 'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
	discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
	sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
	commercialBundleUrl:
		'https://assets.guim.co.uk/javascripts/bc58c17d75809551440f/graun.commercial.dcr.js',
	discussionApiClientHeader: 'nextgen',
	shouldHideReaderRevenue: false,
	sentryHost: 'app.getsentry.com/35463',
	idApiUrl: 'https://idapi.theguardian.com',
	showRelatedContent: true,
	adUnit: '/59666047/theguardian.com/environment/article/ng',
	stage: 'DEV',
	isSensitive: false,
	revisionNumber: 'DEV',
	section: 'environment',
	brazeApiKey: '7f28c639-8bda-48ff-a3f6-24345abfc07c',
	dfpAccountId: '59666047',
	googletagUrl: '//securepubads.g.doubleclick.net/tag/js/gpt.js',
	abTests: {},
	edition: 'UK',
	frontendAssetsFullURL: 'https://assets.guim.co.uk/',
	webPublicationDate: Date.now(),
	discussionD2Uid: 'zHoBy6HNKsk',
	mmaUrl: 'https://manage.theguardian.com',
};

export const TEST_NEWSLETTERS_PAGE_DATA: FENewslettersPageType = {
	newsletters: [
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
			successDescription:
				"We'll send you Moving the Goalposts every week",
		},
		{
			listId: 123,
			identityName: 'patriarchy',
			description:
				'Reviewing the most important stories on feminism and sexism and those fighting for equality',
			name: 'The Week in Patriarchy',
			frequency: 'Weekly',
			successDescription:
				'You have signed up, but the newsletter is fake',
			theme: 'opinion',
			group: 'Opinion',
		},
		{
			listId: 124,
			identityName: 'according-to',
			description: 'A newsletter made up for testing the component',
			name: 'According to us',
			frequency: 'Montly',
			successDescription:
				'You have signed up, but the newsletter is fake',
			theme: 'opinion',
			group: 'Opinion',
		},
	],
	id: 'test-newsletters-page',
	webTitle: 'Guardian newsletters: Using Test Data',
	editionId: 'INT',
	beaconURL: '//',
	subscribeUrl: '/test-subscribe-url',
	contributionsServiceUrl: '/test-contributions-url',
	description:
		"Scroll less and understand more about the subjects you care about with the Guardian's brilliant email newsletters, free to your inbox.",
	config: STATIC_CONFIG,
	nav: STATIC_NAV,
	pageFooter: STATIC_FOOTER,
};
