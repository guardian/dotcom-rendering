import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '../../src/lib/articleFormat';
import { enhanceSnaps } from '../../src/model/enhanceSnaps';
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
			type: 'YoutubeVideo',
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
			type: 'YoutubeVideo',
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
			type: 'YoutubeVideo',
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
		supportingContent: getSublinks(2),
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
		supportingContent: getSublinks(2),
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
			type: 'YoutubeVideo',
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
			type: 'YoutubeVideo',
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

export const newsletterTrails: [DCRFrontCard, DCRFrontCard] = [
	{
		format: { design: 0, display: 0, theme: 0 },
		dataLinkName: 'news | group-0 | card-@4',
		url: '/global/2022/sep/20/sign-up-for-the-guide-newsletter-our-free-pop-culture-email',
		headline: 'Sign up for a weekly dose of pop culture',
		trailText:
			'The best new music, film, TV, podcasts and more direct to your inbox, plus hidden gems and reader recommendations',
		webPublicationDate: '2022-09-20T10:57:04.000Z',
		kickerText: 'The Guide',
		isNewsletter: true,
		image: {
			src: 'https://media.guim.co.uk/ce2e59cfa2ab7db34cba24adbf20910976e55604/0_55_501_401/master/501.jpg',
			altText: 'The Guide Newsletter Design',
		},
		showQuotedHeadline: false,
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		isExternalLink: false,
		showLivePlayable: false,
		isImmersive: false,
	},
	{
		format: { design: 0, display: 0, theme: 0 },
		dataLinkName: 'news | group-0 | card-@2',
		url: '/info/2024/oct/10/sign-up-for-the-filter-newsletter-our-free-weekly-buying-advice',
		headline: 'Sign up our free weekly buying advice newsletter',
		trailText:
			'Get smart, sustainable shopping advice from the Filter team straight to your inbox, every Sunday<br><br>The Guardian’s journalism is independent. We will earn a commission if you buy something through an affiliate link.',
		webPublicationDate: '2024-10-10T10:30:16.000Z',
		kickerText: 'The Filter',
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		isNewsletter: true,
		image: {
			src: 'https://media.guim.co.uk/e5269c957a8e19da44d76b53f349b8d5a3b6a98f/0_0_5000_3000/master/5000.jpg',
			altText: 'The Filter',
		},
		showQuotedHeadline: false,
		isExternalLink: false,
		showLivePlayable: false,
		isImmersive: false,
	},
];

export const loopVideoCard: DCRFrontCard = {
	...defaultCardProps,
	dataLinkName: 'news | group-0 | card-@2',
	url: '/uk-news/2025/jan/22/prince-harry-says-sun-publisher-made-historic-admission-as-he-settles-case',
	headline: 'Headline for looping video card',
	trailText: 'Trail text for looping video card',
	mainMedia: {
		type: 'SelfHostedVideo',
		videoStyle: 'Loop',
		atomId: '3cb22b60-2c3f-48d6-8bce-38c956907cce',
		sources: [
			{
				mimeType: 'video/mp4',
				src: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
			},
		],
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

export const slideshowCard: DCRFrontCard = {
	...defaultCardProps,
	dataLinkName: 'news | group-0 | card-@2',
	url: '/uk-news/2025/jan/22/prince-harry-says-sun-publisher-made-historic-admission-as-he-settles-case',
	headline: 'Headline for slideshow card',
	trailText: 'Trail text for slideshow card',
	slideshowImages: [
		{
			imageSrc:
				'https://media.guim.co.uk/68333e95233d9c68b32b56c12205c5ded94dfbf8/0_117_4791_2696/1000.jpg',
		},
		{
			imageSrc:
				'https://media.guim.co.uk/77e960298d4339e047eac5c1986d0f3214f6285d/419_447_4772_2863/master/4772.jpg',
		},
		{
			imageSrc:
				'https://media.guim.co.uk/df5aea6391e21b5a5d2d25fd9aad81d497f99d42/0_45_3062_1837/master/3062.jpg',
		},
		{
			imageSrc:
				'https://media.guim.co.uk/5ebec1a8d662f0da39887dae16e4b2720379246e/0_0_5000_3000/master/5000.jpg',
		},
		{
			imageSrc:
				'https://media.guim.co.uk/77e960298d4339e047eac5c1986d0f3214f6285d/419_447_4772_2863/master/4772.jpg',
		},
	],
	image: {
		src: 'https://media.guim.co.uk/966bf085fb982b1103aaba42a812b09726cc0a3c/1417_104_1378_1104/master/1378.jpg',
		altText: 'Wyatt Russell and Florence Pugh in Thunderbolts*.',
	},
};

const snapDataEnriched = {
	embedHtml:
		'\u003Cdiv class="football-atom__container"\u003E\n\t\u003Chtml\u003E\u003Chead\u003E\u003C/head\u003E\u003Cbody\u003E\u003Cdiv class="knockout-container" data-link-name="Women\'s Euro 2025 knockout chart"\u003E\n\n    \u003Cdiv class="football-knockouts football-knockouts--has-spider"\u003E\n    \n        \u003Cul class="u-unstyled u-cf"\u003E\n            \u003Cli\u003E\n                \n\u003Ctable class="table table--football football-matches"\u003E\n    \u003Cthead hidden=""\u003E\n        \u003Ctr\u003E\n            \u003Cth class="match__status"\u003EMatch status / kick off time\u003C/th\u003E\n            \u003Cth class="match__details"\u003EMatch details\u003C/th\u003E\n        \u003C/tr\u003E\n    \u003C/thead\u003E\n\n    \u003Ctbody\u003E\n        \n            \u003Ctr data-link-to="https://football.theguardian.com/match-redirect/4512667" data-match-id="4512667" data-score-home="1" data-score-away="2" data-match-status="FT" id="football-match-4512667" class="football-match football-match--result"\u003E\n                \u003Ctd class="football-match__status football-match__status--ft table-column--sub"\u003E\n                    \n                        FT\n                    \n                \u003C/td\u003E\n                \u003Ctd class="football-match__crest football-match__crest--home"\u003E\n                    \u003C!--\n                    \u003Cimg class="team-crest" alt="" src="https://sport.guim.co.uk/football/crests/60/8184.png" /\u003E\n                    --\u003E\n                \u003C/td\u003E\n                \u003Ctd class="football-match__teams table-column--main"\u003E\n                    \u003Ca href="https://www.theguardian.com/football/2025/jul/16/norway-italy-womens-euro-2025-quarter-final-match-report" class="u-unstyled football-teams u-cf" data-link-name="match-redirect"\u003E\n                        \u003Cdiv class="football-match__team football-match__team--home football-team"\u003E\n                            \u003Cdiv class="football-team__name team-name" data-abbr="NOR"\u003E\n                                \u003Cspan class="team-name__long"\u003ENorway\u003C/span\u003E\n                            \u003C/div\u003E\n                            \u003Cdiv class="football-team__score"\u003E1\u003C/div\u003E\n                        \u003C/div\u003E\n\n                        \u003Cdiv class="football-match__team football-match__team--away football-team"\u003E\n                            \u003Cdiv class="football-team__name team-name" data-abbr="ITA"\u003E\n                                \u003Cspan class="team-name__long"\u003EItaly\u003C/span\u003E\n                            \u003C/div\u003E\n                            \u003Cdiv class="football-team__score"\u003E2\u003C/div\u003E\n                        \u003C/div\u003E\n\n                        \u003Cdiv class="football-teams__battleline"\u003E\u003C/div\u003E\n\n                        \n                    \u003C/a\u003E\n                \u003C/td\u003E\n                \u003Ctd class="football-match__crest football-match__crest--home"\u003E\n                    \u003C!--\n                    \u003Cimg class="team-crest" alt="" src="https://sport.guim.co.uk/football/crests/120/7720.png" /\u003E\n                    --\u003E\n                \u003C/td\u003E\n            \u003C/tr\u003E\n        \n    \u003C/tbody\u003E\n    \u003Ccaption class="table__caption table__caption--top"\u003E\n        \n            \n                \u003Cspan class="football-matches__heading"\u003EFixtures and results\u003C/span\u003E\n            \n        \n        \u003Cspan class="football-matches__date"\u003E\n            Wed 16 July&nbsp;\n        \u003C/span\u003E\n\n    \u003C/caption\u003E\n    \n\n    \n\u003C/table\u003E\n\n\u003Ctable class="table table--football football-matches"\u003E\n    \u003Cthead hidden=""\u003E\n        \u003Ctr\u003E\n            \u003Cth class="match__status"\u003EMatch status / kick off time\u003C/th\u003E\n            \u003Cth class="match__details"\u003EMatch details\u003C/th\u003E\n        \u003C/tr\u003E\n    \u003C/thead\u003E\n\n    \u003Ctbody\u003E\n        \n            \u003Ctr data-link-to="https://football.theguardian.com/match-redirect/4512685" data-match-id="4512685" data-score-home="2" data-score-away="2" data-match-status="FT" id="football-match-4512685" class="football-match football-match--result"\u003E\n                \u003Ctd class="football-match__status football-match__status--ft table-column--sub"\u003E\n                    \n                        FT\n                    \n                \u003C/td\u003E\n                \u003Ctd class="football-match__crest football-match__crest--home"\u003E\n                    \u003C!--\n                    \u003Cimg class="team-crest" alt="" src="https://sport.guim.co.uk/football/crests/60/8319.png" /\u003E\n                    --\u003E\n                \u003C/td\u003E\n                \u003Ctd class="football-match__teams table-column--main"\u003E\n                    \u003Ca href="https://www.theguardian.com/football/2025/jul/17/sweden-england-womens-euro-2025-quarter-final-match-report" class="u-unstyled football-teams u-cf" data-link-name="match-redirect"\u003E\n                        \u003Cdiv class="football-match__team football-match__team--home football-team"\u003E\n                            \u003Cdiv class="football-team__name team-name" data-abbr="SWE"\u003E\n                                \u003Cspan class="team-name__long"\u003ESweden\u003C/span\u003E\n                            \u003C/div\u003E\n                            \u003Cdiv class="football-team__score"\u003E2\u003C/div\u003E\n                        \u003C/div\u003E\n\n                        \u003Cdiv class="football-match__team football-match__team--away football-team"\u003E\n                            \u003Cdiv class="football-team__name team-name" data-abbr="ENG"\u003E\n                                \u003Cspan class="team-name__long"\u003EEngland\u003C/span\u003E\n                            \u003C/div\u003E\n                            \u003Cdiv class="football-team__score"\u003E2\u003C/div\u003E\n                        \u003C/div\u003E\n\n                        \u003Cdiv class="football-teams__battleline"\u003E\u003C/div\u003E\n\n                        \n                            \u003Cdiv class="football-match__comments"\u003EEngland win 3-2 on penalties\u003C/div\u003E\n                        \n                    \u003C/a\u003E\n                \u003C/td\u003E\n                \u003Ctd class="football-match__crest football-match__crest--home"\u003E\n                    \u003C!--\n                    \u003Cimg class="team-crest" alt="" src="https://sport.guim.co.uk/football/crests/120/7514.png" /\u003E\n                    --\u003E\n                \u003C/td\u003E\n            \u003C/tr\u003E\n        \n    \u003C/tbody\u003E\n    \u003Ccaption class="table__caption table__caption--top"\u003E\n        \n        \u003Cspan class="football-matches__date"\u003E\n            Thu 17 July&nbsp;\n        \u003C/span\u003E\n\n    \u003C/caption\u003E\n    \n\n    \n\u003C/table\u003E\n\n\u003Ctable class="table table--football football-matches"\u003E\n    \u003Cthead hidden=""\u003E\n        \u003Ctr\u003E\n            \u003Cth class="match__status"\u003EMatch status / kick off time\u003C/th\u003E\n            \u003Cth class="match__details"\u003EMatch details\u003C/th\u003E\n        \u003C/tr\u003E\n    \u003C/thead\u003E\n\n    \u003Ctbody\u003E\n        \n            \u003Ctr data-link-to="https://football.theguardian.com/match-redirect/4512668" data-match-id="4512668" data-score-home="2" data-score-away="0" data-match-status="FT" id="football-match-4512668" class="football-match football-match--result"\u003E\n                \u003Ctd class="football-match__status football-match__status--ft table-column--sub"\u003E\n                    \n                        FT\n                    \n                \u003C/td\u003E\n                \u003Ctd class="football-match__crest football-match__crest--home"\u003E\n                    \u003C!--\n                    \u003Cimg class="team-crest" alt="" src="https://sport.guim.co.uk/football/crests/60/42111.png" /\u003E\n                    --\u003E\n                \u003C/td\u003E\n                \u003Ctd class="football-match__teams table-column--main"\u003E\n                    \u003Ca href="https://www.theguardian.com/football/2025/jul/18/spain-switzerland-womens-euro-2025-quarter-final-match-report" class="u-unstyled football-teams u-cf" data-link-name="match-redirect"\u003E\n                        \u003Cdiv class="football-match__team football-match__team--home football-team"\u003E\n                            \u003Cdiv class="football-team__name team-name" data-abbr="SPA"\u003E\n                                \u003Cspan class="team-name__long"\u003ESpain\u003C/span\u003E\n                            \u003C/div\u003E\n                            \u003Cdiv class="football-team__score"\u003E2\u003C/div\u003E\n                        \u003C/div\u003E\n\n                        \u003Cdiv class="football-match__team football-match__team--away football-team"\u003E\n                            \u003Cdiv class="football-team__name team-name" data-abbr="SUI"\u003E\n                                \u003Cspan class="team-name__long"\u003ESwitzerland\u003C/span\u003E\n                            \u003C/div\u003E\n                            \u003Cdiv class="football-team__score"\u003E0\u003C/div\u003E\n                        \u003C/div\u003E\n\n                        \u003Cdiv class="football-teams__battleline"\u003E\u003C/div\u003E\n\n                        \n                    \u003C/a\u003E\n                \u003C/td\u003E\n                \u003Ctd class="football-match__crest football-match__crest--home"\u003E\n                    \u003C!--\n                    \u003Cimg class="team-crest" alt="" src="https://sport.guim.co.uk/football/crests/120/36601.png" /\u003E\n                    --\u003E\n                \u003C/td\u003E\n            \u003C/tr\u003E\n        \n    \u003C/tbody\u003E\n    \u003Ccaption class="table__caption table__caption--top"\u003E\n        \n        \u003Cspan class="football-matches__date"\u003E\n            Fri 18 July&nbsp;\n        \u003C/span\u003E\n\n    \u003C/caption\u003E\n    \n\n    \n\u003C/table\u003E\n\n\u003Ctable class="table table--football football-matches"\u003E\n    \u003Cthead hidden=""\u003E\n        \u003Ctr\u003E\n            \u003Cth class="match__status"\u003EMatch status / kick off time\u003C/th\u003E\n            \u003Cth class="match__details"\u003EMatch details\u003C/th\u003E\n        \u003C/tr\u003E\n    \u003C/thead\u003E\n\n    \u003Ctbody\u003E\n        \n            \u003Ctr data-link-to="https://football.theguardian.com/match-redirect/4512686" data-match-id="4512686" data-score-home="1" data-score-away="1" data-match-status="FT" id="football-match-4512686" class="football-match football-match--result"\u003E\n                \u003Ctd class="football-match__status football-match__status--ft table-column--sub"\u003E\n                    \n                        FT\n                    \n                \u003C/td\u003E\n                \u003Ctd class="football-match__crest football-match__crest--home"\u003E\n                    \u003C!--\n                    \u003Cimg class="team-crest" alt="" src="https://sport.guim.co.uk/football/crests/60/35853.png" /\u003E\n                    --\u003E\n                \u003C/td\u003E\n                \u003Ctd class="football-match__teams table-column--main"\u003E\n                    \u003Ca href="https://www.theguardian.com/football/2025/jul/19/france-germany-womens-euro-2025-quarter-final-match-report" class="u-unstyled football-teams u-cf" data-link-name="match-redirect"\u003E\n                        \u003Cdiv class="football-match__team football-match__team--home football-team"\u003E\n                            \u003Cdiv class="football-team__name team-name" data-abbr="FRA"\u003E\n                                \u003Cspan class="team-name__long"\u003EFrance\u003C/span\u003E\n                            \u003C/div\u003E\n                            \u003Cdiv class="football-team__score"\u003E1\u003C/div\u003E\n                        \u003C/div\u003E\n\n                        \u003Cdiv class="football-match__team football-match__team--away football-team"\u003E\n                            \u003Cdiv class="football-team__name team-name" data-abbr="GER"\u003E\n                                \u003Cspan class="team-name__long"\u003EGermany\u003C/span\u003E\n                            \u003C/div\u003E\n                            \u003Cdiv class="football-team__score"\u003E1\u003C/div\u003E\n                        \u003C/div\u003E\n\n                        \u003Cdiv class="football-teams__battleline"\u003E\u003C/div\u003E\n\n                        \n                            \u003Cdiv class="football-match__comments"\u003EGermany win 6-5 on penalties\u003C/div\u003E\n                        \n                    \u003C/a\u003E\n                \u003C/td\u003E\n                \u003Ctd class="football-match__crest football-match__crest--home"\u003E\n                    \u003C!--\n                    \u003Cimg class="team-crest" alt="" src="https://sport.guim.co.uk/football/crests/120/7699.png" /\u003E\n                    --\u003E\n                \u003C/td\u003E\n            \u003C/tr\u003E\n        \n    \u003C/tbody\u003E\n    \u003Ccaption class="table__caption table__caption--top"\u003E\n        \n        \u003Cspan class="football-matches__date"\u003E\n            Sat 19 July&nbsp;\n        \u003C/span\u003E\n\n    \u003C/caption\u003E\n    \n\n    \n\u003C/table\u003E\n\n            \u003C/li\u003E\n        \u003C/ul\u003E\n    \n    \u003C/div\u003E\n\n\u003C/div\u003E\n\n\n\u003C/body\u003E\u003C/html\u003E  \n\t\u003Cbutton class="view-more--button"\u003E\n\t\t\u003Ca href="https:&#x2F;&#x2F;www.theguardian.com&#x2F;football&#x2F;women-s-euro-2025&#x2F;overview"\u003EView all knockout stages\u003C/a\u003E\n\t\u003C/button\u003E\n\u003C/div\u003E\n',
	embedCss:
		'@charset "UTF-8";.u-cf:after,.u-cf:before{content:"";display:table}.u-cf:after{clear:both}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Light.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Light.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Light.ttf) format("truetype");font-weight:300;font-style:normal}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-LightItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-LightItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-LightItalic.ttf) format("truetype");font-weight:300;font-style:italic}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Regular.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Regular.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.ttf) format("truetype");font-weight:400;font-style:italic}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.ttf) format("truetype");font-weight:500;font-style:normal}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-MediumItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-MediumItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-MediumItalic.ttf) format("truetype");font-weight:500;font-style:italic}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Semibold.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Semibold.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Semibold.ttf) format("truetype");font-weight:600;font-style:normal}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-SemiboldItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-SemiboldItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-SemiboldItalic.ttf) format("truetype");font-weight:600;font-style:italic}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.ttf) format("truetype");font-weight:700;font-style:normal}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BoldItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BoldItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BoldItalic.ttf) format("truetype");font-weight:700;font-style:italic}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Black.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Black.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Black.ttf) format("truetype");font-weight:900;font-style:normal}@font-face{font-family:Guardian Headline Full;src:url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BlackItalic.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BlackItalic.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-BlackItalic.ttf) format("truetype");font-weight:900;font-style:italic}@font-face{font-family:Guardian Titlepiece;src:url(https://interactive.guim.co.uk/fonts/garnett/GTGuardianTitlepiece-Bold.woff2) format("woff2"),url(https://interactive.guim.co.uk/fonts/garnett/GTGuardianTitlepiece-Bold.woff) format("woff"),url(https://interactive.guim.co.uk/fonts/garnett/GTGuardianTitlepiece-Bold.ttf) format("truetype");font-weight:700;font-style:normal}.hide-on-mobile{display:none!important}@media (min-width: 46.25em){.hide-on-mobile{display:block!important}}.u-unstyled{list-style-type:none;padding-inline-start:0}a,.u-fauxlink{color:#005689;cursor:pointer;text-decoration:none}.football-atom__container{width:100%;background-color:#fff}.football-atom__container .view-more--button{font-family:Guardian Text Sans Web,GuardianTextSans-Bold,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;position:relative;padding:0 .75rem;background-color:#052962;border-color:#052962;height:1.875rem;width:auto;font-weight:700;text-decoration:none;border-radius:62.5rem;border-width:.0625rem;border-style:solid;box-sizing:border-box}@media (max-width: 46.24em){.football-atom__container .view-more--button{margin-left:0}}.football-atom__container .view-more--button a{color:#fff!important}.knockout-container+.view-more--button{margin-left:0}.table--hide-none th,.table--hide-none td{display:table-cell!important}.table--hide-from-importance-1 .table-column--importance-1,.table--hide-from-importance-2 .table-column--importance-1,.table--hide-from-importance-2 .table-column--importance-2,.table--hide-from-importance-3 .table-column--importance-1,.table--hide-from-importance-3 .table-column--importance-2,.table--hide-from-importance-3 .table-column--importance-3{display:none}table{width:100%}th,td{text-align:left}.table{background:#f6f6f6;border-top:1px solid #00b2ff;border-collapse:inherit}.table th,.table td,.table .table__caption{font-size:13px;line-height:18px;font-family:Guardian Text Sans Web,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;padding:8px;vertical-align:top}.table th,.table thead td{font-weight:800}.table td{border-top:1px solid #ececec}.table abbr{border-bottom:1px dotted #f6f6f6}@media (max-width: 46.24em){.table .table-column--importance-1{display:none}}@media (max-width: 19.99em){.table .table-column--importance-1,.table .table-column--importance-2{display:none}}@media (max-width: 13.75em){.table .table-column--importance-1,.table .table-column--importance-2,.table .table-column--importance-3{display:none}}@media (min-width: 61.25em){.table--responsive-font th,.table--responsive-font td,.table--responsive-font thead td{font-size:14px;line-height:22px;padding:12px 12px 8px}}.table--striped td{border-top:0}.table--striped tr:nth-child(odd)\u003Etd{background-color:#ececec}.table-column--sub{color:#121212}.table-column--main{width:100%}.table-row--highlight td{font-weight:700}.table__headline{font-size:17px;line-height:24px;font-family:Guardian Text Egyptian Web,Georgia,serif;font-weight:700;border-top:1px dotted #dcdcdc;padding:6px 0 12px}.table__caption{padding:16px;background:#f6f6f6;border-bottom:1px solid #ececec;border-top:1px solid #00b2ff;font-weight:700;margin-bottom:-2px;position:relative;text-align:left;z-index:2}.table__caption--bottom{font-weight:400;border-bottom:0;border-top:1px solid #ececec;caption-side:bottom;text-align:center}.football-knockouts{margin-bottom:15px}.table--football .td{vertical-align:middle}.table--football .table-column--main .team-name{display:inline;overflow:hidden;white-space:normal;max-width:100%}.table--football .table-column--main{max-width:50px}.table--football .table-column--main a{color:inherit}.table--football td{min-width:12px}.table--football tr:last-child td{border-bottom:0}.table--football .football-stat--form{min-width:75}@media (max-width: 46.24em){.table--football th,.table--football td,.table--football .football-stat--form{min-width:0}}@media (max-width: 19.99em){.table--football .team-name:after{content:attr(data-abbr)}.table--football .team-name__long{border:0!important;clip:rect(0 0 0 0)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;width:1px!important}}.table--football .football-match--result\u003Etd,.table--football .football-match--fixture\u003Etd{padding-left:.3rem;padding-right:.3rem}.table--football .football-match--result\u003Etd:first-child,.table--football .football-match--fixture\u003Etd:first-child{padding-left:.5rem}.table--football .football-match--result\u003Etd:last-child,.table--football .football-match--fixture\u003Etd:last-child{padding-right:.5rem}.table--football .football-match--result .team-crest,.table--football .football-match--fixture .team-crest{margin-right:0}.team-crest{height:10px;margin-right:5px;max-width:15px;display:inline-block}.football-table__container{margin-bottom:36px;position:relative;clear:both}@media (max-width: 61.24em){.football-table__container{max-width:540px}}.football-table__container .football-matches__date{display:none}@media (min-width: 71.25em){.football-table__container .table__caption--top{font-size:17px;line-height:20px;font-family:Guardian Headline,Guardian Egyptian Web,Guardian Headline Full,Georgia,serif;font-weight:900;margin-bottom:16px;margin-left:-160px;width:140px;background:none;border-bottom:0;border-top:1px dotted #dcdcdc;padding:4px 0 16px;position:absolute;top:0}}@media (min-width: 81.25em){.football-table__container .table__caption--top{margin-left:-240px;width:220px}}.c-football-table{width:100%}.c-football-table th,.c-football-table td,.c-football-table .football-stat--form{min-width:0}.football__group{margin-top:24px}.football__group:first-child{margin-top:0}.table__caption .item__live-indicator{top:2px;float:right}.table__caption--bottom{padding:0;margin:0;line-height:1}.ios.garnett--type-article .football-group__table .table--football .table__caption a,.android.garnett--type-article .football-group__table .table--football .table__caption a,.ios.garnett--type-article .football-group__container .table--football .team-name a,.android.garnett--type-article .football-group__container .table--football .team-name a{background:none}.ios.garnett--type-article .football-group__table .table--football td,.ios.garnett--type-article .football-group__table .table--football th,.ios.garnett--type-article .football-group__matches .table--football td,.ios.garnett--type-article .football-group__matches .table--football th,.ios.garnett--type-article .football-knockouts .table--football td,.ios.garnett--type-article .football-knockouts .table--football th,.android.garnett--type-article .football-group__table .table--football td,.android.garnett--type-article .football-group__table .table--football th,.android.garnett--type-article .football-group__matches .table--football td,.android.garnett--type-article .football-group__matches .table--football th,.android.garnett--type-article .football-knockouts .table--football td,.android.garnett--type-article .football-knockouts .table--football th{padding-left:12px}.android.dark-mode-on.garnett--type-article .element-atom,.android.dark-mode-on.garnett--type-article .element-atom .interactive-atom,.android.dark-mode-on.garnett--type-article .football-atom__container{background-color:#1a1a1a}.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts{border-top:12px solid #1a1a1a}.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .inline-dropdown-mask{background-color:#fff}.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .inline-dropdown-mask svg{fill:#1a1a1a}.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .dropdown__button{color:#fff}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts{border-top:12px solid #1a1a1a}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .football-matches__heading,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .football-matches__heading{color:#00b2ff}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .football-matches__date,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .football-matches__date{color:#fff}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football{background-color:#1a1a1a}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football .football-team__score,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football .football-teams__battleline,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football .football-match__teams .football-teams .football-team .football-team__name .team-name__long,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football .football-team__score,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football .football-teams__battleline,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football .football-match__teams .football-teams .football-team .football-team__name .team-name__long,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football .football-team__score,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football .football-teams__battleline,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football .football-match__teams .football-teams .football-team .football-team__name .team-name__long{color:#fff}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football .table__caption,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football .table__caption,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football .table__caption{padding-left:0;padding-right:0;background-color:#1a1a1a}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football .table__caption a,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football .table__caption a,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football .table__caption a{color:#fff;background:none}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football tr,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football th,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football td a,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football tr,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football th,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football td a,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football tr,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football th,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football td a{color:#fff;background-color:#1a1a1a}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football th,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football th,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football th{padding-left:12px}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football tr:nth-child(odd) td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football tr:nth-child(odd) td a,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football tr:nth-child(odd) td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football tr:nth-child(odd) td a,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football tr:nth-child(odd) td,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football tr:nth-child(odd) td a{background-color:#333}.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__table .table--football td a,.android.dark-mode-on.garnett--type-article .football-atom__container .football-group__matches .table--football td a,.android.dark-mode-on.garnett--type-article .football-atom__container .football-knockouts .table--football td a{background:none}@media (prefers-color-scheme: dark){.ios.garnett--type-article .element-atom,.ios.garnett--type-article .element-atom .interactive-atom,.ios.garnett--type-article .football-atom__container{background-color:#1a1a1a}.ios.garnett--type-article .football-atom__container .football-knockouts{border-top:12px solid #1a1a1a}.ios.garnett--type-article .football-atom__container .football-knockouts .inline-dropdown-mask{background-color:#fff}.ios.garnett--type-article .football-atom__container .football-knockouts .inline-dropdown-mask svg{fill:#1a1a1a}.ios.garnett--type-article .football-atom__container .football-knockouts .dropdown__button{color:#fff}.ios.garnett--type-article .football-atom__container .football-group__matches,.ios.garnett--type-article .football-atom__container .football-knockouts{border-top:12px solid #1a1a1a}.ios.garnett--type-article .football-atom__container .football-group__matches .football-matches__heading,.ios.garnett--type-article .football-atom__container .football-knockouts .football-matches__heading{color:#00b2ff}.ios.garnett--type-article .football-atom__container .football-group__matches .football-matches__date,.ios.garnett--type-article .football-atom__container .football-knockouts .football-matches__date{color:#fff}.ios.garnett--type-article .football-atom__container .football-group__table .table--football,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football{background-color:#1a1a1a}.ios.garnett--type-article .football-atom__container .football-group__table .table--football .football-team__score,.ios.garnett--type-article .football-atom__container .football-group__table .table--football .football-teams__battleline,.ios.garnett--type-article .football-atom__container .football-group__table .table--football .football-match__teams .football-teams .football-team .football-team__name .team-name__long,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football .football-team__score,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football .football-teams__battleline,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football .football-match__teams .football-teams .football-team .football-team__name .team-name__long,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football .football-team__score,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football .football-teams__battleline,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football .football-match__teams .football-teams .football-team .football-team__name .team-name__long{color:#fff}.ios.garnett--type-article .football-atom__container .football-group__table .table--football .table__caption,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football .table__caption,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football .table__caption{padding-left:0;padding-right:0;background-color:#1a1a1a}.ios.garnett--type-article .football-atom__container .football-group__table .table--football .table__caption a,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football .table__caption a,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football .table__caption a{color:#fff;background:none}.ios.garnett--type-article .football-atom__container .football-group__table .table--football tr,.ios.garnett--type-article .football-atom__container .football-group__table .table--football th,.ios.garnett--type-article .football-atom__container .football-group__table .table--football td,.ios.garnett--type-article .football-atom__container .football-group__table .table--football td a,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football tr,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football th,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football td,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football td a,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football tr,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football th,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football td,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football td a{color:#fff;background-color:#1a1a1a}.ios.garnett--type-article .football-atom__container .football-group__table .table--football td,.ios.garnett--type-article .football-atom__container .football-group__table .table--football th,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football td,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football th,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football td,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football th{padding-left:12px}.ios.garnett--type-article .football-atom__container .football-group__table .table--football tr:nth-child(odd) td,.ios.garnett--type-article .football-atom__container .football-group__table .table--football tr:nth-child(odd) td a,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football tr:nth-child(odd) td,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football tr:nth-child(odd) td a,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football tr:nth-child(odd) td,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football tr:nth-child(odd) td a{background-color:#333}.ios.garnett--type-article .football-atom__container .football-group__table .table--football td a,.ios.garnett--type-article .football-atom__container .football-group__matches .table--football td a,.ios.garnett--type-article .football-atom__container .football-knockouts .table--football td a{background:none}}@media (prefers-color-scheme: dark){.ios:not(.garnett--type-article),.android:not(.garnett--type-article){background-color:#000}.ios:not(.garnett--type-article) tr,.android:not(.garnett--type-article) tr{background:#000}.ios:not(.garnett--type-article) .football-group,.android:not(.garnett--type-article) .football-group{background-color:#000;margin:0;padding:12px}.ios:not(.garnett--type-article) .table--striped tr:nth-child(odd)\u003Etd,.android:not(.garnett--type-article) .table--striped tr:nth-child(odd)\u003Etd{background:#333;color:#fff}.ios:not(.garnett--type-article) .table--football td,.ios:not(.garnett--type-article) .table--football th,.android:not(.garnett--type-article) .table--football td,.android:not(.garnett--type-article) .table--football th{background:#000;color:#fff}.ios:not(.garnett--type-article) .football-atom__container,.android:not(.garnett--type-article) .football-atom__container{background-color:#000}.ios:not(.garnett--type-article) .football-atom__container .view-more--button,.android:not(.garnett--type-article) .football-atom__container .view-more--button{background:#00b2ff;margin-left:12px}.ios:not(.garnett--type-article) .football-atom__container .view-more--button a,.android:not(.garnett--type-article) .football-atom__container .view-more--button a{color:#1a1a1a!important}.ios:not(.garnett--type-article) .table .table__caption,.android:not(.garnett--type-article) .table .table__caption{background-color:#000;border-top:none}.ios:not(.garnett--type-article) .table .table__caption a,.android:not(.garnett--type-article) .table .table__caption a{color:#fff;font-size:1rem;font-family:Guardian Headline,Guardian Egyptian Web,Guardian Headline Full,Georgia,serif}.ios:not(.garnett--type-article) .table--football,.android:not(.garnett--type-article) .table--football{border-spacing:0}.ios:not(.garnett--type-article) .football-match__teams .football-teams .football-team .football-team__name .team-name__long,.ios:not(.garnett--type-article) .football-match--fixture .football-teams__battleline:after,.ios:not(.garnett--type-article) .football-matches__date,.android:not(.garnett--type-article) .football-match__teams .football-teams .football-team .football-team__name .team-name__long,.android:not(.garnett--type-article) .football-match--fixture .football-teams__battleline:after,.android:not(.garnett--type-article) .football-matches__date{color:#fff}}.football-match{position:relative}.football-match:hover{background:#ececec}@media (min-width: 61.25em){.football-match:hover .football-match__report{visibility:visible}.football-match:hover .football-match__report a{padding-left:10px;background:#ececec}}.football-match--live{font-weight:900}.football-match--live .football-match__status{color:#121212}.football-matches__container{clear:both}.football-matches__date{color:#121212;display:block;margin-top:6px}.football-match__report{position:absolute;right:0;visibility:hidden}.football-match__teams{position:relative}.football-teams{color:inherit;display:block;position:relative}.football-match__team{box-sizing:border-box;display:inline-block;position:relative;width:50%;text-overflow:ellipsis;overflow:hidden}.football-match__team--home{padding-right:30px;float:left;text-align:right}.football-match__team--home .football-team__score{right:6px}.football-match__team--home .team-crest{float:left}.football-match__team--home .knockout--crest{float:none;vertical-align:middle}.football-match__team--away{padding-left:30px;float:right;text-align:left}.football-match__team--away .football-team__score{left:6px}.football-match__team--away .team-crest{float:right}.football-match__team--away .knockout--crest{float:none;vertical-align:middle}.football-team__name{overflow:hidden;text-overflow:clip;white-space:nowrap}.football-team__score{color:#121212;position:absolute;top:0}.football-team__form{margin-top:2px}.football-teams__battleline{position:absolute;top:0;left:0;width:100%;text-align:center;color:#121212}.football-teams__battleline:after{content:"–"}.football-match__comments{font-size:14px;line-height:22px;color:#121212;text-align:center}.football-match--fixture .football-teams__battleline:after{content:"v"}.football-matches__heading{font-size:17px}.is-modern .football-matches tr{cursor:pointer}.football-matches__show-more{margin-top:6px;outline:none}.football-match__teams .football-teams .football-team .football-team__name .team-name__long{color:#000}.table--football .football-match td.football-match__teams a.football-teams{background-image:none}.garnett--pillar-sport .prose ul\u003E.football-group:before,.football-atom__container .football-knockouts .dropdown__content ul\u003Eli:before{display:none}.table--football{table-layout:auto}.knockout-container+.view-more--button{font-size:16px;height:1.875em}@media (prefers-color-scheme: dark){.garnett--pillar-sport.garnett--type-article .article__body .from-content-api.prose a,.garnett--pillar-sport .table--football{color:#121212}}.interactive-atom{margin:0;padding:0}\n',
	embedJs:
		'(() =\u003E {\n  const el = document.createElement("script");\n  el.src = "https://interactive.guim.co.uk/atoms/2025/07/women-s-euro-2025/football-atom-knockout-quarter/v/1753697843/app.js";\n  document.body.appendChild(el);\n  setTimeout(() =\u003E {\n    if (window.resize) {\n      const html = document.querySelector("html");\n      const body = document.querySelector("body");\n      html.style.overflow = "hidden";\n      html.style.margin = "0px";\n      html.style.padding = "0px";\n      body.style.overflow = "hidden";\n      body.style.margin = "0px";\n      body.style.padding = "0px";\n      window.resize();\n    }\n    document.documentElement.style.setProperty(\n      "--scrollbar-width",\n      `${window.innerWidth - document.documentElement.clientWidth}px`\n    );\n    document.documentElement.style.setProperty(\n      "--half-scrollbar-width",\n      `${(window.innerWidth - document.documentElement.clientWidth) / 2}px`\n    );\n  }, 100);\n})();\n',
};

export const snapLink: DCRFrontCard = {
	...defaultCardProps,
	url: 'snap/1752137845376',
	headline: 'Headline for snap link',
	snapData: enhanceSnaps(snapDataEnriched),
};

export const singleBrandedTrails: [
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
] = [
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/2025/oct/13/vinted-fashion-show-episode-6-grand-finale-recap',
		headline:
			'RE/style recap: Ep6 – it’s the grand finale of Vinted’s fashion show',
		byline: 'Louis Staples',
		image: {
			src: 'https://media.guim.co.uk/fd838308b8572ad216d905ce2c04a09e23d74f86/627_0_2998_2400/master/2998.jpg',
			altText: 'Finalists Chiara and Emily.',
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Gallery,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@1',
		showQuotedHeadline: false,
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/2025/oct/13/vinted-fashion-show-episode-5-vip-week-and-penultimate-recap',
		headline:
			'RE/style recap: Ep5 – it’s VIP week in Vinted’s fashion show (and the penultimate episode!)',
		byline: 'Louis Staples',
		image: {
			src: 'https://media.guim.co.uk/b087d8b79a6367e14ffe61d8251463c484736ab3/500_0_3000_2400/master/3000.jpg',
			altText: "Collage of contestants' designs",
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@2',
		showQuotedHeadline: false,
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/2025/oct/13/vinted-fashion-show-episode-4-adventure-week-looks-and-challenges',
		headline:
			'RE/style recap: Ep4 – it’s adventure week on Vinted’s fashion show',
		byline: 'Louis Staples',
		image: {
			src: 'https://media.guim.co.uk/8a415de51f74460c1962ab20292eeb46e8cd6be5/573_0_3000_2400/master/3000.jpg',
			altText: "Collage of contestants' designs",
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@3',
		showQuotedHeadline: false,
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/ng-interactive/2025/oct/13/restyle-episode-by-episode',
		headline: 'RE/style: episode by episode',
		image: {
			src: 'https://media.guim.co.uk/0a1b8c0c6e942fde40a0080592d45a9b2b7a586f/0_0_5000_4000/master/5000.jpg',
			altText: 'Vinted Re/style competitors',
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@4',
		showQuotedHeadline: false,
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/2025/oct/13/vinted-fashion-show-episode-3-denim-week-style-moments',
		headline:
			'RE/style recap: Ep3 – it’s denim week on Vinted’s fashion show',
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Video,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@5',
		showQuotedHeadline: false,
	},
];

// Five different trail examples with varied branding data
export const multipleBrandedTrails: [
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
	DCRFrontCard,
] = [
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/2025/oct/13/vinted-fashion-show-episode-6-grand-finale-recap',
		headline:
			'RE/style recap: Ep6 – it’s the grand finale of Vinted’s fashion show',
		byline: 'Louis Staples',
		image: {
			src: 'https://media.guim.co.uk/fd838308b8572ad216d905ce2c04a09e23d74f86/627_0_2998_2400/master/2998.jpg',
			altText: 'Finalists Chiara and Emily.',
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Gallery,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@1',
		showQuotedHeadline: false,
		branding: {
			brandingType: { name: 'paid-content' },
			sponsorName: 'Vinted',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/21/Jul/2025/bd012231-b67a-44cf-a208-9499714959b2-Vinted_green_280.png',
				dimensions: { width: 280, height: 180 },
				link: '/',
				label: 'Paid for by',
			},
			aboutThisLink:
				'https://www.theguardian.com/info/2016/jan/25/content-funding',
		},
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/2025/oct/13/vinted-fashion-show-episode-5-vip-week-and-penultimate-recap',
		headline:
			'RE/style recap: Ep5 – it’s VIP week in Vinted’s fashion show (and the penultimate episode!)',
		byline: 'Louis Staples',
		image: {
			src: 'https://media.guim.co.uk/b087d8b79a6367e14ffe61d8251463c484736ab3/500_0_3000_2400/master/3000.jpg',
			altText: "Collage of contestants' designs",
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@2',
		showQuotedHeadline: false,
		branding: {
			brandingType: { name: 'paid-content' },
			sponsorName: 'Vinted',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/21/Jul/2025/bd012231-b67a-44cf-a208-9499714959b2-Vinted_green_280.png',
				dimensions: { width: 280, height: 180 },
				link: '/',
				label: 'Paid for by',
			},
			aboutThisLink:
				'https://www.theguardian.com/info/2016/jan/25/content-funding',
		},
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/monash-university-leading-with-culture/2025/oct/13/meet-the-indigenous-leaders-driving-real-change-with-a-monash-masters-degree',
		headline:
			'Meet the Indigenous leaders driving real change with a Monash master’s degree',
		image: {
			src: 'https://media.guim.co.uk/c2ebe5543016330fed2b5b07f2ee18f83c3b1af4/375_0_3750_3000/master/3750.jpg',
			altText: 'Graduates throwing their hats in the air',
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@3',
		showQuotedHeadline: false,
		branding: {
			brandingType: { name: 'paid-content' },
			sponsorName: 'Monash University',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/23/Sep/2025/9cba6258-2ee6-42cc-89ac-18b982c7c45a-Monash-Uni-Logo.png',
				dimensions: { width: 280, height: 180 },
				link: '/',
				label: 'Paid for by',
			},
			aboutThisLink:
				'https://www.theguardian.com/info/2016/jan/25/content-funding',
		},
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/2025/oct/13/vinted-fashion-show-episode-4-adventure-week-looks-and-challenges',
		headline:
			'RE/style recap: Ep4 – it’s adventure week on Vinted’s fashion show',
		byline: 'Louis Staples',
		image: {
			src: 'https://media.guim.co.uk/8a415de51f74460c1962ab20292eeb46e8cd6be5/573_0_3000_2400/master/3000.jpg',
			altText: "Collage of contestants' designs",
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@4',
		showQuotedHeadline: false,
		branding: {
			brandingType: { name: 'paid-content' },
			sponsorName: 'Vinted',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/21/Jul/2025/bd012231-b67a-44cf-a208-9499714959b2-Vinted_green_280.png',
				dimensions: { width: 280, height: 180 },
				link: '/',
				label: 'Paid for by',
			},
			aboutThisLink:
				'https://www.theguardian.com/info/2016/jan/25/content-funding',
		},
	},
	{
		...defaultCardProps,
		url: 'https://www.theguardian.com/restyle-recapped/ng-interactive/2025/oct/13/restyle-episode-by-episode',
		headline: 'RE/style: episode by episode',
		image: {
			src: 'https://media.guim.co.uk/0a1b8c0c6e942fde40a0080592d45a9b2b7a586f/0_0_5000_4000/master/5000.jpg',
			altText: 'Vinted Re/style competitors',
		},
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Video,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'labs | group-0 | card-@5',
		showQuotedHeadline: false,
		branding: {
			brandingType: { name: 'paid-content' },
			sponsorName: 'Vinted',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/21/Jul/2025/bd012231-b67a-44cf-a208-9499714959b2-Vinted_green_280.png',
				dimensions: { width: 280, height: 180 },
				link: '/',
				label: 'Paid for by',
			},
			aboutThisLink:
				'https://www.theguardian.com/info/2016/jan/25/content-funding',
		},
	},
];
