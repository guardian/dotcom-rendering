/**
 * DO NOT EDIT THIS FILE!
 *
 * This file was automatically generated using the gen-fixtures.js script. Any edits
 * you make here will be lost.
 *
 * If the data in these fixtures is not what you expect then
 *
 * 1. Refresh the data using 'make gen-fixtures' or
 * 2. if the latest live data is not what you need, then consider editing
 *    gen-fixtures.js directly.
 */

import type { FEFootballDataPage } from '../../src/feFootballDataPage';

export const footballData: FEFootballDataPage = {
	matchesList: [
		{
			date: '2025-02-14',
			competitionMatches: [
				{
					competitionSummary: {
						id: '100',
						url: '/football/premierleague',
						fullName: 'Premier League',
						nation: 'English',
					},
					matches: [
						{
							id: '4478426',
							date: '2025-02-14T20:00:00Z[Europe/London]',
							stage: {
								stageNumber: '1',
							},
							round: {
								roundNumber: '1',
								name: 'League',
							},
							leg: '1',
							homeTeam: {
								id: '6795',
								name: 'Brighton',
							},
							awayTeam: {
								id: '4',
								name: 'Chelsea',
							},
							venue: {
								id: '1536',
								name: 'The American Express Community Stadium',
							},
							type: 'Fixture',
						},
					],
				},
				{
					competitionSummary: {
						id: '625',
						url: '/football/bundesligafootball',
						fullName: 'Bundesliga',
						nation: 'European',
					},
					matches: [
						{
							id: '4484272',
							date: '2025-02-14T19:30:00Z[Europe/London]',
							stage: {
								stageNumber: '1',
							},
							round: {
								roundNumber: '1',
								name: 'League',
							},
							leg: '1',
							homeTeam: {
								id: '32656',
								name: 'Augsburg',
							},
							awayTeam: {
								id: '61019',
								name: 'RB Leipzig',
							},
							venue: {
								id: '1371',
								name: 'WWK Arena',
							},
							type: 'Fixture',
						},
					],
				},
				{
					competitionSummary: {
						id: '635',
						url: '/football/serieafootball',
						fullName: 'Serie A',
						nation: 'European',
					},
					matches: [
						{
							id: '4486775',
							date: '2025-02-14T19:45:00Z[Europe/London]',
							stage: {
								stageNumber: '1',
							},
							round: {
								roundNumber: '1',
								name: 'League',
							},
							leg: '1',
							homeTeam: {
								id: '26371',
								name: 'Bologna',
							},
							awayTeam: {
								id: '27038',
								name: 'Torino',
							},
							venue: {
								id: '419',
								name: "Renato Dall'Ara",
							},
							type: 'Fixture',
						},
					],
				},
				{
					competitionSummary: {
						id: '650',
						url: '/football/laligafootball',
						fullName: 'La Liga',
						nation: 'European',
					},
					matches: [
						{
							id: '4486653',
							date: '2025-02-14T20:00:00Z[Europe/London]',
							stage: {
								stageNumber: '1',
							},
							round: {
								roundNumber: '1',
								name: 'League',
							},
							leg: '1',
							homeTeam: {
								id: '27832',
								name: 'Girona',
							},
							awayTeam: {
								id: '37459',
								name: 'Getafe',
							},
							venue: {
								id: '236',
								name: 'Montilivi',
							},
							type: 'Fixture',
						},
					],
				},
				{
					competitionSummary: {
						id: '620',
						url: '/football/ligue1football',
						fullName: 'Ligue 1',
						nation: 'European',
					},
					matches: [
						{
							id: '4487176',
							date: '2025-02-14T19:45:00Z[Europe/London]',
							stage: {
								stageNumber: '1',
							},
							round: {
								roundNumber: '1',
								name: 'League',
							},
							leg: '1',
							homeTeam: {
								id: '27099',
								name: 'Brest',
							},
							awayTeam: {
								id: '26348',
								name: 'Auxerre',
							},
							venue: {
								id: '143',
								name: 'Stade Francis-Le Ble',
							},
							type: 'Fixture',
						},
					],
				},
				{
					competitionSummary: {
						id: '101',
						url: '/football/championship',
						fullName: 'Championship',
						nation: 'English',
					},
					matches: [
						{
							id: '4475296',
							date: '2025-02-14T20:00:00Z[Europe/London]',
							stage: {
								stageNumber: '1',
							},
							round: {
								roundNumber: '1',
								name: 'League',
							},
							leg: '1',
							homeTeam: {
								id: '16',
								name: 'QPR',
							},
							awayTeam: {
								id: '7',
								name: 'Derby',
							},
							venue: {
								id: '48',
								name: 'Loftus Road',
							},
							type: 'Fixture',
						},
					],
				},
			],
		},
	],
	nav: {
		currentUrl: '/football/live',
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
						title: 'US politics',
						url: '/us-news/us-politics',
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
						title: 'Middle East',
						url: '/world/middleeast',
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
						title: 'The Filter',
						url: '/uk/thefilter',
					},
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
				url: 'https://www.theguardian.com/insidetheguardian',
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
					{
						title: 'Special',
						url: '/crosswords/series/special',
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
		currentNavLinkTitle: 'Live scores',
		currentPillarTitle: 'Sport',
		subNavSections: {
			parent: {
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
			links: [
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
	},
	editionId: 'UK',
	guardianBaseURL: 'https://www.theguardian.com',
	config: {
		switches: {
			lightbox: true,
			abPrebidKeywords: true,
			personaliseSignInGateAfterCheckout: true,
			abSignInGateMainVariant: true,
			prebidAppnexusUkRow: true,
			prebidMagnite: true,
			commercialMetrics: true,
			prebidTrustx: true,
			scAdFreeBanner: false,
			adaptiveSite: true,
			prebidPermutiveAudience: true,
			compareVariantDecision: false,
			enableSentryReporting: true,
			lazyLoadContainers: true,
			ampArticleSwitch: false,
			remarketing: true,
			articleEndSlot: true,
			keyEventsCarousel: true,
			registerWithPhone: false,
			darkModeWeb: true,
			targeting: true,
			remoteHeader: true,
			slotBodyEnd: true,
			ampPrebidOzone: false,
			extendedMostPopularFronts: true,
			emailInlineInFooter: true,
			showNewPrivacyWordingOnEmailSignupEmbeds: true,
			prebidAnalytics: true,
			extendedMostPopular: true,
			ampContentAbTesting: false,
			prebidCriteo: true,
			okta: true,
			imrWorldwide: true,
			acast: true,
			twitterUwt: true,
			abAuxiaSignInGate: false,
			abDeferPermutiveLoad: false,
			prebidAppnexusInvcode: true,
			ampPrebidPubmatic: false,
			a9HeaderBidding: true,
			prebidAppnexus: true,
			enableDiscussionSwitch: true,
			prebidXaxis: true,
			stickyVideos: true,
			interactiveFullHeaderSwitch: true,
			discussionAllPageSize: true,
			prebidUserSync: true,
			audioOnwardJourneySwitch: true,
			brazeTaylorReport: false,
			externalVideoEmbeds: true,
			abTheTradeDesk: true,
			callouts: true,
			sentinelLogger: true,
			geoMostPopular: true,
			weAreHiring: false,
			relatedContent: true,
			thirdPartyEmbedTracking: true,
			prebidOzone: true,
			ampLiveblogSwitch: false,
			ampAmazon: false,
			prebidAdYouLike: true,
			mostViewedFronts: true,
			optOutAdvertising: true,
			abSignInGateMainControl: true,
			googleSearch: true,
			abOptOutFrequencyCap: true,
			brazeSwitch: true,
			prebidKargo: true,
			consentManagement: true,
			idProfileNavigation: true,
			confiantAdVerification: true,
			discussionAllowAnonymousRecommendsSwitch: false,
			dcrCrosswords: true,
			absoluteServerTimes: false,
			permutive: true,
			comscore: true,
			ampPrebidCriteo: false,
			prebidTheTradeDesk: true,
			loopVideoTest: false,
			newsletterOnwards: false,
			youtubeIma: true,
			webFonts: true,
			liveBlogTopSponsorship: true,
			abAdBlockAsk: false,
			ophan: true,
			crosswordSvgThumbnails: true,
			prebidTriplelift: true,
			prebidPubmatic: true,
			serverShareCounts: false,
			autoRefresh: true,
			enhanceTweets: true,
			prebidIndexExchange: true,
			prebidOpenx: true,
			prebidHeaderBidding: true,
			idCookieRefresh: true,
			discussionPageSize: true,
			smartAppBanner: false,
			historyTags: true,
			brazeContentCards: true,
			remoteBanner: true,
			emailSignupRecaptcha: true,
			prebidSmart: true,
			shouldLoadGoogletag: true,
			inizio: true,
			europeBetaFront: true,
		},
		abTests: {},
		googletagUrl: '//securepubads.g.doubleclick.net/tag/js/gpt.js',
		stage: 'PROD',
		frontendAssetsFullURL: 'https://assets.guim.co.uk/',
		ampIframeUrl:
			'https://assets.guim.co.uk/data/vendor/2533d5cb94302889e6a8f1b24b5329e7/amp-iframe.html',
		googleRecaptchaSiteKey: '6LdzlmsdAAAAALFH63cBVagSFPuuHXQ9OfpIDdMc',
		fbAppId: '180444840287',
		facebookIaAdUnitRoot: 'facebook-instant-articles',
		locationapiurl: '/weatherapi/locations?query=',
		avatarImagesUrl: 'https://avatar.guim.co.uk',
		avatarApiUrl: 'https://avatar.theguardian.com',
		membershipUrl: 'https://membership.theguardian.com',
		ipsosTag: 'football',
		isProd: true,
		membershipAccess: '',
		allowUserGeneratedContent: false,
		forecastsapiurl: '/weatherapi/forecast',
		supportUrl: 'https://support.theguardian.com',
		commercialBundleUrl:
			'https://assets.guim.co.uk/commercial/47e59a6f2531251d895a/graun.standalone.commercial.js',
		idOAuthUrl: 'https://oauth.theguardian.com',
		webTitle: 'Live matches',
		isFront: false,
		idWebAppUrl: 'https://oauth.theguardian.com',
		a9PublisherId: '3722',
		googleSearchUrl: '//www.google.co.uk/cse/cse.js',
		googleSearchId: '007466294097402385199:m2ealvuxh1i',
		idUrl: 'https://profile.theguardian.com',
		hasSurveyAd: false,
		omnitureAmpAccount: 'guardiangu-thirdpartyapps',
		dfpAdUnitRoot: 'theguardian.com',
		host: 'https://www.theguardian.com',
		dfpAccountId: '59666047',
		plistaPublicApiKey: '462925f4f131001fd974bebe',
		dcrSentryDsn:
			'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
		cardStyle: '',
		adUnit: '/59666047/theguardian.com/football/ng',
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		isSensitive: false,
		ophanEmbedJsUrl: '//j.ophan.co.uk/ophan.embed',
		edition: 'UK',
		brazeApiKey: '7f28c639-8bda-48ff-a3f6-24345abfc07c',
		discussionApiClientHeader: 'nextgen',
		section: 'football',
		dfpHost: 'pubads.g.doubleclick.net',
		sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
		pillar: '',
		pageId: 'football/live',
		beaconUrl: '//phar.gu-web.net',
		discussionD2Uid: 'zHoBy6HNKsk',
		ophanJsUrl: '//j.ophan.co.uk/ophan.ng',
		contentType: '',
		isDev: false,
		stripePublicToken: 'pk_live_2O6zPMHXNs2AGea4bAmq5R7Z',
		omnitureAccount: 'guardiangu-network',
		externalEmbedHost: 'https://embed.theguardian.com',
		thirdPartyAppsAccount: 'guardiangu-thirdpartyapps',
		ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
		mobileAppsAdUnitRoot: 'beta-guardian-app',
		hasPageSkin: false,
		requiresMembershipAccess: false,
		revisionNumber: 'DEV',
		optimizeEpicUrl:
			'https://support.theguardian.com/epic/control/index.html',
		assetsPath: 'https://assets.guim.co.uk/',
		mmaUrl: 'https://manage.theguardian.com',
		sentryHost: 'app.getsentry.com/35463',
		buildNumber: 'DEV',
		sharedAdTargeting: {
			ct: 'section',
			url: '/football/live',
			edition: 'uk',
			p: 'ng',
			k: ['live'],
		},
		onwardWebSocket:
			'ws://api.nextgen.guardianapps.co.uk/recently-published',
		shouldHideAdverts: false,
		idApiUrl: 'https://idapi.theguardian.com',
		pbIndexSites: [
			{
				bp: 'D',
				id: 208259,
			},
			{
				bp: 'M',
				id: 213530,
			},
			{
				bp: 'T',
				id: 215465,
			},
		],
		googletagJsUrl: '//securepubads.g.doubleclick.net/tag/js/gpt.js',
		calloutsUrl:
			'https://callouts.guardianapis.com/formstack-campaign/submit',
		isPreview: false,
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
					text: 'Help',
					url: 'https://manage.theguardian.com/help-centre',
					dataLinkName: 'uk : footer : tech feedback',
					extraClasses: 'js-tech-feedback-report',
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
					text: 'Contact us',
					url: '/help/contact-us',
					dataLinkName: 'uk : footer : contact us',
					extraClasses: '',
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
					url: 'https://uploads.guim.co.uk/2024/09/04/Modern_Slavery_Statement_2024_.pdf',
					dataLinkName: 'uk : footer : modern slavery act statement',
					extraClasses: '',
				},
				{
					text: 'Tax strategy',
					url: 'https://uploads.guim.co.uk/2024/08/27/TAX_STRATEGY_FOR_THE_YEAR_ENDED_31_MARCH_2025.pdf',
					dataLinkName: 'uk : footer : tax strategy',
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
					text: 'Newsletters',
					url: '/email-newsletters?INTCMP=DOTCOM_FOOTER_NEWSLETTER_UK',
					dataLinkName: 'uk : footer : newsletters',
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
					url: 'https://jobs.theguardian.com',
					dataLinkName: 'uk : footer : jobs',
					extraClasses: '',
				},
				{
					text: 'Patrons',
					url: 'https://patrons.theguardian.com?INTCMP=footer_patrons',
					dataLinkName: 'uk : footer : patrons',
					extraClasses: '',
				},
			],
		],
	},
	isAdFreeUser: false,
	contributionsServiceUrl: 'https://contributions.guardianapis.com',
	canonicalUrl: 'https://www.theguardian.com/football/live',
};
