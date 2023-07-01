import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import type {
	EnhancedImageForLightbox,
	ImageBlockElement,
} from '../types/content';
import { LightboxImages } from './LightboxImages';
import { LightboxLayout } from './LightboxLayout';

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
	component: LightboxLayout,
	title: 'Components/LightboxLayout',
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
	format,
	images,
}: {
	children: React.ReactNode;
	shouldShowInfo?: boolean;
	format: ArticleFormat;
	images: EnhancedImageForLightbox[];
}) => {
	useEffect(() => {
		showLightbox();
		if (shouldShowInfo) {
			showInfo();
		} else {
			hideInfo();
		}
		const imageRoot = document.querySelector('ul#lightbox-images');
		if (!imageRoot) return;
		ReactDOM.render(
			<LightboxImages format={format} images={images} />,
			imageRoot,
		);
	}, [format, images, shouldShowInfo]);

	return <div style={{ height: '100vh' }}>{children}</div>;
};

export const Default = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};
	const images = [{ ...testImage }];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithTitle = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};
	const images = [{ ...testImage, title: 'Title' }];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithCredit = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};
	const images = [{ ...testImage, displayCredit: true }];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithRating = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};
	const images = [{ ...testImage, starRating: 3 }];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WhenLiveBlog = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.LiveBlog,
		theme: ArticlePillar.News,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
			firstPublished: 1643816168535,
			blockId: 'mockId',
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithEverything = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithoutCaption = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};
	const images = [{ ...testImage }];
	return (
		<Initialise shouldShowInfo={false} format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithSport = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.Sport,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithCulture = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.Culture,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithLifestyle = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.Lifestyle,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithOpinion = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.Opinion,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithSpecialReport = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReport,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithSpecialReportAlt = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReportAlt,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

export const WithLabs = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.Labs,
	};
	const images = [
		{
			...testImage,
			starRating: 3,
			title: 'Title',
			displayCredit: true,
		},
	];
	return (
		<Initialise format={format} images={images}>
			<LightboxLayout images={images} />
		</Initialise>
	);
};

/**
 * with html in caption (links)
 * with a portrait image
 *
 */
