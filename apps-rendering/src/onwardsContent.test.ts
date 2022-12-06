import { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime';
import { Content } from '@guardian/content-api-models/v1/content';
import { ContentType } from '@guardian/content-api-models/v1/contentType';
import {
	getCategoryTitle,
	OnwardsContent,
	parseMapiOnwardsContent,
} from 'onwardsContent';
import { OnwardsContent as ARModelsOnwardsContent } from '@guardian/apps-rendering-api-models/onwardsContent';
import { Int64 } from 'thrift';
import { OnwardsContentCategory } from '@guardian/apps-rendering-api-models/onwardsContentCategory';
import { none, some } from '@guardian/types';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { Context } from 'parserContext';
import { JSDOM } from 'jsdom';

let defaultContent: Content;

const createDefaultContent = (contentId: string = 'contentId') => {
	return {
		id: contentId,
		type: ContentType.ARTICLE,
		webTitle: 'contentTitle',
		webUrl: 'contentUrl',
		apiUrl: 'apiUrl',
		tags: [],
		references: [],
		isHosted: true,
		pillarId: 'somePillarId',
		pillarName: 'somePillarName',
	};
};

const contentWithTag = (tag: string) =>
	Object.assign({}, createDefaultContent(), { tags: [{ id: tag }] });

const createARModelsOnwardsContent = (
	content: Content[],
): ARModelsOnwardsContent => ({
	category: OnwardsContentCategory.RELATED,
	content,
});

const parseFromContent = (content: Content[]): OnwardsContent =>
	parseMapiOnwardsContent(mockContext)(createARModelsOnwardsContent(content));

const mockContext: Context = {
	docParser: JSDOM.fragment,
	salt: 'mockSalt',
};

function assertCondition(condition: boolean): asserts condition {
	if (!condition) throw new Error();
}

describe('parseMapiRelatedContent', () => {
	beforeEach(() => {
		defaultContent = createDefaultContent();
	});

	it('returns onwards content', () => {
		const actual = parseFromContent([defaultContent]);

		const expected: OnwardsContent = {
			category: OnwardsContentCategory.RELATED,
			content: [
				{
					headline: 'contentTitle',
					publishDate: none,
					mainMedia: none,
					webUrl: 'contentId',
					contributor: none,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
				},
			],
		};

		expect(actual).toEqual(expected);
	});

	it('returns default pillar given undefined content pillar id', () => {
		defaultContent.pillarId = undefined;
		const actual = parseFromContent([defaultContent]);
		expect(actual.content[0].theme).toEqual(ArticlePillar.News);
	});

	it('returns webPublicationDate DateTime in response given content has webPublicationDate field', () => {
		const capiDateTime: CapiDateTime = {
			dateTime: new Int64(1556859638000),
			iso8601: '2019-05-03T05:00:38Z',
		};
		defaultContent.webPublicationDate = capiDateTime;

		const actual = parseFromContent([defaultContent]);
		expect(actual.content[0].publishDate).toEqual(
			some(new Date('2019-05-03T05:00:38Z')),
		);
	});

	test('feature', () => {
		const article = parseFromContent([contentWithTag('tone/features')])
			.content[0];
		expect(article.design).toBe(ArticleDesign.Feature);
	});

	// test('live', () => {
	// 	const article = parseFromContent([
	// 		contentWithTag('tone/minutebyminute'),
	// 	]).content[0];
	// 	expect(article.design).toBe(ArticleDesign.Feature);
	// });

	test('review', () => {
		const article = parseFromContent([
			{
				...contentWithTag('tone/reviews'),
				fields: {
					starRating: 4,
				},
			},
		]).content[0];
		assertCondition(article.design === ArticleDesign.Review);
		expect(article.starRating).toBe('4');
	});

	test('analysis', () => {
		const article = parseFromContent([contentWithTag('tone/analysis')])
			.content[0];
		expect(article.design).toBe(ArticleDesign.Analysis);
	});

	test('comment or letter', () => {
		const comment = parseFromContent([contentWithTag('tone/comment')])
			.content[0];
		expect(comment.design).toBe(ArticleDesign.Comment);
		const letter = parseFromContent([contentWithTag('tone/letters')])
			.content[0];
		expect(letter.design).toBe(ArticleDesign.Comment);
	});

	test('audio', () => {
		const article = parseFromContent([contentWithTag('type/audio')])
			.content[0];
		expect(article.design).toBe(ArticleDesign.Audio);
	});

	test('video', () => {
		const article = parseFromContent([contentWithTag('type/video')])
			.content[0];
		expect(article.design).toBe(ArticleDesign.Video);
	});

	test('gallery', () => {
		const article = parseFromContent([contentWithTag('type/gallery')])
			.content[0];
		expect(article.design).toBe(ArticleDesign.Gallery);
	});

	test('labs', () => {
		const article = parseFromContent([
			contentWithTag('tone/advertisement-features'),
		]).content[0];
		expect(article.design).toBe(ArticleDesign.Standard);
		expect(article.theme).toBe(ArticleSpecial.Labs);
	});
});

describe('getCategoryTitle', () => {
	it('handles GALLERY', () => {
		expect(getCategoryTitle(OnwardsContentCategory.GALLERY)).toBe(
			'More galleries',
		);
	});

	it('handles STORY_PACKAGE', () => {
		expect(getCategoryTitle(OnwardsContentCategory.STORY_PACKAGE)).toBe(
			'More on this story',
		);
	});

	it('handles PAID', () => {
		expect(getCategoryTitle(OnwardsContentCategory.PAID)).toBe(
			'Related stories',
		);
	});

	it('handles SPORT', () => {
		expect(getCategoryTitle(OnwardsContentCategory.SPORT)).toBe(
			'Related stories',
		);
	});

	it('handles RELATED', () => {
		expect(getCategoryTitle(OnwardsContentCategory.RELATED)).toBe(
			'Related stories',
		);
	});

	it('handles SERIES', () => {
		expect(getCategoryTitle(OnwardsContentCategory.SERIES)).toBe(
			'Related stories',
		);
	});
});
