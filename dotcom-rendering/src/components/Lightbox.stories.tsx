import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { useEffect } from 'react';
import type { ImageBlockElement } from '../types/content';
import { LightboxHtml } from './LightboxHtml';

const testImage: ImageBlockElement = {
	role: 'immersive',
	elementId: 'mockId',
	data: {
		alt: '26 March – Residents in Manchester, England, taking part in the Clap For Our Carers campaign, people across the UK applauding NHS workers from the doorsteps, balconies or windows of their homes, in order to say thank you for all of their hard work dealing with the Covid-19 coronavirus pandemic.',
		caption:
			'26 March – Residents in Manchester, England, taking part in the Clap For Our Carers campaign, people across the UK applauding NHS workers from the doorsteps, balconies or windows of their homes, in order to say thank you for all of their hard work dealing with the Covid-19 coronavirus pandemic',
		credit: 'Photograph: Christopher Thomond/The Guardian',
	},
	imageSources: [
		{
			weighting: 'immersive',
			srcSet: [
				{
					src: 'https://i.guim.co.uk/img/media/56b42eef576bc04c820da710459acd91082bb37b/0_0_6720_4480/master/6720.jpg?width=1300&quality=45&auto=format&fit=max&dpr=2&s=4a0b1263ca8554c4e22671fd1a75ac64',
					width: 2600,
				},
			],
		},
	],
	_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
	media: {
		allImages: [
			{
				index: 0,
				fields: {
					height: '4480',
					width: '6720',
				},
				mediaType: 'Image',
				mimeType: 'image/jpeg',
				url: 'https://media.guim.co.uk/56b42eef576bc04c820da710459acd91082bb37b/0_0_6720_4480/6720.jpg',
			},
		],
	},
	displayCredit: false,
};

export default {
	component: LightboxHtml,
	title: 'Components/LightboxHtml',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.desktop],
		},
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

function showLightbox() {
	const lightbox = document.querySelector<HTMLDialogElement>('#gu-lightbox');
	if (lightbox) lightbox.removeAttribute('hidden');
}

function showInfo() {
	const lightbox = document.querySelector<HTMLDialogElement>('#gu-lightbox');
	lightbox?.classList.remove('hide-info');
}

function hideInfo() {
	const lightbox = document.querySelector<HTMLDialogElement>('#gu-lightbox');
	lightbox?.classList.add('hide-info');
}

const Initialise = ({
	children,
	shouldShowInfo = true,
}: {
	children: React.ReactNode;
	shouldShowInfo?: boolean;
}) => {
	useEffect(() => {
		showLightbox();
		if (shouldShowInfo) {
			showInfo();
		} else {
			hideInfo();
		}
	}, [shouldShowInfo]);

	return <div style={{ height: '100vh' }}>{children}</div>;
};

export const Default = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={[{ ...testImage }]}
			/>
		</Initialise>
	);
};

export const WithTitle = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={[{ ...testImage, title: 'Title' }]}
			/>
		</Initialise>
	);
};

export const WithCredit = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={[{ ...testImage, displayCredit: true }]}
			/>
		</Initialise>
	);
};

export const WithRating = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={[{ ...testImage, starRating: 3 }]}
			/>
		</Initialise>
	);
};

export const WhenLiveBlog = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: ArticlePillar.News,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
						firstPublished: 1643816168535,
						blockId: 'mockId',
					},
				]}
			/>
		</Initialise>
	);
};

export const WithEverything = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
					},
				]}
			/>
		</Initialise>
	);
};

export const WithoutCaption = () => {
	return (
		<Initialise shouldShowInfo={false}>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				images={[{ ...testImage }]}
			/>
		</Initialise>
	);
};

export const WithSport = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Sport,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
					},
				]}
			/>
		</Initialise>
	);
};

export const WithCulture = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Culture,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
					},
				]}
			/>
		</Initialise>
	);
};

export const WithLifestyle = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Lifestyle,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
					},
				]}
			/>
		</Initialise>
	);
};

export const WithOpinion = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.Opinion,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
					},
				]}
			/>
		</Initialise>
	);
};

export const WithSpecialReport = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReport,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
					},
				]}
			/>
		</Initialise>
	);
};

export const WithSpecialReportAlt = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReportAlt,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
					},
				]}
			/>
		</Initialise>
	);
};

export const WithLabs = () => {
	return (
		<Initialise>
			<LightboxHtml
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.Labs,
				}}
				images={[
					{
						...testImage,
						starRating: 3,
						title: 'Title',
						displayCredit: true,
					},
				]}
			/>
		</Initialise>
	);
};

/**
 * with html in caption (links)
 * with a portrait image
 *
 */
