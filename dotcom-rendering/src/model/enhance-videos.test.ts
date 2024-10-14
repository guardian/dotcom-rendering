import { ArticleDesign, type ArticleFormat } from '../lib/format';
import type { FEElement } from '../types/content';
import { enhanceGuVideos } from './enhance-videos';

describe('Enhance Videos', () => {
	describe('for GuVideoElement', () => {
		it('sets the html of the GuVideoBlockElement', () => {
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

			expect(enhanceGuVideos(format, html)(inputElements)).toEqual(
				expectedOutput,
			);
		});
	});
});
