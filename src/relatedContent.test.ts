import { RelatedContent } from '@guardian/apps-rendering-api-models/relatedContent';
import { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime';
import { ContentFields } from '@guardian/content-api-models/v1/contentFields';
import { Content } from '@guardian/content-api-models/v1/content';
import { ContentType } from '@guardian/content-api-models/v1/contentType';
import { parseRelatedContent } from 'relatedContent';
import { Int64 } from 'thrift';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { AssetType } from '@guardian/content-api-models/v1/assetType';
import { Block } from '@guardian/content-api-models/v1/block';
import { Blocks } from '@guardian/content-api-models/v1/blocks';
import { Asset } from '@guardian/content-api-models/v1/asset';
import { ImageElementFields } from '@guardian/content-api-models/v1/imageElementFields';
import { AssetFields } from '@guardian/content-api-models/v1/assetFields';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { TagType } from '@guardian/content-api-models/v1/tagType';

let defaultBlock: Block;
let defaultBlocks: Blocks;
let imageAsset: Asset;
let elementImageTypeData: ImageElementFields;
let imageAssetTypeData: AssetFields;
let defaultContent: Content;

const createDefaultContent = () => {
	return {
		id: 'contentId',
		type: ContentType.ARTICLE,
		webTitle: 'contentTitle',
		webUrl: 'contentUrl',
		apiUrl: 'apiUrl',
		tags: [],
		references: [],
		isHosted: true,
	};
};

describe('parseRelatedContent', () => {
	beforeEach(() => {
		defaultContent = createDefaultContent();
	});

	it('returns related content', () => {
		const actual = parseRelatedContent([defaultContent]);

		const expected: RelatedContent = {
			title: 'Related Stories',
			relatedItems: [
				{
					title: 'contentTitle',
					lastModified: undefined,
					headerImage: undefined,
					link: '/contentId',
					type: RelatedItemType.ARTICLE,
					pillar: {
						id: 'pillar/news',
						name: 'news',
						sectionIds: [],
					},
					starRating: undefined,
				},
			],
		};

		expect(actual).toEqual(expected);
	});

	it('returns lastModified DateTime in response given content has lastModified field', () => {
		const capiDateTime: CapiDateTime = {
			dateTime: new Int64(6545664),
			iso8601: 'iso',
		};
		const contentFields: ContentFields = {
			lastModified: capiDateTime,
		};
		defaultContent.fields = contentFields;

		const actual = parseRelatedContent([defaultContent]);

		expect(actual.relatedItems[0].lastModified).toEqual(capiDateTime);
	});

	it('returns the first 4 related content given more than 4 content items', () => {
		const actual = parseRelatedContent([
			defaultContent,
			defaultContent,
			defaultContent,
			defaultContent,
			defaultContent,
			defaultContent,
		]);

		expect(actual.relatedItems.length).toEqual(4);
	});
});

describe('parseRelatedItemType', () => {
	beforeEach(() => {
		defaultContent = createDefaultContent();
	});

	it('returns default Type ARTICLE given a content with no special tag', () => {
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.ARTICLE);
	});

	it('returns Type FEATURE given a content with feature tone tag', () => {
		addTagToTagsList('tone/features', TagType.TONE);
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.FEATURE);
	});

	it('not returns Type LIVE given a content with minutebyminute tone tag but no liveBloggingNow field', () => {
		addTagToTagsList('tone/minutebyminute', TagType.TONE);
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.ARTICLE);
	});

	it('not returns Type LIVE given a content with minutebyminute tone tag but false liveBloggingNow field', () => {
		addTagToTagsList('tone/minutebyminute', TagType.TONE);
		defaultContent.fields = { liveBloggingNow: false };
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.ARTICLE);
	});

	it('returns default Type LIVE given a content with a minutebyminute tone tag and true liveBloggingNow field', () => {
		addTagToTagsList('tone/minutebyminute', TagType.TONE);
		defaultContent.fields = { liveBloggingNow: true };

		const actual = parseRelatedContent([defaultContent]);

		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.LIVE);
	});

	it('returns Type REVIEW given a content field with 0-5 star rating', () => {
		defaultContent.fields = { starRating: 4 };
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.REVIEW);
		expect(actual.relatedItems[0].starRating).toBe('4');
	});

	it('not returns Type REVIEW given a content field with star rating other than 0-5', () => {
		defaultContent.fields = { starRating: 6 };
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.ARTICLE);
		expect(actual.relatedItems[0].starRating).toBe('6');
	});

	it('returns Type ANALYSIS given a content with analysis tone tag', () => {
		addTagToTagsList('tone/analysis', TagType.TONE);
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.ANALYSIS);
	});

	it('returns Type COMMENT given a content with comment tone tag', () => {
		addTagToTagsList('tone/comment', TagType.TONE);
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.COMMENT);
	});

	it('returns Type COMMENT given a content with letters tone tag', () => {
		addTagToTagsList('tone/letters', TagType.TONE);
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.COMMENT);
	});

	it('returns Type AUDIO given a content with audio type tag', () => {
		addTagToTagsList('type/audio', TagType.TYPE);
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.AUDIO);
	});

	it('returns Type VIDEO given a content with video type tag', () => {
		addTagToTagsList('type/video', TagType.TYPE);
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.VIDEO);
	});

	it('returns Type ADVERTISEMENT_FEATURE given a content with advertisement-features tone tag', () => {
		addTagToTagsList('tone/advertisement-features', TagType.TONE);
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(
			RelatedItemType.ADVERTISEMENT_FEATURE,
		);
	});

	it('returns Type FEATURE given a content with feature tone tag and any other tag', () => {
		addTagToTagsList('tone/features', TagType.TONE);
		addTagToTagsList('type/video', TagType.TYPE);

		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].type).toEqual(RelatedItemType.FEATURE);
	});

	const addTagToTagsList = (tagId: string, tagType: TagType) => {
		defaultContent.tags.push({
			id: tagId,
			type: tagType,
			webTitle: '',
			webUrl: '',
			apiUrl: '',
			references: [],
		});
	};
});

describe('parseHeaderImage', () => {
	beforeEach(() => {
		imageAssetTypeData = { isMaster: true, height: 340, width: 550 };
		elementImageTypeData = { alt: 'altValue' };
		imageAsset = {
			type: AssetType.IMAGE,
			typeData: imageAssetTypeData,
			file: 'filePath',
		};
		defaultBlock = {
			id: 'blockId',
			bodyHtml: '<div>some html</div>',
			bodyTextSummary: 'blockTextSummary',
			attributes: {},
			published: true,
			createdDate: {
				dateTime: new Int64(6545664),
				iso8601: 'iso',
			},
			contributors: ['contributor1'],
			elements: [
				{
					type: ElementType.IMAGE,
					assets: [imageAsset],
					imageTypeData: elementImageTypeData,
				},
			],
		};
		defaultBlocks = {
			main: defaultBlock,
			body: [defaultBlock],
		};

		defaultContent = createDefaultContent();
		defaultContent.blocks = defaultBlocks;
	});

	it('returns header image', () => {
		const expectedHeaderImage = {
			url: 'filePath',
			height: 340,
			width: 550,
			altText: 'altValue',
		};

		const actual = parseRelatedContent([defaultContent]);

		expect(actual.relatedItems[0].headerImage).toEqual(expectedHeaderImage);
	});

	it('returns undefined header image given content with no blocks', () => {
		defaultContent.blocks = undefined;
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].headerImage).toBeUndefined();
	});

	it('returns undefined header image given a content blocks with no main block', () => {
		defaultContent.blocks = {
			body: [defaultBlock],
		};
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].headerImage).toBeUndefined();
	});

	it('returns undefined header image given content main block with no elements', () => {
		defaultBlock.elements = [];
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].headerImage).toBeUndefined();
	});

	it('returns undefined header image given the image element of the content main block is not master', () => {
		imageAsset.typeData = { isMaster: false };
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].headerImage).toBeUndefined();
	});

	it('returns header image with default hight and width given image type data with no width and hight', () => {
		imageAssetTypeData.height = undefined;
		imageAssetTypeData.width = undefined;

		const actual = parseRelatedContent([defaultContent]);

		expect(actual.relatedItems[0].headerImage?.height).toBe(360);
		expect(actual.relatedItems[0].headerImage?.width).toBe(600);
	});

	it('returns header image with empty url given image asset with no file', () => {
		imageAsset.file = undefined;
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].headerImage?.url).toBe('');
	});

	it('returns header image with undefined alt given image asset with no file', () => {
		elementImageTypeData.alt = undefined;
		const actual = parseRelatedContent([defaultContent]);
		expect(actual.relatedItems[0].headerImage?.altText).toBeUndefined();
	});
});
