import { Standard as ExampleArticle } from '../../fixtures/generated/fe-articles/Standard';
import { ArticleDesign, type ArticleFormat, decideFormat } from '../lib/format';
import type { FEElement } from '../types/content';
import type { FEArticleType } from '../types/frontend';
import { enhanceBlockquotes } from './enhance-blockquotes';

const example: FEArticleType = ExampleArticle;
const exampleFormat: ArticleFormat = decideFormat(example.format);

const formatIsPhotoEssay: ArticleFormat = {
	...exampleFormat,
	design: ArticleDesign.PhotoEssay,
};

describe('Enhancing blockquotes', () => {
	it('creates an identical but new object when no changes are needed', () => {
		const elements = example.blocks[0]?.elements ?? [];
		expect(enhanceBlockquotes(exampleFormat)(elements)).not.toBe(elements); // We created a new object
		expect(enhanceBlockquotes(exampleFormat)(elements)).toEqual(elements); // The new object is what we expect
	});

	it('adds the quoted prop when the quoted class was found', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote class="quoted">This is a quote</blockquote>',
			},
		];

		const expectedOutput = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote class="quoted">This is a quote</blockquote>',
				quoted: true,
			},
		];

		expect(enhanceBlockquotes(exampleFormat)(input)).toEqual(
			expectedOutput,
		);
	});

	it('transforms simple blockquotes to highlight elements for photo essays', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote>This is not a quote</blockquote>',
			},
		];

		const expectedOutput = [
			{
				_type: 'model.dotcomrendering.pageElements.HighlightBlockElement',
				elementId: 'mockId',
				html: '<blockquote>This is not a quote</blockquote>',
			},
		];

		expect(enhanceBlockquotes(formatIsPhotoEssay)(input)).toEqual(
			expectedOutput,
		);
	});

	it("doesn't transform quoted blockquotes to highlight elements for photo essays", () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote class="quoted">This is a quoted blockquote</blockquote>',
			},
		];

		const expectedOutput = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote class="quoted">This is a quoted blockquote</blockquote>',
				quoted: true,
			},
		];

		expect(enhanceBlockquotes(formatIsPhotoEssay)(input)).toEqual(
			expectedOutput,
		);
	});

	it('passes through simple blockquotes', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote>This is a quote</blockquote>',
			},
		];

		const expectedOutput = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote>This is a quote</blockquote>',
			},
		];

		expect(enhanceBlockquotes(exampleFormat)(input)).toEqual(
			expectedOutput,
		);
	});

	it('ignores blockquotes with other classnames', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote class="somethingelse">This is a simple blockquote</blockquote>',
			},
		];

		const expectedOutput = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote class="somethingelse">This is a simple blockquote</blockquote>',
			},
		];

		expect(enhanceBlockquotes(exampleFormat)(input)).toEqual(
			expectedOutput,
		);
	});

	it('handles both quoted and simple blockquotes in the same array', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote class="quoted">This is a quoted quote</blockquote>',
			},
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote>This is a simple quote</blockquote>',
			},
		];

		const expectedOutput = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote class="quoted">This is a quoted quote</blockquote>',
				quoted: true,
			},
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote>This is a simple quote</blockquote>',
			},
		];

		expect(enhanceBlockquotes(exampleFormat)(input)).toEqual(
			expectedOutput,
		);
	});
});
