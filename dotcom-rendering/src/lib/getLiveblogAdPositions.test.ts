import { liveBlock as mockBlock } from '../../fixtures/manual/liveBlock';
import { getLiveblogAdPositions } from './getLiveblogAdPositions';

describe('get liveblog ad positions', () => {
	const twoBlocks = Array<Block>(2).fill(mockBlock);

	it('should insert zero ads if zero blocks', () => {
		expect(getLiveblogAdPositions([]).desktopAdPositions).toEqual([]);
		expect(getLiveblogAdPositions([]).mobileAdPositions).toEqual([]);
	});
	it('should insert zero ads if one block', () => {
		expect(getLiveblogAdPositions([mockBlock]).desktopAdPositions).toEqual(
			[],
		);
		expect(getLiveblogAdPositions([mockBlock]).mobileAdPositions).toEqual(
			[],
		);
	});
	it('should insert an ad after the first block if two blocks', () => {
		expect(getLiveblogAdPositions(twoBlocks).desktopAdPositions).toEqual([
			0,
		]);
		expect(getLiveblogAdPositions(twoBlocks).mobileAdPositions).toEqual([
			0,
		]);
	});

	describe('many blocks', () => {
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

		const tenBlocks = Array<Block>(10).fill(block);

		it('On desktop, it should insert an ad after every fourth block given repeated text elements of 1,000 characters', () => {
			expect(
				getLiveblogAdPositions(tenBlocks).desktopAdPositions,
			).toEqual([0, 4, 8]);
		});

		it('On mobile, it should insert an ad after every second block given repeated text elements of 1,000 characters', () => {
			expect(getLiveblogAdPositions(tenBlocks).mobileAdPositions).toEqual(
				[0, 2, 4, 6, 8],
			);
		});

		// 40 blocks is enough that without a limit, there would be more than 8 blocks inserted on both mobile and desktop.
		const fortyBlocks = Array<Block>(40).fill(block);

		it('On desktop, it should not insert more that 8 slots', () => {
			expect(
				getLiveblogAdPositions(fortyBlocks).desktopAdPositions,
			).toHaveLength(8);
		});

		it('On mobile, it should not insert more that 8 slots', () => {
			expect(
				getLiveblogAdPositions(fortyBlocks).mobileAdPositions,
			).toHaveLength(8);
		});
	});
});
