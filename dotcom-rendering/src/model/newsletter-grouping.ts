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
				'morning-briefing', // First Edition
				'word-of-mouth', // Feast
				'this-is-europe',
				'the-guide-staying-in',
				'the-long-read',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'green-light', // Down to Earth
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
				'observer-food',
			],
		},
		{
			title: 'The world explained',
			newsletters: [
				'trump-on-trial',
				'global-dispatch',
				'documentaries',
				'her-stage',
			],
		},
		{
			title: 'Sport',
			newsletters: [
				'the-fiver', // Football Daily
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
				'today-uk', // Headlines UK
				'headlines-europe',
				'today-us', // Headlines US
				'today-au', // Headlines AUS
				'best-of-opinion',
				'best-of-opinion-us',
				'best-of-opinion-au',
				'business-today',
			],
		},
		{
			title: 'International correspondents',
			newsletters: [
				'us-morning-newsletter', // First Thing
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
				'us-morning-newsletter', // First Thing
				'today-us', // Headlines US
				'headlines-europe',
				'green-light', // Down to Earth
				'trump-on-trial',
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
				'word-of-mouth', // Feast
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
				'the-fiver', // Football Daily
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
				'today-uk', // Headlines UK
				'today-au', // Headlines AUS
				'headlines-europe',
				'best-of-opinion',
				'best-of-opinion-au',
			],
		},
		{
			title: 'International correspondents',
			newsletters: [
				'morning-briefing', // First Edition
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
			title: 'In depth',
			newsletters: [
				'the-crunch',
				'green-light', // Down to Earth
				'tech-scape',
				'pushing-buttons',
				'fashion-statement',
				'word-of-mouth', // Feast
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
				'five-great-reads',
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
				'trump-on-trial',
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
				'the-fiver', // Football Daily
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
				'today-au', // Headlines AUS
				'australian-politics',
				'best-of-opinion-au',
				'today-uk', // Headlines UK
				'today-us', // Headlines US
				'headlines-europe',
				'best-of-opinion',
				'best-of-opinion-us',
			],
		},
		{
			title: 'International correspondents',
			newsletters: [
				'morning-briefing', // First Edition
				'us-morning-newsletter', // First Thing
				'this-is-europe',
				'business-today',
			],
		},
	],
};
