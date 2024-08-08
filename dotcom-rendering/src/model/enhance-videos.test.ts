import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import type { FEElement } from '../types/content';
import { enhanceGuVideos, enhanceMediaAtomVideos } from './enhance-videos';

describe('Enhance Videos', () => {
	describe('for GuVideoBlockElement', () => {
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
	describe('for MediaAtomBlockElement', () => {
		it('filters out assets without a mimetype', () => {
			const videoElement: FEElement = {
				_type: 'model.dotcomrendering.pageElements.MediaAtomBlockElement',
				id: 'mockId',
				elementId: 'mockElementId',
				assets: [
					{
						url: 'mockUrl1',
						mimeType: 'mockMimeType1',
					},
					{
						url: 'mockUrl2',
					},
				],
			};

			const inputElements: FEElement[] = [videoElement];

			const expectedOutput: FEElement[] = [
				{
					...videoElement,
					assets: [
						{
							url: 'mockUrl1',
							mimeType: 'mockMimeType1',
						},
					],
				},
			];

			expect(enhanceMediaAtomVideos(inputElements)).toEqual(
				expectedOutput,
			);
		});
	});
});
