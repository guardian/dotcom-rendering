import cloneDeep from 'lodash.clonedeep';
import { string as curly_ } from 'curlyquotes';
import { clean as clean_ } from './clean';
import { findPillar as findPillar_ } from './find-pillar';
import { getSharingUrls as getSharingUrls_ } from './sharing-urls';
import { extract } from './extract-capi';
import { data } from '@root/fixtures/article';

const curly: any = curly_;
const clean: any = clean_;
const getSharingUrls: any = getSharingUrls_;
const findPillar: any = findPillar_;

jest.mock('./find-pillar', () => ({
    findPillar: jest.fn(),
}));
jest.mock('curlyquotes', () => ({
    string: jest.fn(),
}));
jest.mock('./clean', () => ({
    clean: jest.fn(),
}));
jest.mock('./sharing-urls', () => ({
    getSharingUrls: jest.fn(),
}));

describe('extract-capi', () => {
    let testData: any;

    beforeEach(() => {
        testData = cloneDeep(data);
        clean.mockImplementation((_: string) => _);
        curly.mockImplementation((_: string) => _);
        getSharingUrls.mockImplementation((_: string) => _);
        findPillar.mockImplementation((_: string) => _);
    });

    afterEach(() => {
        curly.mockReset();
        clean.mockReset();
        getSharingUrls.mockReset();
        findPillar.mockReset();
    });

    it('returns webPublicationDate if available', () => {
        testData.page.webPublicationDate = 1489173305000;

        const { webPublicationDate } = extract(testData);
        expect(webPublicationDate).toBe('2017-03-10T19:15:05.000Z');
    });

    it('throws error if webPublicationDate missing', () => {
        testData.page.webPublicationDate = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns tags if available', () => {
        testData.page.tags.all = [
            {
                properties: {
                    id: 'money/ticket-prices',
                    tagType: 'Keyword',
                    webTitle: 'Ticket prices',
                },
            },
            {
                properties: {
                    id: 'money/consumer-affairs',
                    tagType: 'Keyword',
                    webTitle: 'Consumer affairs',
                },
            },
        ];

        const { tags } = extract(testData);

        expect(tags.length).toBe(2);
        expect(tags[0]).toEqual({
            bylineImageUrl: '',
            id: 'money/ticket-prices',
            type: 'Keyword',
            title: 'Ticket prices',
            twitterHandle: '',
        });
        expect(tags[1]).toEqual({
            bylineImageUrl: '',
            id: 'money/consumer-affairs',
            type: 'Keyword',
            title: 'Consumer affairs',
            twitterHandle: '',
        });
    });

    it('throws error if tags missing id', () => {
        testData.page.tags.all = [
            {
                properties: {
                    tagType: 'Keyword',
                    webTitle: 'Ticket prices',
                },
            },
        ];

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('throws error if tags missing tagType', () => {
        testData.page.tags.all = [
            {
                properties: {
                    id: 'money/consumer-affairs',
                    webTitle: 'Ticket prices',
                },
            },
        ];

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns sectionName if section available', () => {
        const testSection = 'money';

        testData.page.section = testSection;

        const { sectionName } = extract(testData);

        expect(sectionName).toBe(testSection);
    });

    it('returns empty string if section missing', () => {
        testData.page.section = null;

        const { sectionName } = extract(testData);

        expect(sectionName).toBe('');
    });

    it('returns editionLongForm if edition available', () => {
        const testEditionLongForm = 'UK edition';

        testData.page.edition = testEditionLongForm;

        const { editionLongForm } = extract(testData);

        expect(editionLongForm).toBe(testEditionLongForm);
    });

    it('returns editionLongForm as empty string if edition not available', () => {
        testData.page.edition = null;

        const { editionLongForm } = extract(testData);

        expect(editionLongForm).toBe('');
    });

    it('returns editionId if editionId available', () => {
        const testEdition = 'UK';

        testData.page.editionId = testEdition;

        const { editionId } = extract(testData);

        expect(editionId).toBe(testEdition);
    });

    it('returns editionId as UK if edition not available', () => {
        testData.page.editionId = null;

        const { editionId } = extract(testData);

        expect(editionId).toBe('UK');
    });

    it('returns isImmersive as true if immersive', () => {
        testData.page.meta.isImmersive = true;

        const { isImmersive } = extract(testData);

        expect(isImmersive).toBe(true);
    });

    it('returns isImmersive as false if not immersive', () => {
        testData.page.meta.isImmersive = false;

        const { isImmersive } = extract(testData);

        expect(isImmersive).toBe(false);
    });

    it('returns webPublicationDateDisplay if webPublicationDateDisplay available', () => {
        const testWebPublicationDateDisplay = 'Fri 10 Mar 2017 19.15 GMT';

        testData.page.webPublicationDateDisplay = testWebPublicationDateDisplay;

        const { webPublicationDateDisplay } = extract(testData);

        expect(webPublicationDateDisplay).toBe(testWebPublicationDateDisplay);
    });

    it('throws error if webPublicationDateDisplay missing', () => {
        testData.page.webPublicationDateDisplay = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns headline if headline available', () => {
        const testHeadline = 'Hello Waldo';

        testData.page.content.headline = testHeadline;

        const { headline } = extract(testData);

        expect(headline).toBe(testHeadline);
        expect(clean).toHaveBeenCalledWith(testHeadline);
        expect(curly).toHaveBeenCalledWith(testHeadline);
    });

    it('throws error if headline missing', () => {
        testData.page.content.headline = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns standfirst if standfirst available', () => {
        const testStandfirst = '<p>Waldo Jeffers had reached his limit.</p>';

        testData.page.content.standfirst = testStandfirst;

        const { standfirst } = extract(testData);

        expect(clean).toHaveBeenCalledWith(testStandfirst);
        expect(standfirst).toBe('<p>Waldo Jeffers had reached his limit.</p>');
    });

    it('returns standfirst as empty string if standfirst not available', () => {
        testData.page.content.standfirst = null;

        const { standfirst } = extract(testData);

        expect(standfirst).toBe('');
    });

    it('returns main if main available', () => {
        const testMain = '<p>Waldo Jeffers had reached his limit.</p>';

        testData.page.content.main = testMain;

        const { main } = extract(testData);

        expect(main).toBe(testMain);
        expect(clean).toHaveBeenCalledWith(testMain);
    });

    it('returns main as empty string if main not available', () => {
        testData.page.content.main = null;

        const { main } = extract(testData);

        expect(main).toBe('');
    });

    it('returns main if main available', () => {
        const testMain = '<p>Waldo Jeffers had reached his limit.</p>';

        testData.page.content.main = testMain;

        const { main } = extract(testData);

        expect(main).toBe(testMain);
        expect(clean).toHaveBeenCalledWith(testMain);
    });

    it('returns author.byline if byline available', () => {
        const testAuthor = 'Waldo Jeffers';

        testData.page.content.byline = testAuthor;

        const { author } = extract(testData);

        expect(author.byline).toBe(testAuthor);
    });

    it('returns author.twitterHandle if available', () => {
        const testTwitterHandle = 'WaldoJeffers';

        testData.page.tags.all = [
            {
                properties: {
                    id: 'profile/waldo-jeffers',
                    twitterHandle: testTwitterHandle,
                    tagType: 'Contributor',
                },
            },
        ];

        const { author } = extract(testData);

        expect(author.twitterHandle).toBe(testTwitterHandle);
    });

    it('returns body blocks if body available', () => {
        testData.page.content.blocks.body = [
            {
                id: 'abc-123',
                elements: [
                    {
                        html: '<p>html test 1</p>',
                    },
                    {
                        html: '<p>html test 2</p>',
                    },
                ],
            },
            {
                id: 'abc-234',
                elements: [
                    {
                        html: '<p>html test 3</p>',
                    },
                    {
                        html: '<p>html test 4</p>',
                    },
                ],
            },
        ];

        const { blocks } = extract(testData);
        expect(blocks.length).toBe(2);

        const blockElements = blocks.map(block => block.elements);
        const elems = ([] as CAPIElement[]).concat(...blockElements);
        expect(elems.length).toBe(4);
    });

    it('returns pageId if available', () => {
        const testPageId = 'Test12345';

        testData.page.pageId = testPageId;

        const { pageId } = extract(testData);

        expect(pageId).toBe(testPageId);
    });

    it('throws error if pageId missing', () => {
        testData.page.pageId = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    /*     it('returns sharingUrls if available', () => {
        const { sharingUrls } = extract(testData);

        expect(sharingUrls).toBeDefined();
        expect(getSharingUrls).toHaveBeenCalledWith(testData);
    });
 */
    it('returns pillar if available', () => {
        const testPillar = 'sport';

        testData.page.pillar = testPillar;

        findPillar.mockReturnValueOnce(testPillar);

        const { tags, pillar } = extract(testData);

        expect(pillar).toBe(testPillar);
        expect(findPillar).toHaveBeenCalledWith(testPillar, tags);
    });

    it('defaults pillar to "news" if not valid', () => {
        const testPillar = 'foo';

        testData.page.pillar = testPillar;

        findPillar.mockReturnValueOnce(undefined);

        const { tags, pillar } = extract(testData);

        expect(pillar).toBe('news');
        expect(findPillar).toHaveBeenCalledWith(testPillar, tags);
    });

    /*     it('returns ageWarning as undefined if article not in tone/news', () => {
        testData.page.tags.all = [
            {
                properties: {
                    id: 'tone/sport',
                    tagType: 'Tone',
                    webTitle: 'Sport',
                },
            },
        ];

        const { ageWarning } = extract(testData);

        expect(ageWarning).toBeUndefined();
    }); */
    /* 
    describe('ageWarning', () => {
        let publicationDate: Date;

        beforeEach(() => {
            publicationDate = new Date();

            testData.page.tags.all = [
                {
                    properties: {
                        id: 'tone/news',
                        tagType: 'Tone',
                        webTitle: 'News',
                    },
                },
            ];
        }); */

    // TODO move adjacent to age warning file now
    /*         it('returns correct ageWarning if article more than 2 years old', () => {
            // set a publication date of 2 years ago
            publicationDate.setDate(publicationDate.getDate() - 365 * 2);

            testData.page.webPublicationDate = publicationDate.getTime();

            const { ageWarning } = extract(testData);

            expect(ageWarning).toBe('2 years old');
        }); */

    /*         it('returns correct ageWarning if article more than 1 year old', () => {
            // set a publication date of 500 days ago
            publicationDate.setDate(publicationDate.getDate() - 500);

            testData.page.webPublicationDate = publicationDate.getTime();

            const { ageWarning } = extract(testData);

            expect(ageWarning).toBe('1 year old');
        });

        it('returns correct ageWarning if article more than 2 months old', () => {
            // set a publication date of 90 days ago
            publicationDate.setDate(publicationDate.getDate() - 90);

            testData.page.webPublicationDate = publicationDate.getTime();

            const { ageWarning } = extract(testData);

            expect(ageWarning).toBe('2 months old');
        });

        it('returns correct ageWarning if article more than 1 month old', () => {
            // set a publication date of 35 days ago
            publicationDate.setDate(publicationDate.getDate() - 35);

            testData.page.webPublicationDate = publicationDate.getTime();

            const { ageWarning } = extract(testData);

            expect(ageWarning).toBe('1 month old');
        });

        it('returns no ageWarning if article is 1 week old', () => {
            // set a publication date of 7 days ago
            publicationDate.setDate(publicationDate.getDate() - 7);

            testData.page.webPublicationDate = publicationDate.getTime();

            const { ageWarning } = extract(testData);

            expect(ageWarning).toBeUndefined();
        });
    }); */

    it('returns submeta section labels if available', () => {
        testData.page.subMetaLinks.sectionLabels = [
            {
                link: '/football/chelsea',
                text: 'Chelsea',
                dataLinkName: 'article section',
            },
        ];

        const { subMetaSectionLinks } = extract(testData);
        const firstLink: SimpleLinkType = subMetaSectionLinks[0];

        expect(firstLink.url).toEqual('/football/chelsea');
        expect(firstLink.title).toEqual('Chelsea');
    });

    it('returns submeta keywords if available', () => {
        testData.page.subMetaLinks.keywords = [
            {
                link: '/football/footballviolence',
                text: 'Football violence',
                dataLinkName: 'keyword: football/footballviolence',
            },
            {
                link: '/world/race',
                text: 'Race',
                dataLinkName: 'keyword: world/race',
            },
            {
                link: '/tone/news',
                text: 'news',
                dataLinkName: 'tone: news',
            },
        ];

        const { subMetaKeywordLinks } = extract(testData);
        const [firstLink, secondLink, thirdLink] = subMetaKeywordLinks;

        expect(firstLink.url).toEqual('/football/footballviolence');
        expect(firstLink.title).toEqual('Football violence');
        expect(secondLink.url).toEqual('/world/race');
        expect(secondLink.title).toEqual('Race');
        expect(thirdLink.url).toEqual('/tone/news');
        expect(thirdLink.title).toEqual('news');
    });

    it('returns contentType if contentType available', () => {
        const testContentType = 'Video Article';
        testData.page.contentType = testContentType;

        const { contentType } = extract(testData);

        expect(contentType).toBe(testContentType);
    });

    it('throws error if contentType missing', () => {
        testData.page.contentType = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    // TODO move adjacent to helper now
    /*     it('returns nielsenAPI based on section name', () => {
        testData.page.section = 'books';

        const { nielsenAPIID } = extract(testData);

        expect(nielsenAPIID).toBe('4994D04B-4279-4184-A2C5-E8BB1DD50AB9');
    });

    it('returns the guardian nielsenAPI if section does not exist', () => {
        testData.page.section = 'invalidSection';

        const { nielsenAPIID } = extract(testData);

        expect(nielsenAPIID).toBe('2879C1E1-7EF9-459B-9C5C-6F4D2BC9DD53');
    }); */
});
