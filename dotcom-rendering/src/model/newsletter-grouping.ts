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
				'swift-notes',
				'saturday-edition',
				'word-of-mouth', // Feast
				'well-actually',
				'the-guide-staying-in',
				'the-long-read',
				'reclaim-your-brain',
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
				'this-is-europe',
				'trump-on-trial',
				'follow-margaret-sullivan',
				'follow-robert-reich',
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
				'well-actually',
				'trump-on-trial',
				'reclaim-your-brain',
				'today-us', // Headlines US
				'soccer-with-jonathan-wilson',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'green-light', // Down to Earth
				'soccer-with-jonathan-wilson',
				'follow-robert-reich',
				'follow-margaret-sullivan',
				'patriarchy',
				'this-is-europe',
				'tech-scape',
				'fashion-statement',
			],
		},
		{
			title: 'Culture picks',
			newsletters: [
				'swift-notes',
				'the-guide-staying-in',
				'film-today',
				'sleeve-notes',
				'whats-on',
				'hear-here',
				'art-weekly',
				'design-review',
				'documentaries',
			],
		},
		{
			title: 'Weekend reads',
			newsletters: [
				'inside-saturday',
				'five-great-reads',
				'the-upside',
				'the-long-read',
				'saved-for-later',
				'house-to-home',
			],
		},
		{
			title: 'The world explained',
			newsletters: [
				'global-dispatch',
				'cotton-capital',
				'guardian-traveller',
				'her-stage',
				'the-crunch',
			],
		},
		{
			title: 'Sport',
			newsletters: [
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
				'best-of-opinion-us',
				'today-uk', // Headlines UK
				'best-of-opinion',
				'today-au', // Headlines AUS
				'best-of-opinion-au',
				'headlines-europe',
				'business-today',
			],
		},
		{
			title: 'International correspondents',
			newsletters: [
				'morning-briefing', // First Edition
				'saturday-edition',
				'morning-mail',
				'afternoon-update',
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
				'the-crunch',
				'swift-notes',
				'first-dog',
				'reclaim-your-brain',
				'well-actually',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'the-rural-network',
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
				'saturday-edition',
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
				'follow-margaret-sullivan',
				'follow-robert-reich',
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
