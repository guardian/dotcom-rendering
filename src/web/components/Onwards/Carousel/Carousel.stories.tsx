import { Design, Display, Pillar } from '@guardian/types';
import { breakpoints } from '@guardian/src-foundations/mq';
import { ElementContainer } from '@root/src/web/components/ElementContainer';

import { decidePalette } from '@root/src/web/lib/decidePalette';

import { Carousel } from './Carousel';

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
			display: Display.Immersive,
		};
		return {
			...trail,
			format,
			palette: decidePalette(format),
		};
	});
};

const trails: TrailType[] = [
	{
		url:
			'https://www.theguardian.com/politics/live/2021/feb/17/uk-covid-nationwide-rapid-testing-lockdown-coronavirus-latest-update',
		linkText:
			'UK Covid live: England lockdown to be eased in stages, says PM, amid reports of nationwide mass testing',
		showByline: false,
		byline: 'Yohannes Lowe',
		image:
			'https://i.guim.co.uk/img/media/77e960298d4339e047eac5c1986d0f3214f6285d/419_447_4772_2863/master/4772.jpg?width=300&quality=85&auto=format&fit=max&s=9a17ef5d7a6240caa29965407ef912e0',
		carouselImages: {
			300: 'https://i.guim.co.uk/img/media/77e960298d4339e047eac5c1986d0f3214f6285d/419_447_4772_2863/master/4772.jpg?width=300&quality=85&auto=format&fit=max&s=9a17ef5d7a6240caa29965407ef912e0',
			460: 'https://i.guim.co.uk/img/media/77e960298d4339e047eac5c1986d0f3214f6285d/419_447_4772_2863/master/4772.jpg?width=460&quality=85&auto=format&fit=max&s=bfec50f21befd99c68868a648ac002c9',
		},
		isLiveBlog: true,
		format: {
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.LiveBlog,
		},
		palette: decidePalette({
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.LiveBlog,
		}),
		webPublicationDate: '2021-02-17T12:45:05.000Z',
		headline:
			'UK Covid live: England lockdown to be eased in stages, says PM, amid reports of nationwide mass testing',
		shortUrl: 'https://gu.com/p/gekj6',
	},
	{
		url:
			'https://www.theguardian.com/world/2021/feb/17/uk-to-begin-worlds-first-covid-human-challenge-study-within-weeks',
		linkText:
			'UK to infect up to 90 healthy volunteers with Covid in world first trial',
		showByline: false,
		byline: 'Nicola Davis and agency',
		image:
			'https://i.guim.co.uk/img/media/56d554a7c453dc1040f70453a01fefcb227f2055/0_0_3060_1836/master/3060.jpg?width=300&quality=85&auto=format&fit=max&s=501112ecfd78672fc4a19133053fe04a',
		carouselImages: {
			300: 'https://i.guim.co.uk/img/media/56d554a7c453dc1040f70453a01fefcb227f2055/0_0_3060_1836/master/3060.jpg?width=300&quality=85&auto=format&fit=max&s=501112ecfd78672fc4a19133053fe04a',
			460: 'https://i.guim.co.uk/img/media/56d554a7c453dc1040f70453a01fefcb227f2055/0_0_3060_1836/master/3060.jpg?width=460&quality=85&auto=format&fit=max&s=72289dbb38ff18ad9e953bb47b96a1c4',
		},
		isLiveBlog: false,
		format: {
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		},
		palette: decidePalette({
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		}),
		webPublicationDate: '2021-02-17T10:03:02.000Z',
		headline:
			'UK to infect up to 90 healthy volunteers with Covid in world first trial',
		shortUrl: 'https://gu.com/p/gey5n',
	},
	{
		url:
			'https://www.theguardian.com/world/2021/feb/17/scottish-government-inadequately-prepared-for-covid-audit-scotland-report',
		linkText:
			'Scottish government inadequately prepared for Covid – watchdog',
		showByline: false,
		byline: 'Libby Brooks Scotland correspondent',
		image:
			'https://i.guim.co.uk/img/media/df5aea6391e21b5a5d2d25fd9aad81d497f99d42/0_45_3062_1837/master/3062.jpg?width=300&quality=85&auto=format&fit=max&s=4de26576c2388e49ee9c9414d5c46d6d',
		carouselImages: {
			300: 'https://i.guim.co.uk/img/media/df5aea6391e21b5a5d2d25fd9aad81d497f99d42/0_45_3062_1837/master/3062.jpg?width=300&quality=85&auto=format&fit=max&s=4de26576c2388e49ee9c9414d5c46d6d',
			460: 'https://i.guim.co.uk/img/media/df5aea6391e21b5a5d2d25fd9aad81d497f99d42/0_45_3062_1837/master/3062.jpg?width=460&quality=85&auto=format&fit=max&s=5c00af8c60a6927dc8c46fea69e6e7d3',
		},
		isLiveBlog: false,
		format: {
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		},
		palette: decidePalette({
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		}),
		webPublicationDate: '2021-02-17T11:11:43.000Z',
		headline:
			'Scottish government inadequately prepared for Covid, says watchdog',
		shortUrl: 'https://gu.com/p/gey2h',
	},
	{
		url:
			'https://www.theguardian.com/society/2021/feb/16/encouraging-signs-covid-vaccine-over-80s-deaths-fall-england',
		linkText:
			'‘Encouraging’ signs for Covid vaccine as over-80s deaths fall in England',
		showByline: false,
		byline: 'Anna Leach, Ashley Kirk and Pamela Duncan',
		image:
			'https://i.guim.co.uk/img/media/5ebec1a8d662f0da39887dae16e4b2720379246e/0_0_5000_3000/master/5000.jpg?width=300&quality=85&auto=format&fit=max&s=51c9ef2f26b312a7c057d86e9a53f365',
		carouselImages: {
			300: 'https://i.guim.co.uk/img/media/5ebec1a8d662f0da39887dae16e4b2720379246e/0_0_5000_3000/master/5000.jpg?width=300&quality=85&auto=format&fit=max&s=51c9ef2f26b312a7c057d86e9a53f365',
			460: 'https://i.guim.co.uk/img/media/5ebec1a8d662f0da39887dae16e4b2720379246e/0_0_5000_3000/master/5000.jpg?width=460&quality=85&auto=format&fit=max&s=a6ac6e3f75c8338cc1afed646f484943',
		},
		isLiveBlog: false,
		format: {
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		},
		palette: decidePalette({
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		}),
		webPublicationDate: '2021-02-16T16:00:55.000Z',
		headline:
			'‘Encouraging’ signs for Covid vaccine as over-80s deaths fall in England',
		shortUrl: 'https://gu.com/p/g94y7',
	},
	{
		url:
			'https://www.theguardian.com/world/2021/feb/16/contact-tracing-alone-has-little-impact-on-curbing-covid-spread-report-finds',
		linkText:
			'Contact tracing alone has little impact on curbing Covid spread, report finds',
		showByline: false,
		byline: 'Nicola Davis and Natalie Grover',
		image:
			'https://i.guim.co.uk/img/media/046002abfc13c8cf7f0c40454349eb0e95d842b2/0_147_3884_2331/master/3884.jpg?width=300&quality=85&auto=format&fit=max&s=63ca0f0e218f3c7d886231b544a82cbd',
		carouselImages: {
			300: 'https://i.guim.co.uk/img/media/046002abfc13c8cf7f0c40454349eb0e95d842b2/0_147_3884_2331/master/3884.jpg?width=300&quality=85&auto=format&fit=max&s=63ca0f0e218f3c7d886231b544a82cbd',
			460: 'https://i.guim.co.uk/img/media/046002abfc13c8cf7f0c40454349eb0e95d842b2/0_147_3884_2331/master/3884.jpg?width=460&quality=85&auto=format&fit=max&s=c418c5d1966c7da232eb9fb58e5bbd30',
		},
		isLiveBlog: false,
		format: {
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		},
		palette: decidePalette({
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		}),
		webPublicationDate: '2021-02-16T18:22:53.000Z',
		headline:
			'Contact tracing alone has little impact on curbing Covid spread, report finds',
		shortUrl: 'https://gu.com/p/geeq2',
	},
	{
		url:
			'https://www.theguardian.com/world/2021/feb/16/covid-almost-2m-more-people-asked-shield-england',
		linkText:
			'Ethnicity and poverty are Covid risk factors, new Oxford modelling tool shows',
		showByline: false,
		byline:
			'Sarah Boseley Health editor and Aamna Mohdin Community affairs correspondent',
		image:
			'https://i.guim.co.uk/img/media/9e47ac13c7ffc63ee56235e8ef64301d6ed96d03/0_90_3520_2111/master/3520.jpg?width=300&quality=85&auto=format&fit=max&s=206ae21754ca45db0f098b08091562ef',
		carouselImages: {
			300: 'https://i.guim.co.uk/img/media/9e47ac13c7ffc63ee56235e8ef64301d6ed96d03/0_90_3520_2111/master/3520.jpg?width=300&quality=85&auto=format&fit=max&s=206ae21754ca45db0f098b08091562ef',
			460: 'https://i.guim.co.uk/img/media/9e47ac13c7ffc63ee56235e8ef64301d6ed96d03/0_90_3520_2111/master/3520.jpg?width=460&quality=85&auto=format&fit=max&s=ba37fece37f9819111a7ded88284e535',
		},
		isLiveBlog: false,
		format: {
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		},
		palette: decidePalette({
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Article,
		}),
		webPublicationDate: '2021-02-16T16:35:45.000Z',
		headline:
			'Ethnicity and poverty are Covid risk factors, new Oxford modelling tool shows',
		shortUrl: 'https://gu.com/p/gee2t',
	},
	{
		url:
			'https://www.theguardian.com/politics/live/2021/feb/16/uk-covid-live-coronavirus-sturgeon-return-scottish-schools-latest-updates',
		linkText:
			'UK Covid: 799 more deaths and 10,625 new cases reported; Scottish schools in phased return from Monday – as it happened',
		showByline: false,
		byline: 'Nicola Slawson',
		image:
			'https://i.guim.co.uk/img/media/c01ad5ee63034e0f478959fc7a705c93debf8ba7/0_220_4104_2462/master/4104.jpg?width=300&quality=85&auto=format&fit=max&s=5dbe0a813852f2ce7304f2eddd0b6e45',
		carouselImages: {
			300: 'https://i.guim.co.uk/img/media/c01ad5ee63034e0f478959fc7a705c93debf8ba7/0_220_4104_2462/master/4104.jpg?width=300&quality=85&auto=format&fit=max&s=5dbe0a813852f2ce7304f2eddd0b6e45',
			460: 'https://i.guim.co.uk/img/media/c01ad5ee63034e0f478959fc7a705c93debf8ba7/0_220_4104_2462/master/4104.jpg?width=460&quality=85&auto=format&fit=max&s=8f0e19d4111cd7b3c24ab9575447183a',
		},
		isLiveBlog: true,
		format: {
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.LiveBlog,
		},
		palette: decidePalette({
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.LiveBlog,
		}),
		webPublicationDate: '2021-02-16T17:00:15.000Z',
		headline:
			'UK Covid: 799 more deaths and 10,625 new cases reported; Scottish schools in phased return from Monday – as it happened',
		shortUrl: 'https://gu.com/p/geczb',
	},
	{
		url:
			'https://www.theguardian.com/uk-news/2021/feb/16/qcovid-how-improved-algorithm-can-identify-more-higher-risk-adults',
		linkText:
			'QCovid: how improved algorithm can identify more higher-risk adults',
		showByline: false,
		byline: 'Sarah Boseley Health editor',
		image:
			'https://i.guim.co.uk/img/media/6d152e60fdb37dbbc063a68e2cffccf97cdab183/0_40_5458_3275/master/5458.jpg?width=300&quality=85&auto=format&fit=max&s=de76d3ccfb81477fa0ec3e24a93a0daf',
		carouselImages: {
			300: 'https://i.guim.co.uk/img/media/6d152e60fdb37dbbc063a68e2cffccf97cdab183/0_40_5458_3275/master/5458.jpg?width=300&quality=85&auto=format&fit=max&s=de76d3ccfb81477fa0ec3e24a93a0daf',
			460: 'https://i.guim.co.uk/img/media/6d152e60fdb37dbbc063a68e2cffccf97cdab183/0_40_5458_3275/master/5458.jpg?width=460&quality=85&auto=format&fit=max&s=22504f7fa18de75cba0b1d63d8dec15f',
		},
		isLiveBlog: false,
		format: {
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Analysis,
		},
		palette: decidePalette({
			display: Display.Standard,
			theme: Pillar.News,
			design: Design.Analysis,
		}),
		webPublicationDate: '2021-02-16T18:42:44.000Z',
		headline:
			'QCovid: how improved algorithm can identify more higher-risk adults',
		shortUrl: 'https://gu.com/p/gefev',
	},
];

const immersiveTrails = convertToImmersive(trails);

export const Headlines = () => (
	<>
		<ElementContainer showTopBorder={true}>
			<Carousel
				heading="More on this story"
				trails={trails}
				ophanComponentName="curated-content"
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
			/>
		</ElementContainer>
		<ElementContainer showTopBorder={true}>
			<Carousel
				heading="Sport"
				trails={trails}
				ophanComponentName="curated-content"
				format={{
					theme: Pillar.Sport,
					design: Design.Article,
					display: Display.Standard,
				}}
				isCuratedContent={true}
			/>
		</ElementContainer>
	</>
);

Headlines.story = 'Headlines carousel';

export const Immersive = () => (
	<>
		<ElementContainer showTopBorder={true}>
			<Carousel
				heading="More on this story"
				trails={immersiveTrails}
				ophanComponentName="curated-content"
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
				isFullCardImage={true}
			/>
		</ElementContainer>
		<ElementContainer showTopBorder={true}>
			<Carousel
				heading="Sport"
				trails={immersiveTrails}
				ophanComponentName="curated-content"
				format={{
					theme: Pillar.Sport,
					design: Design.Article,
					display: Display.Standard,
				}}
				isFullCardImage={true}
				isCuratedContent={true}
			/>
		</ElementContainer>
	</>
);

Immersive.story = 'Immersive carousel';
