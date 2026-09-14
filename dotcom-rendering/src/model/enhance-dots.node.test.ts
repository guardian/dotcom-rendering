import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { FEElement } from '../types/content';
import { enhanceDots } from './enhance-dots';

void describe('Middot Tests', () => {
	void it('Output should not be the same as input as dot has been replaced', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>• I should have a dot.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p><span data-dcr-style="bullet"></span> I should have have a dot.</p>',
			},
		];

		assert.notEqual(enhanceDots(input), expectedOutput);
	});

	void it('It does not incorrectly replace * with dot spans', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>*</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am text.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>*</p>',
			},

			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am text.</p>',
			},
		];

		assert.deepEqual(enhanceDots(input), expectedOutput);
	});
});
