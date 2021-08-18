import { capiEndpoint } from './capi';

describe('server logic runs as expected', () => {
	it('generates capi endpoint url', () => {
		const articleId =
			'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
		const key = 'TEST_KEY';
		const capiUrl = capiEndpoint(articleId, key);

		expect(capiUrl).toEqual(
			'https://content.guardianapis.com/cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked?format=thrift&api-key=TEST_KEY&show-atoms=all&show-fields=headline%2Cstandfirst%2CbylineHtml%2CfirstPublicationDate%2CshouldHideAdverts%2CshouldHideReaderRevenue%2CdisplayHint%2CstarRating%2Ccommentable%2CinternalShortId%2CliveBloggingNow%2ClastModified&show-tags=all&show-blocks=all&show-elements=all&show-related=true&show-references=all',
		);
	});
});
