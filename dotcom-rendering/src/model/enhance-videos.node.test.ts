import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import type { FEElement } from '../types/content';
import { enhanceGuVideos } from './enhance-videos';

void nodeDescribe('Enhance Videos', () => {
	void nodeDescribe('for GuVideoElement', () => {
		void nodeIt('sets the html of the GuVideoBlockElement', () => {
			const html = '<video></video>';

			const videoElement: FEElement = {
				_type: 'model.dotcomrendering.pageElements.GuVideoBlockElement',
				elementId: 'mockId',
				html: '',
				assets: [],
				caption: '',
				source: '',
			};

			const inputElements: FEElement[] = [videoElement];

			const expectedOutput: FEElement[] = [
				{
					...videoElement,
					html,
				},
			];

			const format = {
				design: ArticleDesign.Video,
			} as unknown as ArticleFormat;

			assert.deepEqual(
				enhanceGuVideos(format, html)(inputElements),
				expectedOutput,
			);
		});
	});
});
