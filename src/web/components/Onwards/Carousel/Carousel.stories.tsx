import React from 'react';

import { Design } from '@guardian/types/Format';

import { Carousel } from './Carousel';

export default {
	component: Carousel,
	title: 'Components/Carousel',
};

const trails: TrailType[] = [
	{
		url:
			'https://www.theguardian.com/politics/live/2020/sep/15/uk-coronavirus-live-covid-19-second-wave-testing-capacity-government-brexit-politics-boris-johnson',
		linkText:
			'UK coronavirus live: Covid testing shortage will take weeks to resolve, says Matt Hancock',
		showByline: false,
		byline: 'Andrew Sparrow',
		image:
			'https://i.guim.co.uk/img/media/9e3148e304f3d6d6eeafadaf4b707eb4b6f4f64c/0_196_3500_2099/master/3500.jpg?width=300&quality=85&auto=format&fit=max&s=4c6370b54991b05550d1fa7b78f69829',
		isLiveBlog: true,
		pillar: 'news',
		design: Design.Live,
		webPublicationDate: '2020-09-15T13:46:52.000Z',
		headline:
			'UK coronavirus: testing shortage will take weeks to resolve, says Matt Hancock',
		shortUrl: 'https://theguardian.com/p/ezyq3',
	},
	{
		url:
			'https://www.theguardian.com/society/2020/sep/15/ex-tory-mp-charlie-elphicke-jailed-for-two-years-for-sexual-assaults',
		linkText:
			'Ex-Tory MP Charlie Elphicke jailed for two years for sexual assaults',
		showByline: false,
		byline: 'Ben Quinn',
		image:
			'https://i.guim.co.uk/img/media/877e5e3f240c1958504827796249cd8a46caf0a1/0_116_1969_1181/master/1969.jpg?width=300&quality=85&auto=format&fit=max&s=444e206a147224a7e50e0eeb4780620c',
		isLiveBlog: false,
		pillar: 'news',
		design: Design.Article,
		webPublicationDate: '2020-09-15T11:44:46.000Z',
		headline: 'Ex-Tory MP jailed for two years for sexual assaults',
		shortUrl: 'https://theguardian.com/p/ezmac',
		kickerText: 'Charlie Elphicke',
	},
	{
		url:
			'https://www.theguardian.com/politics/2020/sep/15/no-10-rejects-any-concessions-for-rebel-tories-on-brexit-bill',
		linkText:
			'No 10 rejects any concessions for rebel Tories on Brexit bill',
		showByline: false,
		byline: 'Jessica Elgot and Peter Walker',
		image:
			'https://i.guim.co.uk/img/media/f7c663fe69644c3ca5fd402fab40f3b5501064cc/0_99_4505_2703/master/4505.jpg?width=300&quality=85&auto=format&fit=max&s=fca4c60f52a8e1c686d48742d43e6887',
		isLiveBlog: false,
		pillar: 'news',
		design: Design.Article,
		webPublicationDate: '2020-09-15T13:24:45.000Z',
		headline: 'No 10 rejects any concessions for rebel Tories on bill',
		shortUrl: 'https://theguardian.com/p/ezn2d',
		kickerText: 'Brexit',
	},
	{
		url:
			'https://www.theguardian.com/environment/2020/sep/15/every-global-target-to-stem-destruction-of-nature-by-2020-missed-un-report-aoe',
		linkText:
			'World fails to meet a single target to stop destruction of nature – UN report',
		showByline: false,
		byline: 'Patrick Greenfield',
		image:
			'https://i.guim.co.uk/img/media/b204a14ffd1911591e9aa0f2df6769798bbdd1c1/0_225_4000_2400/master/4000.jpg?width=300&quality=85&auto=format&fit=max&s=b7f695cc8b23cec50344273aa46503bf',
		isLiveBlog: false,
		pillar: 'news',
		design: Design.Article,
		webPublicationDate: '2020-09-15T13:15:36.000Z',
		headline:
			'World fails to meet a single target to stop destruction of nature – UN report',
		shortUrl: 'https://theguardian.com/p/ezgye',
		kickerText: 'Environment',
	},
	{
		url:
			'https://www.theguardian.com/world/2020/sep/15/alexei-navalny-poisoned-russian-opposition-leader-photo-hospital',
		linkText:
			"'Hi, this is Navalny': poisoned Russian opposition leader posts hospital photo",
		showByline: false,
		byline: 'Shaun Walker in Moscow',
		image:
			'https://i.guim.co.uk/img/media/f285ba35a26e663f9d5e2808558f644fa12765e1/0_136_960_576/master/960.jpg?width=300&quality=85&auto=format&fit=max&s=b33e6ce3806d5e7ddb26d4decbb824a5',
		isLiveBlog: false,
		pillar: 'news',
		design: Design.Article,
		webPublicationDate: '2020-09-15T10:41:04.000Z',
		headline: 'Poisoned Russian opposition leader posts hospital photo',
		shortUrl: 'https://theguardian.com/p/ezmtk',
		kickerText: "'Hi, this is Navalny'",
	},
	{
		url:
			'https://www.theguardian.com/media/2020/sep/15/gary-lineker-takes-bbc-pay-cut-and-agrees-to-tweet-more-carefully',
		linkText:
			'Gary Lineker takes 25% BBC pay cut and agrees to tweet more carefully',
		showByline: false,
		byline: 'Jim Waterson Media editor',
		image:
			'https://i.guim.co.uk/img/media/3ec6d136faade765328e86db332665d19e011d1c/0_1268_3203_1922/master/3203.jpg?width=300&quality=85&auto=format&fit=max&s=b8ec99f56446dc12f76c6880d43b1202',
		isLiveBlog: false,
		pillar: 'news',
		design: Design.Article,
		webPublicationDate: '2020-09-15T11:00:32.000Z',
		headline:
			'Gary Lineker takes 25% pay cut and agrees to tweet more carefully',
		shortUrl: 'https://theguardian.com/p/ezmcp',
		kickerText: 'BBC',
	},
	{
		url:
			'https://www.theguardian.com/us-news/2020/sep/15/us-election-kim-darroch-donald-trump-joe-biden',
		linkText:
			'‘The US feels very volatile’: former ambassador warns of election violence',
		showByline: false,
		byline: 'Julian Borger in Washington',
		image:
			'https://i.guim.co.uk/img/media/cf291623610b4e9bd53adad56ea1752c5557ad21/0_26_5636_3382/master/5636.jpg?width=300&quality=85&auto=format&fit=max&s=444feb3e9cc898bda708438d05ea6941',
		isLiveBlog: false,
		pillar: 'news',
		design: Design.Article,
		webPublicationDate: '2020-09-15T09:30:22.000Z',
		headline: 'Former ambassador warns of election violence',
		shortUrl: 'https://theguardian.com/p/ezk38',
		kickerText: '‘The US feels very volatile’',
	},
	{
		url:
			'https://www.theguardian.com/us-news/2020/sep/15/trump-iran-retaliate-1000-times-greater-force',
		linkText:
			"Trump threatens to retaliate to any Iran attack with '1,000 times greater' force",
		showByline: false,
		byline: 'Tom McCarthy',
		image:
			'https://i.guim.co.uk/img/media/c38b10a48e27c463ce16d058e02aafda4328e52f/0_20_2462_1478/master/2462.jpg?width=300&quality=85&auto=format&fit=max&s=63656ef63ad936d92d96316f13ce2715',
		isLiveBlog: false,
		pillar: 'news',
		design: Design.Article,
		webPublicationDate: '2020-09-15T13:04:57.000Z',
		headline:
			"Trump threatens to retaliate to any attack with '1,000 times greater' force",
		shortUrl: 'https://theguardian.com/p/ezmpz',
		kickerText: 'Iran',
	},
	{
		url:
			'https://www.theguardian.com/world/2020/sep/15/after-fire-greece-vows-to-empty-lesbos-of-all-refugees-by-easter',
		linkText:
			'Greece vows to empty Lesbos of all refugees by Easter after fire',
		showByline: false,
		byline: 'Helena Smith in Athens Philip Oltermann in Berlin',
		image:
			'https://i.guim.co.uk/img/media/8c0eff269da77ac303734e8717705d4b70f7d5e2/0_97_5472_3283/master/5472.jpg?width=300&quality=85&auto=format&fit=max&s=3b45f3f609dd7aee06eb1428a172bb8c',
		isLiveBlog: false,
		pillar: 'news',
		design: Design.Article,
		webPublicationDate: '2020-09-15T13:28:24.000Z',
		headline:
			'Government vows to empty Lesbos of all refugees by Easter after fire',
		shortUrl: 'https://theguardian.com/p/ezm92',
		kickerText: 'Greece',
	},
	{
		url:
			'https://www.theguardian.com/books/2020/sep/15/most-diverse-booker-prize-shortlist-is-also-almost-all-american-hilary-mantel',
		linkText:
			'Most diverse Booker prize shortlist ever as Hilary Mantel misses out',
		showByline: false,
		byline: 'Alison Flood',
		image:
			'https://i.guim.co.uk/img/media/f022aacc31e1e95a07f382206c9b8e5620214e0a/0_0_2560_1536/master/2560.jpg?width=300&quality=85&auto=format&fit=max&s=b4a6348eb191bf5d366ed6282f2ada70',
		isLiveBlog: false,
		pillar: 'culture',
		design: Design.Article,
		webPublicationDate: '2020-09-15T12:21:07.000Z',
		headline: 'Most diverse shortlist ever as Hilary Mantel misses out',
		shortUrl: 'https://theguardian.com/p/ezmt9',
		kickerText: 'Booker prize 2020',
	},
];

export const Headlines = () => (
	<>
		<Carousel
			heading="Headlines"
			trails={trails}
			ophanComponentName="curated-content"
			pillar="news"
		/>

		<Carousel
			heading="Sport"
			trails={trails}
			ophanComponentName="curated-content"
			pillar="sport"
		/>
	</>
);

Headlines.story = 'Headlines carousel';
