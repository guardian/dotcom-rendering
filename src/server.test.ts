import { capiEndpoint } from './server';

describe('server logic runs as expected', () => {
    it('generates capi endpoint url', () => {
        const articleId = 'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
        const key = 'FAKE_KEY';
        const capiUrl = capiEndpoint(articleId, key);

        expect(capiUrl).toEqual('')
    });
});
