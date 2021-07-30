import { Article } from '@root/fixtures/generated/articles/Article';
import { extract } from './extract-ga';

const pillar: LegacyPillar = 'news';
const base = {
	authorIds: 'profile/jennifer-rankin',
	beaconUrl: '//phar.gu-web.net',
	commissioningDesks: 'ukenvironment',
	contentId:
		'environment/2020/feb/10/fires-floods-maps-europe-climate-catastrophe',
	contentType: 'article',
	edition: 'uk',
	isHosted: 'false',
	keywordIds:
		'environment/climate-change,environment/environment,science/scienceofclimatechange,science/science,world/eu,world/europe-news,world/world,environment/flooding,world/wildfires,world/natural-disasters',
	pillar,
	section: 'environment',
	seriesId: 'testseries',
	toneIds: 'tone/news',
	webTitle:
		"Ticket touts face unlimited fines for using 'bots' to buy in bulk",
};

const CAPI = {
	...Article,
	tags: [
		...Article.tags,
		{
			id: 'testseries',
			type: 'Series',
			title: 'This Series',
		},
	],
	...base,
};

describe('Google Analytics extracts and formats CAPI response correctly', () => {
	it('GA Extract returns correctly formatted GA response', () => {
		expect(extract(CAPI)).toEqual(base);
	});
});
