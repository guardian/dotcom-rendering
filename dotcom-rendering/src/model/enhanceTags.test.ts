import type { FETagType } from '../types/tag';
import { enhanceTags } from './enhanceTags';

describe('enhanceTags', () => {
	it('maps a list of FETagType to TagType', () => {
		const feTags: FETagType[] = [
			{
				properties: {
					id: 'profile/morwennaferrier',
					tagType: 'Contributor',
					webTitle: 'Morwenna Ferrier',
					twitterHandle: 'exampleTwitterHandle',
					bylineImageUrl:
						'https://static.guim.co.uk/sys-images/Guardian/Pix/contributor/2014/10/15/1413394164362/Morwenna-Ferrier.jpg',
					contributorLargeImagePath:
						'https://uploads.guim.co.uk/2017/10/09/Morwenna-Ferrier,-L.png',
				},
			},
		];

		const tags = enhanceTags(feTags);

		expect(tags).toEqual([
			{
				id: 'profile/morwennaferrier',
				type: 'Contributor',
				title: 'Morwenna Ferrier',
				twitterHandle: 'exampleTwitterHandle',
				bylineImageUrl:
					'https://static.guim.co.uk/sys-images/Guardian/Pix/contributor/2014/10/15/1413394164362/Morwenna-Ferrier.jpg',
				bylineLargeImageUrl:
					'https://uploads.guim.co.uk/2017/10/09/Morwenna-Ferrier,-L.png',
			},
		]);
	});
});
