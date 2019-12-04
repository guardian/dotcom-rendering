import { capiEndpoint } from './capi';

describe('server logic runs as expected', () => {
    it('generates capi endpoint url', () => {
        const articleId = 'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
        const key = 'TEST_KEY';
        const capiUrl = capiEndpoint(articleId, key);

        expect(capiUrl).toEqual('https://content.guardianapis.com/cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked?format=json&api-key=TEST_KEY&show-atoms=all&show-fields=all&show-tags=all&show-blocks=all')
    });
});