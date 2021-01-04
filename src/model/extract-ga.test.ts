import { CAPI } from '@root/fixtures/CAPI/CAPI';
import { extract } from './extract-ga';

const base = {
	authorIds: 'profile/rob-davies',
	beaconUrl: '//phar.gu-web.net',
	commissioningDesks: 'ukbusiness',
	contentId:
		'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
	contentType: 'article',
	edition: 'uk',
	isHosted: 'false',
	keywordIds:
		'money/ticket-prices,money/consumer-affairs,money/money,technology/internet,money/viagogo',
	pillar: 'lifestyle',
	section: 'money',
	seriesId: 'testseries',
	toneIds: 'tone/news',
	webTitle:
		"Ticket touts face unlimited fines for using 'bots' to buy in bulk",
};

describe('Google Analytics extracts and formats CAPI response correctly', () => {
	it('GA Extract returns correctly formatted GA response', () => {
		expect(extract(CAPI)).toEqual(base);
	});
});
