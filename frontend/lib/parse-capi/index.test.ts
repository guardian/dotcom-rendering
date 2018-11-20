import cloneDeep from 'lodash.clonedeep';
import { string as curly_ } from 'curlyquotes';
import clean_ from './clean';
import bigBullets_ from './big-bullets';
import { extractArticleMeta } from './';
import { data } from '@root/test/fixtures/article';

const curly: any = curly_;
const clean: any = clean_;
const bigBullets: any = bigBullets_;

jest.mock('curlyquotes', () => ({
    string: jest.fn(),
}));
jest.mock('./clean', () => jest.fn());
jest.mock('./big-bullets', () => jest.fn());

describe('parse-capi', () => {
    let testData: any;

    beforeEach(() => {
        testData = cloneDeep(data);
        clean.mockImplementation((_: string) => _);
        curly.mockImplementation((_: string) => _);
        bigBullets.mockImplementation((_: string) => _);
    });

    afterEach(() => {
        curly.mockReset();
        clean.mockReset();
        bigBullets.mockReset();
    });

    describe('extractArticleMeta', () => {
        it('returns webPublicationDate if available', () => {
            testData.config.page.webPublicationDate = 1489173305000;

            const { webPublicationDate } = extractArticleMeta(testData);

            expect(webPublicationDate.getTime()).toBe(
                new Date(1489173305000).getTime(),
            );
        });

        it('throws error if webPublicationDate if available', () => {
            testData.config.page.webPublicationDate = null;

            expect(() => {
                extractArticleMeta(testData);
            }).toThrow();
        });

        it('returns tags if available', () => {
            testData.tags.tags = [
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

            const { tags } = extractArticleMeta(testData);

            expect(tags.length).toBe(2);
            expect(tags[0]).toEqual({
                id: 'money/ticket-prices',
                type: 'Keyword',
                title: 'Ticket prices',
                twitterHandle: '',
            });
            expect(tags[1]).toEqual({
                id: 'money/consumer-affairs',
                type: 'Keyword',
                title: 'Consumer affairs',
                twitterHandle: '',
            });
        });

        it('throws error if tags missing id', () => {
            testData.tags.tags = [
                {
                    properties: {
                        tagType: 'Keyword',
                        webTitle: 'Ticket prices',
                    },
                },
            ];

            expect(() => {
                extractArticleMeta(testData);
            }).toThrow();
        });

        it('throws error if tags missing tagType', () => {
            testData.tags.tags = [
                {
                    properties: {
                        id: 'money/consumer-affairs',
                        webTitle: 'Ticket prices',
                    },
                },
            ];

            expect(() => {
                extractArticleMeta(testData);
            }).toThrow();
        });

        it('returns sectionName if section available', () => {
            const testSection = 'money';

            testData.config.page.section = testSection;

            const { sectionName } = extractArticleMeta(testData);

            expect(sectionName).toBe(testSection);
        });

        it('throws error if section missing', () => {
            testData.config.page.section = null;

            expect(() => {
                extractArticleMeta(testData);
            }).toThrow();
        });

        it('returns editionLongForm if edition available', () => {
            const testEditionLongForm = 'UK edition';

            testData.config.page.edition = testEditionLongForm;

            const { editionLongForm } = extractArticleMeta(testData);

            expect(editionLongForm).toBe(testEditionLongForm);
        });

        it('returns editionLongForm as empty string if edition not available', () => {
            testData.config.page.edition = null;

            const { editionLongForm } = extractArticleMeta(testData);

            expect(editionLongForm).toBe('');
        });

        it('returns editionId if editionId available', () => {
            const testEdition = 'UK';

            testData.config.page.editionId = testEdition;

            const { editionId } = extractArticleMeta(testData);

            expect(editionId).toBe(testEdition);
        });

        it('returns editionId as UK if edition not available', () => {
            testData.config.page.editionId = null;

            const { editionId } = extractArticleMeta(testData);

            expect(editionId).toBe('UK');
        });

        it('returns isImmersive as true if immersive', () => {
            testData.config.page.isImmersive = true;

            const { isImmersive } = extractArticleMeta(testData);

            expect(isImmersive).toBe(true);
        });

        it('returns isImmersive as false if not immersive', () => {
            testData.config.page.isImmersive = false;

            const { isImmersive } = extractArticleMeta(testData);

            expect(isImmersive).toBe(false);
        });

        it('returns webPublicationDateDisplay if webPublicationDateDisplay available', () => {
            const testWebPublicationDateDisplay = 'Fri 10 Mar 2017 19.15 GMT';

            testData.config.page.webPublicationDateDisplay = testWebPublicationDateDisplay;

            const { webPublicationDateDisplay } = extractArticleMeta(testData);

            expect(webPublicationDateDisplay).toBe(
                testWebPublicationDateDisplay,
            );
        });

        it('throws error if webPublicationDateDisplay missing', () => {
            testData.config.page.webPublicationDateDisplay = null;

            expect(() => {
                extractArticleMeta(testData);
            }).toThrow();
        });

        it('returns headline if headline available', () => {
            const testHeadline = 'Hello Waldo';

            testData.config.page.headline = testHeadline;

            const { headline } = extractArticleMeta(testData);

            expect(headline).toBe(testHeadline);
            expect(clean).toHaveBeenCalledWith(testHeadline);
            expect(curly).toHaveBeenCalledWith(testHeadline);
        });

        it('throws error if headline missing', () => {
            testData.config.page.headline = null;

            expect(() => {
                extractArticleMeta(testData);
            }).toThrow();
        });

        it('returns standfirst if standfirst available', () => {
            const testStandfirst =
                '<p>Waldo Jeffers had reached his limit.</p>';

            testData.contentFields.fields.standfirst = testStandfirst;

            const { standfirst } = extractArticleMeta(testData);

            expect(standfirst).toBe(testStandfirst);
            expect(clean).toHaveBeenCalledWith(testStandfirst);
            expect(bigBullets).toHaveBeenCalledWith(testStandfirst);
        });

        it('returns standfirst as empty string if standfirst not available', () => {
            testData.contentFields.fields.standfirst = null;

            const { standfirst } = extractArticleMeta(testData);

            expect(standfirst).toBe('');
        });

        it('returns main if main available', () => {
            const testMain = '<p>Waldo Jeffers had reached his limit.</p>';

            testData.contentFields.fields.main = testMain;

            const { main } = extractArticleMeta(testData);

            expect(main).toBe(testMain);
            expect(clean).toHaveBeenCalledWith(testMain);
        });

        it('returns main as empty string if main not available', () => {
            testData.contentFields.fields.main = null;

            const { main } = extractArticleMeta(testData);

            expect(main).toBe('');
        });

        it('returns main if main available', () => {
            const testMain = '<p>Waldo Jeffers had reached his limit.</p>';

            testData.contentFields.fields.main = testMain;

            const { main } = extractArticleMeta(testData);

            expect(main).toBe(testMain);
            expect(clean).toHaveBeenCalledWith(testMain);
        });

        it('returns body if bodyHtml available', () => {
            const testBody = '<p>Waldo Jeffers had reached his limit.</p>';

            testData.contentFields.fields.blocks.body = [
                {
                    bodyHtml: testBody,
                },
                {
                    bodyHtml: testBody,
                },
            ];

            const { body } = extractArticleMeta(testData);

            expect(body).toBe([testBody, testBody].join(''));
        });

        it('throws error if body missing', () => {
            testData.contentFields.fields.blocks.body = null;

            expect(() => {
                extractArticleMeta(testData);
            }).toThrow();
        });

        it('returns author.byline if byline available', () => {
            const testAuthor = 'Waldo Jeffers';

            testData.config.page.byline = testAuthor;

            const { author } = extractArticleMeta(testData);

            expect(author.byline).toBe(testAuthor);
        });

        it('returns author.twitterHandle if available', () => {
            const testTwitterHandle = 'WaldoJeffers';

            testData.tags.tags = [
                {
                    properties: {
                        id: 'profile/waldo-jeffers',
                        twitterHandle: testTwitterHandle,
                        tagType: 'Contributor',
                    },
                },
            ];

            const { author } = extractArticleMeta(testData);

            expect(author.twitterHandle).toBe(testTwitterHandle);
        });
    });
});
