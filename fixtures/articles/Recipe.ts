import { switches } from '../switches';

export const Recipe: CAPIType = {
	shouldHideReaderRevenue: false,
	slotMachineFlags: '',
	isAdFreeUser: true,
	main:
		'<figure class="element element-image" data-media-id="60543859890d65ba1633458a509dc4d8db0f1b04"> <img src="https://media.guim.co.uk/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/1000.jpg" alt="Flat pasta cut into pieces" width="1000" height="600" class="gu-image" /> <figcaption> <span class="element-image__caption">These roughly cut pieces of fresh pasta make a great change from the homogeneity of the store-bought dried variety. There’s no right way to cut them – do it however you like.</span> <span class="element-image__credit">Photograph: Jill Mead/The Guardian</span> </figcaption> </figure>',
	subMetaSectionLinks: [
		{ url: '/food/food', title: 'Food' },
		{ url: '/lifeandstyle/series/the-good-place', title: 'The good place' },
	],
	commercialProperties: {
		UK: {
			adTargeting: [
				{ name: 'edition', value: 'uk' },
				{
					name: 'se',
					value: ['the-good-place', 'australian-food-in-season'],
				},
				{
					name: 'k',
					value: ['australian-lifestyle', 'lifeandstyle', 'food'],
				},
				{ name: 'su', value: ['0'] },
				{ name: 'ct', value: 'article' },
				{ name: 'p', value: 'ng' },
				{ name: 'tn', value: ['recipes'] },
				{
					name: 'url',
					value:
						'/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
				},
				{ name: 'sh', value: 'https://theguardian.com/p/dhpzc' },
			],
		},
		US: {
			adTargeting: [
				{
					name: 'se',
					value: ['the-good-place', 'australian-food-in-season'],
				},
				{
					name: 'k',
					value: ['australian-lifestyle', 'lifeandstyle', 'food'],
				},
				{ name: 'su', value: ['0'] },
				{ name: 'ct', value: 'article' },
				{ name: 'p', value: 'ng' },
				{ name: 'edition', value: 'us' },
				{ name: 'tn', value: ['recipes'] },
				{
					name: 'url',
					value:
						'/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
				},
				{ name: 'sh', value: 'https://theguardian.com/p/dhpzc' },
			],
		},
		AU: {
			adTargeting: [
				{
					name: 'se',
					value: ['the-good-place', 'australian-food-in-season'],
				},
				{
					name: 'k',
					value: ['australian-lifestyle', 'lifeandstyle', 'food'],
				},
				{ name: 'su', value: ['0'] },
				{ name: 'ct', value: 'article' },
				{ name: 'p', value: 'ng' },
				{ name: 'tn', value: ['recipes'] },
				{
					name: 'url',
					value:
						'/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
				},
				{ name: 'edition', value: 'au' },
				{ name: 'sh', value: 'https://theguardian.com/p/dhpzc' },
			],
		},
		INT: {
			adTargeting: [
				{
					name: 'se',
					value: ['the-good-place', 'australian-food-in-season'],
				},
				{ name: 'edition', value: 'int' },
				{
					name: 'k',
					value: ['australian-lifestyle', 'lifeandstyle', 'food'],
				},
				{ name: 'su', value: ['0'] },
				{ name: 'ct', value: 'article' },
				{ name: 'p', value: 'ng' },
				{ name: 'tn', value: ['recipes'] },
				{
					name: 'url',
					value:
						'/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
				},
				{ name: 'sh', value: 'https://theguardian.com/p/dhpzc' },
			],
		},
	},
	pageFooter: {
		footerLinks: [
			[
				{
					text: 'About us',
					url: '/about',
					dataLinkName: 'uk : footer : about us',
					extraClasses: '',
				},
				{
					text: 'Contact us',
					url: '/help/contact-us',
					dataLinkName: 'uk : footer : contact us',
					extraClasses: '',
				},
				{
					text: 'Complaints & corrections',
					url: '/info/complaints-and-corrections',
					dataLinkName: 'complaints',
					extraClasses: '',
				},
				{
					text: 'SecureDrop',
					url: 'https://www.theguardian.com/securedrop',
					dataLinkName: 'securedrop',
					extraClasses: '',
				},
				{
					text: 'Work for us',
					url: 'https://workforus.theguardian.com',
					dataLinkName: 'uk : footer : work for us',
					extraClasses: '',
				},
				{
					text: 'Privacy policy',
					url: '/info/privacy',
					dataLinkName: 'privacy',
					extraClasses: '',
				},
				{
					text: 'Cookie policy',
					url: '/info/cookies',
					dataLinkName: 'cookie',
					extraClasses: '',
				},
				{
					text: 'Terms & conditions',
					url: '/help/terms-of-service',
					dataLinkName: 'terms',
					extraClasses: '',
				},
				{
					text: 'Help',
					url: '/help',
					dataLinkName: 'uk : footer : tech feedback',
					extraClasses: 'js-tech-feedback-report',
				},
			],
			[
				{
					text: 'All topics',
					url: '/index/subjects/a',
					dataLinkName: 'uk : footer : all topics',
					extraClasses: '',
				},
				{
					text: 'All writers',
					url: '/index/contributors',
					dataLinkName: 'uk : footer : all contributors',
					extraClasses: '',
				},
				{
					text: 'Modern Slavery Act',
					url:
						'/info/2016/jul/27/modern-slavery-and-our-supply-chains?INTCMP=NGW_FOOTER_UK_GU_MODERN_SLAVERY_ACT',
					dataLinkName: 'uk : footer : modern slavery act statement',
					extraClasses: '',
				},
				{
					text: 'Digital newspaper archive',
					url: 'https://theguardian.newspapers.com',
					dataLinkName: 'digital newspaper archive',
					extraClasses: '',
				},
				{
					text: 'Facebook',
					url: 'https://www.facebook.com/theguardian',
					dataLinkName: 'uk : footer : facebook',
					extraClasses: '',
				},
				{
					text: 'YouTube',
					url: 'https://www.youtube.com/user/TheGuardian',
					dataLinkName: 'uk : footer : youtube',
					extraClasses: '',
				},
				{
					text: 'Instagram',
					url: 'https://www.instagram.com/guardian',
					dataLinkName: 'uk : footer : instagram',
					extraClasses: '',
				},
				{
					text: 'LinkedIn',
					url: 'https://www.linkedin.com/company/theguardian',
					dataLinkName: 'uk : footer : linkedin',
					extraClasses: '',
				},
				{
					text: 'Twitter',
					url: 'https://twitter.com/guardian',
					dataLinkName: 'uk: footer : twitter',
					extraClasses: '',
				},
			],
			[
				{
					text: 'Advertise with us',
					url: 'https://advertising.theguardian.com',
					dataLinkName: 'uk : footer : advertise with us',
					extraClasses: '',
				},
				{
					text: 'Guardian Labs',
					url: '/guardian-labs',
					dataLinkName: 'uk : footer : guardian labs',
					extraClasses: '',
				},
				{
					text: 'Search jobs',
					url:
						'https://jobs.theguardian.com?INTCMP=NGW_FOOTER_UK_GU_JOBS',
					dataLinkName: 'uk : footer : jobs',
					extraClasses: '',
				},
				{
					text: 'Patrons',
					url:
						'https://patrons.theguardian.com?INTCMP=footer_patrons',
					dataLinkName: 'uk : footer : patrons',
					extraClasses: '',
				},
				{
					text: 'Discount Codes',
					url: 'https://discountcode.theguardian.com/',
					dataLinkName: 'uk: footer : discount code',
					extraClasses: 'js-discount-code-link',
				},
			],
		],
	},
	twitterData: {
		'twitter:app:id:iphone': '409128287',
		'twitter:app:name:googleplay': 'The Guardian',
		'twitter:app:name:ipad': 'The Guardian',
		'twitter:image':
			'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=afe97a2537f47f480aa491bb10d0ad47',
		'twitter:site': '@guardian',
		'twitter:app:url:ipad':
			'gnmguardian://lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out?contenttype=Article&source=twitter',
		'twitter:card': 'summary_large_image',
		'twitter:app:name:iphone': 'The Guardian',
		'twitter:app:id:ipad': '409128287',
		'twitter:app:id:googleplay': 'com.guardian',
		'twitter:app:url:googleplay':
			'guardian://www.theguardian.com/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
		'twitter:app:url:iphone':
			'gnmguardian://lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out?contenttype=Article&source=twitter',
	},
	beaconURL: '//phar.gu-web.net',
	sectionName: 'lifeandstyle',
	editionLongForm: 'UK edition',
	hasRelated: true,
	pageType: {
		hasShowcaseMainElement: false,
		isFront: false,
		isLiveblog: false,
		isMinuteArticle: false,
		isPaidContent: false,
		isPreview: false,
		isSensitive: false,
	},
	hasStoryPackage: false,
	contributionsServiceUrl: 'https://contributions.guardianapis.com',
	publication: 'theguardian.com',
	trailText:
		'These recipes require your full concentration and provide a chance to use your hands and unwind',
	subMetaKeywordLinks: [
		{
			url: '/lifeandstyle/australian-lifestyle',
			title: 'Australian lifestyle',
		},
		{ url: '/tone/recipes', title: 'recipes' },
	],
	contentType: 'Article',
	headline:
		'Folding, kneading, rolling: seven meditative dishes to cook when you need to zone out',
	nav: {
		currentUrl: '/lifeandstyle',
		pillars: [
			{
				title: 'News',
				url: '/',
				longTitle: 'Headlines',
				iconName: 'home',
				children: [
					{
						title: 'UK',
						url: '/uk-news',
						longTitle: 'UK news',
						iconName: '',
						children: [
							{
								title: 'UK politics',
								url: '/politics',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Education',
								url: '/education',
								longTitle: '',
								iconName: '',
								children: [
									{
										title: 'Schools',
										url: '/education/schools',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
									{
										title: 'Teachers',
										url: '/teacher-network',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
									{
										title: 'Universities',
										url: '/education/universities',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
									{
										title: 'Students',
										url: '/education/students',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
								],
								classList: [],
							},
							{
								title: 'Media',
								url: '/media',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Society',
								url: '/society',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Law',
								url: '/law',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Scotland',
								url: '/uk/scotland',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Wales',
								url: '/uk/wales',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Northern Ireland',
								url: '/uk/northernireland',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'World',
						url: '/world',
						longTitle: 'World news',
						iconName: '',
						children: [
							{
								title: 'Europe',
								url: '/world/europe-news',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'US',
								url: '/us-news',
								longTitle: 'US news',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Americas',
								url: '/world/americas',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Asia',
								url: '/world/asia',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Australia',
								url: '/australia-news',
								longTitle: 'Australia news',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Middle East',
								url: '/world/middleeast',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Africa',
								url: '/world/africa',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Inequality',
								url: '/inequality',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Global development',
								url: '/global-development',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'Business',
						url: '/business',
						longTitle: '',
						iconName: '',
						children: [
							{
								title: 'Economics',
								url: '/business/economics',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Banking',
								url: '/business/banking',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Money',
								url: '/money',
								longTitle: '',
								iconName: '',
								children: [
									{
										title: 'Property',
										url: '/money/property',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
									{
										title: 'Pensions',
										url: '/money/pensions',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
									{
										title: 'Savings',
										url: '/money/savings',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
									{
										title: 'Borrowing',
										url: '/money/debt',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
									{
										title: 'Careers',
										url: '/money/work-and-careers',
										longTitle: '',
										iconName: '',
										children: [],
										classList: [],
									},
								],
								classList: [],
							},
							{
								title: 'Markets',
								url: '/business/stock-markets',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Project Syndicate',
								url:
									'/business/series/project-syndicate-economists',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'B2B',
								url: '/business-to-business',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Retail',
								url: '/business/retail',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'Coronavirus',
						url: '/world/coronavirus-outbreak',
						longTitle: 'Coronavirus',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Football',
						url: '/football',
						longTitle: '',
						iconName: '',
						children: [
							{
								title: 'Live scores',
								url: '/football/live',
								longTitle: 'football/live',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Tables',
								url: '/football/tables',
								longTitle: 'football/tables',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Fixtures',
								url: '/football/fixtures',
								longTitle: 'football/fixtures',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Results',
								url: '/football/results',
								longTitle: 'football/results',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Competitions',
								url: '/football/competitions',
								longTitle: 'football/competitions',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Clubs',
								url: '/football/teams',
								longTitle: 'football/teams',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'Environment',
						url: '/environment',
						longTitle: '',
						iconName: '',
						children: [
							{
								title: 'Climate change',
								url: '/environment/climate-change',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Wildlife',
								url: '/environment/wildlife',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Energy',
								url: '/environment/energy',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Pollution',
								url: '/environment/pollution',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'UK politics',
						url: '/politics',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Education',
						url: '/education',
						longTitle: '',
						iconName: '',
						children: [
							{
								title: 'Schools',
								url: '/education/schools',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Teachers',
								url: '/teacher-network',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Universities',
								url: '/education/universities',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Students',
								url: '/education/students',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'Society',
						url: '/society',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Science',
						url: '/science',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Tech',
						url: '/technology',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Global development',
						url: '/global-development',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Obituaries',
						url: '/tone/obituaries',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
				],
				classList: [],
			},
			{
				title: 'Opinion',
				url: '/commentisfree',
				longTitle: 'Opinion home',
				iconName: 'home',
				children: [
					{
						title: 'The Guardian view',
						url: '/profile/editorial',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Columnists',
						url: '/index/contributors',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Cartoons',
						url: '/cartoons/archive',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Opinion videos',
						url: '/type/video+tone/comment',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Letters',
						url: '/tone/letters',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
				],
				classList: [],
			},
			{
				title: 'Sport',
				url: '/sport',
				longTitle: 'Sport home',
				iconName: 'home',
				children: [
					{
						title: 'Football',
						url: '/football',
						longTitle: '',
						iconName: '',
						children: [
							{
								title: 'Live scores',
								url: '/football/live',
								longTitle: 'football/live',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Tables',
								url: '/football/tables',
								longTitle: 'football/tables',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Fixtures',
								url: '/football/fixtures',
								longTitle: 'football/fixtures',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Results',
								url: '/football/results',
								longTitle: 'football/results',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Competitions',
								url: '/football/competitions',
								longTitle: 'football/competitions',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Clubs',
								url: '/football/teams',
								longTitle: 'football/teams',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'Cricket',
						url: '/sport/cricket',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Rugby union',
						url: '/sport/rugby-union',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Tennis',
						url: '/sport/tennis',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Cycling',
						url: '/sport/cycling',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'F1',
						url: '/sport/formulaone',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Golf',
						url: '/sport/golf',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Boxing',
						url: '/sport/boxing',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Rugby league',
						url: '/sport/rugbyleague',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Racing',
						url: '/sport/horse-racing',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'US sports',
						url: '/sport/us-sport',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
				],
				classList: [],
			},
			{
				title: 'Culture',
				url: '/culture',
				longTitle: 'Culture home',
				iconName: 'home',
				children: [
					{
						title: 'Film',
						url: '/film',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Music',
						url: '/music',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'TV & radio',
						url: '/tv-and-radio',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Books',
						url: '/books',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Art & design',
						url: '/artanddesign',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Stage',
						url: '/stage',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Games',
						url: '/games',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Classical',
						url: '/music/classicalmusicandopera',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
				],
				classList: [],
			},
			{
				title: 'Lifestyle',
				url: '/lifeandstyle',
				longTitle: 'Lifestyle home',
				iconName: 'home',
				children: [
					{
						title: 'Fashion',
						url: '/fashion',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Food',
						url: '/food',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Recipes',
						url: '/tone/recipes',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Travel',
						url: '/travel',
						longTitle: '',
						iconName: '',
						children: [
							{
								title: 'UK',
								url: '/travel/uk',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Europe',
								url: '/travel/europe',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'US',
								url: '/travel/usa',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'Health & fitness',
						url: '/lifeandstyle/health-and-wellbeing',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Women',
						url: '/lifeandstyle/women',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Men',
						url: '/lifeandstyle/men',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Love & sex',
						url: '/lifeandstyle/love-and-sex',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Beauty',
						url: '/fashion/beauty',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Home & garden',
						url: '/lifeandstyle/home-and-garden',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Money',
						url: '/money',
						longTitle: '',
						iconName: '',
						children: [
							{
								title: 'Property',
								url: '/money/property',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Pensions',
								url: '/money/pensions',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Savings',
								url: '/money/savings',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Borrowing',
								url: '/money/debt',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
							{
								title: 'Careers',
								url: '/money/work-and-careers',
								longTitle: '',
								iconName: '',
								children: [],
								classList: [],
							},
						],
						classList: [],
					},
					{
						title: 'Cars',
						url: '/technology/motoring',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
				],
				classList: [],
			},
		],
		otherLinks: [
			{
				title: 'The Guardian app',
				url:
					'https://www.theguardian.com/mobile/2014/may/29/the-guardian-for-mobile-and-tablet',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Video',
				url: '/video',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Podcasts',
				url: '/podcasts',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Pictures',
				url: '/inpictures',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Newsletters',
				url: '/email-newsletters',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: "Today's paper",
				url: '/theguardian',
				longTitle: '',
				iconName: '',
				children: [
					{
						title: 'Obituaries',
						url: '/tone/obituaries',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'G2',
						url: '/theguardian/g2',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Weekend',
						url: '/theguardian/weekend',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'The Guide',
						url: '/theguardian/theguide',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Saturday review',
						url: '/theguardian/guardianreview',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
				],
				classList: [],
			},
			{
				title: 'Inside the Guardian',
				url: 'https://www.theguardian.com/membership',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'The Observer',
				url: '/observer',
				longTitle: '',
				iconName: '',
				children: [
					{
						title: 'Comment',
						url: '/theobserver/news/comment',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'The New Review',
						url: '/theobserver/new-review',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Observer Magazine',
						url: '/theobserver/magazine',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
				],
				classList: [],
			},
			{
				title: 'Guardian Weekly',
				url:
					'https://www.theguardian.com/weekly?INTCMP=gdnwb_mawns_editorial_gweekly_GW_TopNav_UK',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Professional networks',
				url: '/guardian-professional',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Crosswords',
				url: '/crosswords',
				longTitle: '',
				iconName: '',
				children: [
					{
						title: 'Blog',
						url: '/crosswords/crossword-blog',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Editor',
						url: '/crosswords/series/crossword-editor-update',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Quick',
						url: '/crosswords/series/quick',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Cryptic',
						url: '/crosswords/series/cryptic',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Prize',
						url: '/crosswords/series/prize',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Weekend',
						url: '/crosswords/series/weekend-crossword',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Quiptic',
						url: '/crosswords/series/quiptic',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Genius',
						url: '/crosswords/series/genius',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Speedy',
						url: '/crosswords/series/speedy',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Everyman',
						url: '/crosswords/series/everyman',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
					{
						title: 'Azed',
						url: '/crosswords/series/azed',
						longTitle: '',
						iconName: '',
						children: [],
						classList: [],
					},
				],
				classList: [],
			},
		],
		brandExtensions: [
			{
				title: 'Search jobs',
				url:
					'https://jobs.theguardian.com?INTCMP=jobs_uk_web_newheader_dropdown',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Holidays',
				url:
					'https://holidays.theguardian.com?INTCMP=holidays_uk_web_newheader',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Live events',
				url:
					'https://membership.theguardian.com/events?INTCMP=live_uk_header_dropdown',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Masterclasses',
				url: '/guardian-masterclasses',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Digital Archive',
				url: 'https://theguardian.newspapers.com',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Guardian Print Shop',
				url: '/artanddesign/series/gnm-print-sales',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Patrons',
				url: 'https://patrons.theguardian.com/?INTCMP=header_patrons',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
			{
				title: 'Discount Codes',
				url: 'https://discountcode.theguardian.com',
				longTitle: '',
				iconName: '',
				children: [],
				classList: ['js-discount-code-link'],
			},
			{
				title: 'Guardian Puzzles app',
				url: 'https://puzzles.theguardian.com/download',
				longTitle: '',
				iconName: '',
				children: [],
				classList: [],
			},
		],
		currentNavLink: {
			title: 'Lifestyle',
			url: '/lifeandstyle',
			longTitle: 'Lifestyle home',
			iconName: 'home',
			children: [
				{
					title: 'Fashion',
					url: '/fashion',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Food',
					url: '/food',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Recipes',
					url: '/tone/recipes',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Travel',
					url: '/travel',
					longTitle: '',
					iconName: '',
					children: [
						{
							title: 'UK',
							url: '/travel/uk',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Europe',
							url: '/travel/europe',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'US',
							url: '/travel/usa',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
					],
					classList: [],
				},
				{
					title: 'Health & fitness',
					url: '/lifeandstyle/health-and-wellbeing',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Women',
					url: '/lifeandstyle/women',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Men',
					url: '/lifeandstyle/men',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Love & sex',
					url: '/lifeandstyle/love-and-sex',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Beauty',
					url: '/fashion/beauty',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Home & garden',
					url: '/lifeandstyle/home-and-garden',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Money',
					url: '/money',
					longTitle: '',
					iconName: '',
					children: [
						{
							title: 'Property',
							url: '/money/property',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Pensions',
							url: '/money/pensions',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Savings',
							url: '/money/savings',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Borrowing',
							url: '/money/debt',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Careers',
							url: '/money/work-and-careers',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
					],
					classList: [],
				},
				{
					title: 'Cars',
					url: '/technology/motoring',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
			],
			classList: [],
		},
		currentParent: {
			title: 'Lifestyle',
			url: '/lifeandstyle',
			longTitle: 'Lifestyle home',
			iconName: 'home',
			children: [
				{
					title: 'Fashion',
					url: '/fashion',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Food',
					url: '/food',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Recipes',
					url: '/tone/recipes',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Travel',
					url: '/travel',
					longTitle: '',
					iconName: '',
					children: [
						{
							title: 'UK',
							url: '/travel/uk',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Europe',
							url: '/travel/europe',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'US',
							url: '/travel/usa',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
					],
					classList: [],
				},
				{
					title: 'Health & fitness',
					url: '/lifeandstyle/health-and-wellbeing',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Women',
					url: '/lifeandstyle/women',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Men',
					url: '/lifeandstyle/men',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Love & sex',
					url: '/lifeandstyle/love-and-sex',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Beauty',
					url: '/fashion/beauty',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Home & garden',
					url: '/lifeandstyle/home-and-garden',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Money',
					url: '/money',
					longTitle: '',
					iconName: '',
					children: [
						{
							title: 'Property',
							url: '/money/property',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Pensions',
							url: '/money/pensions',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Savings',
							url: '/money/savings',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Borrowing',
							url: '/money/debt',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Careers',
							url: '/money/work-and-careers',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
					],
					classList: [],
				},
				{
					title: 'Cars',
					url: '/technology/motoring',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
			],
			classList: [],
		},
		currentPillar: {
			title: 'Lifestyle',
			url: '/lifeandstyle',
			longTitle: 'Lifestyle home',
			iconName: 'home',
			children: [
				{
					title: 'Fashion',
					url: '/fashion',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Food',
					url: '/food',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Recipes',
					url: '/tone/recipes',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Travel',
					url: '/travel',
					longTitle: '',
					iconName: '',
					children: [
						{
							title: 'UK',
							url: '/travel/uk',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Europe',
							url: '/travel/europe',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'US',
							url: '/travel/usa',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
					],
					classList: [],
				},
				{
					title: 'Health & fitness',
					url: '/lifeandstyle/health-and-wellbeing',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Women',
					url: '/lifeandstyle/women',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Men',
					url: '/lifeandstyle/men',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Love & sex',
					url: '/lifeandstyle/love-and-sex',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Beauty',
					url: '/fashion/beauty',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Home & garden',
					url: '/lifeandstyle/home-and-garden',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Money',
					url: '/money',
					longTitle: '',
					iconName: '',
					children: [
						{
							title: 'Property',
							url: '/money/property',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Pensions',
							url: '/money/pensions',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Savings',
							url: '/money/savings',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Borrowing',
							url: '/money/debt',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Careers',
							url: '/money/work-and-careers',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
					],
					classList: [],
				},
				{
					title: 'Cars',
					url: '/technology/motoring',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
			],
			classList: [],
		},
		subNavSections: {
			links: [
				{
					title: 'Fashion',
					url: '/fashion',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Food',
					url: '/food',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Recipes',
					url: '/tone/recipes',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Travel',
					url: '/travel',
					longTitle: '',
					iconName: '',
					children: [
						{
							title: 'UK',
							url: '/travel/uk',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Europe',
							url: '/travel/europe',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'US',
							url: '/travel/usa',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
					],
					classList: [],
				},
				{
					title: 'Health & fitness',
					url: '/lifeandstyle/health-and-wellbeing',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Women',
					url: '/lifeandstyle/women',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Men',
					url: '/lifeandstyle/men',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Love & sex',
					url: '/lifeandstyle/love-and-sex',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Beauty',
					url: '/fashion/beauty',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Home & garden',
					url: '/lifeandstyle/home-and-garden',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
				{
					title: 'Money',
					url: '/money',
					longTitle: '',
					iconName: '',
					children: [
						{
							title: 'Property',
							url: '/money/property',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Pensions',
							url: '/money/pensions',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Savings',
							url: '/money/savings',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Borrowing',
							url: '/money/debt',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
						{
							title: 'Careers',
							url: '/money/work-and-careers',
							longTitle: '',
							iconName: '',
							children: [],
							classList: [],
						},
					],
					classList: [],
				},
				{
					title: 'Cars',
					url: '/technology/motoring',
					longTitle: '',
					iconName: '',
					children: [],
					classList: [],
				},
			],
		},
		readerRevenueLinks: {
			header: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=header_support_contribute&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"header_support_contribute"%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"header_support_subscribe"%7D',
				support:
					'https://support.theguardian.com?INTCMP=header_support&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"header_support"%7D',
				gifting:
					'https://support.theguardian.com/subscribe?INTCMP=header_support_gifting&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"header_support_gifting"%7D',
			},
			footer: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=footer_support_contribute&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_FOOTER","componentId":"footer_support_contribute"%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=footer_support_subscribe&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_FOOTER","componentId":"footer_support_subscribe"%7D',
				support:
					'https://support.theguardian.com?INTCMP=footer_support&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_FOOTER","componentId":"footer_support"%7D',
				gifting:
					'https://support.theguardian.com/subscribe?INTCMP=footer_support_gifting&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_FOOTER","componentId":"footer_support_gifting"%7D',
			},
			sideMenu: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=side_menu_support_contribute&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"side_menu_support_contribute"%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=side_menu_support_subscribe&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"side_menu_support_subscribe"%7D',
				support:
					'https://support.theguardian.com?INTCMP=side_menu_support&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"side_menu_support"%7D',
				gifting:
					'https://support.theguardian.com/subscribe?INTCMP=side_menu_support_gifting&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"side_menu_support_gifting"%7D',
			},
			ampHeader: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=header_support_contribute&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"header_support_contribute"%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"header_support_subscribe"%7D',
				support:
					'https://support.theguardian.com?INTCMP=amp_header_support&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"amp_header_support"%7D',
				gifting:
					'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_HEADER","componentId":"header_support_gifting"%7D',
			},
			ampFooter: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=amp_footer_support_contribute&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_FOOTER","componentId":"amp_footer_support_contribute"%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=amp_footer_support_subscribe&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_FOOTER","componentId":"amp_footer_support_subscribe"%7D',
				support:
					'https://support.theguardian.com?INTCMP=footer_support&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_FOOTER","componentId":"footer_support"%7D',
				gifting:
					'https://support.theguardian.com/subscribe?INTCMP=amp_footer_support_gifting&acquisitionData=%7B"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_FOOTER","componentId":"amp_footer_support_gifting"%7D',
			},
		},
	},
	guardianBaseURL: 'https://www.theguardian.com',
	mainMediaElements: [
		{
			role: 'inline',
			data: {
				alt: 'Flat pasta cut into pieces',
				caption:
					'These roughly cut pieces of fresh pasta make a great change from the homogeneity of the store-bought dried variety. There’s no right way to cut them – do it however you like.',
				credit: 'Photograph: Jill Mead/The Guardian',
			},
			imageSources: [
				{
					weighting: 'inline',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=85&auto=format&fit=max&s=a17cacbca26c5f924c97dfe3564ddf0c',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=965b44c83ae7ea35c405f0cf1daeb0fb',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=85&auto=format&fit=max&s=f1646d25fc5719bf906330a19a187835',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f88c1fca50ac9f96c4c504af850b88b7',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=85&auto=format&fit=max&s=c934865b6eb2769c26e199548d089364',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=7083a74aa58a9076a904468838714e71',
							width: 890,
						},
					],
				},
				{
					weighting: 'thumbnail',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=140&quality=85&auto=format&fit=max&s=cddca9f89966a9619aab7c045bfaa319',
							width: 140,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=edf9476799982f3eda7ebc3608bda2b3',
							width: 280,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=120&quality=85&auto=format&fit=max&s=55f1d25430554cd0f05ba547d5460ccc',
							width: 120,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=24caf1565694bf22221afb95440573f6',
							width: 240,
						},
					],
				},
				{
					weighting: 'supporting',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=380&quality=85&auto=format&fit=max&s=56e0149f6954234554234a8a97b526ac',
							width: 380,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=d6af6447c1427a870aa941f26112ba6f',
							width: 760,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=300&quality=85&auto=format&fit=max&s=7a6cb91c59b99e3201baa75274667267',
							width: 300,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=5ae7e2a1fe1bf3c95bfa3dd51b1dcd71',
							width: 600,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=85&auto=format&fit=max&s=a17cacbca26c5f924c97dfe3564ddf0c',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=965b44c83ae7ea35c405f0cf1daeb0fb',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=85&auto=format&fit=max&s=f1646d25fc5719bf906330a19a187835',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f88c1fca50ac9f96c4c504af850b88b7',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=85&auto=format&fit=max&s=c934865b6eb2769c26e199548d089364',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=7083a74aa58a9076a904468838714e71',
							width: 890,
						},
					],
				},
				{
					weighting: 'showcase',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=860&quality=85&auto=format&fit=max&s=55189adb03a49b00ec16af64d99856bb',
							width: 860,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=62ddf9b6435b3912c5522984f5b3be28',
							width: 1720,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=780&quality=85&auto=format&fit=max&s=c534cc9875032c01397bbe8e38882e56',
							width: 780,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=99e8048981fcfb2895224ae74b178792',
							width: 1560,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=85&auto=format&fit=max&s=a17cacbca26c5f924c97dfe3564ddf0c',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=965b44c83ae7ea35c405f0cf1daeb0fb',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=85&auto=format&fit=max&s=f1646d25fc5719bf906330a19a187835',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f88c1fca50ac9f96c4c504af850b88b7',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=85&auto=format&fit=max&s=c934865b6eb2769c26e199548d089364',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=7083a74aa58a9076a904468838714e71',
							width: 890,
						},
					],
				},
				{
					weighting: 'halfwidth',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=85&auto=format&fit=max&s=a17cacbca26c5f924c97dfe3564ddf0c',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=965b44c83ae7ea35c405f0cf1daeb0fb',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=85&auto=format&fit=max&s=f1646d25fc5719bf906330a19a187835',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f88c1fca50ac9f96c4c504af850b88b7',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=85&auto=format&fit=max&s=c934865b6eb2769c26e199548d089364',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=7083a74aa58a9076a904468838714e71',
							width: 890,
						},
					],
				},
				{
					weighting: 'immersive',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=85&auto=format&fit=max&s=a17cacbca26c5f924c97dfe3564ddf0c',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=965b44c83ae7ea35c405f0cf1daeb0fb',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=85&auto=format&fit=max&s=f1646d25fc5719bf906330a19a187835',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f88c1fca50ac9f96c4c504af850b88b7',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=85&auto=format&fit=max&s=c934865b6eb2769c26e199548d089364',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=7083a74aa58a9076a904468838714e71',
							width: 890,
						},
					],
				},
			],
			_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
			media: {
				allImages: [
					{
						index: 0,
						fields: { height: '84', width: '140' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/140.jpg',
					},
					{
						index: 1,
						fields: { height: '300', width: '500' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/500.jpg',
					},
					{
						index: 2,
						fields: { height: '600', width: '1000' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/1000.jpg',
					},
					{
						index: 3,
						fields: { height: '1200', width: '2000' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/2000.jpg',
					},
					{
						index: 4,
						fields: { height: '1236', width: '2060' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/2060.jpg',
					},
					{
						index: 5,
						fields: {
							isMaster: 'true',
							height: '1236',
							width: '2060',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg',
					},
				],
			},
			displayCredit: true,
		},
	],
	webPublicationDate: '2020-04-02T16:30:55.000Z',
	author: { byline: 'Sharnee Rawson' },
	designType: 'Recipe',
	blocks: [
		{
			id: '5e84643b8f08532a0e665ca3',
			elements: [
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>People who love to cook know about the remedial benefits of food prep. There’s a satisfaction in turning out a perfect finely diced onion, or hand-whipping egg whites to glossy stiff peaks.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Recipes that demand both hands and your full attention create an escape from distractions. It’s not meditation per se, but the sensory experience – feeling the texture of the dough, listening to oil sizzle and watching as colours change – can come pretty close. These dishes are a great starting point for when you want to get hands-on.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2>Fresh pasta</h2>',
				},
				{
					role: 'inline',
					data: {
						alt: 'Strapponi pasta with mushrooms',
						caption:
							'Strapponi pasta, served here with mushrooms, can be hand-rolled and cut.',
						credit: 'Photograph: Ola O Smit',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=85&auto=format&fit=max&s=bcc4b31e14dc74d590c5654a7d05d6c4',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2fc4da680823141a208771004b218149',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=85&auto=format&fit=max&s=2d9fb059a5c23a46e178c515f34ab232',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=12e1b220e2c993d756ef946281b9504d',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=85&auto=format&fit=max&s=8a900c8e23a5567cbdb75a129f70621d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=31754ed56b06bd60899901057733fcac',
									width: 890,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=140&quality=85&auto=format&fit=max&s=ac83cf3eb2a69d792d666fd197231978',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=e6bfdb7c0957d988841aa971c8f3e652',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=120&quality=85&auto=format&fit=max&s=36729d11b5c95230de29f2a00d1a9a87',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=528e17f058b0b968c46c068eb8bf73ee',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=380&quality=85&auto=format&fit=max&s=b4d1c86b4e618fe8719bb13974862f1d',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=d175f10ddbdcd7cd3d76d10309efa4ee',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=300&quality=85&auto=format&fit=max&s=b12239430735bc974f557b8b3a3c3fa2',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=650840635d9d3f63b94517086487121c',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=85&auto=format&fit=max&s=bcc4b31e14dc74d590c5654a7d05d6c4',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2fc4da680823141a208771004b218149',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=85&auto=format&fit=max&s=2d9fb059a5c23a46e178c515f34ab232',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=12e1b220e2c993d756ef946281b9504d',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=85&auto=format&fit=max&s=8a900c8e23a5567cbdb75a129f70621d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=31754ed56b06bd60899901057733fcac',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=860&quality=85&auto=format&fit=max&s=12afecb8c33045e0da3fffcb31b0ed0c',
									width: 860,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=b174f61e43e15780a4e2a730ddd1ff7c',
									width: 1720,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=780&quality=85&auto=format&fit=max&s=6e8b2f5d37a3effd3ed3e42610102439',
									width: 780,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=d42ddf5bf76c7739213f3081ef639a7a',
									width: 1560,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=85&auto=format&fit=max&s=bcc4b31e14dc74d590c5654a7d05d6c4',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2fc4da680823141a208771004b218149',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=85&auto=format&fit=max&s=2d9fb059a5c23a46e178c515f34ab232',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=12e1b220e2c993d756ef946281b9504d',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=85&auto=format&fit=max&s=8a900c8e23a5567cbdb75a129f70621d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=31754ed56b06bd60899901057733fcac',
									width: 890,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=85&auto=format&fit=max&s=bcc4b31e14dc74d590c5654a7d05d6c4',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2fc4da680823141a208771004b218149',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=85&auto=format&fit=max&s=2d9fb059a5c23a46e178c515f34ab232',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=12e1b220e2c993d756ef946281b9504d',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=85&auto=format&fit=max&s=8a900c8e23a5567cbdb75a129f70621d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=31754ed56b06bd60899901057733fcac',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=85&auto=format&fit=max&s=bcc4b31e14dc74d590c5654a7d05d6c4',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2fc4da680823141a208771004b218149',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=85&auto=format&fit=max&s=2d9fb059a5c23a46e178c515f34ab232',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=12e1b220e2c993d756ef946281b9504d',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=85&auto=format&fit=max&s=8a900c8e23a5567cbdb75a129f70621d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=31754ed56b06bd60899901057733fcac',
									width: 890,
								},
							],
						},
					],
					_type:
						'model.dotcomrendering.pageElements.ImageBlockElement',
					media: {
						allImages: [
							{
								index: 0,
								fields: { height: '2280', width: '3800' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/3800.jpg',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '2280',
									width: '3800',
								},
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/master/3800.jpg',
							},
							{
								index: 2,
								fields: { height: '1200', width: '2000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/2000.jpg',
							},
							{
								index: 3,
								fields: { height: '600', width: '1000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/1000.jpg',
							},
							{
								index: 4,
								fields: { height: '300', width: '500' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/500.jpg',
							},
							{
								index: 5,
								fields: { height: '84', width: '140' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/45f0aaa1882e482416a7a1aaf126278e66586938/0_1808_3800_2280/140.jpg',
							},
						],
					},
					displayCredit: true,
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Pasta is all about the dough, worked by hand until it turns silky under your palms and starts to spring back when poked. Most recipes require at least 10 minutes of knead time – the push-smoosh-turn action creates elasticity, which is crucial for a stretchy, al dente texture.</p>',
				},
				{
					role: 'thumbnail',
					data: {
						alt: '2',
						credit: 'Composite: GW Composite',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=620&quality=85&auto=format&fit=max&s=32e94499b35fbfbf33983baa156c4019',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=bd8fd767aed79e684e3fef302aa27b9d',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=605&quality=85&auto=format&fit=max&s=568b051daaecf114113a5ce485c035de',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=605&quality=45&auto=format&fit=max&dpr=2&s=6def35afa69972eb6abf7913812e3228',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=445&quality=85&auto=format&fit=max&s=d2c311f876a909dae5f2b2e9e687655e',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=445&quality=45&auto=format&fit=max&dpr=2&s=1f8f477aa44cef5b01354ec5b6644300',
									width: 890,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=140&quality=85&auto=format&fit=max&s=b3cfd9a5cf1fbebf7e11b1df0ed0dc74',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=140&quality=45&auto=format&fit=max&dpr=2&s=aa8e8d3fb76b02752c590ec7742db325',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=120&quality=85&auto=format&fit=max&s=253c49433b934e1ce43184511e44ee99',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=120&quality=45&auto=format&fit=max&dpr=2&s=58266c3dce1dfff847390f090938ce50',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=380&quality=85&auto=format&fit=max&s=03b205636ff0b6eca474c96e704290e8',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=380&quality=45&auto=format&fit=max&dpr=2&s=1c12bf7881ad4bc9906bbed7d5251629',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=300&quality=85&auto=format&fit=max&s=fdd04f81706f07f5f3eb6b87ed482ccc',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=300&quality=45&auto=format&fit=max&dpr=2&s=2828ad3311ad34038ca5491ab8e5cddb',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=620&quality=85&auto=format&fit=max&s=32e94499b35fbfbf33983baa156c4019',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=bd8fd767aed79e684e3fef302aa27b9d',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=605&quality=85&auto=format&fit=max&s=568b051daaecf114113a5ce485c035de',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=605&quality=45&auto=format&fit=max&dpr=2&s=6def35afa69972eb6abf7913812e3228',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=445&quality=85&auto=format&fit=max&s=d2c311f876a909dae5f2b2e9e687655e',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=445&quality=45&auto=format&fit=max&dpr=2&s=1f8f477aa44cef5b01354ec5b6644300',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=1020&quality=85&auto=format&fit=max&s=c6fdaf0fc3bfc736e26e84e35f91c171',
									width: 1020,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=1020&quality=45&auto=format&fit=max&dpr=2&s=81a8d0edb9b944f1af71bdbabecfcb6e',
									width: 2040,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=940&quality=85&auto=format&fit=max&s=89f5ad906bbc656fb866cc3af5239cee',
									width: 940,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=940&quality=45&auto=format&fit=max&dpr=2&s=103ff4f0a790df1cf14323261d05b78d',
									width: 1880,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=700&quality=85&auto=format&fit=max&s=2c439d90b03f9a276db8f6a8ee1ecfaf',
									width: 700,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=700&quality=45&auto=format&fit=max&dpr=2&s=26ff1cdf6ed2ba0a9876615ea76a8e0c',
									width: 1400,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=700&quality=85&auto=format&fit=max&s=2c439d90b03f9a276db8f6a8ee1ecfaf',
									width: 700,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=700&quality=45&auto=format&fit=max&dpr=2&s=26ff1cdf6ed2ba0a9876615ea76a8e0c',
									width: 1400,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=660&quality=85&auto=format&fit=max&s=511d1ff8e2e92a5902b016f511501eaa',
									width: 660,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=660&quality=45&auto=format&fit=max&dpr=2&s=3e2407c7284a385b8260ea69152ed2cc',
									width: 1320,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=645&quality=85&auto=format&fit=max&s=e49bf8b917887617a96ac5636f24147d',
									width: 645,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=645&quality=45&auto=format&fit=max&dpr=2&s=35643c50ff5dc80b17d27d4f8a9dd0b1',
									width: 1290,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=465&quality=85&auto=format&fit=max&s=7835760db9979f0a7c997a7a7d695943',
									width: 465,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=465&quality=45&auto=format&fit=max&dpr=2&s=218e18617974685bf31ef54fbc7666d1',
									width: 930,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=620&quality=85&auto=format&fit=max&s=32e94499b35fbfbf33983baa156c4019',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=bd8fd767aed79e684e3fef302aa27b9d',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=605&quality=85&auto=format&fit=max&s=568b051daaecf114113a5ce485c035de',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=605&quality=45&auto=format&fit=max&dpr=2&s=6def35afa69972eb6abf7913812e3228',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=445&quality=85&auto=format&fit=max&s=d2c311f876a909dae5f2b2e9e687655e',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=445&quality=45&auto=format&fit=max&dpr=2&s=1f8f477aa44cef5b01354ec5b6644300',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=1300&quality=85&auto=format&fit=max&s=4d07079596baefd9d4ba5615e60ab1bc',
									width: 1300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=1300&quality=45&auto=format&fit=max&dpr=2&s=1b583301b69ec56e26976d1de7de5d00',
									width: 2600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=1140&quality=85&auto=format&fit=max&s=00b9ff8e52a419760d2e276dd958428a',
									width: 1140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=1140&quality=45&auto=format&fit=max&dpr=2&s=b72541ae46d5b12ccbfb8b39c93aa926',
									width: 2280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=1125&quality=85&auto=format&fit=max&s=55be922e02167de4fa92934b0d877783',
									width: 1125,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=1125&quality=45&auto=format&fit=max&dpr=2&s=e6d0128ca8639811b9494d469ca77f63',
									width: 2250,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=965&quality=85&auto=format&fit=max&s=4f920bde1504cb07e80a9a8dea66cf05',
									width: 965,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=965&quality=45&auto=format&fit=max&dpr=2&s=d1ad51877334594c2e28129d37f46cf4',
									width: 1930,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=725&quality=85&auto=format&fit=max&s=b5b59fe7bbcec6fa161efb0670ae896f',
									width: 725,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=725&quality=45&auto=format&fit=max&dpr=2&s=1add271304ffa69f2c08e4aa046f1479',
									width: 1450,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=645&quality=85&auto=format&fit=max&s=e49bf8b917887617a96ac5636f24147d',
									width: 645,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=645&quality=45&auto=format&fit=max&dpr=2&s=35643c50ff5dc80b17d27d4f8a9dd0b1',
									width: 1290,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=465&quality=85&auto=format&fit=max&s=7835760db9979f0a7c997a7a7d695943',
									width: 465,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png?width=465&quality=45&auto=format&fit=max&dpr=2&s=218e18617974685bf31ef54fbc7666d1',
									width: 930,
								},
							],
						},
					],
					_type:
						'model.dotcomrendering.pageElements.ImageBlockElement',
					media: {
						allImages: [
							{
								index: 0,
								fields: {
									height: '368',
									width: '405',
								},
								mediaType: 'Image',
								mimeType: 'image/png',
								url:
									'https://media.guim.co.uk/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/405.png',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '368',
									width: '405',
								},
								mediaType: 'Image',
								mimeType: 'image/png',
								url:
									'https://media.guim.co.uk/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/master/405.png',
							},
							{
								index: 2,
								fields: {
									height: '127',
									width: '140',
								},
								mediaType: 'Image',
								mimeType: 'image/png',
								url:
									'https://media.guim.co.uk/4b3f214b056a1a8b317ba14c99e2a1dd191bff12/0_0_405_368/140.png',
							},
						],
					},
					displayCredit: false,
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>You don’t need a fancy pasta machine or specialty flour to try it at home (although OO flour and a little semolina is great). Start off with some eggs, flour and elbow grease and you’re on your way.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>A pasta machine is great for long shapes such as tagliatelle, but there’s a whole world of alternative shapes to play with. A rolling pin or wine bottle can be used to roll out the dough into <a href="https://www.theguardian.com/food/2019/jul/10/how-to-cook-the-perfect-spinach-and-ricotta-cannelloni-recipe">sheets for cannelloni</a>, or to cut <a href="https://www.theguardian.com/food/2019/oct/19/authentic-fresh-pasta-recipes-from-the-pasta-grannies">strapponi</a> (hand-torn pasta with ragged edges) and <a href="https://www.theguardian.com/lifeandstyle/2015/jan/23/how-to-make-your-own-pasta-back-to-basics-henry-dimbleby-jane-baxter">maltagliati</a>.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2><strong>Pretzels</strong></h2>',
				},
				{
					role: 'inline',
					data: {
						alt: 'Pretzels on a table with condiments',
						caption: 'Mastering the pretzel at home takes time.',
						credit: 'Photograph: Felicity Cloake/The Guardian',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=85&auto=format&fit=max&s=c1cecdf4a11f9ac314b8a1d522d074fe',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=04784aa90e0864ffbe505705d8357b82',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=85&auto=format&fit=max&s=8577d3e084b2fe205f3c75f06061d3c4',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=0578f43652abd899bbb8fe763633d369',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=85&auto=format&fit=max&s=c21ae4ad1292e05a5fcf6238a9dafbec',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0df13bf2850922dcc0b13c8e68adaa66',
									width: 890,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=140&quality=85&auto=format&fit=max&s=35884bbbd44feea0a249f00a63fc4fa8',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=79e4f38bc4dcedf4fedf320ea59267ae',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=120&quality=85&auto=format&fit=max&s=944daccca76cfc4910736d2933669c65',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=31b82142cd5f53ec81fc477c03c313f2',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=380&quality=85&auto=format&fit=max&s=c6291fc4b5fa6e74773c3a146981de4d',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=7bf4423c6453301e79d70fcd25aefe7d',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=300&quality=85&auto=format&fit=max&s=62a357a1fc2e388f15134ac3299ffa78',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=b930816cc966ffc3d899dd526bbc84ee',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=85&auto=format&fit=max&s=c1cecdf4a11f9ac314b8a1d522d074fe',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=04784aa90e0864ffbe505705d8357b82',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=85&auto=format&fit=max&s=8577d3e084b2fe205f3c75f06061d3c4',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=0578f43652abd899bbb8fe763633d369',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=85&auto=format&fit=max&s=c21ae4ad1292e05a5fcf6238a9dafbec',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0df13bf2850922dcc0b13c8e68adaa66',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=860&quality=85&auto=format&fit=max&s=318cb1b795f520de9781c606f80bcd91',
									width: 860,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=b29147dc593a97386358916feeabe468',
									width: 1720,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=780&quality=85&auto=format&fit=max&s=07bb30ac69e5e3a64165b2f4786e6aca',
									width: 780,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=a47fc516318b25e7546ca44c04735aee',
									width: 1560,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=85&auto=format&fit=max&s=c1cecdf4a11f9ac314b8a1d522d074fe',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=04784aa90e0864ffbe505705d8357b82',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=85&auto=format&fit=max&s=8577d3e084b2fe205f3c75f06061d3c4',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=0578f43652abd899bbb8fe763633d369',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=85&auto=format&fit=max&s=c21ae4ad1292e05a5fcf6238a9dafbec',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0df13bf2850922dcc0b13c8e68adaa66',
									width: 890,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=85&auto=format&fit=max&s=c1cecdf4a11f9ac314b8a1d522d074fe',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=04784aa90e0864ffbe505705d8357b82',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=85&auto=format&fit=max&s=8577d3e084b2fe205f3c75f06061d3c4',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=0578f43652abd899bbb8fe763633d369',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=85&auto=format&fit=max&s=c21ae4ad1292e05a5fcf6238a9dafbec',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0df13bf2850922dcc0b13c8e68adaa66',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=85&auto=format&fit=max&s=c1cecdf4a11f9ac314b8a1d522d074fe',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=04784aa90e0864ffbe505705d8357b82',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=85&auto=format&fit=max&s=8577d3e084b2fe205f3c75f06061d3c4',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=0578f43652abd899bbb8fe763633d369',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=85&auto=format&fit=max&s=c21ae4ad1292e05a5fcf6238a9dafbec',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0df13bf2850922dcc0b13c8e68adaa66',
									width: 890,
								},
							],
						},
					],
					_type:
						'model.dotcomrendering.pageElements.ImageBlockElement',
					media: {
						allImages: [
							{
								index: 0,
								fields: { height: '2189', width: '3648' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/3648.jpg',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '2189',
									width: '3648',
								},
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/master/3648.jpg',
							},
							{
								index: 2,
								fields: { height: '1200', width: '2000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/2000.jpg',
							},
							{
								index: 3,
								fields: { height: '600', width: '1000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/1000.jpg',
							},
							{
								index: 4,
								fields: { height: '300', width: '500' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/500.jpg',
							},
							{
								index: 5,
								fields: { height: '84', width: '140' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/af75546d6aef4b86166640f17efbad3ee502ff9e/0_150_3648_2189/140.jpg',
							},
						],
					},
					displayCredit: true,
				},
				{
					role: 'thumbnail',
					prefix: 'Related: ',
					_type:
						'model.dotcomrendering.pageElements.RichLinkBlockElement',
					text:
						'How to cook pad thai – recipe | Felicity Cloake’s masterclass',
					url:
						'https://www.theguardian.com/food/2020/apr/01/how-to-cook-pad-thai-recipe',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Proper pretzels aren’t quick to whip up. The dough needs to be worked for half an hour, and then comes the real trick – <a href="https://www.theguardian.com/lifeandstyle/wordofmouth/2017/may/18/how-to-bake-the-perfect-pretzels">mastering the classic Bavarian knot</a>. Each pretzel needs to be individually worked into a sausage, twisted and knotted neatly. If the first one bombs, don’t worry – you have nine more to perfect your style on.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>After a short rest at room temperature, and a longer 24-hour nap in the fridge, they are ready for a bath. This part requires a little precision: dip each pretzel in a bicarbonate solution for exactly four minutes. Then, finally, you scatter with salt and bake.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2><strong>Risotto</strong></h2>',
				},
				{
					role: 'inline',
					data: {
						alt: 'Field-herb risotto',
						caption:
							'Cooking a good risotto, such as this one with field herbs, is a slow process that can’t be rushed.',
						credit: 'Photograph: Alan Benson',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=85&auto=format&fit=max&s=39d447a0c7961f6d6a10e4ee878ef124',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2bbda5b6490ec035df7d82b606eb48ad',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=85&auto=format&fit=max&s=794054fbf26e775f7540e25b19e4c7c9',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=a4a49be977fc54eb34e4d8f320e82012',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=85&auto=format&fit=max&s=e6b6ea24840ec24b2c06e939dded8027',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=5781a510142687229f7504250e45fa49',
									width: 890,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=140&quality=85&auto=format&fit=max&s=8edb53c13d47b81b1d0926096729954f',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=c94241ad9a7c311f05ec5bbf6f33bb94',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=120&quality=85&auto=format&fit=max&s=03521931d46ece19e2b0308918527932',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=8ad4c153ebf8a5515493ee572a362170',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=380&quality=85&auto=format&fit=max&s=b0d2c0cf3aa604f9d6f5c0032b025876',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=17cdf224bfd3a3b1427adced2cb3c088',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=300&quality=85&auto=format&fit=max&s=cf42686a3d010d715115d959b5a656a6',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=771923c7e9f613d8e876cd6e366e785e',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=85&auto=format&fit=max&s=39d447a0c7961f6d6a10e4ee878ef124',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2bbda5b6490ec035df7d82b606eb48ad',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=85&auto=format&fit=max&s=794054fbf26e775f7540e25b19e4c7c9',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=a4a49be977fc54eb34e4d8f320e82012',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=85&auto=format&fit=max&s=e6b6ea24840ec24b2c06e939dded8027',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=5781a510142687229f7504250e45fa49',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=860&quality=85&auto=format&fit=max&s=0ecd0a323d007269be256449068a6b4c',
									width: 860,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=657b204690da38f4d1f5ab6c1290f1ec',
									width: 1720,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=780&quality=85&auto=format&fit=max&s=994dd53cfa22c4472ad9d9be959e0473',
									width: 780,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=3fcbe11ca812425e07e8367693242452',
									width: 1560,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=85&auto=format&fit=max&s=39d447a0c7961f6d6a10e4ee878ef124',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2bbda5b6490ec035df7d82b606eb48ad',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=85&auto=format&fit=max&s=794054fbf26e775f7540e25b19e4c7c9',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=a4a49be977fc54eb34e4d8f320e82012',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=85&auto=format&fit=max&s=e6b6ea24840ec24b2c06e939dded8027',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=5781a510142687229f7504250e45fa49',
									width: 890,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=85&auto=format&fit=max&s=39d447a0c7961f6d6a10e4ee878ef124',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2bbda5b6490ec035df7d82b606eb48ad',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=85&auto=format&fit=max&s=794054fbf26e775f7540e25b19e4c7c9',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=a4a49be977fc54eb34e4d8f320e82012',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=85&auto=format&fit=max&s=e6b6ea24840ec24b2c06e939dded8027',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=5781a510142687229f7504250e45fa49',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=85&auto=format&fit=max&s=39d447a0c7961f6d6a10e4ee878ef124',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2bbda5b6490ec035df7d82b606eb48ad',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=85&auto=format&fit=max&s=794054fbf26e775f7540e25b19e4c7c9',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=a4a49be977fc54eb34e4d8f320e82012',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=85&auto=format&fit=max&s=e6b6ea24840ec24b2c06e939dded8027',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=5781a510142687229f7504250e45fa49',
									width: 890,
								},
							],
						},
					],
					_type:
						'model.dotcomrendering.pageElements.ImageBlockElement',
					media: {
						allImages: [
							{
								index: 0,
								fields: { height: '1968', width: '3280' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/3280.jpg',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '1968',
									width: '3280',
								},
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/master/3280.jpg',
							},
							{
								index: 2,
								fields: { height: '1200', width: '2000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/2000.jpg',
							},
							{
								index: 3,
								fields: { height: '600', width: '1000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/1000.jpg',
							},
							{
								index: 4,
								fields: { height: '300', width: '500' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/500.jpg',
							},
							{
								index: 5,
								fields: { height: '84', width: '140' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/95d83ee9a07d217ff8c6159d999f61c268ed5f9c/0_1532_3280_1968/140.jpg',
							},
						],
					},
					displayCredit: true,
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>A good risotto will marry you to the stove for at least 30 minutes. It’s a slow process that can’t be rushed, carefully stirring the rice and ladling in hot stock as the starches release and the rice hydrates. Constant stirring ensures a loose, creamy texture with no lumps.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Most base recipes are super simple – generally just carnaroli rice (perhaps arborio or Vialone nano), stock, wine and some aromatics – so the consistency of the dish is everything. This <a href="https://www.theguardian.com/food/2019/sep/25/how-to-make-wild-mushroom-risotto-recipe-felicity-cloake-masterclass">wild mushroom risotto</a> is perfect for autumn. Go the full Venetian with this <a href="https://www.theguardian.com/lifeandstyle/2017/sep/07/how-to-cook-the-perfect-risotto-nero">risotto al nero di sepia</a>, or try Anna Jones’s comforting <a href="https://www.theguardian.com/food/2019/aug/30/anna-jones-sweetcorn-recipes">sweetcorn and green chilli recipe</a>.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2><strong>Choux pastry</strong></h2>',
				},
				{
					role: 'inline',
					data: {
						alt: 'Profiteroles with a dark sauce',
						caption:
							'Choux pastry is the base of perfect profiteroles.',
						credit:
							'Photograph: Dan Matthews/The Guardian. Food styling: Jack Sargeson',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=85&auto=format&fit=max&s=91ed9fba96c305359abd7155668767a3',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=44c5b9b8566326ad79188a67ecd752a5',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=85&auto=format&fit=max&s=bac6c11e8c474f07cdf7beb0826bc1ba',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9ffcc6042ffad14e6bb76f1c5112f3e1',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=85&auto=format&fit=max&s=0591b9ea2a4e6d5421a29467088500d5',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=b9b01ebe954883e4183ef8fa6e0520f8',
									width: 890,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=140&quality=85&auto=format&fit=max&s=d152b093698288297aefd57f631b25e2',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=c6197b81b98d8ce57da9f5edca991002',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=120&quality=85&auto=format&fit=max&s=3f7bb9a8b1e169f9012faccefdc77bec',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=f0a9733bb7c3d8bf08f79acae89522bd',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=380&quality=85&auto=format&fit=max&s=921ecd437269849b817243f80f98abed',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=5dd6d6449ca0e131799cc37daaed3c0f',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=300&quality=85&auto=format&fit=max&s=f9bdc196d4c1a9dd90981d3e0ffde689',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=bb32a8bb2704b1735493ff14e2d60743',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=85&auto=format&fit=max&s=91ed9fba96c305359abd7155668767a3',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=44c5b9b8566326ad79188a67ecd752a5',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=85&auto=format&fit=max&s=bac6c11e8c474f07cdf7beb0826bc1ba',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9ffcc6042ffad14e6bb76f1c5112f3e1',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=85&auto=format&fit=max&s=0591b9ea2a4e6d5421a29467088500d5',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=b9b01ebe954883e4183ef8fa6e0520f8',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=860&quality=85&auto=format&fit=max&s=3ea8238157aedf3484b0357dfd6c0c74',
									width: 860,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=630083586747ef9177f5d28e7102e376',
									width: 1720,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=780&quality=85&auto=format&fit=max&s=c3bacad27f27b7e6dc2e0779b5e79776',
									width: 780,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=1d731f2934963f726726eabce870cd4d',
									width: 1560,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=85&auto=format&fit=max&s=91ed9fba96c305359abd7155668767a3',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=44c5b9b8566326ad79188a67ecd752a5',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=85&auto=format&fit=max&s=bac6c11e8c474f07cdf7beb0826bc1ba',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9ffcc6042ffad14e6bb76f1c5112f3e1',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=85&auto=format&fit=max&s=0591b9ea2a4e6d5421a29467088500d5',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=b9b01ebe954883e4183ef8fa6e0520f8',
									width: 890,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=85&auto=format&fit=max&s=91ed9fba96c305359abd7155668767a3',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=44c5b9b8566326ad79188a67ecd752a5',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=85&auto=format&fit=max&s=bac6c11e8c474f07cdf7beb0826bc1ba',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9ffcc6042ffad14e6bb76f1c5112f3e1',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=85&auto=format&fit=max&s=0591b9ea2a4e6d5421a29467088500d5',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=b9b01ebe954883e4183ef8fa6e0520f8',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=85&auto=format&fit=max&s=91ed9fba96c305359abd7155668767a3',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=44c5b9b8566326ad79188a67ecd752a5',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=85&auto=format&fit=max&s=bac6c11e8c474f07cdf7beb0826bc1ba',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9ffcc6042ffad14e6bb76f1c5112f3e1',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=85&auto=format&fit=max&s=0591b9ea2a4e6d5421a29467088500d5',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=b9b01ebe954883e4183ef8fa6e0520f8',
									width: 890,
								},
							],
						},
					],
					_type:
						'model.dotcomrendering.pageElements.ImageBlockElement',
					media: {
						allImages: [
							{
								index: 0,
								fields: { height: '3001', width: '5002' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/5002.jpg',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '3001',
									width: '5002',
								},
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/master/5002.jpg',
							},
							{
								index: 2,
								fields: { height: '1200', width: '2000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/2000.jpg',
							},
							{
								index: 3,
								fields: { height: '600', width: '1000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/1000.jpg',
							},
							{
								index: 4,
								fields: { height: '300', width: '500' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/500.jpg',
							},
							{
								index: 5,
								fields: { height: '84', width: '140' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/3dbdab6c418ab6ab08edb871420c95ebc5536fc9/447_1295_5002_3001/140.jpg',
							},
						],
					},
					displayCredit: true,
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Julia Child may have claimed that you cannot fail with choux pastry, but I call a furphy. The cooked pastry dough is deceptively simple but it takes total concentration and a few rounds of practise to achieve good results.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Move too quickly and you risk scrambling the eggs when you add them to the roux base. Move too slowly and you won’t incorporate enough air to help the pastry rise. They also need to be punctured as soon as they come out of the oven, to release steam and ensure a crisp shell.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>It’s a great party trick to master, opening the door to elegant eclairs, <a href="https://www.theguardian.com/food/2019/dec/18/how-make-perfect-gougeres-cheese-puffs-felicity-cloake-recipe">savoury gougères</a> or the 2010 poster child of difficult desserts, the <a href="https://www.theguardian.com/food/2019/nov/25/croquembouche-recipe-20-best-christmas-baking-observer-food-monthly-justin-gellatly">croquembouche</a>. This <a href="https://www.theguardian.com/food/2019/apr/17/how-to-make-the-perfect-profiteroles-recipe-felicity-cloake">profiterole guide</a> breaks down all the steps simply, and for a worse-case scenario, includes a dark chocolate sauce to hide any mistakes.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2><strong>Fried shallots</strong></h2>',
				},
				{
					role: 'inline',
					data: {
						alt: 'Fried shallots on top of noodles',
						caption:
							'Homemade fried shallots are easy and delicious.',
						credit: 'Photograph: Yuki Sugiura/The Guardian',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=85&auto=format&fit=max&s=41b6a8f29cd37ff4c47f03f464e417af',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9b03043e7d8a3a632cd1e56f8b23bd54',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=85&auto=format&fit=max&s=7234e1879e2f3caf4982785385303fb8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f04d7ce846a7cd83280501a4fcc05bde',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=85&auto=format&fit=max&s=f0072d0a8a0e2b552ed98cadd93be96d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=fdc4fca6c99a7aa25ef6f585791aa7cc',
									width: 890,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=140&quality=85&auto=format&fit=max&s=c6ec61736fad08c2b3c4dacbd11ffba3',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=e9f2a5ff298598b6666c71850f8f6201',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=120&quality=85&auto=format&fit=max&s=43f1dd96e1a50ae3915308d9cab940f2',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=df0296aac4474b1d92519f8d4ca2e3d1',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=380&quality=85&auto=format&fit=max&s=0822f6f58d39344758972416d5886faa',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=ad91c161c7d7dccf1f4e3810770dbb7a',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=300&quality=85&auto=format&fit=max&s=d77fae6c9d06f1ced77e8aafe854a06f',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=f314c1dd60762a9dba5ce3f021b53f47',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=85&auto=format&fit=max&s=41b6a8f29cd37ff4c47f03f464e417af',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9b03043e7d8a3a632cd1e56f8b23bd54',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=85&auto=format&fit=max&s=7234e1879e2f3caf4982785385303fb8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f04d7ce846a7cd83280501a4fcc05bde',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=85&auto=format&fit=max&s=f0072d0a8a0e2b552ed98cadd93be96d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=fdc4fca6c99a7aa25ef6f585791aa7cc',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=860&quality=85&auto=format&fit=max&s=50de47b1ffc2ff8dfe210bbd6079e79c',
									width: 860,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=adf199eb13c4ae9f7fe601e37c16f460',
									width: 1720,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=780&quality=85&auto=format&fit=max&s=074c0fa90ef51deacf91d244de2b093e',
									width: 780,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=c6f525a475e022093ff9a124a227ce75',
									width: 1560,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=85&auto=format&fit=max&s=41b6a8f29cd37ff4c47f03f464e417af',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9b03043e7d8a3a632cd1e56f8b23bd54',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=85&auto=format&fit=max&s=7234e1879e2f3caf4982785385303fb8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f04d7ce846a7cd83280501a4fcc05bde',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=85&auto=format&fit=max&s=f0072d0a8a0e2b552ed98cadd93be96d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=fdc4fca6c99a7aa25ef6f585791aa7cc',
									width: 890,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=85&auto=format&fit=max&s=41b6a8f29cd37ff4c47f03f464e417af',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9b03043e7d8a3a632cd1e56f8b23bd54',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=85&auto=format&fit=max&s=7234e1879e2f3caf4982785385303fb8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f04d7ce846a7cd83280501a4fcc05bde',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=85&auto=format&fit=max&s=f0072d0a8a0e2b552ed98cadd93be96d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=fdc4fca6c99a7aa25ef6f585791aa7cc',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=85&auto=format&fit=max&s=41b6a8f29cd37ff4c47f03f464e417af',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9b03043e7d8a3a632cd1e56f8b23bd54',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=85&auto=format&fit=max&s=7234e1879e2f3caf4982785385303fb8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=f04d7ce846a7cd83280501a4fcc05bde',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=85&auto=format&fit=max&s=f0072d0a8a0e2b552ed98cadd93be96d',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=fdc4fca6c99a7aa25ef6f585791aa7cc',
									width: 890,
								},
							],
						},
					],
					_type:
						'model.dotcomrendering.pageElements.ImageBlockElement',
					media: {
						allImages: [
							{
								index: 0,
								fields: { height: '5213', width: '8688' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/8688.jpg',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '5213',
									width: '8688',
								},
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/master/8688.jpg',
							},
							{
								index: 2,
								fields: { height: '1200', width: '2000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/2000.jpg',
							},
							{
								index: 3,
								fields: { height: '600', width: '1000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/1000.jpg',
							},
							{
								index: 4,
								fields: { height: '300', width: '500' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/500.jpg',
							},
							{
								index: 5,
								fields: { height: '84', width: '140' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/059e8573b8f3327235e6d6622e8895de007c7592/0_579_8688_5213/140.jpg',
							},
						],
					},
					displayCredit: true,
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p> Unlike onions, small alliums are fiddly to work with, requiring careful peeling and slicing and a good amount of patience.</p>',
				},
				{
					role: 'thumbnail',
					prefix: 'Related: ',
					_type:
						'model.dotcomrendering.pageElements.RichLinkBlockElement',
					text: 'Yotam Ottolenghi’s mashed potato recipes',
					url:
						'https://www.theguardian.com/food/2020/mar/21/yotam-ottolenghi-mashed-potato-recipes',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>The flavour is delicate and fragrant, closer to garlic than onion, says Palisa Anderson, who considers <a href="https://www.theguardian.com/food/2019/oct/20/yin-and-yang-whats-the-difference-between-a-shallot-and-an-onion">making fried shallots</a> a zen experience. She slices them thinly and lets them slowly bubble in macadamia oil to create a tastier, higher-quality version than a store-bought variety and able to be stored for up to six months.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2>Dumplings</h2>',
				},
				{
					role: 'inline',
					data: {
						copyright: 'JLovekin',
						alt: 'Prawn gyoza with ginger and lemongrass',
						caption: 'Prawn gyoza with ginger and lemongrass.',
						credit: 'Photograph: Jonathan Lovekin/The Observer',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=85&auto=format&fit=max&s=c0fe2405a8c1951f674f3845bb2fa710',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1966d6e8dfcfda0b8643102c08d61078',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=85&auto=format&fit=max&s=986841f108c3e72cb699547632fea4b8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=8b9c539c68934efe002409e02c235fc7',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=85&auto=format&fit=max&s=3886a1b4eed10b02c05bcd0237748ab9',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=160118bd81ad53c4d42e7f194c79039d',
									width: 890,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=140&quality=85&auto=format&fit=max&s=f76303cad70c09f051e5414340bd8360',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=e3e7a02c2777e5b15ece102f624ae413',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=120&quality=85&auto=format&fit=max&s=2433564394da7b6d9c74c79a456e3966',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=27a135b5039325218dd92665d0ffad27',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=380&quality=85&auto=format&fit=max&s=debb53e9e4fed8ee14ea53989772720b',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=d4a0222241de31eb26f95a1b269ac1ce',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=300&quality=85&auto=format&fit=max&s=c65729cf6b9e1af6ec7ad51ed0926aeb',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=8c1785ca8e2d26882dd1bfcca7294ca6',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=85&auto=format&fit=max&s=c0fe2405a8c1951f674f3845bb2fa710',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1966d6e8dfcfda0b8643102c08d61078',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=85&auto=format&fit=max&s=986841f108c3e72cb699547632fea4b8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=8b9c539c68934efe002409e02c235fc7',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=85&auto=format&fit=max&s=3886a1b4eed10b02c05bcd0237748ab9',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=160118bd81ad53c4d42e7f194c79039d',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=860&quality=85&auto=format&fit=max&s=8186545fd5e29e4b5dfa4eb7e47de05d',
									width: 860,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=c7d5414d679e891bb28f460544b39bef',
									width: 1720,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=780&quality=85&auto=format&fit=max&s=b923ac1304be182940436ac99267838e',
									width: 780,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=5a4cc4f6c20e785597b70f889a8836a7',
									width: 1560,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=85&auto=format&fit=max&s=c0fe2405a8c1951f674f3845bb2fa710',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1966d6e8dfcfda0b8643102c08d61078',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=85&auto=format&fit=max&s=986841f108c3e72cb699547632fea4b8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=8b9c539c68934efe002409e02c235fc7',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=85&auto=format&fit=max&s=3886a1b4eed10b02c05bcd0237748ab9',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=160118bd81ad53c4d42e7f194c79039d',
									width: 890,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=85&auto=format&fit=max&s=c0fe2405a8c1951f674f3845bb2fa710',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1966d6e8dfcfda0b8643102c08d61078',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=85&auto=format&fit=max&s=986841f108c3e72cb699547632fea4b8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=8b9c539c68934efe002409e02c235fc7',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=85&auto=format&fit=max&s=3886a1b4eed10b02c05bcd0237748ab9',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=160118bd81ad53c4d42e7f194c79039d',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=85&auto=format&fit=max&s=c0fe2405a8c1951f674f3845bb2fa710',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1966d6e8dfcfda0b8643102c08d61078',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=85&auto=format&fit=max&s=986841f108c3e72cb699547632fea4b8',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=8b9c539c68934efe002409e02c235fc7',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=85&auto=format&fit=max&s=3886a1b4eed10b02c05bcd0237748ab9',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=160118bd81ad53c4d42e7f194c79039d',
									width: 890,
								},
							],
						},
					],
					_type:
						'model.dotcomrendering.pageElements.ImageBlockElement',
					media: {
						allImages: [
							{
								index: 0,
								fields: { height: '2764', width: '4606' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/4606.jpg',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '2764',
									width: '4606',
								},
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/master/4606.jpg',
							},
							{
								index: 2,
								fields: { height: '1200', width: '2000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/2000.jpg',
							},
							{
								index: 3,
								fields: { height: '600', width: '1000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/1000.jpg',
							},
							{
								index: 4,
								fields: { height: '300', width: '500' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/500.jpg',
							},
							{
								index: 5,
								fields: { height: '84', width: '140' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/d98eec4985f381b8ff50c1ff1b62c6399df8b728/0_1622_4606_2764/140.jpg',
							},
						],
					},
					displayCredit: true,
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Whether you want to make gyoza, wontons or something in between, folding and pleating your way to a stack of dumplings is super relaxing. The motions of scooping the filling, wetting the wrapper and folding, pinching and pleating fall into a steady rhythm, letting you shape each one a little better than the last.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Try your hand at the <a href="https://www.theguardian.com/lifeandstyle/2017/jun/04/andrew-mcconnells-prawn-and-chicken-dumplings-with-spiced-vinegar-recipe">cult-status prawn and chicken dumplings</a> from Melbourne’s Supernormal, or these <a href="https://www.theguardian.com/food/2019/dec/08/christmas-dinner-starter-vegan-recipe-kimchi-tofu-gyoza-dumplings-meera-sodha">vegan kimchi and tofu dumplings</a>, or a <a href="https://www.theguardian.com/lifeandstyle/2017/apr/23/nigel-slater-gyoza-recipes">simple prawn gyoza</a>.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2>Truffles</h2>',
				},
				{
					role: 'inline',
					data: {
						alt: 'Dried lime truffles with honey and salt',
						caption: 'Dried lime truffles with honey and salt.',
						credit:
							'Photograph: Lizzie Mayson/The Guardian. Food styling: Rosie Ramsden. Prop styling: Anna Wilkins',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=85&auto=format&fit=max&s=d805091283a49f932b517f3b299cf99c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5daaa5548ef7643f466ea9f8f97be531',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=85&auto=format&fit=max&s=6be22d493b29f317e5924d241233c781',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=74d1463447f247875516e4e71f0e15ab',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=85&auto=format&fit=max&s=19c64c70f05cb41857c84afa54411ebe',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=250d09beb7a78dd751ffb1b455f891e7',
									width: 890,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=140&quality=85&auto=format&fit=max&s=04707a5cc2918d057e46231ca8311277',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=26f19c39a539c9fda757453ac11bccb4',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=120&quality=85&auto=format&fit=max&s=36f45fbf0e3b90e358d727d1e03121a2',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=af31c0f8b5fce4c6b7ac2b466395431b',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=380&quality=85&auto=format&fit=max&s=c70ff98ae7c5b80b02acc416b5d5886d',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=4a47df92cea4f460539a6f813cdf0677',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=300&quality=85&auto=format&fit=max&s=0a462bbf8d594de4c78e5bdba2184aaf',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=b52563804093b4a63e1cdb983e0eb501',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=85&auto=format&fit=max&s=d805091283a49f932b517f3b299cf99c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5daaa5548ef7643f466ea9f8f97be531',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=85&auto=format&fit=max&s=6be22d493b29f317e5924d241233c781',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=74d1463447f247875516e4e71f0e15ab',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=85&auto=format&fit=max&s=19c64c70f05cb41857c84afa54411ebe',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=250d09beb7a78dd751ffb1b455f891e7',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=860&quality=85&auto=format&fit=max&s=017527c2c1fbb8ab2b2752e61707206e',
									width: 860,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=8f27fcd9780299081b60f0a52f759b23',
									width: 1720,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=780&quality=85&auto=format&fit=max&s=2b535e3da62d4f4aa079487ee81abf53',
									width: 780,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=2287046268a1d56114ad760c5c7a45b3',
									width: 1560,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=85&auto=format&fit=max&s=d805091283a49f932b517f3b299cf99c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5daaa5548ef7643f466ea9f8f97be531',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=85&auto=format&fit=max&s=6be22d493b29f317e5924d241233c781',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=74d1463447f247875516e4e71f0e15ab',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=85&auto=format&fit=max&s=19c64c70f05cb41857c84afa54411ebe',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=250d09beb7a78dd751ffb1b455f891e7',
									width: 890,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=85&auto=format&fit=max&s=d805091283a49f932b517f3b299cf99c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5daaa5548ef7643f466ea9f8f97be531',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=85&auto=format&fit=max&s=6be22d493b29f317e5924d241233c781',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=74d1463447f247875516e4e71f0e15ab',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=85&auto=format&fit=max&s=19c64c70f05cb41857c84afa54411ebe',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=250d09beb7a78dd751ffb1b455f891e7',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=85&auto=format&fit=max&s=d805091283a49f932b517f3b299cf99c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5daaa5548ef7643f466ea9f8f97be531',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=85&auto=format&fit=max&s=6be22d493b29f317e5924d241233c781',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=74d1463447f247875516e4e71f0e15ab',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=85&auto=format&fit=max&s=19c64c70f05cb41857c84afa54411ebe',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=250d09beb7a78dd751ffb1b455f891e7',
									width: 890,
								},
							],
						},
					],
					_type:
						'model.dotcomrendering.pageElements.ImageBlockElement',
					media: {
						allImages: [
							{
								index: 0,
								fields: { height: '4075', width: '3839' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/3839.jpg',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '4075',
									width: '3839',
								},
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/master/3839.jpg',
							},
							{
								index: 2,
								fields: { height: '2000', width: '1884' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/1884.jpg',
							},
							{
								index: 3,
								fields: { height: '1000', width: '942' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/942.jpg',
							},
							{
								index: 4,
								fields: { height: '500', width: '471' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/2ab3b20bd6af9be389eb938b319c00630c2f94c0/0_0_3839_4075/471.jpg',
							},
						],
					},
					displayCredit: true,
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>They look simple, don’t they? Just little chocolate balls. But truffles are a tricky dish to master, especially in Australia’s warmer climates. Essentially, truffles are a chocolate ganache, set in the fridge, rolled into balls and coated in chocolate.</p>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p>Dipping the balls can be fiddly, especially managing the different temperature zones of your kitchen. They require you to work quickly so things don’t start to melt. What really takes focus is forming a beautiful glossy shell on the outside, with no excess marks from dipping or implements. Try a <a href="https://www.theguardian.com/lifeandstyle/wordofmouth/2013/mar/28/how-make-perfect-chocolate-truffles">classic chocolate</a>, or mix things up with <a href="https://www.theguardian.com/food/2019/nov/30/sweet-christmas-gift-recipes-helen-goh-hazelnut-brittle-rugelach-truffles-gingerbread">dried lime, honey and salt truffles</a>.</p>',
				},
			],
			blockCreatedOn: 1585734715000,
			blockCreatedOnDisplay: '10:51 BST',
			blockLastUpdated: 1585829535000,
			blockLastUpdatedDisplay: '13:12 BST',
			blockFirstPublished: 1585734719000,
			blockFirstPublishedDisplay: '10:51 BST',
			primaryDateLine: 'Wed 19 Aug 2020 06.02 BST',
			secondaryDateLine: 'Wed 19 Aug 2020 11.52 BST',
		},
	],
	linkedData: [
		{
			'@type': 'NewsArticle',
			'@context': 'https://schema.org',
			'@id':
				'https://amp.theguardian.com/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
			publisher: {
				'@type': 'Organization',
				'@context': 'https://schema.org',
				'@id': 'https://www.theguardian.com#publisher',
				name: 'The Guardian',
				url: 'https://www.theguardian.com/',
				logo: {
					'@type': 'ImageObject',
					url:
						'https://uploads.guim.co.uk/2018/01/31/TheGuardian_AMP.png',
					width: 190,
					height: 60,
				},
				sameAs: [
					'https://www.facebook.com/theguardian',
					'https://twitter.com/guardian',
					'https://www.youtube.com/user/TheGuardian',
				],
			},
			isAccessibleForFree: true,
			isPartOf: {
				'@type': ['CreativeWork', 'Product'],
				name: 'The Guardian',
				productID: 'theguardian.com:basic',
			},
			image: [
				'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=0be491d38f01390a167656e6f31bb042',
				'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=0e7b7cd7bfce110d6c7cb796f95afecc',
				'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=71276bf7ec281a99cc21470e0eaa12fd',
				'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=1200&quality=85&auto=format&fit=max&s=c3d98d76cc3ccd86a2a1ef54279a1f3c',
			],
			author: [{ '@type': 'Person', name: 'Guardian staff reporter' }],
			datePublished: '2020-04-02T16:30:55.000Z',
			headline:
				'Folding, kneading, rolling: seven meditative dishes to cook when you need to zone out',
			dateModified: '2020-04-02T23:49:17.000Z',
			mainEntityOfPage:
				'https://www.theguardian.com/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
		},
		{
			'@type': 'WebPage',
			'@context': 'https://schema.org',
			'@id':
				'https://www.theguardian.com/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
			potentialAction: {
				'@type': 'ViewAction',
				target:
					'android-app://com.guardian/https/www.theguardian.com/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
			},
		},
	],
	editionId: 'UK',
	webPublicationDateDisplay: 'Thu 2 Apr 2020 17.30 BST',
	shouldHideAds: false,
	standfirst:
		'<p>These recipes require your full concentration and provide a chance to use your hands and unwind </p><ul><li><a href="https://www.theguardian.com/world/coronavirus-outbreak">See our coronavirus coverage</a></li><li><a href="https://www.theguardian.com/lifeandstyle/series/the-good-place">Read more in the Good Place series</a><br></li><li><a href="https://www.theguardian.com/newsletters/2020/mar/28/sign-up-for-guardian-australias-daily-coronavirus-email">Sign up for Coronavirus: Australia at a glance, our daily email newsletter</a></li></ul>',
	openGraphData: {
		'og:url':
			'http://www.theguardian.com/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
		'article:author': 'Sharnee Rawson',
		'og:image:height': '720',
		'og:description':
			'These recipes require your full concentration and provide a chance to use your hands and unwind',
		'og:image:width': '1200',
		'og:image':
			'https://i.guim.co.uk/img/media/60543859890d65ba1633458a509dc4d8db0f1b04/0_0_2060_1236/master/2060.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=0be491d38f01390a167656e6f31bb042',
		'al:ios:url':
			'gnmguardian://lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out?contenttype=Article&source=applinks',
		'article:publisher': 'https://www.facebook.com/theguardian',
		'og:type': 'article',
		'al:ios:app_store_id': '409128287',
		'article:section': 'Life and style',
		'article:published_time': '2020-04-02T16:30:55.000Z',
		'og:title':
			'Folding, kneading, rolling: seven meditative dishes to cook when you need to zone out',
		'fb:app_id': '180444840287',
		'article:tag': 'Food,Life and style,Australian lifestyle',
		'al:ios:app_name': 'The Guardian',
		'og:site_name': 'the Guardian',
		'article:modified_time': '2020-04-02T23:49:17.000Z',
	},
	webTitle:
		'Folding, kneading, rolling: seven meditative dishes to cook when you need to zone out',
	sectionUrl: 'food/food',
	pageId:
		'lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
	version: 3,
	tags: [
		{
			id: 'lifeandstyle/series/the-good-place',
			type: 'Series',
			title: 'The good place',
		},
		{ id: 'food/food', type: 'Keyword', title: 'Food' },
		{
			id: 'food/series/australian-food-in-season',
			type: 'Series',
			title: 'Australian food in season',
		},
		{
			id: 'lifeandstyle/lifeandstyle',
			type: 'Keyword',
			title: 'Life and style',
		},
		{
			id: 'lifeandstyle/australian-lifestyle',
			type: 'Keyword',
			title: 'Australian lifestyle',
		},
		{ id: 'type/article', type: 'Type', title: 'Article' },
		{ id: 'tone/recipes', type: 'Tone', title: 'Recipes' },
		{
			id: 'tracking/commissioningdesk/australia-lifestyle',
			type: 'Tracking',
			title: 'Australia Lifestyle',
		},
	],
	pillar: 'lifestyle',
	isCommentable: true,
	webURL:
		'https://www.theguardian.com/lifeandstyle/2020/apr/03/folding-kneading-rolling-seven-meditative-dishes-to-cook-when-you-need-to-zone-out',
	keyEvents: [],
	showBottomSocialButtons: true,
	isImmersive: false,
	config: {
		ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		idApiUrl: 'https://idapi.theguardian.com',
		sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
		sentryHost: 'app.getsentry.com/35463',
		dcrSentryDsn:
			'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
		switches,
		shortUrlId: '/p/4k83z',
		abTests: {},
		dfpAccountId: '',
		commercialBundleUrl:
			'https://assets.guim.co.uk/javascripts/3d3cbc5f29df7c0cdd65/graun.dotcom-rendering-commercial.js',
		revisionNumber: '62cf0d6e4609276d37e09fd596430fbf8b629418',
		isDev: false,
		googletagUrl: '//www.googletagservices.com/tag/js/gpt.js',
		stage: 'DEV',
		frontendAssetsFullURL: 'https://assets.guim.co.uk/',
		hbImpl: {
			prebid: false,
			a9: false,
		},
		adUnit: '/59666047/theguardian.com/film/article/ng',
		isSensitive: false,
		videoDuration: 0,
		edition: '',
		section: '',
		sharedAdTargeting: {},
		keywordIds: '',
		showRelatedContent: false,
		pageId: '',
		webPublicationDate: 1579185778186,
		headline: '',
		author: '',
		keywords: '',
		series: '',
		contentType: '',
		isPaidContent: false,
		discussionD2Uid: 'testD2Header',
		discussionApiClientHeader: 'testClientHeader',
		ampIframeUrl:
			'https://assets.guim.co.uk/data/vendor/a994b749adae30cd58f0e84c8fa28013/amp-iframe.html',
		isPhotoEssay: false,
	},
	sectionLabel: 'Food',
	isSpecialReport: false,
};
