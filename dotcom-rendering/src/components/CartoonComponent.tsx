import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { Hide } from '@guardian/source-react-components';
import { isWideEnough } from '../lib/lightbox';
import type { ServerSideTests } from '../types/config';
import type { CartoonBlockElement, Image } from '../types/content';
import { AppsLightboxImage } from './AppsLightboxImage.importable';
import { Caption } from './Caption';
import { useConfig } from './ConfigContext';
import { Island } from './Island';
import { LightboxLink } from './LightboxLink';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	element: CartoonBlockElement;
	abTests?: ServerSideTests;
};

export const CartoonComponent = ({ format, element, abTests }: Props) => {
	const { renderingTarget } = useConfig();
	const smallVariant = element.variants.find(
		(variant) => variant.viewportSize === 'small',
	);
	const largeVariant = element.variants.find(
		(variant) => variant.viewportSize === 'large',
	);

	const isInLightboxTest = abTests?.lightboxVariant === 'variant';
	const webLightbox = renderingTarget === 'Web' && isInLightboxTest;

	const render = (image: Image) => {
		const altText = `${element.alt ? `${element.alt}, ` : ''}panel ${
			image.index + 1
		}`;
		const height = parseInt(image.fields.height, 10);
		const width = parseInt(image.fields.width, 10);

		return (
			<>
				{renderingTarget === 'Apps' ? (
					<Island priority="critical">
						<AppsLightboxImage
							elementId={element.elementId}
							role={element.role}
							format={format}
							master={image.url}
							alt={altText}
							height={height}
							width={width}
							loading="lazy"
							isMainMedia={true}
						/>
					</Island>
				) : (
					<Picture
						master={image.url}
						role={element.role}
						format={format}
						alt={altText}
						height={height}
						width={width}
						key={image.index}
						loading="lazy"
					/>
				)}

				{webLightbox &&
					isWideEnough(image) &&
					element.position !== undefined && (
						<LightboxLink
							role={element.role}
							format={format}
							elementId={element.elementId}
							isMainMedia={true}
							position={element.position}
						/>
					)}
			</>
		);
	};

	return (
		<div
			css={css`
				position: relative;

				img {
					height: 100%;
					width: 100%;
				}
			`}
		>
			{smallVariant && smallVariant.images.length > 0 ? (
				<>
					<Hide from="desktop">
						{smallVariant.images.map(render)}
					</Hide>
					<Hide until="desktop">
						{largeVariant?.images.map(render)}
					</Hide>
				</>
			) : (
				largeVariant?.images.map(render)
			)}
			<Caption
				captionText={element.caption}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				credit={element.credit}
				displayCredit={element.displayCredit}
			/>
		</div>
	);
};
