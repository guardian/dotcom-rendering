import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { Hide } from '@guardian/source-react-components';
import type { CartoonBlockElement } from '../types/content';
import { Caption } from './Caption';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	element: CartoonBlockElement;
};

export const CartoonComponent = ({ format, element }: Props) => {
	const smallVariant = element.variants.find(
		(variant) => variant.viewportSize === 'small',
	);
	const largeVariant = element.variants.find(
		(variant) => variant.viewportSize === 'large',
	);

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
			<Hide until="desktop">
				{largeVariant?.images.map((image) => {
					return (
						<Picture
							master={image.url}
							role={element.role}
							format={{
								display: format.display,
								design: format.design,
								theme: format.theme,
							}}
							alt={`${
								element.alt ? `${element.alt}, ` : ''
							}panel ${image.index + 1}`}
							height={parseInt(image.fields.height, 10)}
							width={parseInt(image.fields.width, 10)}
							key={image.index}
						></Picture>
					);
				})}
			</Hide>
			<Hide from="desktop">
				{smallVariant?.images.map((image) => {
					return (
						<Picture
							master={image.url}
							role={element.role}
							format={{
								display: format.display,
								design: format.design,
								theme: format.theme,
							}}
							alt={`${
								element.alt ? `${element.alt}, ` : ''
							}panel ${image.index + 1}`}
							height={parseInt(image.fields.height, 10)}
							width={parseInt(image.fields.width, 10)}
							key={image.index}
						></Picture>
					);
				})}
			</Hide>

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
