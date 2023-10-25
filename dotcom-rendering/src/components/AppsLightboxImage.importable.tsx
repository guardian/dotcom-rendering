import { css } from '@emotion/react';
import { Image } from '@guardian/bridget/Image';
import { getGalleryClient } from '../lib/bridgetApi';
import { generateImageURL } from '../lib/image';
import type { ImageForAppsLightbox } from '../model/appsLightboxImages';
import { type RoleType } from '../types/content';
import { Picture } from './Picture';

type Props = {
	images: ImageForAppsLightbox[];
	currentIndex: number;
	role: RoleType;
	format: ArticleFormat;
	master: string;
	alt: string;
	height: number;
	width: number;
	isMainMedia?: boolean;
	isLazy?: boolean;
};

export const AppsLightboxImage = ({
	images,
	currentIndex,
	role,
	format,
	master,
	alt,
	height,
	width,
	isMainMedia = false,
	isLazy = true,
}: Props) => {
	const hasLightbox = currentIndex !== -1;
	const onClick = () => {
		// Handle the case the device is rotated
		const imageWidth = Math.max(window.innerHeight, window.innerWidth);
		const resolution = window.devicePixelRatio >= 2 ? 'high' : 'low';
		void getGalleryClient()
			.launchSlideshow(
				images.map(
					(image) =>
						new Image({
							width: image.width,
							height: image.height,
							url: generateImageURL({
								mainImage: image.masterUrl,
								imageWidth,
								resolution,
							}),
							caption: image.caption,
							credit: image.credit,
						}),
				),
				currentIndex,
				document.title,
			)
			// we don't need to handle this error
			.catch(() => undefined);
	};
	const picture = (
		<Picture
			role={role}
			format={format}
			master={master}
			alt={alt}
			width={width}
			height={height}
			isLazy={isLazy}
			isMainMedia={isMainMedia}
		/>
	);
	return hasLightbox ? (
		<button
			onClick={onClick}
			type="button"
			css={css`
				border: none;
				background: none;
				padding: 0;
				width: 100%;
				height: 100%;
			`}
		>
			{picture}
		</button>
	) : (
		picture
	);
};
