import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { StoryObj } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import type { TrailType } from '../types/trails';
import { Carousel } from './Carousel.importable';
import { Section } from './Section';

export default {
	component: Carousel,
	title: 'Components/Carousel',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.desktop,
			],
		},
	},
};

const convertToImmersive = (trails: TrailType[]): TrailType[] => {
	return trails.map((trail) => {
		const format = {
			...trail.format,
			display: ArticleDisplay.Immersive,
		};
		return {
			...trail,
			format,
		};
	});
};

const mockDiscussionId = '/p/pf8fm';
const encodedMockDiscussionId = '%2Fp%2Fpf8fm';

const mockDiscussionUrl = `${discussionApiUrl}/getCommentCounts?short-urls=${encodedMockDiscussionId}`;
const mockCommentCount = () => {
	fetchMock
		.restore()
		.get(mockDiscussionUrl, {
			status: 200,
			body: {
				[mockDiscussionId]: 1506,
			} as Record<string, number>,
		})
		.spy('end:.hot-update.json');
};

const trails: TrailType[] = [
	{
		url: 'https://www.theguardian.com/politics/live/2021/feb/17/uk-covid-nationwide-rapid-testing-lockdown-coronavirus-latest-update',
		linkText:
			'UK Covid live: England lockdown to be eased in stages, says PM, amid reports of nationwide mass testing',
		showByline: false,
		byline: 'Yohannes Lowe',
		image: 'https://media.guim.co.uk/77e960298d4339e047eac5c1986d0f3214f6285d/419_447_4772_2863/master/4772.jpg',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.LiveBlog,
		},
		webPublicationDate: new Date(Date.now() - 60 * 60 * 1000).toString(),
		headline:
			'UK Covid live: England lockdown to be eased in stages, says PM, amid reports of nationwide mass testing',
		shortUrl: 'https://gu.com/p/gekj6',
		dataLinkName: 'news | group-2 | card-@1',
		showQuotedHeadline: false,
	},
	{
		url: 'https://www.theguardian.com/world/2021/feb/17/uk-to-begin-worlds-first-covid-human-challenge-study-within-weeks',
		linkText:
			'UK to infect up to 90 healthy volunteers with Covid in world first trial',
		showByline: false,
		byline: 'Nicola Davis and agency',
		image: 'https://media.guim.co.uk/56d554a7c453dc1040f70453a01fefcb227f2055/0_0_3060_1836/master/3060.jpg',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Standard,
		},
		webPublicationDate: new Date(Date.now() - 60 * 60 * 1000).toString(),
		headline:
			'UK to infect up to 90 healthy volunteers with Covid in world first trial',
		shortUrl: 'https://gu.com/p/gey5n',
		dataLinkName: 'news | group-2 | card-@2',
		showQuotedHeadline: false,
		discussion: {
			isCommentable: true,
			isClosedForComments: false,
			discussionId: mockDiscussionId,
		},
	},
	{
		url: 'https://www.theguardian.com/world/2021/feb/17/scottish-government-inadequately-prepared-for-covid-audit-scotland-report',
		linkText:
			'Scottish government inadequately prepared for Covid – watchdog',
		showByline: false,
		byline: 'Libby Brooks Scotland correspondent',
		image: 'https://media.guim.co.uk/df5aea6391e21b5a5d2d25fd9aad81d497f99d42/0_45_3062_1837/master/3062.jpg',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Standard,
		},
		webPublicationDate: '2021-02-17T11:11:43.000Z',
		headline:
			'Scottish government inadequately prepared for Covid, says watchdog',
		shortUrl: 'https://gu.com/p/gey2h',
		dataLinkName: 'news | group-1 | card-@3',
		showQuotedHeadline: false,
	},
	{
		url: 'https://www.theguardian.com/society/2021/feb/16/encouraging-signs-covid-vaccine-over-80s-deaths-fall-england',
		linkText:
			'‘Encouraging’ signs for Covid vaccine as over-80s deaths fall in England',
		showByline: false,
		byline: 'Anna Leach, Ashley Kirk and Pamela Duncan',
		image: 'https://media.guim.co.uk/5ebec1a8d662f0da39887dae16e4b2720379246e/0_0_5000_3000/master/5000.jpg',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Standard,
		},
		webPublicationDate: '2021-02-16T16:00:55.000Z',
		headline:
			'‘Encouraging’ signs for Covid vaccine as over-80s deaths fall in England',
		shortUrl: 'https://gu.com/p/g94y7',
		dataLinkName: 'news | group-0 | card-@4',
		showQuotedHeadline: false,
	},
	{
		url: 'https://www.theguardian.com/world/2021/feb/16/contact-tracing-alone-has-little-impact-on-curbing-covid-spread-report-finds',
		linkText:
			'Contact tracing alone has little impact on curbing Covid spread, report finds',
		showByline: false,
		byline: 'Nicola Davis and Natalie Grover',
		image: 'https://media.guim.co.uk/046002abfc13c8cf7f0c40454349eb0e95d842b2/0_147_3884_2331/master/3884.jpg',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Standard,
		},
		webPublicationDate: '2021-02-16T18:22:53.000Z',
		headline:
			'Contact tracing alone has little impact on curbing Covid spread, report finds',
		shortUrl: 'https://gu.com/p/geeq2',
		dataLinkName: 'news | group-0 | card-@5',
		showQuotedHeadline: false,
	},
	{
		url: 'https://www.theguardian.com/world/2021/feb/16/covid-almost-2m-more-people-asked-shield-england',
		linkText:
			'Ethnicity and poverty are Covid risk factors, new Oxford modelling tool shows',
		showByline: false,
		byline: 'Sarah Boseley Health editor and Aamna Mohdin Community affairs correspondent',
		image: 'https://media.guim.co.uk/9e47ac13c7ffc63ee56235e8ef64301d6ed96d03/0_90_3520_2111/master/3520.jpg',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Standard,
		},
		webPublicationDate: '2021-02-16T16:35:45.000Z',
		headline:
			'Ethnicity and poverty are Covid risk factors, new Oxford modelling tool shows',
		shortUrl: 'https://gu.com/p/gee2t',
		dataLinkName: 'news | group-0 | card-@6',
		showQuotedHeadline: false,
	},
	{
		url: 'https://www.theguardian.com/politics/live/2021/feb/16/uk-covid-live-coronavirus-sturgeon-return-scottish-schools-latest-updates',
		linkText:
			'UK Covid: 799 more deaths and 10,625 new cases reported; Scottish schools in phased return from Monday – as it happened',
		showByline: false,
		byline: 'Nicola Slawson',
		image: 'https://media.guim.co.uk/c01ad5ee63034e0f478959fc7a705c93debf8ba7/0_220_4104_2462/master/4104.jpg',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.LiveBlog,
		},
		webPublicationDate: '2021-02-16T17:00:15.000Z',
		headline:
			'UK Covid: 799 more deaths and 10,625 new cases reported; Scottish schools in phased return from Monday – as it happened',
		shortUrl: 'https://gu.com/p/geczb',
		dataLinkName: 'news | group-0 | card-@7',
		showQuotedHeadline: false,
	},
	{
		url: 'https://www.theguardian.com/uk-news/2021/feb/16/qcovid-how-improved-algorithm-can-identify-more-higher-risk-adults',
		linkText:
			'QCovid: how improved algorithm can identify more higher-risk adults',
		showByline: false,
		byline: 'Sarah Boseley Health editor',
		image: 'https://media.guim.co.uk/6d152e60fdb37dbbc063a68e2cffccf97cdab183/0_40_5458_3275/master/5458.jpg',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Analysis,
		},
		webPublicationDate: '2021-02-16T18:42:44.000Z',
		headline:
			'QCovid: how improved algorithm can identify more higher-risk adults',
		shortUrl: 'https://gu.com/p/gefev',
		dataLinkName: 'news | group-0 | card-@8',
		showQuotedHeadline: false,
	},
];

const immersiveTrails = convertToImmersive(trails);

const defaultFormat = {
	theme: Pillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};
const sportFormat = {
	theme: Pillar.Sport,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

export const Headlines: StoryObj = ({ format }: StoryProps) => {
	mockCommentCount();
	return (
		<Section fullWidth={true}>
			<Carousel
				heading="More on this story"
				trails={trails}
				onwardsSource="more-on-this-story"
				format={format}
				leftColSize="compact"
				discussionApiUrl={discussionApiUrl}
			/>
		</Section>
	);
};

Headlines.storyName = 'Headlines carousel';
Headlines.decorators = [
	splitTheme([defaultFormat, sportFormat], { orientation: 'vertical' }),
];

export const SingleItemCarousel = () => {
	mockCommentCount();
	return (
		<Section fullWidth={true}>
			<Carousel
				heading="More on this story"
				trails={trails.slice(1, 2)}
				onwardsSource="more-on-this-story"
				format={defaultFormat}
				leftColSize="compact"
				discussionApiUrl={discussionApiUrl}
			/>
		</Section>
	);
};

SingleItemCarousel.storyName = 'Carousel with single item';
SingleItemCarousel.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];
export const SingleOpinionCarousel = () => {
	mockCommentCount();
	return (
		<Section fullWidth={true}>
			<Carousel
				heading="More on this story"
				trails={trails.slice(1, 2)}
				onwardsSource="more-on-this-story"
				format={{
					theme: Pillar.Opinion,
					design: ArticleDesign.Comment,
					display: ArticleDisplay.Standard,
				}}
				leftColSize="compact"
				discussionApiUrl={discussionApiUrl}
			/>
		</Section>
	);
};

SingleOpinionCarousel.storyName = 'Carousel with single comment item';
SingleOpinionCarousel.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const Immersive = () => {
	mockCommentCount();
	return (
		<>
			<Section fullWidth={true}>
				<Carousel
					heading="More on this story"
					trails={immersiveTrails}
					onwardsSource="more-on-this-story"
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Immersive,
					}}
					leftColSize="compact"
					discussionApiUrl={discussionApiUrl}
				/>
			</Section>
			<Section fullWidth={true}>
				<Carousel
					heading="Sport"
					trails={immersiveTrails}
					onwardsSource="curated-content"
					format={{
						theme: Pillar.Sport,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Immersive,
					}}
					leftColSize="compact"
					discussionApiUrl={discussionApiUrl}
				/>
			</Section>
		</>
	);
};

Immersive.storyName = 'Immersive carousel';

const specialReportAltFormat = {
	theme: ArticleSpecial.SpecialReportAlt,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

export const SpecialReportAlt = () => {
	mockCommentCount();
	const specialReportTrails = [...trails];

	for (const trail of specialReportTrails)
		trail.format = specialReportAltFormat;

	return (
		<Section fullWidth={true}>
			<Carousel
				heading="SpecialReportAlt"
				trails={specialReportTrails}
				onwardsSource="curated-content"
				format={specialReportAltFormat}
				leftColSize="compact"
				discussionApiUrl={discussionApiUrl}
			/>
		</Section>
	);
};

SpecialReportAlt.storyName = 'SpecialReportAlt';
SpecialReportAlt.decorators = [
	splitTheme([specialReportAltFormat], { orientation: 'vertical' }),
];

export const AllCards = () => {
	const allCardTypesTrail: TrailType[] = [
		{
			url: 'https://www.theguardian.com/us-news/2023/nov/22/us-thwarts-plot-to-kill-sikh-separatist-and-issues-diplomatic-warning-to-india',
			linkText: 'Standard card example',
			showByline: false,
			byline: 'Leyland Cecco in Toronto and agencies in New Delhi',
			image: 'https://media.guim.co.uk/c45cbf03efddcb753c0eafd01b1d0fa5e30ee8c5/0_0_4418_2651/master/4418.jpg',
			format: {
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
				design: ArticleDesign.Standard,
			},
			webPublicationDate: '2023-11-22T19:52:09.000Z',
			headline: 'Standard card example',
			shortUrl: 'https://www.theguardian.com/p/pd2mn',
			dataLinkName: 'news | group-0 | card-@1',
		},
		{
			url: 'https://www.theguardian.com/politics/live/2021/feb/17/uk-covid-nationwide-rapid-testing-lockdown-coronavirus-latest-update',
			linkText: 'Live blog example',
			showByline: true,
			byline: 'Yohannes Lowe',
			image: 'https://media.guim.co.uk/77e960298d4339e047eac5c1986d0f3214f6285d/419_447_4772_2863/master/4772.jpg',
			format: {
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
				design: ArticleDesign.LiveBlog,
			},
			webPublicationDate: new Date(
				Date.now() - 60 * 60 * 1000,
			).toString(),
			headline: 'Liveblog example',
			shortUrl: 'https://gu.com/p/gekj6',
			dataLinkName: 'news | group-2 | card-@1',
			showQuotedHeadline: false,
		},
		{
			url: 'https://www.theguardian.com/news/2022/jul/12/eu-urged-investigate-ex-politician-uber-links-rein-in-tech-lobbyists',
			linkText: 'Special report example',
			showByline: false,
			byline: 'Jennifer Rankin in Brussels',
			image: 'https://i.guim.co.uk/img/media/e952252773480240cb4720ba15f23cb30e8a18a0/0_108_3000_1799/master/3000.jpg?width=300&quality=85&auto=format&fit=max&s=8def8de1cbc8236aa0f33208a0a45e5d',
			ageWarning: '1 year',
			format: {
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.SpecialReport,
				design: ArticleDesign.Standard,
			},
			webPublicationDate: '2022-07-12T16:24:48.000Z',
			headline: 'Special report example',
			shortUrl: 'https://www.theguardian.com/p/yzmgf',
			dataLinkName: 'special-report | group-0 | card-@2',
		},
		{
			url: 'https://www.theguardian.com/commentisfree/2023/dec/04/uk-government-hydrogen-plan-oil-industry-taxpayer-blue-hydrogen-climate-crisis',
			linkText: 'Opinion card example',
			showByline: true,
			byline: 'Kevin Anderson and Simon Oldridge',
			image: 'https://i.guim.co.uk/img/media/3c5163fb3a3fcb02a94454ad14967020bf015a00/271_0_3111_1868/master/3111.jpg?width=300&quality=85&auto=format&fit=max&s=093127972154c691b8525cbd8a5e6048',
			format: {
				display: ArticleDisplay.Standard,
				theme: Pillar.Opinion,
				design: ArticleDesign.Comment,
			},
			webPublicationDate: new Date(
				Date.now() - 60 * 60 * 1000,
			).toString(),
			headline: 'Opinion card example',
			shortUrl: 'https://www.theguardian.com/p/pecpq',
			discussion: {
				isCommentable: true,
				isClosedForComments: false,
				discussionId: mockDiscussionId,
			},
			dataLinkName: 'comment | group-0 | card-@2',
		},
		{
			url: 'https://www.theguardian.com/sport/2023/dec/04/golf-pga-tour-liv-rory-mcilroy-tiger-woods-jon-rahm',
			linkText:
				'Golf’s obscene money list shows sport is in danger of losing the plot | Ewan Murray',
			showByline: true,
			byline: 'Ewan Murray',
			image: 'https://i.guim.co.uk/img/media/06ddef097983c7590f45243f2128e4c8dffdcfbf/0_47_4170_2502/master/4170.jpg?width=300&quality=85&auto=format&fit=max&s=79cde35702ccaf33215ac48a2b11f44d',
			format: {
				display: ArticleDisplay.Standard,
				theme: Pillar.Sport,
				design: ArticleDesign.Comment,
			},
			webPublicationDate: '2023-12-04T08:00:38.000Z',
			headline: 'Sport opinion card example',
			shortUrl: 'https://www.theguardian.com/p/pf8g9',
			dataLinkName: 'comment | group-0 | card-@1',
		},
		{
			url: 'https://www.theguardian.com/food/2023/dec/04/quick-easy-carrot-brie-tart-recipe-christmas-rukmini-iyer',
			linkText:
				'A Christmas snack: Rukmini Iyer’s quick and easy recipe for carrot and brie tart',
			showByline: false,
			byline: 'Rukmini Iyer',
			image: 'https://i.guim.co.uk/img/media/1d07cbd35405c4fdd109d5a22179003a1ce07cde/11_215_3466_2080/master/3466.jpg?width=300&quality=85&auto=format&fit=max&s=9471ec980407e6a06fab1288bbfed493',
			format: {
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
				design: ArticleDesign.Recipe,
			},
			webPublicationDate: '2023-12-04T13:00:43.000Z',
			headline: 'Colourful kicker',
			shortUrl: 'https://www.theguardian.com/p/pakay',
			kickerText: 'A Christmas snack',
			dataLinkName: 'news | group-0 | card-@1',
		},
		{
			url: 'https://www.theguardian.com/world/live/2023/dec/04/israel-hamas-war-live-updates-hundreds-palestinians-killed-israel-ground-attack-gaza-strip-news',
			linkText: 'Video card example',
			showByline: false,
			byline: 'Jamie Grierson (now), Martin Belam and Helen Livingstone (earlier)',
			image: 'https://i.guim.co.uk/img/media/f9684ebaf7096bb24d34854f555351391ff2258e/0_468_5500_3299/master/5500.jpg?width=300&quality=85&auto=format&fit=max&s=10d0a2aa1f6f0d19e569047f9215f588',
			format: {
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
				design: ArticleDesign.Video,
			},
			webPublicationDate: '2023-12-04T13:48:55.000Z',
			headline: 'Video card example',
			shortUrl: 'https://www.theguardian.com/p/pfagg',
			dataLinkName: 'live | group-0 | card-@1',
		},
		{
			url: 'https://www.theguardian.com/music/2023/dec/04/the-20-best-songs-of-2023',
			linkText: 'Galleries example',
			showByline: false,
			byline: 'Aneesa Ahmed, Ben Beaumont-Thomas and Laura Snapes',
			image: 'https://i.guim.co.uk/img/media/d912f07f4641f5a2446c0b6c588926359e79e70d/0_0_5000_3000/master/5000.jpg?width=300&quality=85&auto=format&fit=max&s=e3ac1514bae6e012f009618480505c11',
			format: {
				display: ArticleDisplay.Immersive,
				theme: Pillar.Culture,
				design: ArticleDesign.Picture,
			},
			webPublicationDate: '2023-12-04T06:00:35.000Z',
			headline: 'Galleries example',
			shortUrl: 'https://www.theguardian.com/p/pa4v3',
			kickerText: '2023',
			dataLinkName: 'feature | group-0 | card-@1',
		},
		{
			url: 'https://www.theguardian.com/fashion/2023/dec/03/male-pale-and-out-of-step-why-fashion-houses-have-such-a-problem-with-diversity',
			linkText: 'Podcast example',
			showByline: false,
			byline: 'Ellie Violet Bramley',
			image: 'https://i.guim.co.uk/img/media/8c3c93289db9c09199ed9c3c0146a2b6ef4d5a20/80_102_2180_1308/master/2180.jpg?width=300&quality=85&auto=format&fit=max&s=4b61a73f2194fe469d85a6940d22a406',
			format: {
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
				design: ArticleDesign.Audio,
			},
			webPublicationDate: '2023-12-03T10:00:11.000Z',
			headline: 'Podcast example',
			shortUrl: 'https://www.theguardian.com/p/pepdn',
			kickerText: 'Kicker example',
			dataLinkName: 'feature | group-0 | card-@3',
		},
	];

	return (
		<Section fullWidth={true}>
			<Carousel
				heading="All the card types"
				trails={allCardTypesTrail}
				onwardsSource="more-on-this-story"
				leftColSize="compact"
				discussionApiUrl={discussionApiUrl}
				format={defaultFormat}
			/>
		</Section>
	);
};
AllCards.storyName = 'Carousel with all card types';

export const FrontCarousel = () => (
	<>
		The front carousel was not included in an onwards content redesign, so
		looks a bit different to the others.
		<Section fullWidth={true}>
			<Carousel
				isOnwardContent={false}
				heading="More on this story"
				trails={trails}
				onwardsSource="unknown-source"
				leftColSize="compact"
				url={'https://www.theguardian.com'}
				discussionApiUrl={discussionApiUrl}
				palette={'BreakingPalette'}
			/>
		</Section>
	</>
);

FrontCarousel.storyName = 'Front carousel';
