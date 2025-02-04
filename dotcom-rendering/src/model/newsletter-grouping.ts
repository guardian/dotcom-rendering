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
				'the-long-wave',
				'morning-briefing', // First Edition
				'the-overwhelm',
				'saturday-edition',
				'word-of-mouth', // Feast
				'the-guide-staying-in',
				'the-long-read',
				'reclaim-your-brain',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'green-light', // Down to Earth
				'tech-scape',
				'fashion-statement',
				'pushing-buttons',
				'well-actually',
				'cotton-capital',
			],
		},
		{
			title: 'Culture picks',
			newsletters: [
				'film-today',
				'sleeve-notes',
				'whats-on',
				'bookmarks',
				'art-weekly',
				'design-review',
				'documentaries',
			],
		},
		{
			title: 'Weekend reads',
			newsletters: [
				'the-filter',
				'inside-saturday',
				'five-great-reads',
				'house-to-home',
				'observed',
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
				'the-stakes-us-election-edition', // The Stakes — Presidential Transition
				'fighting-back',
				'follow-margaret-sullivan',
				'follow-robert-reich',
				'follow-mehdi-hasan',
				'global-dispatch',
				'her-stage',
				'trump-on-trial',
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
				'detox-your-kitchen',
				'the-stakes-us-election-edition', // This Week in Trumpland
				'the-long-wave',
				'us-morning-newsletter', // First Thing
				'the-overwhelm',
				'fighting-back',
				'well-actually',
				'reclaim-your-brain',
				'trump-on-trial',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'soccer-with-jonathan-wilson',
				'green-light', // Down to Earth
				'follow-mehdi-hasan',
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
				'observed',
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
				'today-us', // Headlines US
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
				'breaking-news-australia',
				'the-overwhelm',
				'morning-mail',
				'afternoon-update',
				'the-crunch',
				'first-dog',
				'reclaim-your-brain',
				'well-actually',
			],
		},
		{
			title: 'In depth',
			newsletters: [
				'the-stakes-us-election-edition',
				'weekly-beast',
				'the-rural-network',
				'green-light', // Down to Earth
				'tech-scape',
				'pushing-buttons',
				'fashion-statement',
				'word-of-mouth', // Feast
			],
		},
		{
			title: 'Culture picks',
			newsletters: [
				'saved-for-later',
				'the-guide-staying-in',
				'hear-here',
				'sleeve-notes',
				'film-today',
				'bookmarks',
				'whats-on',
				'design-review',
			],
		},
		{
			title: 'Weekend reads',
			newsletters: [
				'weekend-mail-aus',
				'five-great-reads',
				'saturday-edition',
				'the-long-read',
				'the-upside',
				'house-to-home',
				'inside-saturday',
				'observer-food',
				'observed',
			],
		},
		{
			title: 'The world explained',
			newsletters: [
				'the-long-wave',
				'trump-on-trial',
				'global-dispatch',
				'patriarchy',
				'cotton-capital',
				'documentaries',
				'her-stage',
				'guardian-traveller',
			],
		},
		{
			title: 'Sport',
			newsletters: [
				'from-the-pocket-afl-weekly',
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
				'follow-robert-reich',
				'follow-margaret-sullivan',
				'follow-mehdi-hasan',
				'this-is-europe',
				'business-today',
			],
		},
	],
};
