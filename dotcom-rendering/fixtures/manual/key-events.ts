import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';

export interface KeyEventCard {
	id: string;
	blockFirstPublished: number;
	title: string;
	isSummary: boolean;
	filterKeyEvents: boolean;
	format: ArticleFormat;
}
const format = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export const events: [
	KeyEventCard,
	KeyEventCard,
	KeyEventCard,
	KeyEventCard,
	KeyEventCard,
	KeyEventCard,
	KeyEventCard,
] = [
	{
		id: '1234',
		blockFirstPublished: 1613762399000,
		title: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		format,
		isSummary: false,
		filterKeyEvents: false,
	},
	{
		id: '1234',
		blockFirstPublished: 1613762399000,
		title: `Pope 'embarrassed' by West's increased military spending`,
		format,
		isSummary: false,
		filterKeyEvents: false,
	},
	{
		id: '1234',
		blockFirstPublished: 1613762399000,
		title: 'Kremlin: sending peacekeepers to Ukraine would be ‘reckless and extremely dangerous’',
		format,
		isSummary: false,
		filterKeyEvents: false,
	},
	{
		id: '1234',
		blockFirstPublished: 1613762399000,
		title: 'Summary: Pentagon condemns Kremlin refusal to rule out use of nuclear weapons',
		format,
		isSummary: true,
		filterKeyEvents: false,
	},
	{
		id: '1234',
		blockFirstPublished: 1613762399000,
		title: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		format,
		isSummary: false,
		filterKeyEvents: false,
	},
	{
		id: '1234',
		blockFirstPublished: 1613762399000,
		title: `Mariupol under 'constant bombing', Russia seizes humanitarian convoy, Zelenskiy says`,
		format,
		isSummary: false,
		filterKeyEvents: false,
	},
	{
		id: '1234',
		blockFirstPublished: 1613762399000,
		title: 'Summary and welcome',
		format,
		isSummary: true,
		filterKeyEvents: false,
	},
];
