import { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import { none } from '../vendor/@guardian/types/index';
import { Optional } from 'optional';
import {
	Contributor,
	isSingleContributor,
	tagToContributor,
} from './contributor';

describe('isSingleContributor', () => {
	const contributor: Contributor = {
		id: 'someId',
		apiUrl: 'SomeUrl',
		name: 'someName',
		image: none,
	};
	test('returns true given an array of 1 contributor', () => {
		expect(isSingleContributor([contributor])).toBe(true);
	});

	test('returns false given an array of several contributors', () => {
		expect(isSingleContributor([contributor, contributor])).toBe(false);
	});

	test('returns false given an empty array of contributor', () => {
		expect(isSingleContributor([])).toBe(false);
	});
});

describe('tagToContributor', () => {
	const tag: Tag = {
		id: 'someId',
		type: TagType.CONTRIBUTOR,
		webTitle: 'someTitle',
		webUrl: 'someWebUrl',
		apiUrl: 'someApiUrl',
		references: [{ id: 'refId', type: 'refType' }],
	};
	test('returns a contributor given a tag', () => {
		const expectedResult = {
			apiUrl: 'someApiUrl',
			id: 'someId',
			image: {
				kind: 1,
			},
			name: 'someTitle',
		};
		expect(tagToContributor('someSalt')(tag)).toEqual(expectedResult);

		tag.bylineLargeImageUrl = 'someBylineUrl';

		const expectedResultWithImage = {
			apiUrl: 'someApiUrl',
			id: 'someId',
			image: {
				kind: 0,
				value: {
					alt: {
						kind: 1,
					},
					caption: {
						kind: 1,
					},
					credit: {
						kind: 1,
					},
					dpr2Srcset:
						'someBylineUrl 32w, someBylineUrl 64w, someBylineUrl 128w, someBylineUrl 192w, someBylineUrl 256w, someBylineUrl 400w, someBylineUrl 600w',
					height: 192,
					nativeCaption: {
						kind: 1,
					},
					role: 0,
					src: 'someBylineUrl',
					srcset: 'someBylineUrl 32w, someBylineUrl 64w, someBylineUrl 128w, someBylineUrl 192w, someBylineUrl 256w, someBylineUrl 400w, someBylineUrl 600w',
					width: 192,
					imageSubtype: Optional.none(),
				},
			},
			name: 'someTitle',
		};
		expect(tagToContributor('someSalt')(tag)).toEqual(
			expectedResultWithImage,
		);
	});
});
