/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerVisual.tsx
 */
import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { Image } from '@guardian/support-dotcom-components/dist/shared/src/types';
import type { ImageAttrs } from '../../../shared/ResponsiveImage';
import { ResponsiveImage } from '../../../shared/ResponsiveImage';
import type { BannerId } from '../../common/types';

// ---- Component ---- //

interface DesignableBannerVisualProps {
	settings: Image;
	bannerId?: BannerId;
	isHeaderImage?: boolean;
}

export function DesignableBannerVisual({
	settings,
	bannerId,
	isHeaderImage,
}: DesignableBannerVisualProps): JSX.Element {
	const baseImage: ImageAttrs = {
		url: settings.mainUrl,
		media: '',
		alt: settings.altText,
	};

	const images: ImageAttrs[] = [];
	const styles = getStyles(isHeaderImage);
	if (settings.mobileUrl) {
		images.push({ url: settings.mobileUrl, media: '(max-width: 739px)' });
	}
	if (settings.tabletUrl) {
		images.push({ url: settings.tabletUrl, media: '(max-width: 979px)' });
	}
	if (settings.desktopUrl) {
		images.push({ url: settings.desktopUrl, media: '(max-width: 1139px)' });
	}
	if (settings.leftColUrl) {
		images.push({ url: settings.leftColUrl, media: '(max-width: 1299px)' });
	}
	if (settings.wideUrl) {
		images.push({ url: settings.wideUrl, media: '' });
	}

	return (
		<ResponsiveImage
			baseImage={baseImage}
			images={images}
			bannerId={bannerId}
			cssOverrides={styles.container}
		/>
	);
}

// ---- Styles ---- //

const getStyles = (isHeaderImage = false) => {
	if (isHeaderImage) {
		return {
			container: css`
				height: 100%;
				width: 100%;

				img {
					height: 100%;
					object-fit: contain;
					display: block;
					margin-left: -10px;
					margin-right: -10px;
					width: calc(100% + 20px);
				}
			`,
		};
	}
	return {
		container: css`
			display: block;
			width: calc(100% + 20px);
			margin-left: -10px;
			margin-right: -10px;

			img {
				width: 100%;
				object-fit: contain;
				display: block;

				${from.tablet} {
					max-height: none;
				}
			}

			${from.tablet} {
				height: 100%;
				width: 100%;
				align-items: center;
				margin-left: 0;
				margin-right: 0;
			}
		`,
	};
};
