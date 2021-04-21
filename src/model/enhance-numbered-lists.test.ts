import { NumberedList } from '@root/fixtures/generated/articles/NumberedList';
import { Article } from '@root/fixtures/generated/articles/Article';
import { images } from '@root/fixtures/generated/images';

import { enhanceNumberedLists } from './enhance-numbered-lists';

const metaData = {
	id: '123',
	primaryDateLine: 'Wed 9 Dec 2020 06.30 GMT',
	secondaryDateLine: 'Last modified on Wed 9 Dec 2020 13.40 GMT',
};

describe('Enhance Numbered Lists', () => {
	it('sets the role for the image to be inline', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							...images[0],
							role: 'thumbnail',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							...images[0],
							role: 'inline',
						},
					],
				},
			],
		};

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('does not enhance articles if they are not numbered lists', () => {
		const input: CAPIType = {
			...Article,
			blocks: [
				{
					...metaData,
					elements: [
						{
							...images[0],
							role: 'thumbnail',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = {
			...Article,
			blocks: [
				{
					...metaData,
					elements: [
						{
							...images[0],
							role: 'thumbnail',
						},
					],
				},
			],
		};

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});
});
