import type { EditionId } from '../lib/edition';

export type StaticGroups = {
	title: string;
	subtitle?: string;
	newsletters: string[];
}[];

export const groups: Partial<Record<EditionId, StaticGroups>> = {
	UK: [
		{
			title: 'Get started',
			newsletters: [
				'morning-briefing',
				'this-is-europe',
				'green-light',
				'the-guide-staying-in',
				'the-long-read',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'whats-on',
				'tech-scape',
				'word-of-mouth',
				'fashion-statement',
				'pushing-buttons',
				'cotton-capital',
			],
		},
		{
			title: 'Culture picks',
			newsletters: [
				'film-today',
				'sleeve-notes',
				'bookmarks',
				'hear-here',
				'art-weekly',
				'design-review',
			],
		},
		{
			title: 'Weekend reads',
			newsletters: [
				'inside-saturday',
				'five-great-reads',
				'house-to-home',
				'saved-for-later',
				'the-upside',
				'guardian-traveller',
				'observer-food',
			],
		},
		{
			title: 'The world explained',
			newsletters: ['global-dispatch', 'documentaries', 'her-stage'],
		},
		{
			title: 'Sport',
			newsletters: [
				'the-fiver',
				'moving-the-goalposts',
				'soccer-with-jonathan-wilson',
				'the-spin',
				'the-breakdown',
				'the-recap',
				'sports-au',
			],
		},
		{
			title: 'In brief',
			newsletters: [
				'today-uk',
				'headlines-europe',
				'today-us',
				'today-au',
				'best-of-opinion',
				'best-of-opinion-us',
				'best-of-opinion-au',
				'business-today',
			],
		},
		{
			title: 'International correspondents',
			newsletters: [
				'us-morning-newsletter',
				'morning-mail',
				'afternoon-update',
				'patriarchy',
				'first-dog',
				'the-rural-network',
				'australian-politics',
			],
		},
	],
	US: [
		{
			title: 'Get started',
			newsletters: [
				'us-morning-newsletter',
				'today-us',
				'headlines-europe',
				'green-light',
				'best-of-opinion-us',
				'patriarchy',
				'bookmarks',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'this-is-europe',
				'the-guide-staying-in',
				'tech-scape',
				'fashion-statement',
				'word-of-mouth',
				'pushing-buttons',
			],
		},
		{
			title: 'Culture picks',
			newsletters: [
				'film-today',
				'sleeve-notes',
				'whats-on',
				'hear-here',
				'art-weekly',
				'design-review',
			],
		},
		{
			title: 'Weekend reads',
			newsletters: [
				'inside-saturday',
				'house-to-home',
				'saved-for-later',
				'five-great-reads',
				'the-upside',
				'the-long-read',
				'observer-food',
			],
		},
		{
			title: 'The world explained',
			newsletters: [
				'global-dispatch',
				'cotton-capital',
				'business-today',
				'documentaries',
				'her-stage',
				'guardian-traveller',
			],
		},
		{
			title: 'Sport',
			newsletters: [
				'soccer-with-jonathan-wilson',
				'the-fiver',
				'moving-the-goalposts',
				'the-spin',
				'the-breakdown',
				'the-recap',
				'sports-au',
			],
		},
		{
			title: 'In brief',
			newsletters: [
				'today-uk',
				'today-au',
				'best-of-opinion',
				'best-of-opinion-au',
			],
		},
		{
			title: 'International correspondents',
			newsletters: [
				'morning-briefing',
				'morning-mail',
				'afternoon-update',
				'first-dog',
				'the-rural-network',
				'australian-politics',
			],
		},
	],
	AU: [
		{
			title: 'Get started',
			newsletters: [
				'morning-mail',
				'afternoon-update',
				'first-dog',
				'five-great-reads',
				'the-rural-network',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'green-light',
				'tech-scape',
				'pushing-buttons',
				'fashion-statement',
				'word-of-mouth',
				'the-guide-staying-in',
			],
		},
		{
			title: 'Culture picks',
			newsletters: [
				'saved-for-later',
				'hear-here',
				'sleeve-notes',
				'film-today',
				'bookmarks',
				'whats-on',
				'art-weekly',
				'design-review',
			],
		},
		{
			title: 'Weekend reads',
			newsletters: [
				'the-long-read',
				'the-upside',
				'house-to-home',
				'inside-saturday',
				'observer-food',
			],
		},
		{
			title: 'The world explained',
			newsletters: [
				'global-dispatch',
				'cotton-capital',
				'documentaries',
				'patriarchy',
				'her-stage',
				'guardian-traveller',
			],
		},
		{
			title: 'Sport',
			newsletters: [
				'sports-au',
				'the-fiver',
				'moving-the-goalposts',
				'the-spin',
				'soccer-with-jonathan-wilson',
				'the-breakdown',
				'the-recap',
			],
		},
		{
			title: 'In brief',
			newsletters: [
				'today-au',
				'australian-politics',
				'best-of-opinion-au',
				'today-uk',
				'today-us',
				'headlines-europe',
				'best-of-opinion',
				'best-of-opinion-us',
			],
		},
		{
			title: 'International correspondents',
			newsletters: [
				'morning-briefing',
				'us-morning-newsletter',
				'this-is-europe',
				'business-today',
			],
		},
	],
};
