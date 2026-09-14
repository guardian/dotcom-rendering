import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { liveBlock as mockBlock } from '../../fixtures/manual/liveBlock';
import type { Block } from '../types/blocks';
import { getLiveblogAdPositions } from './getLiveblogAdPositions';

void describe('get liveblog ad positions', () => {
	const twoBlocks = Array<Block>(2).fill(mockBlock);

	void it('should insert zero ads if zero blocks', () => {
		assert.deepEqual(getLiveblogAdPositions([]).desktopAdPositions, []);
		assert.deepEqual(getLiveblogAdPositions([]).mobileAdPositions, []);
	});
	void it('should insert zero ads if one block', () => {
		assert.deepEqual(
			getLiveblogAdPositions([mockBlock]).desktopAdPositions,
			[],
		);
		assert.deepEqual(
			getLiveblogAdPositions([mockBlock]).mobileAdPositions,
			[],
		);
	});
	void it('should insert an ad after the first block if two blocks', () => {
		assert.deepEqual(
			getLiveblogAdPositions(twoBlocks).desktopAdPositions,
			[0],
		);
		assert.deepEqual(
			getLiveblogAdPositions(twoBlocks).mobileAdPositions,
			[0],
		);
	});

	void describe('many blocks', () => {
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

		void it('On desktop, it should insert an ad after every fourth block given repeated text elements of 1,000 characters', () => {
			assert.deepEqual(
				getLiveblogAdPositions(tenBlocks).desktopAdPositions,
				[0, 4, 8],
			);
		});

		void it('On mobile, it should insert an ad after every second block given repeated text elements of 1,000 characters', () => {
			assert.deepEqual(
				getLiveblogAdPositions(tenBlocks).mobileAdPositions,
				[0, 2, 4, 6, 8],
			);
		});

		// 40 blocks is enough that without a limit, there would be more than 8 blocks inserted on both mobile and desktop.
		const fortyBlocks = Array<Block>(40).fill(block);

		void it('On desktop, it should not insert more that 8 slots', () => {
			assert.equal(
				getLiveblogAdPositions(fortyBlocks).desktopAdPositions.length,
				8,
			);
		});

		void it('On mobile, it should not insert more that 8 slots', () => {
			assert.equal(
				getLiveblogAdPositions(fortyBlocks).mobileAdPositions.length,
				8,
			);
		});
	});
});
