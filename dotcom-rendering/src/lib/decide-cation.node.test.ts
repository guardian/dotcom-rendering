import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type {
	EmbedBlockElement,
	ImageBlockElement,
	TextBlockElement,
} from '../types/content';
import { decideMainMediaCaption } from './decide-caption';

void describe('decideMainMediaCaption', () => {
	void describe('when mainMedia is not supported', () => {
		void it('undefined returns an empty string', () => {
			assert.deepEqual(decideMainMediaCaption(undefined), '');
		});
		void it('a text block returns an empty string', () => {
			assert.deepEqual(
				decideMainMediaCaption({
					elementId: 'test-id',
					html: '<p>test</p>',
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				} as TextBlockElement),
				'',
			);
		});
	});

	void describe('ImageBlockElement', () => {
		const mockImageBlockElement = {
			elementId: 'mock-element-id',
			data: {},
			role: 'inline',
			_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
		} as ImageBlockElement;

		void it('returns an empty string if there is no caption, displayCredit, or credit', () => {
			assert.deepEqual(decideMainMediaCaption(mockImageBlockElement), '');
		});

		void it('includes the caption, if it exists', () => {
			assert.deepEqual(
				decideMainMediaCaption({
					...mockImageBlockElement,
					data: {
						caption: 'image block caption',
					},
				}),
				'image block caption',
			);
		});

		void it('includes the credit, if it should be displayed', () => {
			assert.deepEqual(
				decideMainMediaCaption({
					...mockImageBlockElement,
					displayCredit: true,
					data: {
						credit: 'image block display credit',
					},
				}),
				'image block display credit',
			);
		});

		void it('does not include the credit, if it should not be displayed', () => {
			assert.deepEqual(
				decideMainMediaCaption({
					...mockImageBlockElement,
					displayCredit: false,
					data: {
						credit: 'image block display credit',
					},
				}),
				'',
			);
		});

		void it('includes both the credit and caption, if they exist', () => {
			assert.deepEqual(
				decideMainMediaCaption({
					...mockImageBlockElement,
					displayCredit: true,
					data: {
						caption: 'mock caption',
						credit: 'mock display credit',
					},
				}),
				'mock caption mock display credit',
			);
		});
	});

	void describe('EmbedBlockElement', () => {
		void it('returns an empty string if there is no caption', () => {
			assert.deepEqual(
				decideMainMediaCaption({
					elementId: 'test-id',
					html: '<p>test</p>',
					isMandatory: false,
					_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
				} as EmbedBlockElement),
				'',
			);
		});

		void it('returns the correct caption, if exists', () => {
			assert.deepEqual(
				decideMainMediaCaption({
					elementId: 'test-id',
					html: '<p>test</p>',
					isMandatory: true,
					caption: 'test caption',
					_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
				} as EmbedBlockElement),
				'test caption',
			);
		});
	});
});
