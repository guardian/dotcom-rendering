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
}

export const ProductCardImage = ({
	format,
	image,
	url,
	...props
}: ProductCardImageProps) => {
	if (!image) {
		return null;
	}

	return (
		<div {...props}>
			{url ? (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					aria-disabled={true}
					tabIndex={-1}
					data-src-focus-disabled={true}
					css={css`
						&:focus {
							box-shadow: none !important;
						}
					`}
				>
					<Picture
						data-src-focus-disabled={true}
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
				shouldLimitWidth={true}
				format={format}
				isLeftCol={true}
				displayCredit={image.displayCredit}
				credit={image.credit}
				isOverlaid={false}
			/>
		</div>
	);
};
