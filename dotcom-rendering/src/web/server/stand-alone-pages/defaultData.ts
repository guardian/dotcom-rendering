import { ArticlePillar } from '@guardian/libs';
import type { NavType } from 'src/model/extract-nav';
import type { ConfigType } from 'src/types/config';
import type { FooterType } from 'src/types/footer';

export const STATIC_FOOTER: FooterType = { footerLinks: [[]] };

export const STATIC_NAV: NavType = {
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
};
