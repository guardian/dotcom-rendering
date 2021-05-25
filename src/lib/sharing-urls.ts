const appendParamsToBaseUrl: (
	baseUrl: string,
	params: {
		[key: string]: string;
	},
) => string = (baseUrl, params) =>
	Object.keys(params).reduce((shareUrl: string, param: string, i: number) => {
		const separator = i > 0 ? '&' : '?';

		return `${shareUrl}${separator}${encodeURIComponent(
			param,
		)}=${encodeURIComponent(params[param])}`;
	}, baseUrl);

export const getSharingUrls = (
	pageId: string,
	title: string,
): {
	[K in SharePlatform]?: {
		url: string;
		userMessage: string;
	};
} => {
	const articleUrl = `https://www.theguardian.com/${pageId}`;
	const platforms: {
		[K in SharePlatform]: {
			userMessage: string;
			params: {
				[key: string]: string;
			};
			baseUrl: string;
		};
	} = {
		facebook: {
			userMessage: 'Share on Facebook',
			params: {
				app_id: '180444840287',
				href: articleUrl,
				CMP: 'share_btn_fb',
			},
			baseUrl: 'https://www.facebook.com/dialog/share',
		},
		twitter: {
			userMessage: 'Share on Twitter',
			params: {
				text: title.replace(/Leave.EU/gi, 'Leave. EU'),
				url: articleUrl,
				CMP: 'share_btn_tw',
			},
			baseUrl: 'https://twitter.com/intent/tweet',
		},
		email: {
			userMessage: 'Share via Email',
			params: {
				subject: title,
				body: articleUrl,
				CMP: 'share_btn_link',
			},
			baseUrl: 'mailto:',
		},
		whatsApp: {
			userMessage: 'Share on WhatsApp',
			params: {
				text: `"${title}" ${articleUrl}`,
				CMP: 'share_btn_wa',
			},
			baseUrl: 'whatsapp://send',
		},
		linkedIn: {
			userMessage: 'Share on LinkedIn',
			params: {
				title,
				mini: 'true',
				url: articleUrl,
			},
			baseUrl: 'http://www.linkedin.com/shareArticle',
		},
		messenger: {
			userMessage: 'Share on Messenger',
			params: {
				link: articleUrl,
				app_id: '180444840287',
				CMP: 'share_btn_me',
			},
			baseUrl: 'fb-messenger://share',
		},
	};

	return Object.keys(platforms).reduce((shareUrls, platform) => {
		const { userMessage, baseUrl, params } = platforms[
			platform as SharePlatform
		];

		return {
			[platform]: {
				userMessage,
				url: appendParamsToBaseUrl(baseUrl, params),
			},
			...shareUrls,
		};
	}, {});
};
