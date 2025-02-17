import type { FEElement } from '../types/content';
import type { TagType } from '../types/tag';
import { enhanceLists } from './enhanceLists';

describe('Enhance lists', () => {
	it('enhances a multi-byline element correctly', () => {
		const elementsEnhancer = (elements: FEElement[]): FEElement[] =>
			elements;

		const tags: TagType[] = [
			{
				title: 'Richard Hillgrove',
				id: 'profile/richard-hillgrove',
				type: 'contributor',
				bylineImageUrl: 'https://i.guim.co.uk/byline-image-url.jpg',
			},
		];

		const multiBylineElement: FEElement = {
			_type: 'model.dotcomrendering.pageElements.ListBlockElement',
			listElementType: 'MultiByline',
			elementId: 'elementId',
			items: [
				{
					title: 'title 1',
					elements: [],
					bio: 'bio 1',
					endNote: 'endNote 1',
					contributorImageOverrideUrl: '',
					contributorIds: ['profile/richard-hillgrove'],
					byline: 'byline 1',
					bylineHtml: 'bylineHtml 1',
				},
				{
					title: 'title 2',
					elements: [],
					bio: 'bio 2',
					endNote: 'endNote 2',
					contributorImageOverrideUrl: '',
					contributorIds: [],
					byline: 'byline 2',
					bylineHtml: 'bylineHtml 2',
				},
				{
					title: 'title 3',
					elements: [],
					bio: 'bio 3',
					endNote: 'endNote 3',
					contributorImageOverrideUrl:
						'https://i.guim.co.uk/image-override-url.jpg',
					contributorIds: [],
					byline: 'byline 3',
					bylineHtml: 'bylineHtml 3',
				},
			],
		};

		const inputElements: FEElement[] = [multiBylineElement];

		const outputElements: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.MultiBylinesBlockElement',
				multiBylines: [
					{
						title: 'title 1',
						bio: 'bio 1',
						endNote: 'endNote 1',
						imageUrl: 'https://i.guim.co.uk/byline-image-url.jpg',
						byline: 'byline 1',
						bylineHtml: 'bylineHtml 1',
						body: [],
					},
					{
						title: 'title 2',
						bio: 'bio 2',
						endNote: 'endNote 2',
						imageUrl: undefined,
						byline: 'byline 2',
						bylineHtml: 'bylineHtml 2',
						body: [],
					},
					{
						title: 'title 3',
						bio: 'bio 3',
						endNote: 'endNote 3',
						imageUrl: 'https://i.guim.co.uk/image-override-url.jpg',
						byline: 'byline 3',
						bylineHtml: 'bylineHtml 3',
						body: [],
					},
				],
			},
		];

		expect(enhanceLists(elementsEnhancer, tags)(inputElements)).toEqual(
			outputElements,
		);
	});
});
