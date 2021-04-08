import { Pillar, Design, Display, Special } from '@guardian/types';

import { decideDesign } from '@root/src/web/lib/decideDesign';
import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';

const CAPITrails: CAPITrailType[] = [
	{
		url:
			'https://www.theguardian.com/business/2019/dec/02/directors-climate-disclosures-tci-hedge-fund',
		headline:
			"Punish directors who don't make climate disclosures, says hedge fund",
		showByline: false,
		byline: 'Julia Kollewe',
		image:
			'https://i.guim.co.uk/img/media/d4124d7bb89be381cbe9d72c849fad136f843086/0_84_4974_2985/master/4974.jpg?width=900&quality=85&s=4bdf16831b01b6fcc649992c52e6011b',
		isLiveBlog: false,
		webPublicationDate: '2019-12-02T09:45:30.000Z',
		format: {
			theme: 'OpinionPillar',
			design: 'CommentDesign',
			display: 'StandardDisplay',
		},
		pillar: 'opinion',
		designType: 'Comment',
	},
	{
		url:
			'https://www.theguardian.com/environment/2019/dec/02/migration-v-climate-europes-new-political-divide',
		headline: "Migration v climate: Europe's new political divide",
		showByline: false,
		byline: 'Shaun Walker in Budapest',
		image:
			'https://i.guim.co.uk/img/media/e060e9b7c92433b3dfeccc98b9206778cda8b8e8/0_180_6680_4009/master/6680.jpg?width=900&quality=85&s=f27d36b8e7563f226cb5c22049559569',
		isLiveBlog: false,
		webPublicationDate: '2019-12-02T09:45:30.000Z',
		format: {
			theme: 'NewsPillar',
			design: 'MediaDesign',
			display: 'StandardDisplay',
		},
		pillar: 'news',
		designType: 'Media',
		mediaType: 'Video',
		mediaDuration: 378,
	},
	{
		url:
			'https://www.theguardian.com/world/2019/nov/28/eu-parliament-declares-climate-emergency',
		headline: 'An active live blog',
		showByline: false,
		byline: 'Jennifer Rankin in Brussels',
		image:
			'https://i.guim.co.uk/img/media/e8de0c5e27a2d92ced64f690daf48fd9b3b5c079/0_0_5101_3061/master/5101.jpg?width=900&quality=85&s=6c1cec769f59569c150794ae5f3d6c44',
		isLiveBlog: true,
		webPublicationDate: '2019-12-02T09:45:30.000Z',
		format: {
			theme: 'NewsPillar',
			design: 'LiveBlogDesign',
			display: 'StandardDisplay',
		},
		pillar: 'news',
		designType: 'Live',
		kickerText: 'Live',
	},
	{
		url:
			'https://www.theguardian.com/environment/2019/nov/27/climate-emergency-world-may-have-crossed-tipping-points',
		headline: 'An inactive live sport blog - as it happened',
		showByline: false,
		byline: 'Damian Carrington Environment editor',
		image:
			'https://i.guim.co.uk/img/media/1774967ff6b9127a43b06c0685d1fd499c965141/98_0_3413_2048/master/3413.jpg?width=900&quality=85&s=7332d70e260400883bfdcb5b1453ef10',
		isLiveBlog: false,
		webPublicationDate: '2019-12-02T09:45:30.000Z',
		format: {
			theme: 'SportPillar',
			design: 'ArticleDesign',
			display: 'StandardDisplay',
		},
		pillar: 'sport',
		designType: 'Article',
	},
	{
		url:
			'https://www.theguardian.com/world/2019/nov/26/european-parliament-split-on-declaring-climate-emergency',
		headline: 'European parliament split on declaring climate emergency',
		showByline: false,
		byline: 'Jennifer Rankin in Brussels',
		image:
			'https://i.guim.co.uk/img/media/6db4a6d23e6e8d78ca6893f14b03e79869b2fef1/0_220_3500_2101/master/3500.jpg?width=900&quality=85&s=c212dd884c83237b2a1f24349bd9973b',
		isLiveBlog: false,
		webPublicationDate: '2019-12-02T09:45:30.000Z',
		format: {
			theme: 'NewsPillar',
			design: 'ArticleDesign',
			display: 'StandardDisplay',
		},
		pillar: 'news',
		designType: 'Article',
	},
	{
		url:
			'https://www.theguardian.com/world/2019/nov/23/north-pole-explorers-on-thin-ice-as-climate-change-hits-expedition',
		headline:
			'North Pole  explorers on thin ice as climate change hits expedition',
		showByline: false,
		byline: 'Simon Murphy',
		image:
			'https://i.guim.co.uk/img/media/deb1f0b7f61ebbed2086a55dc34fecb2433a04bc/0_0_6000_3600/master/6000.jpg?width=900&quality=85&s=52aefcb20c15c279b6a6d360f5af9828',
		isLiveBlog: false,
		webPublicationDate: '2019-12-02T09:45:30.000Z',
		format: {
			theme: 'NewsPillar',
			design: 'ArticleDesign',
			display: 'StandardDisplay',
		},
		pillar: 'news',
		designType: 'Article',
	},
	{
		url:
			'https://www.theguardian.com/environment/2019/oct/25/scientists-glacial-rivers-absorb-carbon-faster-rainforests',
		headline:
			'Glacial rivers absorb carbon faster than rainforests, scientists find',
		showByline: false,
		byline: 'Leyland Cecco',
		image:
			'https://i.guim.co.uk/img/media/5e8ea90ae9f503aa1c98fd35dbf13235b1207fea/0_490_3264_1958/master/3264.jpg?width=900&quality=85&s=80890967a26cab02bd524331818e6e23',
		isLiveBlog: false,
		webPublicationDate: '2019-12-02T09:45:30.000Z',
		format: {
			theme: 'NewsPillar',
			design: 'ArticleDesign',
			display: 'StandardDisplay',
		},
		pillar: 'news',
		designType: 'Article',
	},
	{
		url:
			'https://www.theguardian.com/business/2019/oct/20/uk-urges-world-bank-to-channel-more-money-into-tackling-climate-crisis',
		headline:
			'UK urges World Bank to channel more money into tackling climate crisis',
		showByline: false,
		byline: 'Larry Elliott  in Washington',
		image:
			'https://i.guim.co.uk/img/media/2905d1c09d1a27de1c183dfa5cdcc10c869932d9/0_124_5472_3284/master/5472.jpg?width=900&quality=85&s=88c182d909be33c918fc17f26778d0c1',
		isLiveBlog: false,
		webPublicationDate: '2019-12-02T09:45:30.000Z',
		format: {
			theme: 'NewsPillar',
			design: 'ArticleDesign',
			display: 'StandardDisplay',
		},
		pillar: 'news',
		designType: 'Article',
	},
];

const trails: TrailType[] = CAPITrails.map((thisTrail) => {
	const display = decideDisplay(thisTrail.format);
	const design = decideDesign(thisTrail.format);
	const theme = decideTheme(thisTrail.format);
	return {
		url: thisTrail.url,
		headline: thisTrail.headline,
		showByline: thisTrail.showByline,
		byline: thisTrail.byline,
		image: thisTrail.image,
		isLiveBlog: thisTrail.isLiveBlog,
		webPublicationDate: thisTrail.webPublicationDate,
		mediaType: thisTrail.mediaType,
		mediaDuration: thisTrail.mediaDuration,
		format: {
			display,
			theme,
			design,
		},
		palette: decidePalette({
			display,
			theme,
			design,
		}),
	};
});

export const storyPackageTrails: OnwardsType = {
	heading: 'More on this story',
	trails,
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const oneTrail: OnwardsType = {
	heading: 'More on this story',
	trails: trails.slice(0, 1),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const twoTrails: OnwardsType = {
	heading: 'More on this story',
	trails: trails.slice(0, 2),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const threeTrails: OnwardsType = {
	heading: 'More on this story',
	trails: trails.slice(0, 3),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const fourTrails: OnwardsType = {
	heading: 'More on this story',
	trails: trails.slice(0, 4),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const fiveTrails: OnwardsType = {
	heading: 'More on this story',
	trails: trails.slice(0, 5),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const sixTrails: OnwardsType = {
	heading: 'More on this story',
	trails: trails.slice(0, 6),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const sevenTrails: OnwardsType = {
	heading: 'More on this story',
	trails: trails.slice(0, 7),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const eightTrails: OnwardsType = {
	heading: 'More on this story',
	trails: trails.slice(0, 8),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const labsTrails: OnwardsType = {
	heading: 'Paid Content',
	trails: trails.slice(0, 8).map((trail) => {
		return {
			...trail,
			format: {
				...trail.format,
				theme: Special.Labs,
			},
		};
	}),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Special.Labs,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const linkAndDescription: OnwardsType = {
	url: 'https://www.theguardian.com/news/shortcuts',
	description:
		'Our writers reflect on the people, issues and curiosities in the news',
	heading: 'More on this story',
	trails: trails.slice(0, 8),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const withLongDescription: OnwardsType = {
	description:
		"<p>A blog by the Guardian's internal Digital team. We build the Guardian website, mobile apps, Editorial tools, revenue products, support our infrastructure and manage all things tech around the Guardian.</p><p>Our team contains Developers, UX, Quality, Product and Enterprise IT. This blog is where we share our experiences and approaches, including software  development tips, code examples, open source software and product  development stories </p>",
	heading: 'More on this story',
	trails: trails.slice(0, 8),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};

export const withLink: OnwardsType = {
	description:
		'<p>The long-running series in which readers answer other readers’ questions on subjects ranging from trivial flights of fancy to profound scientific and philosophical concepts</p><p><em>Please send new questions to </em><strong><a href="mailto://nq@theguardian.com">nq@theguardian.com</a></strong>.</p>',
	heading: 'More on this story',
	trails: trails.slice(0, 8),
	ophanComponentName: 'more-on-this-story',
	format: {
		theme: Pillar.News,
		design: Design.Article,
		display: Display.Standard,
	},
};
