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

export const STATIC_CONFIG = {} as ConfigType;
