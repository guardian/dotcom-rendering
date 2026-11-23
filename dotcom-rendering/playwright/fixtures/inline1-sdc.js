export const inline1SupportMessageProps = {
	variant: {
		name: 'CONTROL',
		message: {
			type: 'Inline1SupportMessage',
			heading:
				'Test <strong>Heading </strong>with <em>different </em><s>formatting</s>',
			body: 'Please subscribe for unlimited access to our award-winning app and support the Guardian’s independent journalism.',
			primaryCta: {
				text: 'Try Feast app',
				baseUrl:
					'https://www.theguardian.com/info/2025/jan/02/feast-the-app-to-avoid-boring-cooking',
			},
			image: {
				mobileUrl:
					'https://i.guim.co.uk/img/media/d5fd46298bb30b3f4779a625df0a1c1054431474/68_428_3058_3819/master/3058.jpg?width=1140&dpr=2&s=none&crop=none',
				tabletUrl:
					'https://i.guim.co.uk/img/media/d5fd46298bb30b3f4779a625df0a1c1054431474/68_428_3058_3819/master/3058.jpg?width=1140&dpr=2&s=none&crop=none',
				desktopUrl:
					'https://i.guim.co.uk/img/media/d5fd46298bb30b3f4779a625df0a1c1054431474/68_428_3058_3819/master/3058.jpg?width=1140&dpr=2&s=none&crop=none',
				altText: 'Feast app download',
			},
		},
		bidScore: 0,
	},
	tracking: {
		abTestName: 'TEST',
		abTestVariant: 'CONTROL',
		campaignCode: 'TEST_CONTROL',
		componentType: 'ACQUISITIONS_INLINE',
	},
	countryCode: 'GB',
};

export const inline1PuzzlesMessageProps = {
	variant: {
		name: 'CONTROL',
		message: { type: 'Inline1PuzzlesMessage' },
		bidScore: 0,
	},
	tracking: {
		abTestName: 'TESTPUZZLES',
		abTestVariant: 'CONTROL',
		campaignCode: 'TESTPUZZLES_CONTROL',
		componentType: 'ACQUISITIONS_INLINE',
	},
	countryCode: 'GB',
};

export const inline1NewsletterMessageProps = {
	variant: {
		name: 'CONTROL',
		message: {
			type: 'Inline1NewsletterMessage',
			newsletterId: 'saturday-edition',
			frequency: 'Weekly',
			heading:
				'Sign up to the Saturday Edition, our free weekend news roundup',
			body: 'An exclusive look at the week’s best Guardian journalism from the editor-in-chief, Katharine Viner.',
			newsletterName: 'Saturday Edition',
			newsletterListId: 6031,
			imageUrl:
				'https://media.guim.co.uk/efd4be7a85fd7fb5118c712b7087c758bbf45e6b/0_0_1000_1000/500.jpg',
		},
		bidScore: 0,
	},
	tracking: {
		abTestName: 'TESTNEWSLETTER',
		abTestVariant: 'CONTROL',
		campaignCode: 'TESTNEWSLETTER_CONTROL',
		componentType: 'ACQUISITIONS_INLINE',
	},
	countryCode: 'GB',
};
