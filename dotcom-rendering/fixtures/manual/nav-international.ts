import type { FENavType } from '../../src/types/frontend';
/** `xhs https://www.theguardian.com/international.json\?dcr | jq .nav | pbcopy` */
export const navInternational = {
	currentUrl: '/',
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
					children: [
						{
							title: 'UK politics',
							url: '/politics',
						},
						{
							title: 'Education',
							url: '/education',
							children: [
								{
									title: 'Schools',
									url: '/education/schools',
								},
								{
									title: 'Teachers',
									url: '/teacher-network',
								},
								{
									title: 'Universities',
									url: '/education/universities',
								},
								{
									title: 'Students',
									url: '/education/students',
								},
							],
						},
						{
							title: 'Media',
							url: '/media',
						},
						{
							title: 'Society',
							url: '/society',
						},
						{
							title: 'Law',
							url: '/law',
						},
						{
							title: 'Scotland',
							url: '/uk/scotland',
						},
						{
							title: 'Wales',
							url: '/uk/wales',
						},
						{
							title: 'Northern Ireland',
							url: '/uk/northernireland',
						},
					],
				},
				{
					title: 'World',
					url: '/world',
					longTitle: 'World news',
					children: [
						{
							title: 'Europe',
							url: '/world/europe-news',
						},
						{
							title: 'US',
							url: '/us-news',
							longTitle: 'US news',
						},
						{
							title: 'Americas',
							url: '/world/americas',
						},
						{
							title: 'Asia',
							url: '/world/asia',
						},
						{
							title: 'Australia',
							url: '/australia-news',
							longTitle: 'Australia news',
						},
						{
							title: 'Middle East',
							url: '/world/middleeast',
						},
						{
							title: 'Africa',
							url: '/world/africa',
						},
						{
							title: 'Inequality',
							url: '/inequality',
						},
						{
							title: 'Global development',
							url: '/global-development',
						},
					],
				},
				{
					title: 'Climate crisis',
					url: '/environment/climate-crisis',
				},
				{
					title: 'Ukraine',
					url: '/world/ukraine',
				},
				{
					title: 'Football',
					url: '/football',
					children: [
						{
							title: 'Live scores',
							url: '/football/live',
							longTitle: 'football/live',
						},
						{
							title: 'Tables',
							url: '/football/tables',
							longTitle: 'football/tables',
						},
						{
							title: 'Fixtures',
							url: '/football/fixtures',
							longTitle: 'football/fixtures',
						},
						{
							title: 'Results',
							url: '/football/results',
							longTitle: 'football/results',
						},
						{
							title: 'Competitions',
							url: '/football/competitions',
							longTitle: 'football/competitions',
						},
						{
							title: 'Clubs',
							url: '/football/teams',
							longTitle: 'football/teams',
						},
					],
				},
				{
					title: 'Newsletters',
					url: '/email-newsletters',
				},
				{
					title: 'Business',
					url: '/business',
					children: [
						{
							title: 'Economics',
							url: '/business/economics',
						},
						{
							title: 'Banking',
							url: '/business/banking',
						},
						{
							title: 'Money',
							url: '/money',
							children: [
								{
									title: 'Property',
									url: '/money/property',
								},
								{
									title: 'Pensions',
									url: '/money/pensions',
								},
								{
									title: 'Savings',
									url: '/money/savings',
								},
								{
									title: 'Borrowing',
									url: '/money/debt',
								},
								{
									title: 'Careers',
									url: '/money/work-and-careers',
								},
							],
						},
						{
							title: 'Markets',
							url: '/business/stock-markets',
						},
						{
							title: 'Project Syndicate',
							url: '/business/series/project-syndicate-economists',
						},
						{
							title: 'B2B',
							url: '/business-to-business',
						},
						{
							title: 'Retail',
							url: '/business/retail',
						},
					],
				},
				{
					title: 'Environment',
					url: '/environment',
					children: [
						{
							title: 'Climate crisis',
							url: '/environment/climate-crisis',
						},
						{
							title: 'Wildlife',
							url: '/environment/wildlife',
						},
						{
							title: 'Energy',
							url: '/environment/energy',
						},
						{
							title: 'Pollution',
							url: '/environment/pollution',
						},
					],
				},
				{
					title: 'UK politics',
					url: '/politics',
				},
				{
					title: 'Education',
					url: '/education',
					children: [
						{
							title: 'Schools',
							url: '/education/schools',
						},
						{
							title: 'Teachers',
							url: '/teacher-network',
						},
						{
							title: 'Universities',
							url: '/education/universities',
						},
						{
							title: 'Students',
							url: '/education/students',
						},
					],
				},
				{
					title: 'Society',
					url: '/society',
				},
				{
					title: 'Science',
					url: '/science',
				},
				{
					title: 'Tech',
					url: '/technology',
				},
				{
					title: 'Global development',
					url: '/global-development',
				},
				{
					title: 'Obituaries',
					url: '/obituaries',
				},
			],
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
				},
				{
					title: 'Columnists',
					url: '/index/contributors',
				},
				{
					title: 'Cartoons',
					url: '/tone/cartoons',
				},
				{
					title: 'Opinion videos',
					url: '/type/video+tone/comment',
				},
				{
					title: 'Letters',
					url: '/tone/letters',
				},
			],
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
					children: [
						{
							title: 'Live scores',
							url: '/football/live',
							longTitle: 'football/live',
						},
						{
							title: 'Tables',
							url: '/football/tables',
							longTitle: 'football/tables',
						},
						{
							title: 'Fixtures',
							url: '/football/fixtures',
							longTitle: 'football/fixtures',
						},
						{
							title: 'Results',
							url: '/football/results',
							longTitle: 'football/results',
						},
						{
							title: 'Competitions',
							url: '/football/competitions',
							longTitle: 'football/competitions',
						},
						{
							title: 'Clubs',
							url: '/football/teams',
							longTitle: 'football/teams',
						},
					],
				},
				{
					title: 'Cricket',
					url: '/sport/cricket',
				},
				{
					title: 'Rugby union',
					url: '/sport/rugby-union',
				},
				{
					title: 'Tennis',
					url: '/sport/tennis',
				},
				{
					title: 'Cycling',
					url: '/sport/cycling',
				},
				{
					title: 'F1',
					url: '/sport/formulaone',
				},
				{
					title: 'Golf',
					url: '/sport/golf',
				},
				{
					title: 'Boxing',
					url: '/sport/boxing',
				},
				{
					title: 'Rugby league',
					url: '/sport/rugbyleague',
				},
				{
					title: 'Racing',
					url: '/sport/horse-racing',
				},
				{
					title: 'US sports',
					url: '/sport/us-sport',
				},
			],
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
				},
				{
					title: 'Music',
					url: '/music',
				},
				{
					title: 'TV & radio',
					url: '/tv-and-radio',
				},
				{
					title: 'Books',
					url: '/books',
				},
				{
					title: 'Art & design',
					url: '/artanddesign',
				},
				{
					title: 'Stage',
					url: '/stage',
				},
				{
					title: 'Games',
					url: '/games',
				},
				{
					title: 'Classical',
					url: '/music/classicalmusicandopera',
				},
			],
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
				},
				{
					title: 'Food',
					url: '/food',
				},
				{
					title: 'Recipes',
					url: '/tone/recipes',
				},
				{
					title: 'Travel',
					url: '/travel',
					children: [
						{
							title: 'UK',
							url: '/travel/uk',
						},
						{
							title: 'Europe',
							url: '/travel/europe',
						},
						{
							title: 'US',
							url: '/travel/usa',
						},
					],
				},
				{
					title: 'Health & fitness',
					url: '/lifeandstyle/health-and-wellbeing',
				},
				{
					title: 'Women',
					url: '/lifeandstyle/women',
				},
				{
					title: 'Men',
					url: '/lifeandstyle/men',
				},
				{
					title: 'Love & sex',
					url: '/lifeandstyle/love-and-sex',
				},
				{
					title: 'Beauty',
					url: '/fashion/beauty',
				},
				{
					title: 'Home & garden',
					url: '/lifeandstyle/home-and-garden',
				},
				{
					title: 'Money',
					url: '/money',
					children: [
						{
							title: 'Property',
							url: '/money/property',
						},
						{
							title: 'Pensions',
							url: '/money/pensions',
						},
						{
							title: 'Savings',
							url: '/money/savings',
						},
						{
							title: 'Borrowing',
							url: '/money/debt',
						},
						{
							title: 'Careers',
							url: '/money/work-and-careers',
						},
					],
				},
				{
					title: 'Cars',
					url: '/technology/motoring',
				},
			],
		},
	],
	otherLinks: [
		{
			title: 'The Guardian app',
			url: 'https://app.adjust.com/16xt6hai',
		},
		{
			title: 'Video',
			url: '/video',
		},
		{
			title: 'Podcasts',
			url: '/podcasts',
		},
		{
			title: 'Pictures',
			url: '/inpictures',
		},
		{
			title: 'Newsletters',
			url: '/email-newsletters',
		},
		{
			title: "Today's paper",
			url: '/theguardian',
			children: [
				{
					title: 'Obituaries',
					url: '/obituaries',
				},
				{
					title: 'G2',
					url: '/theguardian/g2',
				},
				{
					title: 'Journal',
					url: '/theguardian/journal',
				},
				{
					title: 'Saturday',
					url: '/theguardian/saturday',
				},
			],
		},
		{
			title: 'Inside the Guardian',
			url: 'https://www.theguardian.com/membership',
		},
		{
			title: 'The Observer',
			url: '/observer',
			children: [
				{
					title: 'Comment',
					url: '/theobserver/news/comment',
				},
				{
					title: 'The New Review',
					url: '/theobserver/new-review',
				},
				{
					title: 'Observer Magazine',
					url: '/theobserver/magazine',
				},
				{
					title: 'Observer Food Monthly',
					url: '/theobserver/foodmonthly',
				},
			],
		},
		{
			title: 'Guardian Weekly',
			url: 'https://www.theguardian.com/weekly?INTCMP=gdnwb_mawns_editorial_gweekly_GW_TopNav_UK',
		},
		{
			title: 'Crosswords',
			url: '/crosswords',
			children: [
				{
					title: 'Blog',
					url: '/crosswords/crossword-blog',
				},
				{
					title: 'Quick',
					url: '/crosswords/series/quick',
				},
				{
					title: 'Speedy',
					url: '/crosswords/series/speedy',
				},
				{
					title: 'Quick cryptic',
					url: '/crosswords/series/quick-cryptic',
				},
				{
					title: 'Everyman',
					url: '/crosswords/series/everyman',
				},
				{
					title: 'Quiptic',
					url: '/crosswords/series/quiptic',
				},
				{
					title: 'Cryptic',
					url: '/crosswords/series/cryptic',
				},
				{
					title: 'Prize',
					url: '/crosswords/series/prize',
				},
				{
					title: 'Azed',
					url: '/crosswords/series/azed',
				},
				{
					title: 'Genius',
					url: '/crosswords/series/genius',
				},
				{
					title: 'Weekend',
					url: '/crosswords/series/weekend-crossword',
				},
			],
		},
		{
			title: 'Wordiply',
			url: 'https://www.wordiply.com',
		},
		{
			title: 'Corrections',
			url: '/theguardian/series/corrections-and-clarifications',
		},
	],
	brandExtensions: [
		{
			title: 'Search jobs',
			url: 'https://jobs.theguardian.com',
		},
		{
			title: 'Hire with Guardian Jobs',
			url: 'https://recruiters.theguardian.com/?utm_source=gdnwb&utm_medium=navbar&utm_campaign=Guardian_Navbar_Recruiters&CMP_TU=trdmkt&CMP_BUNIT=jobs',
		},
		{
			title: 'Holidays',
			url: 'https://holidays.theguardian.com?INTCMP=holidays_uk_web_newheader',
		},
		{
			title: 'Live events',
			url: 'https://www.theguardian.com/guardian-live-events?INTCMP=live_uk_header_dropdown',
		},
		{
			title: 'About Us',
			url: '/about',
		},
		{
			title: 'Digital Archive',
			url: 'https://theguardian.newspapers.com',
		},
		{
			title: 'Guardian Print Shop',
			url: '/artanddesign/series/gnm-print-sales',
		},
		{
			title: 'Patrons',
			url: 'https://patrons.theguardian.com/?INTCMP=header_patrons',
		},
		{
			title: 'Guardian Licensing',
			url: 'https://licensing.theguardian.com/',
		},
	],
	currentNavLinkTitle: 'News',
	currentPillarTitle: 'News',
	subNavSections: {
		links: [
			{
				title: 'UK',
				url: '/uk-news',
				longTitle: 'UK news',
				children: [
					{
						title: 'UK politics',
						url: '/politics',
					},
					{
						title: 'Education',
						url: '/education',
						children: [
							{
								title: 'Schools',
								url: '/education/schools',
							},
							{
								title: 'Teachers',
								url: '/teacher-network',
							},
							{
								title: 'Universities',
								url: '/education/universities',
							},
							{
								title: 'Students',
								url: '/education/students',
							},
						],
					},
					{
						title: 'Media',
						url: '/media',
					},
					{
						title: 'Society',
						url: '/society',
					},
					{
						title: 'Law',
						url: '/law',
					},
					{
						title: 'Scotland',
						url: '/uk/scotland',
					},
					{
						title: 'Wales',
						url: '/uk/wales',
					},
					{
						title: 'Northern Ireland',
						url: '/uk/northernireland',
					},
				],
			},
			{
				title: 'World',
				url: '/world',
				longTitle: 'World news',
				children: [
					{
						title: 'Europe',
						url: '/world/europe-news',
					},
					{
						title: 'US',
						url: '/us-news',
						longTitle: 'US news',
					},
					{
						title: 'Americas',
						url: '/world/americas',
					},
					{
						title: 'Asia',
						url: '/world/asia',
					},
					{
						title: 'Australia',
						url: '/australia-news',
						longTitle: 'Australia news',
					},
					{
						title: 'Middle East',
						url: '/world/middleeast',
					},
					{
						title: 'Africa',
						url: '/world/africa',
					},
					{
						title: 'Inequality',
						url: '/inequality',
					},
					{
						title: 'Global development',
						url: '/global-development',
					},
				],
			},
			{
				title: 'Climate crisis',
				url: '/environment/climate-crisis',
			},
			{
				title: 'Ukraine',
				url: '/world/ukraine',
			},
			{
				title: 'Football',
				url: '/football',
				children: [
					{
						title: 'Live scores',
						url: '/football/live',
						longTitle: 'football/live',
					},
					{
						title: 'Tables',
						url: '/football/tables',
						longTitle: 'football/tables',
					},
					{
						title: 'Fixtures',
						url: '/football/fixtures',
						longTitle: 'football/fixtures',
					},
					{
						title: 'Results',
						url: '/football/results',
						longTitle: 'football/results',
					},
					{
						title: 'Competitions',
						url: '/football/competitions',
						longTitle: 'football/competitions',
					},
					{
						title: 'Clubs',
						url: '/football/teams',
						longTitle: 'football/teams',
					},
				],
			},
			{
				title: 'Newsletters',
				url: '/email-newsletters',
			},
			{
				title: 'Business',
				url: '/business',
				children: [
					{
						title: 'Economics',
						url: '/business/economics',
					},
					{
						title: 'Banking',
						url: '/business/banking',
					},
					{
						title: 'Money',
						url: '/money',
						children: [
							{
								title: 'Property',
								url: '/money/property',
							},
							{
								title: 'Pensions',
								url: '/money/pensions',
							},
							{
								title: 'Savings',
								url: '/money/savings',
							},
							{
								title: 'Borrowing',
								url: '/money/debt',
							},
							{
								title: 'Careers',
								url: '/money/work-and-careers',
							},
						],
					},
					{
						title: 'Markets',
						url: '/business/stock-markets',
					},
					{
						title: 'Project Syndicate',
						url: '/business/series/project-syndicate-economists',
					},
					{
						title: 'B2B',
						url: '/business-to-business',
					},
					{
						title: 'Retail',
						url: '/business/retail',
					},
				],
			},
			{
				title: 'Environment',
				url: '/environment',
				children: [
					{
						title: 'Climate crisis',
						url: '/environment/climate-crisis',
					},
					{
						title: 'Wildlife',
						url: '/environment/wildlife',
					},
					{
						title: 'Energy',
						url: '/environment/energy',
					},
					{
						title: 'Pollution',
						url: '/environment/pollution',
					},
				],
			},
			{
				title: 'UK politics',
				url: '/politics',
			},
			{
				title: 'Education',
				url: '/education',
				children: [
					{
						title: 'Schools',
						url: '/education/schools',
					},
					{
						title: 'Teachers',
						url: '/teacher-network',
					},
					{
						title: 'Universities',
						url: '/education/universities',
					},
					{
						title: 'Students',
						url: '/education/students',
					},
				],
			},
			{
				title: 'Society',
				url: '/society',
			},
			{
				title: 'Science',
				url: '/science',
			},
			{
				title: 'Tech',
				url: '/technology',
			},
			{
				title: 'Global development',
				url: '/global-development',
			},
			{
				title: 'Obituaries',
				url: '/obituaries',
			},
		],
	},
	readerRevenueLinks: {
		header: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=header_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=header_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=header_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_supporter_cta%22%7D',
		},
		footer: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=footer_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=footer_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=footer_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=footer_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_supporter_cta%22%7D',
		},
		sideMenu: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=side_menu_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=side_menu_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=side_menu_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=mobilenav_print_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22mobilenav_print_cta%22%7D',
		},
		ampHeader: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=header_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=amp_header_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22amp_header_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=header_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_supporter_cta%22%7D',
		},
		ampFooter: {
			contribute:
				'https://support.theguardian.com/contribute?INTCMP=amp_footer_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_support_contribute%22%7D',
			subscribe:
				'https://support.theguardian.com/subscribe?INTCMP=amp_footer_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_support_subscribe%22%7D',
			support:
				'https://support.theguardian.com?INTCMP=footer_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support%22%7D',
			supporter:
				'https://support.theguardian.com/subscribe?INTCMP=amp_footer_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_supporter_cta%22%7D',
		},
	},
} satisfies FENavType;
