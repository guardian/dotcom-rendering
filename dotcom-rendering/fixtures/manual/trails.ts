import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../../src/lib/articleFormat';
import type { DCRFrontCard } from '../../src/types/front';

const defaultCardProps = {
	dataLinkName: 'news | group-0 | card-@1',
	discussionApiUrl:
		'https://discussion.code.dev-theguardian.com/discussion-api',
	format: {
		theme: Pillar.News,
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	},
	isExternalLink: false,
	isImmersive: false,
	mainMedia: undefined,
	showByline: false,
	showLivePlayable: false,
	showQuotedHeadline: false,
	supportingContent: [],
	webPublicationDate: '2019-12-02T09:45:30.000Z',
};

/** Helper to get x number of sublinks */
export const getSublinks = (
	number: number,
	format?: ArticleFormat,
): DCRFrontCard['supportingContent'] =>
	Array.from({ length: number }, (_, i) => ({
		url: 'https://www.theguardian.com',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
			...format,
		},
		headline: `Headline ${i + 1}`,
		kickerText: 'Kicker',
	}));

export const trails: [
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
] = [
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/business/2019/dec/02/directors-climate-disclosures-tci-hedge-fund',
		headline:
			"Punish directors who don't make climate disclosures, says hedge fund",
		byline: 'Julia Kollewe',
		image: {
			src: 'https://media.guim.co.uk/d4124d7bb89be381cbe9d72c849fad136f843086/0_84_4974_2985/master/4974.jpg',
			altText: 'Pollution from a factory',
		},
		format: {
			theme: Pillar.Opinion,
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@1',
		showQuotedHeadline: true,
		supportingContent: getSublinks(3),
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/environment/2019/dec/02/migration-v-climate-europes-new-political-divide',
		headline: "Migration v climate: Europe's new political divide",
		byline: 'Shaun Walker in Budapest',
		image: {
			src: 'https://media.guim.co.uk/e060e9b7c92433b3dfeccc98b9206778cda8b8e8/0_180_6680_4009/master/6680.jpg',
			altText: 'A protest',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Video,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@2',
		mainMedia: {
			type: 'Video',
			id: 'abcdef',
			videoId: 'abcd',
			title: 'some title',
			duration: 378,
			width: 480,
			height: 288,
			origin: 'The Guardian',
			expired: false,
			image: 'https://i.guim.co.uk/img/media/e060e9b7c92433b3dfeccc98b9206778cda8b8e8/0_180_6680_4009/master/6680.jpg?width=600&quality=45&dpr=2&s=none',
		},
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/2019/nov/28/eu-parliament-declares-climate-emergency',
		headline: 'An active live blog',
		byline: 'Jennifer Rankin in Brussels',
		image: {
			src: 'https://media.guim.co.uk/e8de0c5e27a2d92ced64f690daf48fd9b3b5c079/0_0_5101_3061/master/5101.jpg',
			altText: 'A flood',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
		},
		kickerText: 'Live',
		dataLinkName: 'news | group-0 | card-@3',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/environment/2019/nov/27/climate-emergency-world-may-have-crossed-tipping-points',
		headline: 'An inactive live sport blog - as it happened',
		showByline: true,
		byline: 'Damian Carrington Environment editor',
		image: {
			src: 'https://media.guim.co.uk/1774967ff6b9127a43b06c0685d1fd499c965141/98_0_3413_2048/master/3413.jpg',
			altText: 'Some icecaps',
		},
		format: {
			theme: Pillar.Opinion,
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@4',
		showQuotedHeadline: true,
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/2019/nov/26/european-parliament-split-on-declaring-climate-emergency',
		headline: 'European parliament split on declaring climate emergency',
		byline: 'Jennifer Rankin in Brussels',
		image: {
			src: 'https://media.guim.co.uk/6db4a6d23e6e8d78ca6893f14b03e79869b2fef1/0_220_3500_2101/master/3500.jpg',
			altText:
				'Youth for Climate activists stage a protest inside the EU parliament last week',
		},
		dataLinkName: 'news | group-0 | card-@5',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/2019/nov/23/north-pole-explorers-on-thin-ice-as-climate-change-hits-expedition',
		headline:
			'North Pole  explorers on thin ice as climate change hits expedition',
		byline: 'Simon Murphy',
		image: {
			src: 'https://media.guim.co.uk/deb1f0b7f61ebbed2086a55dc34fecb2433a04bc/0_0_6000_3600/master/6000.jpg',
			altText: 'Some icecaps that are proably melting',
		},
		dataLinkName: 'news | group-0 | card-@6',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/environment/2019/oct/25/scientists-glacial-rivers-absorb-carbon-faster-rainforests',
		headline:
			'Glacial rivers absorb carbon faster than rainforests, scientists find',
		byline: 'Leyland Cecco',
		starRating: 4,
		image: {
			src: 'https://media.guim.co.uk/5e8ea90ae9f503aa1c98fd35dbf13235b1207fea/0_490_3264_1958/master/3264.jpg',
			altText: 'Some snowy peaks',
		},
		dataLinkName: 'news | group-0 | card-@7',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/business/2019/oct/20/uk-urges-world-bank-to-channel-more-money-into-tackling-climate-crisis',
		headline:
			'UK urges World Bank to channel more money into tackling climate crisis',
		byline: 'Larry Elliott  in Washington',
		image: {
			src: 'https://media.guim.co.uk/2905d1c09d1a27de1c183dfa5cdcc10c869932d9/0_124_5472_3284/master/5472.jpg',
			altText: 'A polluted pond',
		},
		dataLinkName: 'news | group-0 | card-@8',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/politics/live/2021/feb/17/uk-covid-nationwide-rapid-testing-lockdown-coronavirus-latest-update',
		byline: 'Yohannes Lowe',
		image: {
			src: 'https://media.guim.co.uk/77e960298d4339e047eac5c1986d0f3214f6285d/419_447_4772_2863/master/4772.jpg',
			altText: 'Boris pretending to package covid tests',
		},
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.LiveBlog,
		},
		webPublicationDate: '2021-02-17T12:45:05.000Z',
		headline:
			'UK Covid live: England lockdown to be eased in stages, says PM, amid reports of nationwide mass testing',
		dataLinkName: 'news | group-0 | card-@9',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/2021/feb/17/uk-to-begin-worlds-first-covid-human-challenge-study-within-weeks',
		byline: 'Nicola Davis and agency',
		image: {
			src: 'https://media.guim.co.uk/56d554a7c453dc1040f70453a01fefcb227f2055/0_0_3060_1836/master/3060.jpg',
			altText: 'Covid',
		},
		webPublicationDate: '2021-02-17T10:03:02.000Z',
		headline:
			'UK to infect up to 90 healthy volunteers with Covid in world first trial',
		dataLinkName: 'news | group-0 | card-@10',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/2021/feb/17/scottish-government-inadequately-prepared-for-covid-audit-scotland-report',
		byline: 'Libby Brooks Scotland correspondent',
		image: {
			src: 'https://media.guim.co.uk/df5aea6391e21b5a5d2d25fd9aad81d497f99d42/0_45_3062_1837/master/3062.jpg',
			altText: 'Ambulance',
		},
		webPublicationDate: '2021-02-17T11:11:43.000Z',
		headline:
			'Scottish government inadequately prepared for Covid, says watchdog',
		dataLinkName: 'news | group-0 | card-@11',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/society/2021/feb/16/encouraging-signs-covid-vaccine-over-80s-deaths-fall-england',
		byline: 'Anna Leach, Ashley Kirk and Pamela Duncan',
		image: {
			src: 'https://media.guim.co.uk/5ebec1a8d662f0da39887dae16e4b2720379246e/0_0_5000_3000/master/5000.jpg',
			altText: 'A covid vaccine',
		},
		webPublicationDate: '2021-02-16T16:00:55.000Z',
		headline:
			'‘Encouraging’ signs for Covid vaccine as over-80s deaths fall in England',
		dataLinkName: 'news | group-0 | card-@12',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/2021/feb/16/contact-tracing-alone-has-little-impact-on-curbing-covid-spread-report-finds',
		byline: 'Nicola Davis and Natalie Grover',
		image: {
			src: 'https://media.guim.co.uk/046002abfc13c8cf7f0c40454349eb0e95d842b2/0_147_3884_2331/master/3884.jpg',
			altText: 'Dido Harding',
		},
		webPublicationDate: '2021-02-16T18:22:53.000Z',
		headline:
			'Contact tracing alone has little impact on curbing Covid spread, report finds',
		dataLinkName: 'news | group-0 | card-@1',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/2021/feb/16/covid-almost-2m-more-people-asked-shield-england',
		byline: 'Sarah Boseley Health editor and Aamna Mohdin Community affairs correspondent',
		image: {
			src: 'https://media.guim.co.uk/9e47ac13c7ffc63ee56235e8ef64301d6ed96d03/0_90_3520_2111/master/3520.jpg',
			altText: 'A covid vaccine',
		},
		webPublicationDate: '2021-02-16T16:35:45.000Z',
		headline:
			'Ethnicity and poverty are Covid risk factors, new Oxford modelling tool shows',
		dataLinkName: 'news | group-0 | card-@13',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/politics/live/2021/feb/16/uk-covid-live-coronavirus-sturgeon-return-scottish-schools-latest-updates',
		byline: 'Nicola Slawson',
		image: {
			src: 'https://media.guim.co.uk/c01ad5ee63034e0f478959fc7a705c93debf8ba7/0_220_4104_2462/master/4104.jpg',
			altText: 'A sign warning about covid',
		},
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.LiveBlog,
		},
		webPublicationDate: '2021-02-16T17:00:15.000Z',
		headline:
			'UK Covid: 799 more deaths and 10,625 new cases reported; Scottish schools in phased return from Monday – as it happened',
		dataLinkName: 'news | group-0 | card-@14',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/video/2025/mar/06/how-nanoplastics-are-invading-our-bodies-video-report',
		byline: ' Neelam Tailor, Alex Healey, Ali Assaf, Steve Glew, Ryan Baxter',
		image: {
			src: 'https://media.guim.co.uk/13dd7e5c4ca32a53cd22dfd90ac1845ef5e5d643/91_0_1800_1080/master/1800.jpg',
			altText:
				'Plastics are everywhere, but their smallest fragments – nanoplastics – are making their way into the deepest parts of our bodies, including our brains and breast milk',
		},
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Video,
		},
		webPublicationDate: '2025-03-06T10:14:00.000Z',
		headline: 'How plastics are invading our brain cells – video',
		dataLinkName: 'media | group-0 | card-@11',
		mainMedia: {
			type: 'Video',
			id: '966acc06-a238-4d5f-b477-816eec0476f3',
			videoId: '4JUvvbpx2So',
			duration: 322,
			title: 'How plastics are invading our brain cells – video',
			width: 500,
			height: 300,
			origin: 'The Guardian',
			image: 'https://media.guim.co.uk/13dd7e5c4ca32a53cd22dfd90ac1845ef5e5d643/0_0_1920_1080/1920.jpg',
			expired: false,
		},
		trailText:
			'Plastics are everywhere, but their smallest fragments – nanoplastics – are making their way into the deepest parts of our bodies, including our brains and breast milk',
		supportingContent: [
			{
				format: {
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
					design: ArticleDesign.Standard,
				},
				headline:
					'Edwyn Collins: ‘Could an Orange Juice reunion ever be on the cards? No!’',
				url: '/culture/2025/mar/06/edwyn-collins-could-an-orange-juice-reunion-ever-be-on-the-cards-no',
			},
		],
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/world/2019/nov/28/eu-parliament-declares-climate-emergency',
		headline: 'An active sport blog',
		byline: 'Jennifer Rankin in Brussels',
		image: {
			src: 'https://media.guim.co.uk/e8de0c5e27a2d92ced64f690daf48fd9b3b5c079/0_0_5101_3061/master/5101.jpg',
			altText: 'A flood',
		},
		format: {
			theme: Pillar.Sport,
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@15',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/society/2023/may/30/trans-activists-disrupt-kathleen-stock-speech-at-oxford-union',
		headline:
			'Gender-critical feminist’s speech temporarily stopped after protester glues themself to floor',
		byline: 'Matthew Weaver',
		image: {
			src: 'https://media.guim.co.uk/981abafa6ed4eaabdf7e743e6786aea3d9b7dbb2/0_417_901_540/500.jpg',
			altText: 'Someone who has glued themselves to the floor',
		},
		webPublicationDate: '2023-05-30T09:45:30.000Z',
		dataLinkName: 'news | group-0 | card-@16',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/commentisfree/2023/may/31/price-controls-rishi-sunak-thatcher-prime-minister',
		headline:
			'The prime minister is stubbornly attached to an outdated ideology, but has no plan for adapting to volatile times, says Guardian columnist Rafael Behr',
		byline: 'Rafael Behr',
		image: {
			src: 'https://media.guim.co.uk/c6f821af41bd2d0c7125b9bf335545db1c122a84/0_184_6984_4190/500.jpg',
			altText: 'Rishi Sunak',
		},
		webPublicationDate: '2023-05-30T09:45:30.000Z',
		format: {
			theme: Pillar.Opinion,
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@17',
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/tv-and-radio/2023/may/30/a-revelation-succession-matthew-macfadyen-has-been-a-consummate-shapeshifter',
		headline:
			'From HBO’s hit series to Shakespeare, the stage to Spooks, the actor’s global star status has been sealed',
		byline: 'Caroline Davies',
		image: {
			src: 'https://media.guim.co.uk/5efb440557a0237d92cc5e8c7553106a2826d545/781_288_1137_682/500.jpg',
			altText: 'Matthew Macfadyen',
		},
		webPublicationDate: '2023-05-30T09:45:30.000Z',
		format: {
			theme: Pillar.Culture,
			design: ArticleDesign.Feature,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@18',
		supportingContent: getSublinks(3),
		mainMedia: {
			type: 'Video',
			id: 'abcdef',
			videoId: 'abcd',
			title: 'some title',
			duration: 378,
			width: 480,
			height: 288,
			origin: 'The Guardian',
			expired: false,
			image: 'https://i.guim.co.uk/img/media/e060e9b7c92433b3dfeccc98b9206778cda8b8e8/0_180_6680_4009/master/6680.jpg?width=600&quality=45&dpr=2&s=none',
		},
	},
];

export const audioTrails: [DCRFrontCard, DCRFrontCard] = [
	{
		...defaultCardProps,
		format: { design: 3, display: 0, theme: 0 },
		url: '/news/audio/2025/feb/19/from-the-archive-was-it-inevitable-a-short-history-of-russias-war-on-ukraine-podcast',
		headline:
			'Was it inevitable? A short history of Russia’s war on Ukraine',
		dataLinkName: 'media | group-0 | card-@1',
		trailText:
			'This week, from 2022: To understand the tragedy of this war, it is worth going back beyond the last few weeks and months, and even beyond Vladimir Putin. By Keith Gessen. Read by Andrew McGregor',
		webPublicationDate: '2025-02-19T05:00:25.000Z',
		kickerText: 'The Audio Long Read',
		mainMedia: {
			type: 'Audio',
			duration: '46:12',
			podcastImage: {
				src: 'https://uploads.guim.co.uk/2021/01/22/AudioLongReadJan2021.jpg',
				altText: 'The Audio Long Read',
			},
		},
		image: {
			src: 'https://media.guim.co.uk/3c630f4309d8063a5b849bdcd5e57665f837fe13/0_147_4405_2643/master/4405.jpg',
			altText:
				'A military facility destroyed by shelling near Kyiv, 1 March 2022. Photograph: Genya Savilov/AFP/Getty Images',
		},
	},
	{
		...defaultCardProps,
		format: { design: 3, display: 0, theme: 2 },
		url: '/football/audio/2025/feb/19/celtic-bayern-munich-champions-league-chaos-football-weekly-podcast',
		headline: 'Celtic’s heartbreak and Champions League playoff chaos ',
		dataLinkName: 'media | group-0 | card-@1',
		trailText:
			'Max Rushden is joined by Barry Glendenning, Paul Watson, Nick Ames, Ewan Murray and Jim Burke to discuss the latest Champions League playoff games, Everton’s new ground and much more',
		webPublicationDate: '2025-02-19T14:11:54.000Z',
		kickerText: 'Football Weekly',
		mainMedia: {
			type: 'Audio',
			duration: '54:52',
			podcastImage: {
				src: 'https://uploads.guim.co.uk/2024/08/01/FootballWeekly_FINAL_3000_(1).jpg',
				altText: 'Football Weekly',
			},
		},
		image: {
			src: 'https://media.guim.co.uk/01ded462d3dd730467bdfd652decda4117d925da/0_0_2074_1244/master/2074.jpg',
			altText:
				"TOPSHOT-FBL-EUR-C1-MILAN-FEYENOORD<br>TOPSHOT - Polish referee Szymon Marciniak gives a red card to AC Milan's French defender #19 Theo Hernandez (R) during the UEFA Champions League knockout round play-off second leg football match between AC Milan and Feyenoord at San Siro stadium in Milan, on February 18, 2025. (Photo by Piero CRUCIATTI / AFP) (Photo by PIERO CRUCIATTI/AFP via Getty Images)",
		},
	},
];

export const opinionTrails: [DCRFrontCard, DCRFrontCard] = [
	{
		...defaultCardProps,
		format: { design: 8, display: 0, theme: 1 },
		dataLinkName: 'comment | group-0 | card-@6',
		url: '/commentisfree/2025/apr/28/populists-nigel-farage-reform-chaos-brexit',
		headline:
			'Populists like Farage promise voters a simpler life. In fact, they produce ever more hassle and chaos',
		trailText:
			'Centrists won’t beat Reform UK by echoing its messages. They should emphasise the true unworkability of policies like Brexit, says Guardian columnist Andy Beckett',
		webPublicationDate: '2025-04-28T05:00:53.000Z',
		discussionId: '/p/x253na',
		showQuotedHeadline: true,
		avatarUrl: 'https://uploads.guim.co.uk/2022/09/20/Andy_Beckett_v2.png',
		image: {
			src: 'https://media.guim.co.uk/f55906c2b9116946c778cd1fca808a6dae764d01/0_0_9528_5715/master/9528.jpg',
			altText:
				'Nigel Farage on the campaign trail in Ramsgate, Kent, on 24 April.',
		},
	},
	{
		...defaultCardProps,
		format: { design: 8, display: 0, theme: 1 },
		dataLinkName: 'comment | group-0 | card-@5',
		url: '/commentisfree/2025/apr/28/duttons-comments-show-we-are-back-to-punching-down-on-indigenous-australians-for-attention-and-votes',
		headline:
			'Dutton’s comments show we are back to punching down on Indigenous Australians for attention – and votes',
		trailText:
			'It is disingenuous for politicians to be shocked when people decide to turn words into action, even in the predawn hush of Anzac Day',
		webPublicationDate: '2025-04-28T05:19:42.000Z',
		byline: 'Lorena Allam',
		showQuotedHeadline: true,
	},
];

export const galleryTrails: [DCRFrontCard, DCRFrontCard] = [
	{
		...defaultCardProps,
		format: { design: 2, display: 1, theme: 4 },
		dataLinkName: 'media | group-0 | card-@5',
		url: '/fashion/gallery/2025/feb/01/we-love-fashion-fixes-for-the-week-ahead-in-pictures',
		headline: 'On trend hoods and eye-catching tights',
		trailText:
			'On trend hoods, eye-catching tights and David Beckham models for Boss',
		webPublicationDate: '2025-02-01T23:45:55.000Z',
		kickerText: 'Fashion fixes',
		mainMedia: { type: 'Gallery', count: '6' },
		image: {
			src: 'https://media.guim.co.uk/003d9dbe35c7a64a1e109a38450f3704deaeac24/2_240_3598_2159/master/3598.jpg',
			altText:
				'Barbour X Erdem Dhalia Wax Jacket RRP £519.00 Available at Barbour.com (1)',
		},
	},
	{
		...defaultCardProps,
		format: { design: 2, display: 1, theme: 0 },
		dataLinkName: 'media | group-0 | card-@2',
		url: '/global-development/gallery/2025/feb/07/goma-congolese-photographer-arlette-bashizi-home-city-rwandan-backed-m23-rebels',
		headline: 'The fall of Goma: 16 days of chaos and fear – in pictures',
		trailText:
			'Congolese photographer Arlette Bashizi documented for Reuters the lead-up to and aftermath of the seizure of her home city by Rwandan-backed M23 rebels',
		webPublicationDate: '2025-02-07T05:00:36.000Z',
		kickerText: 'Democratic Republic of the Congo',
		mainMedia: { type: 'Gallery', count: '27' },
		showVideo: false,
		image: {
			src: 'https://media.guim.co.uk/69ac2383ea611126b54373865dac3e7e77981d7e/0_39_5500_3302/master/5500.jpg',
			altText: 'A group of people in the street, some looking worried',
		},
	},
];

export const videoTrails: [DCRFrontCard, DCRFrontCard] = [
	{
		...defaultCardProps,
		format: { design: 4, display: 0, theme: 2 },
		dataLinkName: 'media | group-0 | card-@3',
		url: '/football/video/2024/dec/16/rashford-and-garnacho-omission-from-team-to-push-them-harder-says-amorim-video',
		headline:
			"Rashford and Garnacho omission from team to 'push them harder' says Amorim – video ",
		trailText:
			"Amorim said the team proved by the victory against City that they 'can leave anyone outside the squad and manage to win'",
		webPublicationDate: '2024-12-16T15:21:02.000Z',
		mainMedia: {
			type: 'Video',
			id: 'fa2ee832-c5e7-4305-8387-f0277d2d9e27',
			videoId: '9kIN--VV2LQ',
			duration: 117,
			title: "Rashford and Garnacho omission from team to 'push them harder' says Amorim – video ",
			width: 500,
			height: 300,
			origin: 'SNTV',
			expired: false,
			image: 'https://media.guim.co.uk/0cab2d745b3423b0fac318c9ee09b79678f568f8/0_56_3000_1688/3000.jpg',
		},
		image: {
			src: 'https://media.guim.co.uk/0cab2d745b3423b0fac318c9ee09b79678f568f8/0_47_3000_1800/master/3000.jpg',
			altText:
				"Amorim said the team proved by the victory against City that they 'can leave anyone outside the squad and manage to win'",
		},
	},
	{
		...defaultCardProps,
		dataLinkName: 'news | group-0 | card-@2',
		url: '/uk-news/2025/jan/22/prince-harry-says-sun-publisher-made-historic-admission-as-he-settles-case',
		headline:
			'Prince Harry says Sun publisher made ‘historic admission’ as he settles case',
		trailText:
			'News Group Newspapers offered Harry ‘full and unequivocal apology’ for ‘serious intrusion’ by the paper',
		webPublicationDate: '2025-01-22T18:51:14.000Z',
		mainMedia: {
			type: 'Video',
			id: '03ac0c90-3a66-448c-8562-b66a9ca9360e',
			videoId: '_2wsSKq6yAk',
			duration: 71,
			title: "Prince Harry's lawyer says settlement is 'monumental victory' – video ",
			width: 500,
			height: 300,
			origin: 'Reuters',
			expired: false,
			image: 'https://media.guim.co.uk/908aa315f66a09bc6ea607b6049cd72decd2dfa6/0_0_5358_3014/5358.jpg',
		},
		image: {
			src: 'https://media.guim.co.uk/4612af5f4667888fa697139cf570b6373d93a710/2446_345_3218_1931/master/3218.jpg',
			altText: 'Prince Harry leaves the high court in June 2023',
		},
	},
];

export const loopVideoCard: DCRFrontCard = {
	...defaultCardProps,
	dataLinkName: 'news | group-0 | card-@2',
	url: '/uk-news/2025/jan/22/prince-harry-says-sun-publisher-made-historic-admission-as-he-settles-case',
	headline: 'Headline for looping video card',
	trailText: 'Trail text for looping video card',
	mainMedia: {
		type: 'LoopVideo',
		atomId: '3cb22b60-2c3f-48d6-8bce-38c956907cce',
		videoId:
			'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
		duration: 0,
		width: 500,
		height: 400,
		image: 'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg',
	},
	image: {
		src: 'https://media.guim.co.uk/966bf085fb982b1103aaba42a812b09726cc0a3c/1417_104_1378_1104/master/1378.jpg',
		altText: 'Wyatt Russell and Florence Pugh in Thunderbolts*.',
	},
};
