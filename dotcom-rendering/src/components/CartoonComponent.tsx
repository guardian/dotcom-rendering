import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { Hide } from '@guardian/source-react-components';
import { isWideEnough } from '../lib/lightbox';
import type { Switches } from '../types/config';
import type { CartoonBlockElement, Image } from '../types/content';
import { Caption } from './Caption';
import { LightboxLink } from './LightboxLink';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	element: CartoonBlockElement;
	switches?: Switches;
};

export const CartoonComponent = ({ format, element, switches }: Props) => {
	const smallVariant = element.variants.find(
		(variant) => variant.viewportSize === 'small',
	);
	const largeVariant = element.variants.find(
		(variant) => variant.viewportSize === 'large',
	);

	const render = (image: Image) => {
		return (
			<>
				<Picture
					master={image.url}
					role={element.role}
					format={format}
					alt={`${element.alt ? `${element.alt}, ` : ''}panel ${
						image.index + 1
					}`}
					height={parseInt(image.fields.height, 10)}
					width={parseInt(image.fields.width, 10)}
					key={image.index}
				/>
				{switches?.lightbox === true &&
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
			{smallVariant ? (
				<>
					<Hide until="desktop">
						{largeVariant?.images.map(render)}
					</Hide>
					<Hide from="desktop">
						{smallVariant?.images.map(render)}
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
