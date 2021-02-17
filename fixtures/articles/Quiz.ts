import { switches } from '../switches';

export const Quiz: CAPIType = {
	contributionsServiceUrl: 'https://contributions.guardianapis.com',
	shouldHideReaderRevenue: false,
	slotMachineFlags: '',
	isAdFreeUser: false,
	main:
		'<figure class="element element-image" data-media-id="508dd31381944b13108f793a244821f78384f4f5"> <img src="https://media.guim.co.uk/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/1000.jpg" alt="Heath Ledger" width="1000" height="600" class="gu-image" /> <figcaption> <span class="element-image__caption">What links Heath Ledger with Mick Jagger?</span> <span class="element-image__credit">Photograph: Getty Images</span> </figcaption> </figure>',
	subMetaSectionLinks: [
		{ url: '/lifeandstyle/lifeandstyle', title: 'Life and style' },
		{ url: '/theguardian/series/the-quiz-thomas-eaton', title: 'The quiz' },
	],
	commercialProperties: {
		UK: {
			adTargeting: [
				{ name: 'edition', value: 'uk' },
				{ name: 'tn', value: ['quizzes'] },
				{ name: 'su', value: ['0'] },
				{
					name: 'url',
					value: '/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
				},
				{ name: 'se', value: ['the-quiz-thomas-eaton'] },
				{ name: 'sh', value: 'https://theguardian.com/p/d3g6k' },
				{ name: 'ct', value: 'article' },
				{ name: 'k', value: ['lifeandstyle'] },
				{ name: 'p', value: 'ng' },
				{ name: 'co', value: ['thomas-eaton'] },
			],
		},
		US: {
			adTargeting: [
				{ name: 'tn', value: ['quizzes'] },
				{ name: 'su', value: ['0'] },
				{
					name: 'url',
					value: '/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
				},
				{ name: 'se', value: ['the-quiz-thomas-eaton'] },
				{ name: 'sh', value: 'https://theguardian.com/p/d3g6k' },
				{ name: 'ct', value: 'article' },
				{ name: 'k', value: ['lifeandstyle'] },
				{ name: 'p', value: 'ng' },
				{ name: 'edition', value: 'us' },
				{ name: 'co', value: ['thomas-eaton'] },
			],
		},
		AU: {
			adTargeting: [
				{ name: 'tn', value: ['quizzes'] },
				{ name: 'su', value: ['0'] },
				{
					name: 'url',
					value: '/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
				},
				{ name: 'se', value: ['the-quiz-thomas-eaton'] },
				{ name: 'sh', value: 'https://theguardian.com/p/d3g6k' },
				{ name: 'ct', value: 'article' },
				{ name: 'k', value: ['lifeandstyle'] },
				{ name: 'p', value: 'ng' },
				{ name: 'edition', value: 'au' },
				{ name: 'co', value: ['thomas-eaton'] },
			],
		},
		INT: {
			adTargeting: [
				{ name: 'tn', value: ['quizzes'] },
				{ name: 'edition', value: 'int' },
				{ name: 'su', value: ['0'] },
				{
					name: 'url',
					value: '/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
				},
				{ name: 'se', value: ['the-quiz-thomas-eaton'] },
				{ name: 'sh', value: 'https://theguardian.com/p/d3g6k' },
				{ name: 'ct', value: 'article' },
				{ name: 'k', value: ['lifeandstyle'] },
				{ name: 'p', value: 'ng' },
				{ name: 'co', value: ['thomas-eaton'] },
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
			'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=e58e0a858d6f8edc284b1a40b13789bc',
		'twitter:site': '@guardian',
		'twitter:app:url:ipad':
			'gnmguardian://lifeandstyle/2020/jan/18/the-quiz-thomas-eaton?contenttype=Article&source=twitter',
		'twitter:card': 'summary_large_image',
		'twitter:app:name:iphone': 'The Guardian',
		'twitter:app:id:ipad': '409128287',
		'twitter:app:id:googleplay': 'com.guardian',
		'twitter:app:url:googleplay':
			'guardian://www.theguardian.com/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
		'twitter:app:url:iphone':
			'gnmguardian://lifeandstyle/2020/jan/18/the-quiz-thomas-eaton?contenttype=Article&source=twitter',
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
	publication: 'The Guardian',
	trailText:
		'From Heath Ledger to Borussia Mönchengladbach, test your knowledge with the Weekend quiz',
	subMetaKeywordLinks: [{ url: '/tone/quizzes', title: 'quizzes' }],
	headline: 'Which hip-hop group was named after a martial arts film?',
	contentType: 'Article',
	guardianBaseURL: 'https://www.theguardian.com',
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
								title: 'Cities',
								url: '/cities',
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
						],
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
						title: 'Cities',
						url: '/cities',
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
	mainMediaElements: [
		{
			role: 'inline',
			data: {
				copyright: '2006 Getty Images',
				alt: 'Heath Ledger',
				caption: 'What links Heath Ledger with Mick Jagger?',
				credit: 'Photograph: Getty Images',
			},
			imageSources: [
				{
					weighting: 'inline',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e6c6e072c5c4ac5c65cfe511b15df8f0',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=e17ffe76f7e101c66036ecad0466638f',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=cad0465165a433583711844849e44235',
							width: 890,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=85&auto=format&fit=max&s=f7e5db93a929c1d546618908672985ea',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=85&auto=format&fit=max&s=c629613badaaa095c3918daa0da47b72',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=85&auto=format&fit=max&s=1f737b4d11c32a3ed38c9112dda4b70f',
							width: 445,
						},
					],
				},
				{
					weighting: 'thumbnail',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=140&quality=85&auto=format&fit=max&s=0d86f8cce2e0097802f40212b0a94c94',
							width: 140,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=a816a8fd0f99b056a4519fe02508b611',
							width: 280,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=120&quality=85&auto=format&fit=max&s=c7ed76a76e4ccf776a1b47c66108e8be',
							width: 120,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=e78e86a58eb6057255b954a40c39a4ed',
							width: 240,
						},
					],
				},
				{
					weighting: 'supporting',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=380&quality=85&auto=format&fit=max&s=a2c67c7dd2ff125c9281a75a7029a255',
							width: 380,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=7903ee6952d141f53d9443c8f66a048d',
							width: 760,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=300&quality=85&auto=format&fit=max&s=696cc1c05df852f43faaa637e2eb85b9',
							width: 300,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=267b723e2644e93107cec09964305ca1',
							width: 600,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=85&auto=format&fit=max&s=f7e5db93a929c1d546618908672985ea',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e6c6e072c5c4ac5c65cfe511b15df8f0',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=85&auto=format&fit=max&s=c629613badaaa095c3918daa0da47b72',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=e17ffe76f7e101c66036ecad0466638f',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=85&auto=format&fit=max&s=1f737b4d11c32a3ed38c9112dda4b70f',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=cad0465165a433583711844849e44235',
							width: 890,
						},
					],
				},
				{
					weighting: 'showcase',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=860&quality=85&auto=format&fit=max&s=a48c7798e27666ca48be108682db7425',
							width: 860,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=cf582de210cdca012d0ea4ab92b518f3',
							width: 1720,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=780&quality=85&auto=format&fit=max&s=c0a11f6ed230ff6cfbca160d49e85b3f',
							width: 780,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=a4a345fb397fcfbaddeed8af350e117e',
							width: 1560,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=85&auto=format&fit=max&s=f7e5db93a929c1d546618908672985ea',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e6c6e072c5c4ac5c65cfe511b15df8f0',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=85&auto=format&fit=max&s=c629613badaaa095c3918daa0da47b72',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=e17ffe76f7e101c66036ecad0466638f',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=85&auto=format&fit=max&s=1f737b4d11c32a3ed38c9112dda4b70f',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=cad0465165a433583711844849e44235',
							width: 890,
						},
					],
				},
				{
					weighting: 'halfwidth',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=85&auto=format&fit=max&s=f7e5db93a929c1d546618908672985ea',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e6c6e072c5c4ac5c65cfe511b15df8f0',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=85&auto=format&fit=max&s=c629613badaaa095c3918daa0da47b72',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=e17ffe76f7e101c66036ecad0466638f',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=85&auto=format&fit=max&s=1f737b4d11c32a3ed38c9112dda4b70f',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=cad0465165a433583711844849e44235',
							width: 890,
						},
					],
				},
				{
					weighting: 'immersive',
					srcSet: [
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=85&auto=format&fit=max&s=f7e5db93a929c1d546618908672985ea',
							width: 620,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e6c6e072c5c4ac5c65cfe511b15df8f0',
							width: 1240,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=85&auto=format&fit=max&s=c629613badaaa095c3918daa0da47b72',
							width: 605,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=e17ffe76f7e101c66036ecad0466638f',
							width: 1210,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=85&auto=format&fit=max&s=1f737b4d11c32a3ed38c9112dda4b70f',
							width: 445,
						},
						{
							src:
								'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=cad0465165a433583711844849e44235',
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
						fields: { height: '1200', width: '2000' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/2000.jpg',
					},
					{
						index: 1,
						fields: { height: '600', width: '1000' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/1000.jpg',
					},
					{
						index: 2,
						fields: { height: '300', width: '500' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/500.jpg',
					},
					{
						index: 3,
						fields: { height: '84', width: '140' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/140.jpg',
					},
					{
						index: 4,
						fields: { height: '1288', width: '2146' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/2146.jpg',
					},
					{
						index: 5,
						fields: {
							isMaster: 'true',
							height: '1288',
							width: '2146',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url:
							'https://media.guim.co.uk/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg',
					},
				],
			},
			displayCredit: true,
		},
	],
	webPublicationDate: '2020-01-18T07:00:23.000Z',
	webPublicationSecondaryDateDisplay: '2020-02-10T12:31:25.000Z',

	blocks: [
		{
			id: '71b595fc-e84e-45e9-9c87-cb1ce9c34392',
			elements: [
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2><strong>The questions</strong><br></h2>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p><strong>1</strong> Tupolev Tu-144 was the first. What was the second?<br><strong>2</strong> What is made by the Burton Union system?<br><strong>3</strong> Which hip-hop group took their name from a martial arts film?<br><strong>4</strong> What type of creature is a noble false widow?<br><strong>5</strong> Who fornicated “in another country”?<br><strong>6</strong> José Raúl Capablanca is Cuba’s only world champion at what?<br><strong>7</strong> Which race first appeared in 1963’s The Dead Planet?<br><strong>8</strong> Who might follow the Eightfold Path?<br><strong>What links:</strong><br><strong>9</strong> Virgin Mary; Elizabeth I; Mary II; Zara Tindall?<br><strong>10</strong> Bob Chitty; Mick Jagger; Heath Ledger; George MacKay?<br><strong>11</strong> Iris pseudacorus; hazard, slow down; quarantine?<br><strong>12</strong> Catthorpe Interchange and Gretna junction?<br><strong>13</strong> Borussia Mönchengladbach; Bruges; Real Madrid; Roma; Milan; Tottenham Hotspur?<br><strong>14</strong> Fortune; Curtain; Rose; Swan; Globe?<br><strong>15</strong> Ariel; Marina; Madison?</p>',
				},
				{
					role: 'inline',
					data: {
						alt: 'Close-up of swan',
						caption: 'What links Swan with Globe?',
						credit: 'Photograph: Getty Images',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=58a64a11da340e7fb06cde32a9e090aa',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9a5ccd0582140bc1a058c90169b68ea9',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=4e89de164f5f29997a6a6f28a17e1a2c',
									width: 890,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=85&auto=format&fit=max&s=d0cf17aba9319bc165e52dab201d121c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=85&auto=format&fit=max&s=c4e84de727ee57e812f90015d3920b6d',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=85&auto=format&fit=max&s=7c5b29a9a40d626257e7d1570ca8a83b',
									width: 445,
								},
							],
						},
						{
							weighting: 'thumbnail',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=140&quality=85&auto=format&fit=max&s=ba40d173eca60d739c3315866fb4a184',
									width: 140,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=73589e2b5f0439ada8b94a2b1735b15b',
									width: 280,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=120&quality=85&auto=format&fit=max&s=bd870171635eb5cd65cc9c4cf604d6b4',
									width: 120,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=d390b35712ad43640ac5dd61b18c455f',
									width: 240,
								},
							],
						},
						{
							weighting: 'supporting',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=380&quality=85&auto=format&fit=max&s=89703d4a0d91de00c40f29f950f1563c',
									width: 380,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=e28dff224c9fafa556e4afb88e0e7f51',
									width: 760,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=300&quality=85&auto=format&fit=max&s=3ca9c4f3ccd8fcee086f218a2b7e606d',
									width: 300,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=9c629cc909b74beb51bc2c7181ed268d',
									width: 600,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=85&auto=format&fit=max&s=d0cf17aba9319bc165e52dab201d121c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=58a64a11da340e7fb06cde32a9e090aa',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=85&auto=format&fit=max&s=c4e84de727ee57e812f90015d3920b6d',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9a5ccd0582140bc1a058c90169b68ea9',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=85&auto=format&fit=max&s=7c5b29a9a40d626257e7d1570ca8a83b',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=4e89de164f5f29997a6a6f28a17e1a2c',
									width: 890,
								},
							],
						},
						{
							weighting: 'showcase',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=860&quality=85&auto=format&fit=max&s=731ed2d247de162747f8fbc6dd01c3e1',
									width: 860,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=300f227cf30224785090487ed1e9a50c',
									width: 1720,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=780&quality=85&auto=format&fit=max&s=db25e2e6cf1500c8734ace87faa9bc2d',
									width: 780,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=9fd7b395cc76f56c43324fa4c87c2c51',
									width: 1560,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=85&auto=format&fit=max&s=d0cf17aba9319bc165e52dab201d121c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=58a64a11da340e7fb06cde32a9e090aa',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=85&auto=format&fit=max&s=c4e84de727ee57e812f90015d3920b6d',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9a5ccd0582140bc1a058c90169b68ea9',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=85&auto=format&fit=max&s=7c5b29a9a40d626257e7d1570ca8a83b',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=4e89de164f5f29997a6a6f28a17e1a2c',
									width: 890,
								},
							],
						},
						{
							weighting: 'halfwidth',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=85&auto=format&fit=max&s=d0cf17aba9319bc165e52dab201d121c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=58a64a11da340e7fb06cde32a9e090aa',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=85&auto=format&fit=max&s=c4e84de727ee57e812f90015d3920b6d',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9a5ccd0582140bc1a058c90169b68ea9',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=85&auto=format&fit=max&s=7c5b29a9a40d626257e7d1570ca8a83b',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=4e89de164f5f29997a6a6f28a17e1a2c',
									width: 890,
								},
							],
						},
						{
							weighting: 'immersive',
							srcSet: [
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=85&auto=format&fit=max&s=d0cf17aba9319bc165e52dab201d121c',
									width: 620,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=58a64a11da340e7fb06cde32a9e090aa',
									width: 1240,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=85&auto=format&fit=max&s=c4e84de727ee57e812f90015d3920b6d',
									width: 605,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=9a5ccd0582140bc1a058c90169b68ea9',
									width: 1210,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=85&auto=format&fit=max&s=7c5b29a9a40d626257e7d1570ca8a83b',
									width: 445,
								},
								{
									src:
										'https://i.guim.co.uk/img/media/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=4e89de164f5f29997a6a6f28a17e1a2c',
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
								fields: { height: '2666', width: '4445' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/4445.jpg',
							},
							{
								index: 1,
								fields: {
									isMaster: 'true',
									height: '2666',
									width: '4445',
								},
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/master/4445.jpg',
							},
							{
								index: 2,
								fields: { height: '1200', width: '2000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/2000.jpg',
							},
							{
								index: 3,
								fields: { height: '600', width: '1000' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/1000.jpg',
							},
							{
								index: 4,
								fields: { height: '300', width: '500' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/500.jpg',
							},
							{
								index: 5,
								fields: { height: '84', width: '140' },
								mediaType: 'Image',
								mimeType: 'image/jpeg',
								url:
									'https://media.guim.co.uk/ca6dfa54776a703775a5da4d94f4299745cce567/0_139_4445_2666/140.jpg',
							},
						],
					},
					displayCredit: true,
				},
				{
					_type:
						'model.dotcomrendering.pageElements.SubheadingBlockElement',
					html: '<h2><strong>The answers</strong></h2>',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.TextBlockElement',
					html:
						'<p><strong>1</strong> Concorde (supersonic airliner).<br><strong>2</strong> Beer.<br><strong>3</strong> Wu-Tang Clan.<br><strong>4</strong> Spider.<br><strong>5</strong> Barabas (in Marlowe’s play The Jew Of Malta).<br><strong>6</strong> Chess.<br><strong>7</strong> The Daleks (Doctor Who).<br><strong>8</strong> Buddhists.<br><strong>9</strong> Daughters of Anne: St Anne; Anne Boleyn; Anne Hyde; Princess Anne.<br><strong>10</strong> Played Ned Kelly on film.<br><strong>11</strong> Yellow flag: flower nickname; F1 warning flag; historical maritime flag.<br><strong>12</strong> Start/end of M6 motorway.<br><strong>13</strong> Beaten by Liverpool in European Cup finals.<br><strong>14</strong> Tudor/Elizabethan/Stuart playhouses in London.<br><strong>15</strong> Film &amp; TV mermaids: Disney’s Little Mermaid; Stingray; Splash.</p>',
				},
			],
			blockCreatedOn: 1578322142000,
			blockCreatedOnDisplay: '14:49 GMT',
			blockLastUpdated: 1579007736000,
			blockLastUpdatedDisplay: '13:15 GMT',
			blockFirstPublished: 1579007705000,
			blockFirstPublishedDisplay: '13:15 GMT',
			primaryDateLine: 'Wed 19 Aug 2020 06.02 BST',
			secondaryDateLine: 'Wed 19 Aug 2020 11.52 BST',
		},
	],
	author: { byline: 'Thomas Eaton' },
	designType: 'Quiz',
	linkedData: [
		{
			'@type': 'NewsArticle',
			'@context': 'https://schema.org',
			'@id':
				'https://amp.theguardian.com/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
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
				'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a9f4203d78893ad8aba330be6fa8454',
				'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2e2589ce44d98ca4e3755d509183d992',
				'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=1b86f790176e11ed775ce1f735ce9db6',
				'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=1200&quality=85&auto=format&fit=max&s=51aadbfe9f042454e3a8c6241eb4ff4f',
			],
			author: [
				{
					'@type': 'Person',
					name: 'Thomas Eaton',
					sameAs: 'https://www.theguardian.com/profile/thomas-eaton',
				},
			],
			datePublished: '2020-01-18T07:00:23.000Z',
			headline:
				'Which hip-hop group was named after a martial arts film?',
			dateModified: '2020-01-18T07:00:23.000Z',
			mainEntityOfPage:
				'https://www.theguardian.com/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
		},
		{
			'@type': 'WebPage',
			'@context': 'https://schema.org',
			'@id':
				'https://www.theguardian.com/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
			potentialAction: {
				'@type': 'ViewAction',
				target:
					'android-app://com.guardian/https/www.theguardian.com/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
			},
		},
	],
	webPublicationDateDisplay: 'Sat 18 Jan 2020 07.00 GMT',
	editionId: 'UK',
	shouldHideAds: false,
	standfirst:
		'<p>From Heath Ledger to Borussia Mönchengladbach, test your knowledge with the Weekend quiz</p>',
	webTitle: 'Which hip-hop group was named after a martial arts film?',
	openGraphData: {
		'og:url':
			'http://www.theguardian.com/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
		'article:author': 'https://www.theguardian.com/profile/thomas-eaton',
		'og:image:height': '720',
		'og:description':
			'From Heath Ledger to Borussia Mönchengladbach, test your knowledge with the Weekend quiz',
		'og:image:width': '1200',
		'og:image':
			'https://i.guim.co.uk/img/media/508dd31381944b13108f793a244821f78384f4f5/190_221_2146_1288/master/2146.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5a9f4203d78893ad8aba330be6fa8454',
		'al:ios:url':
			'gnmguardian://lifeandstyle/2020/jan/18/the-quiz-thomas-eaton?contenttype=Article&source=applinks',
		'article:publisher': 'https://www.facebook.com/theguardian',
		'og:type': 'article',
		'al:ios:app_store_id': '409128287',
		'article:section': 'Life and style',
		'article:published_time': '2020-01-18T07:00:23.000Z',
		'og:title': 'Which hip-hop group was named after a martial arts film?',
		'fb:app_id': '180444840287',
		'article:tag': 'Life and style',
		'al:ios:app_name': 'The Guardian',
		'og:site_name': 'the Guardian',
		'article:modified_time': '2020-01-18T07:00:23.000Z',
	},
	sectionUrl: 'lifeandstyle/lifeandstyle',
	pageId: 'lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
	version: 3,
	tags: [
		{
			id: 'theguardian/series/the-quiz-thomas-eaton',
			type: 'Series',
			title: 'The quiz',
		},
		{ id: 'tone/quizzes', type: 'Tone', title: 'Quizzes' },
		{
			id: 'lifeandstyle/lifeandstyle',
			type: 'Keyword',
			title: 'Life and style',
		},
		{ id: 'type/article', type: 'Type', title: 'Article' },
		{
			id: 'profile/thomas-eaton',
			type: 'Contributor',
			title: 'Thomas Eaton',
		},
		{
			id: 'publication/theguardian',
			type: 'Publication',
			title: 'The Guardian',
		},
		{ id: 'theguardian/weekend', type: 'NewspaperBook', title: 'Weekend' },
		{
			id: 'theguardian/weekend/back',
			type: 'NewspaperBookSection',
			title: 'Back',
		},
		{
			id: 'tracking/commissioningdesk/weekend',
			type: 'Tracking',
			title: 'UK Weekend',
		},
	],
	pillar: 'lifestyle',
	isCommentable: true,
	webURL:
		'https://www.theguardian.com/lifeandstyle/2020/jan/18/the-quiz-thomas-eaton',
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
	sectionLabel: 'Life and style',
	isSpecialReport: false,
};
