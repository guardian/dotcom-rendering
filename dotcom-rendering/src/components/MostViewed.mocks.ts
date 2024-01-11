import type { FETrailTabType } from '../types/trails';

export const mockTab1: FETrailTabType = {
	heading: 'Across The Guardian',
	trails: [
		{
			url: 'https://www.theguardian.com/politics/2019/sep/15/eu-officials-reject-boris-johnson-claim-huge-progress-brexit-talks',
			headline:
				"LINKTEXT EU officials reject Boris Johnson claim of 'huge progress' in Brexit talks",
			showByline: true,
			byline: 'Jennifer Rankin and Daniel Boffey',
			image: 'https://media.guim.co.uk/85377038aacd71b2c0e55b0a55478165fe6d3014/0_0_6000_3600/master/6000.jpg',
			format: {
				design: 'LiveBlogDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/us-news/2019/sep/15/brett-kavanaugh-donald-trump-impeachment-supreme-court-justice',
			headline: 'LINKTEXT Trump blasts calls for impeachment',
			showByline: true,
			byline: 'Martin Pengelly',
			image: 'https://media.guim.co.uk/579fd19481e46b9d6ed3c69c2a6992483df84478/0_0_6000_3600/master/6000.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'OpinionPillar',
				display: 'StandardDisplay',
			},
			pillar: 'opinion',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			ageWarning: '1 year old',
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/sport/2019/sep/15/ashes-cricket-series-drawn-england-beat-australia-fifth-test',
			headline:
				'LINKTEXT England win fifth Test to draw Ashes series but Australia keep urn',
			showByline: false,
			byline: 'Vic Marks at the Oval',
			image: 'https://media.guim.co.uk/0df1fc1a2b78aa1772b4b43c2e5ebfc7f43111a8/0_91_5445_3267/master/5445.jpg',
			format: {
				design: 'LiveBlogDesign',
				theme: 'SportPillar',
				display: 'StandardDisplay',
			},
			pillar: 'sport',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/uk-news/2019/sep/15/boris-johnson-bonkers-plan-for-15bn-pound-bridge-derided-by-engineers',
			headline:
				"LINKTEXT Johnson's 'bonkers' plan for £15bn bridge derided by engineers",
			showByline: false,
			byline: 'Simon Murphy',
			image: 'https://media.guim.co.uk/57a9a1a56c7d319a8f57a9c8767793ae0481db4c/0_95_4950_2970/master/4950.jpg',
			format: {
				design: 'LiveBlogDesign',
				theme: 'CulturePillar',
				display: 'StandardDisplay',
			},
			pillar: 'culture',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/politics/2019/sep/15/five-things-we-learned-from-david-cameron-memoir-boris-johnson-michael-gove-referendum',
			headline:
				"LINKTEXT Five things we learned from David Cameron's memoirs",
			showByline: false,
			byline: 'Caroline Davies',
			image: 'https://media.guim.co.uk/e05185cce0a0c6953e666276caa98f6ea104c989/0_214_3600_2160/master/3600.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'LifestylePillar',
				display: 'StandardDisplay',
			},
			pillar: 'lifestyle',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
			ageWarning: '4 months old',
		},
		{
			url: 'https://www.theguardian.com/sport/live/2019/sep/15/ashes-2019-england-v-australia-fifth-test-day-four-live',
			headline:
				'LINKTEXT Ashes 2019: England win fifth Test by 135 runs as series is drawn – as it happened',
			showByline: false,
			byline: 'Tanya Aldred,  Geoff Lemon  & Jonathan Howcroft',
			image: 'https://media.guim.co.uk/5792a3b971914e21bd04cb13eed54159463ce90e/0_128_4991_2994/master/4991.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/lifeandstyle/2019/sep/15/how-six-weddings-in-one-year-made-me-love-being-single',
			headline:
				'LINKTEXT How six weddings in one year made me love being single',
			showByline: false,
			byline: 'Sarah Johnson',
			image: 'https://media.guim.co.uk/2e87f0ee5f1a6c292cfcfc5f6f99e9a54ba3cc05/0_139_4032_2419/master/4032.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/fashion/2019/sep/15/joani-johnson-model-fenty-career-began-at-65-ageing-interview',
			headline:
				'LINKTEXT JoAni Johnson: the sexagenarian model defying convention',
			showByline: false,
			byline: 'Aaron Hicklin',
			image: 'https://media.guim.co.uk/2d88f2493b6eff49b6b8d6dd35345f03fa2b4af2/0_721_3361_2017/master/3361.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/fashion/2019/sep/15/victoria-beckham-announces-launch-of-own-makeup-brand',
			headline:
				'LINKTEXT Victoria Beckham launches makeup range and targets wellness market',
			showByline: false,
			byline: 'Jess Cartner-Morley',
			image: 'https://media.guim.co.uk/bceaab691b06c3f3830e7794d24c6ada2b301fad/847_177_2750_1650/master/2750.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/commentisfree/2019/sep/15/government-boris-johnson-incredible-hulk-sam-gyimah',
			headline:
				'LINKTEXT There’s nothing normal about this beast of a government',
			showByline: true,
			byline: 'Matthew d’Ancona',
			image: 'https://media.guim.co.uk/bc4e5ed4448eafd6238656aefae98c832cacc148/32_13_1898_1139/master/1898.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
	],
};

export const mockTab2: FETrailTabType = {
	heading: 'in Music',
	trails: [
		{
			url: 'https://www.theguardian.com/music/2019/sep/15/bridget-christie-last-night-of-the-proms-jamie-barton-laura-mvula',
			headline:
				"LINKTEXT 'I thought I'd hate it': Bridget Christie on loving the Last Night of the Proms",
			showByline: false,
			byline: 'Bridget Christie',
			image: 'https://media.guim.co.uk/eef1ed43631aa9088f26fca4a138f6e4250d9319/0_297_5400_3240/master/5400.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/15/aphex-twin-review-printworks-london-electronic-music',
			headline:
				'LINKTEXT Aphex Twin review – wild lights, jungle buzzsaw and a boo for Boris',
			showByline: false,
			byline: 'Lauren Martin',
			image: 'https://media.guim.co.uk/ff131761ef56456073d4edfb52af4ec8b8b953c2/0_290_6355_3813/master/6355.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/13/100-best-albums-of-the-21st-century',
			headline: 'LINKTEXT The 100 best albums of the 21st century',
			showByline: false,
			byline: 'Ben Beaumont-Thomas (1-50); Laura Snapes and April Curtin (51-100)',
			image: 'https://media.guim.co.uk/1ce9e4ae33c1be975ab83fdabc267fc081c9d73c/0_0_4000_2400/master/4000.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/14/missy-elliott-interview-beyonce-vmas-katy-perry-misdemeanor',
			headline:
				"LINKTEXT Missy Elliott – Beyoncé said: ‘If I sound crazy, don’t put this out!'",
			showByline: false,
			byline: 'Dorian Lynskey',
			image: 'https://media.guim.co.uk/6de53bbc2260febc167488209afe81844c47ecaa/0_225_5352_3211/master/5352.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'CulturePillar',
				display: 'StandardDisplay',
			},
			pillar: 'culture',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/14/beatles-paul-mccartney-ringo-starr-reunite-record-john-lennon-song',
			headline:
				'LINKTEXT Paul McCartney and Ringo Starr reunite to record John Lennon song',
			showByline: false,
			byline: 'Mattha Busby',
			image: 'https://media.guim.co.uk/5ee2bea12b92b28eff10b84d22e952c2681cb5f5/0_479_2239_1343/master/2239.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/15/on-my-radar-gruff-rhys-interview',
			headline: 'LINKTEXT On my radar: Gruff Rhys’s cultural highlights',
			showByline: false,
			byline: 'Killian Fox',
			image: 'https://media.guim.co.uk/981e17d90b401754aae355d2e56bfedbe5b359b5/0_1000_2480_1488/master/2480.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/13/sam-smith-on-being-non-binary-im-changing-my-pronouns-to-theythem',
			headline:
				"LINKTEXT Sam Smith on being non-binary: 'I'm changing my pronouns to they/them'",
			showByline: false,
			byline: 'Laura Snapes',
			image: 'https://media.guim.co.uk/ff17da45e26064e2666106902a90655e4db49ea4/955_135_1467_880/master/1467.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/15/pixies-beneath-the-eyrie-review',
			headline:
				'LINKTEXT Pixies: Beneath the Eyrie review – workaday once again',
			showByline: false,
			byline: 'Phil Mongredien',
			image: 'https://media.guim.co.uk/b819ca05b59cdbe5ee59684740d1d9fe181b5a22/0_69_3600_2160/master/3600.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/14/emeli-sande-interview-life-on-a-plate-i-loved-spaghetti-so-much',
			headline:
				'LINKTEXT Emeli Sandé: ‘I loved spaghetti so much as a child that I’d eat it from the garden drain’',
			showByline: false,
			byline: 'John Hind',
			image: 'https://media.guim.co.uk/1e518e0996861201a7350f91f46d1f573ed2ea9c/0_823_6206_3724/master/6206.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/music/2019/sep/15/joyce-didonato-interview-agrippina-royal-opera-house',
			headline:
				'LINKTEXT Joyce DiDonato: ‘I’m trying to balance activism and joy’',
			showByline: false,
			byline: 'Fiona Maddocks',
			image: 'https://media.guim.co.uk/478dcff6eee2cbd753f1956e420c4caaf7b00fdd/0_1208_8095_4859/master/8095.jpg',
			format: {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
			pillar: 'news',
			designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
			webPublicationDate: '',
			showQuotedHeadline: false,
		},
	],
};

const twoTabs: [FETrailTabType, FETrailTabType] = [mockTab1, mockTab2];
export const responseWithTwoTabs = {
	tabs: twoTabs,
};
