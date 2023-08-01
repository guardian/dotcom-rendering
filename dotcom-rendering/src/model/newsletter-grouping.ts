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
				'green-light',
				'the-guide-staying-in',
				'the-long-read',
				'word-of-mouth',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'whats-on',
				'tech-scape',
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
			],
		},
		{
			title: 'The world explained',
			newsletters: [
				'this-is-europe',
				'global-dispatch',
				'documentaries',
				'her-stage',
			],
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
				'the-rural-network',
			],
		},
		{
			title: 'From our correspondents',
			newsletters: [
				'green-light',
				'global-dispatch',
				'tech-scape',
				'pushing-buttons',
				'fashion-statement',
			],
		},
		{
			title: 'Culture Picks',
			newsletters: [
				'saved-for-later',
				'hear-here',
				'sleeve-notes',
				'design-review',
				'bookmarks',
				'film-today',
				'art-weekly',
			],
		},
		{
			title: 'Weekend reads',
			newsletters: ['five-great-reads', 'the-upside', 'the-long-read'],
		},
		{
			title: 'Go deeper',
			newsletters: [
				'cotton-capital',
				'documentaries',
				'patriarchy',
				'her-stage',
			],
		},
		{
			title: 'Sport',
			newsletters: [
				'sports-au',
				'the-fiver',
				'moving-the-goalposts',
				'the-spin',
				'the-recap',
				'the-breakdown',
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
				'word-of-mouth',
				'guardian-traveller',
				'inside-saturday',
				'house-to-home',
			],
		},
	],
};
