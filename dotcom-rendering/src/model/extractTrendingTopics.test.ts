import type { FETagType } from '../types/tag.ts';
import type {
	NarrowedFECollectionType,
	NarrowedFEFrontCard,
} from './extractTrendingTopics.ts';
import { extractTrendingTopicsFomFront } from './extractTrendingTopics.ts';

const tag = (
	id: string,
	tagType = 'Keyword',
	paidContentType?: string,
): FETagType => {
	return {
		properties: {
			id,
			tagType,
			webTitle: id,
			paidContentType,
		},
	};
};

const card = (id: string, tags: FETagType[]): NarrowedFEFrontCard => {
	return {
		card: {
			id,
		},
		properties: {
			maybeContentId: id,
			maybeContent: {
				tags: {
					tags,
				},
			},
		},
	};
};

const tagA = tag('a');
const tagB = tag('b');
const tagC = tag('c');
const tagD = tag('d');
const tagE = tag('e');
const tagF = tag('f');

describe('extractTrendingTopics', () => {
	it('returns tags in correct order with normal input', () => {
		const collection: NarrowedFECollectionType = {
			curated: [
				card('a', [tagA]),
				card('b', [tagA, tagB]),
				card('c', [tagA, tagB, tagC]),
			],
			backfill: [
				card('d', [tagA, tagB, tagC, tagD]),
				card('e', [tagA, tagB, tagC, tagD, tagE]),
				card('f', [tagA, tagB, tagC, tagD, tagE, tagF]),
			],
		};

		expect(
			extractTrendingTopicsFomFront([collection], 'au/environment'),
		).toEqual([tagA, tagB, tagC, tagD, tagE, tagF]);
	});

	it('deduplicates cards', () => {
		const collection: NarrowedFECollectionType = {
			curated: [
				card('a', [tagA]),
				card('b', [tagA, tagB]),
				card('c', [tagA, tagB, tagC]),
				card('g', [tagF]),
			],
			backfill: [
				card('d', [tagA, tagB, tagC, tagD]),
				card('e', [tagA, tagB, tagC, tagD, tagE]),
				card('f', [tagA, tagB, tagC, tagD, tagE]),
				card('g', [tagF]),
			],
		};
		const secondCollection: NarrowedFECollectionType = {
			curated: [card('g', [tagF])],
			backfill: [card('g', [tagF])],
		};
		expect(
			extractTrendingTopicsFomFront(
				[collection, secondCollection],
				'au/environment',
			),
		).toEqual([tagA, tagB, tagC, tagD, tagE, tagF]);
	});

	it('removes cards with id matching pageId', () => {
		const tagWithPageId = tag('au/environment');
		const collection: NarrowedFECollectionType = {
			curated: [
				card('a', [tagWithPageId, tagA]),
				card('b', [tagWithPageId, tagA, tagB]),
				card('c', [tagWithPageId, tagA, tagB, tagC]),
			],
			backfill: [
				card('d', [tagWithPageId, tagA, tagB, tagC, tagD]),
				card('e', [tagWithPageId, tagA, tagB, tagC, tagD, tagE]),
				card('f', [tagWithPageId, tagA, tagB, tagC, tagD, tagE, tagF]),
			],
		};
		expect(
			extractTrendingTopicsFomFront([collection], 'au/environment'),
		).toEqual([tagA, tagB, tagC, tagD, tagE, tagF]);
	});

	it('removes cards without paidContentType or tagType being Keyword or Topics', () => {
		const tagWithTopicsPaidContentType = tag(
			'tagWithTopicsPaidContentType',
			'',
			'Topics',
		);
		const tagWithKeywordPaidContentType = tag(
			'tagWithKeywordPaidContentType',
			'',
			'Keyword',
		);
		const tagWithKeywordTagType = tag('tagWithKeywordTagType');
		const tagWithNoneOfTheAbove = tag(
			'tagWithNoneOfTheAbove',
			'Series',
			'Series',
		);
		const collection: NarrowedFECollectionType = {
			curated: [
				card('a', [tagWithNoneOfTheAbove]),
				card('b', [
					tagWithNoneOfTheAbove,
					tagWithTopicsPaidContentType,
				]),
			],
			backfill: [
				card('c', [
					tagWithNoneOfTheAbove,
					tagWithTopicsPaidContentType,
					tagWithKeywordPaidContentType,
				]),
				card('d', [
					tagWithNoneOfTheAbove,
					tagWithTopicsPaidContentType,
					tagWithKeywordPaidContentType,
					tagWithKeywordTagType,
				]),
			],
		};
		expect(
			extractTrendingTopicsFomFront([collection], 'au/environment'),
		).toEqual([
			tagWithTopicsPaidContentType,
			tagWithKeywordPaidContentType,
			tagWithKeywordTagType,
		]);
	});
});
