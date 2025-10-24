import { css } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductImage } from '../types/content';
import { Caption } from './Caption';
import { Picture } from './Picture';

interface ProductCardImageProps extends HTMLAttributes<HTMLDivElement> {
	format: ArticleFormat;
	image?: ProductImage;
	url?: string;
	label?: string;
}

export const ProductCardImage = ({
	format,
	image,
	url,
	label,
	...props
}: ProductCardImageProps) => {
	if (!image) {
		return null;
	}

	return (
		<div {...props}>
			{url && label ? (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={label}
					// this is needed to override global style
					// html:not(.src-focus-disabled) *:focus
					// it has specificity(0, 2, 1) so we need (0, 3, 0)
					css={css`
						&&:focus {
							box-shadow: none;
						}
					`}
				>
					<Picture
						role={'productCard'}
						format={format}
						master={image.url}
						alt={image.alt}
						height={image.height}
						width={image.width}
						loading={'eager'}
					/>
				</a>
			) : (
				<Picture
					role={'productCard'}
					format={format}
					master={image.url}
					alt={image.alt}
					height={image.height}
					width={image.width}
					loading={'eager'}
				/>
			)}
			<Caption
				format={format}
				displayCredit={image.displayCredit}
				credit={image.credit}
				isOverlaid={false}
			/>
		</div>
	);
};
