import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard';
import type { FEElement } from '../types/content';
import { enhanceDividers } from './enhance-dividers';

const example = ExampleArticle;

describe('Dividers and Drop Caps', () => {
	it('creates an identical but new object when no changes are needed', () => {
		const elements = example.blocks[0]?.elements ?? [];
		expect(enhanceDividers(elements)).not.toBe(elements); // We created a new object
		expect(enhanceDividers(elements)).toEqual(elements); // The new object is what we expect
	});

	it('sets the divider flag correctly', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<p>* * *</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				dropCap: 'on',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		expect(enhanceDividers(input)).toEqual(expectedOutput);
	});

	it('handles dot dinkuses as text elements', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>•••</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				dropCap: 'on',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
		];

		expect(enhanceDividers(input)).toEqual(expectedOutput);
	});

	it('handles when there are no spaces in the dinkus', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<p>***</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				dropCap: 'on',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
		];

		expect(enhanceDividers(input)).toEqual(expectedOutput);
	});

	it('handles divider flags wrapped in h2 tags', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<h2><strong>* * *</strong></h2>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				dropCap: 'on',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		expect(enhanceDividers(input)).toEqual(expectedOutput);
	});

	it('handles multiple divider flags', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<p>* * *</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<h2><strong>***</strong></h2>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should also become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				dropCap: 'on',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				dropCap: 'on',
				elementId: 'mockId',
				html: '<p>I should also become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		expect(enhanceDividers(input)).toEqual(expectedOutput);
	});

	it('handles divider flags being put before elements that are not text', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<h2><strong>* * *</strong></h2>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.InstagramBlockElement',
				elementId: 'mockId',
				isThirdPartyTracking: true,
				html: '',
				url: '',
				hasCaption: false,
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I am the first paragraph</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.InstagramBlockElement',
				elementId: 'mockId',
				isThirdPartyTracking: true,
				html: '',
				url: '',
				hasCaption: false,
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		expect(enhanceDividers(input)).toEqual(expectedOutput);
	});

	it('handles multiple divider flags in sequence', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<p>* * *</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<p>* * *</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				elementId: 'mockId',
				html: '<p>* * *</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		const expectedOutput: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				dropCap: 'on',
				elementId: 'mockId',
				html: '<p>I should become a drop cap.</p>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>I should NOT become a drop cap.</p>',
			},
		];

		expect(enhanceDividers(input)).toEqual(expectedOutput);
	});
});
