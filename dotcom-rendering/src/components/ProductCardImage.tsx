import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import type { HTMLAttributes } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductImage } from '../types/content';
import { Caption } from './Caption';
import { useConfig } from './ConfigContext';
import { LightboxLink } from './LightboxLink';
import { Picture } from './Picture';

interface ProductCardImageProps extends HTMLAttributes<HTMLDivElement> {
	format: ArticleFormat;
	elementId: string;
	image?: ProductImage;
	url?: string;
	xCustComponentId?: string;
}

export const ProductCardImage = ({
	format,
	elementId,
	image,
	url,
	xCustComponentId,
}: ProductCardImageProps) => {
	const { renderingTarget } = useConfig();

	if (!image) {
		return null;
	}

	const isWeb = renderingTarget === 'Web';
	// The whole image is already a link to the retailer when a CTA url exists,
	// so we only add the lightbox affordance when there isn't a competing link.
	const lightboxPosition = isWeb && !url ? image.position : undefined;

	const ProductPicture = () => (
		<Picture
			role={'productCard'}
			format={format}
			master={image.url}
			alt={image.alt}
			height={image.height}
			width={image.width}
			loading={'eager'}
		/>
	);

	return (
		<figure>
			<div
				id={!isUndefined(image.position) ? `img-${image.position}` : ''}
				css={css`
					position: relative;
				`}
			>
				{url ? (
					<a
						href={url}
						target="_blank"
						rel="sponsored noopener noreferrer"
						data-link-name="product image link"
						data-x-cust-component-id={xCustComponentId}
						// this is needed to override global style
						// html:not(.src-focus-disabled) *:focus
						// it has specificity(0, 2, 1) so we need (0, 3, 0)
						css={css`
							&&:focus {
								box-shadow: none;
							}
						`}
					>
						<ProductPicture />
					</a>
				) : (
					<ProductPicture />
				)}
				{!isUndefined(lightboxPosition) && (
					<LightboxLink
						role="productCard"
						format={format}
						elementId={elementId}
						position={lightboxPosition}
					/>
				)}
			</div>
			<Caption
				format={format}
				displayCredit={image.displayCredit}
				credit={image.credit}
				isOverlaid={false}
			/>
		</figure>
	);
};
