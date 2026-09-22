import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import type { Block } from '../types/blocks';
import { enhanceTableOfContents } from './enhanceTableOfContents';

describe('Enhance Table of Contents', () => {
	it('does not generate a toc where an existing table of contents exists', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
						elementId: 'mocOne',
						subheadingLinks: [],
					},
				],
			},
		];

		expect(enhanceTableOfContents(input)).toEqual(undefined);
	});

	it('excludes h3s and h4s from the toc', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2One',
						html: "<h2 id='first-h2-text'>First h2 text</h2>",
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h3One',
						html: '<h3>An h3 that should not be linked to</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h4One',
						html: '<h4>An h4 that should not be linked to</h4>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(input)).toEqual([
			{
				id: 'first-h2-text',
				title: 'First h2 text',
			},
		]);
	});

	it('does not generate a toc from h3s and h4s alone', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h3One',
						html: '<h3>An h3</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h4One',
						html: '<h4>An h4</h4>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(input)).toEqual(undefined);
	});

	it('correctly generate a toc from h2s', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2One',
						html: "<h2 id='first-h2-text'><strong>First h2 text</strong></h2>",
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Two',
						html: "<h2 id='second-h2-text'><strong>Second h2 text</strong></h2>",
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Three',
						html: "<h2 id='third-h2-text'><strong>Third h2 text</strong></h2>",
					},
				],
			},
		];

		expect(enhanceTableOfContents(input)).toEqual([
			{
				id: 'first-h2-text',
				title: 'First h2 text',
			},
			{
				id: 'second-h2-text',
				title: 'Second h2 text',
			},
			{
				id: 'third-h2-text',
				title: 'Third h2 text',
			},
		]);
	});

	it('will not return a toc if there are no h2s', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'text',
						html: 'Text',
					},
				],
			},
		];

		expect(enhanceTableOfContents(input)).toEqual(undefined);
	});
});
