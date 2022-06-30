export type NewsletterResponse = {
	identityName: string;
	name: string;
	brazeNewsletterName: string;
	brazeSubscribeAttributeName: string;
	brazeSubscribeEventNamePrefix: string;
	theme: string;
	description: string;
	frequency: string;
	listIdV1: number;
	listId: number;
	exampleUrl?: string;
	emailEmbed: {
		name: string;
		title: string;
		description: string;
		successHeadline: string;
		successDescription: string;
		hexCode: string;
		imageUrl?: string;
	};
	signupPage?: string;
	restricted: boolean;
	paused: boolean;
	emailConfirmation: boolean;
	group: string;
};

export const FAKE_NEWSLETTER: NewsletterResponse = {
	identityName: 'fake-news-letter',
	name: 'Fake News Digest',
	brazeNewsletterName: 'fake_news_letter',
	brazeSubscribeAttributeName: 'fake_news_letter_NAME',
	brazeSubscribeEventNamePrefix: 'fake_news_letter_PREFIX',
	theme: 'news',
	description: 'A fake newsletter used for testing',
	frequency: 'hourly',
	listIdV1: -1,
	listId: 101,
	emailEmbed: {
		name: 'Fake News Digest',
		title: 'Fake News Digest',
		description: 'A fake newsletter used for testing',
		successHeadline: 'Subscription Confirmed',
		successDescription: 'If this was a real newsletter, it would come every hour.',
		hexCode: '#000000',
	},
	restricted: false,
	paused: false,
	emailConfirmation: false,
	group: 'News in depth',
};
