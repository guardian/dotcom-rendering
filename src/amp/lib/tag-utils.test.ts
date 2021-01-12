import { filterForTagsOfType } from './tag-utils';

describe('filterForTagsOfType', () => {
	it('should extract tags of specified type from ArticleModel data', () => {
		const tagDataFromArticleModel = [
			{
				id: 'for-the-love-of-wifi/for-the-love-of-wifi',
				type: 'PaidContent',
				title: 'For the love of wifi',
				twitterHandle: '',
				bylineImageUrl: '',
			},
			{
				id: 'type/article',
				type: 'Type',
				title: 'Article',
				twitterHandle: '',
				bylineImageUrl: '',
			},
			{
				id: 'tone/advertisement-features',
				type: 'Tone',
				title: 'Advertisement features',
				twitterHandle: '',
				bylineImageUrl: '',
			},
			{
				id: 'profile/holly-brockwell',
				type: 'Contributor',
				title: 'Holly Brockwell',
				twitterHandle: 'holly',
				bylineImageUrl: '',
			},
			{
				id: 'tracking/commissioningdesk/uk-labs',
				type: 'Tracking',
				title: 'UK Labs',
				twitterHandle: '',
				bylineImageUrl: '',
			},
		];

		const filteredTags = filterForTagsOfType(
			tagDataFromArticleModel,
			'Contributor',
		);

		expect(filteredTags).toEqual([
			{
				id: 'profile/holly-brockwell',
				type: 'Contributor',
				title: 'Holly Brockwell',
				twitterHandle: 'holly',
				bylineImageUrl: '',
			},
		]);
	});
});
