import { css } from '@emotion/react';
import { between, from, space } from '@guardian/source/foundations';
import type { Image } from '@guardian/support-dotcom-components/dist/shared/types';
import type { ImageAttrs } from '../../../../shared/ResponsiveImage';
import { ResponsiveImage } from '../../../../shared/ResponsiveImage';
import type { BannerData } from '../BannerProps';

interface BannerVisualProps {
	bannerData: BannerData;
	settings?: Image;
	isHeaderImage?: boolean;
}

const getImageUrl = (
	isCollapsed: boolean,
	collapsedUrl: string | undefined,
	originalUrl: string,
): string => {
	if (isCollapsed) {
		return collapsedUrl ?? originalUrl;
	}
	return originalUrl;
};

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
					width: 100%;
					${between.phablet.and.desktop} {
						width: 492px;
					}
				}
			`,
		};
	}
	return {
		container: css`
			grid-area: main-image;

			margin-left: ${space[2]}px;
			margin-right: ${space[2]}px;

			${from.phablet} {
				max-width: 492px;
				justify-self: center;
			}
			${from.desktop} {
				margin-top: ${space[6]}px;
				padding-left: ${space[2]}px;
				justify-self: end;
			}
			${between.desktop.and.wide} {
				max-width: 380px;
			}
			${from.wide} {
				max-width: 485px;
				align-self: start;
			}

			img {
				width: 100%;
				object-fit: contain;
				display: block;

				${from.phablet} {
					max-height: 332px;
					padding-bottom: 16px;
				}
				${from.desktop} {
					max-height: none;
					padding-bottom: 0;
				}
			}

			${from.tablet} {
				height: 100%;
				width: 100%;
				align-items: center;
			}
		`,
	};
};

export const BannerVisual = ({
	bannerData,
	settings,
	isHeaderImage,
}: BannerVisualProps): JSX.Element | null => {
	const imageSettings = settings ?? bannerData.settings.imageSettings;

	if (!imageSettings || (bannerData.isCollapsed && !isHeaderImage)) {
		return null;
	}

	const baseImage: ImageAttrs = {
		url: imageSettings.mainUrl,
		media: '',
		alt: imageSettings.altText,
	};

	const images: ImageAttrs[] = [];
	const styles = getStyles(isHeaderImage);

	if (imageSettings.mobileUrl) {
		images.push({
			url: imageSettings.mobileUrl,
			media: '(max-width: 739px)',
		});
	}
	if (imageSettings.tabletUrl) {
		images.push({
			url: getImageUrl(
				bannerData.isCollapsed,
				imageSettings.mobileUrl,
				imageSettings.tabletUrl,
			),
			media: '(max-width: 979px)',
		});
	}
	if (imageSettings.desktopUrl) {
		images.push({
			url: getImageUrl(
				bannerData.isCollapsed,
				imageSettings.tabletUrl,
				imageSettings.desktopUrl,
			),
			media: '(max-width: 1139px)',
		});
	}
	if (imageSettings.leftColUrl) {
		images.push({
			url: imageSettings.leftColUrl,
			media: '(max-width: 1299px)',
		});
	}
	if (imageSettings.wideUrl) {
		images.push({
			url: getImageUrl(
				bannerData.isCollapsed,
				imageSettings.tabletUrl,
				imageSettings.wideUrl,
			),
			media: '',
		});
	}

	return (
		<div css={styles.container}>
			<ResponsiveImage
				baseImage={baseImage}
				images={images}
				bannerId={bannerData.settings.bannerId}
			/>
		</div>
	);
};
