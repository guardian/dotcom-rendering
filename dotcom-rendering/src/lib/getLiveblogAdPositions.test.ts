import { liveBlock as mockBlock } from '../../fixtures/manual/liveBlock';
import { getLiveblogAdPositions } from './getLiveblogAdPositions';

describe('get liveblog ad positions', () => {
	const twoBlocks = Array<Block>(2).fill(mockBlock);

	it('should insert zero ads if zero blocks', () => {
		expect(getLiveblogAdPositions([], false)).toEqual([]);
	});
	it('should insert zero ads if zero blocks', () => {
		expect(getLiveblogAdPositions([mockBlock], false)).toEqual([]);
	});
	it('should insert an ad after the first block if two blocks', () => {
		expect(getLiveblogAdPositions(twoBlocks, false)).toEqual([0]);
	});
	it('should insert an ad after every fourth block if repeated text elements of 1,000', () => {
		const block: Block = {
			...mockBlock,
			elements: [
				{
					elementId: '4ac2fcd8-284c-4038-91a1-093811f389ba',
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: `<p>${'a'.repeat(1000)}</p>`,
				},
			],
		};
		const twentyBlocks = Array<Block>(20).fill(block);
		expect(getLiveblogAdPositions(twentyBlocks, false)).toEqual([
			0, 4, 8, 12, 16,
		]);
	});
});
