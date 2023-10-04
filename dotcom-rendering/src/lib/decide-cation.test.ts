import type {
	EmbedBlockElement,
	ImageBlockElement,
	TextBlockElement,
} from '../types/content';
import { decideMainMediaCaption } from './decide-caption';

describe('decideMainMediaCaption', () => {
	describe('when mainMedia is not supported', () => {
		it('undefined returns an empty string', () => {
			expect(decideMainMediaCaption(undefined)).toEqual('');
		});
		it('a text block returns an empty string', () => {
			expect(
				decideMainMediaCaption({
					elementId: 'test-id',
					html: '<p>test</p>',
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				} as TextBlockElement),
			).toEqual('');
		});
	});

	describe('ImageBlockElement', () => {
		const mockImageBlockElement = {
			elementId: 'mock-element-id',
			data: {},
			role: 'inline',
			_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
		} as ImageBlockElement;

		it('returns an empty string if there is no caption, displayCredit, or credit', () => {
			expect(decideMainMediaCaption(mockImageBlockElement)).toEqual('');
		});

		it('includes the caption, if it exists', () => {
			expect(
				decideMainMediaCaption({
					...mockImageBlockElement,
					data: {
						caption: 'image block caption',
					},
				}),
			).toEqual('image block caption');
		});

		it('includes the credit, if it should be displayed', () => {
			expect(
				decideMainMediaCaption({
					...mockImageBlockElement,
					displayCredit: true,
					data: {
						credit: 'image block display credit',
					},
				}),
			).toEqual('image block display credit');
		});

		it('does not include the credit, if it should not be displayed', () => {
			expect(
				decideMainMediaCaption({
					...mockImageBlockElement,
					displayCredit: false,
					data: {
						credit: 'image block display credit',
					},
				}),
			).toEqual('');
		});

		it('includes both the credit and caption, if they exist', () => {
			expect(
				decideMainMediaCaption({
					...mockImageBlockElement,
					displayCredit: true,
					data: {
						caption: 'mock caption',
						credit: 'mock display credit',
					},
				}),
			).toEqual('mock caption mock display credit');
		});
	});

	describe('EmbedBlockElement', () => {
		it('returns an empty string if there is no caption', () => {
			expect(
				decideMainMediaCaption({
					elementId: 'test-id',
					html: '<p>test</p>',
					isMandatory: false,
					_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
				} as EmbedBlockElement),
			).toEqual('');
		});

		it('returns the correct caption, if exists', () => {
			expect(
				decideMainMediaCaption({
					elementId: 'test-id',
					html: '<p>test</p>',
					isMandatory: true,
					caption: 'test caption',
					_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
				} as EmbedBlockElement),
			).toEqual('test caption');
		});
	});
});
