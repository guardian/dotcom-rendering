import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard';
import { extractGA } from './extract-ga';

const pillar: LegacyPillar = 'news';
const base = {
	authorIds: 'profile/glenn-greenwald',
	beaconUrl: '//phar.gu-web.net',
	commissioningDesks: '',
	contentId: 'world/2013/jun/06/nsa-phone-records-verizon-court-order',
	contentType: 'article',
	edition: 'uk',
	isHosted: 'false',
	keywordIds:
		'us-news/us-national-security,us-news/us-politics,world/privacy,business/telecoms,technology/telecoms,business/verizon-communications,technology/data-protection,technology/technology,business/business,world/world,us-news/us-news,us-news/nsa,us-news/the-nsa-files',
	pillar,
	section: 'us-news',
	seriesId: 'commentisfree/series/glenn-greenwald-security-liberty,testseries',
	toneIds: 'tone/news',
	webTitle: "Ticket touts face unlimited fines for using 'bots' to buy in bulk",
};

const CAPIArticle = {
	...ExampleArticle,
	tags: [
		...ExampleArticle.tags,
		{
			id: 'testseries',
			type: 'Series',
			title: 'This Series',
		},
	],
	...base,
};

describe('Google Analytics extracts and formats CAPIArticle response correctly', () => {
	it('GA Extract returns correctly formatted GA response', () => {
		expect(extractGA(CAPIArticle)).toEqual(base);
	});
});
