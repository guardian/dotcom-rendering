import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { StoryObj } from '@storybook/react';
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

export const Headlines: StoryObj = ({ format }: StoryProps) => (
	<>
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
	</>
);

Headlines.storyName = 'Headlines carousel';
Headlines.decorators = [
	splitTheme([defaultFormat, sportFormat], { orientation: 'vertical' }),
];

export const SingleItemCarousel = () => (
	<>
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
	</>
);

SingleItemCarousel.storyName = 'Carousel with single item';
SingleItemCarousel.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const Immersive = () => (
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

Immersive.storyName = 'Immersive carousel';

const specialReportAltFormat = {
	theme: ArticleSpecial.SpecialReportAlt,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

export const SpecialReportAlt = () => {
	const specialReportTrails = [...trails];

	for (const trail of specialReportTrails)
		trail.format = specialReportAltFormat;

	return (
		<>
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
		</>
	);
};

SpecialReportAlt.storyName = 'SpecialReportAlt';
SpecialReportAlt.decorators = [
	splitTheme([specialReportAltFormat], { orientation: 'vertical' }),
];

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
