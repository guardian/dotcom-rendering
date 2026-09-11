import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import type {
	EmbedBlockElement,
	ImageBlockElement,
	TextBlockElement,
} from '../types/content';
import { decideMainMediaCaption } from './decide-caption';

void nodeDescribe('decideMainMediaCaption', () => {
	void nodeDescribe('when mainMedia is not supported', () => {
		void nodeIt('undefined returns an empty string', () => {
			assert.deepEqual(decideMainMediaCaption(undefined), '');
		});
		void nodeIt('a text block returns an empty string', () => {
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

	void nodeDescribe('ImageBlockElement', () => {
		const mockImageBlockElement = {
			elementId: 'mock-element-id',
			data: {},
			role: 'inline',
			_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
		} as ImageBlockElement;

		void nodeIt(
			'returns an empty string if there is no caption, displayCredit, or credit',
			() => {
				assert.deepEqual(
					decideMainMediaCaption(mockImageBlockElement),
					'',
				);
			},
		);

		void nodeIt('includes the caption, if it exists', () => {
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

		void nodeIt('includes the credit, if it should be displayed', () => {
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

		void nodeIt(
			'does not include the credit, if it should not be displayed',
			() => {
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
			},
		);

		void nodeIt(
			'includes both the credit and caption, if they exist',
			() => {
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
			},
		);
	});

	void nodeDescribe('EmbedBlockElement', () => {
		void nodeIt('returns an empty string if there is no caption', () => {
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

		void nodeIt('returns the correct caption, if exists', () => {
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
