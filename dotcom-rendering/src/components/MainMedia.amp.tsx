import { css } from '@emotion/react';
import {
	palette,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import { bestFitImage, heightEstimate } from '../lib/image-fit.amp';
import { scrsetStringFromImagesSources } from '../lib/srcset-utils.amp';
import InfoIcon from '../static/icons/info.svg';
import type { FEElement, ImageBlockElement } from '../types/content';
import { YoutubeBlockComponent } from './YoutubeBlockComponent.amp';

const figureStyle = css`
	margin: 0 0;
	position: relative;

	input:checked ~ figcaption {
		display: block;
	}
`;

const captionStyle = css`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(18, 18, 18, 0.8);
	color: ${palette.neutral[100]};
	display: none;
	padding: 6px 40px 12px 10px;
	max-width: 100%;
	min-height: 46px;
	${textSans.small()};
`;

const inputStyle = css`
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
`;

const labelStyle = css`
	position: absolute;
	right: 6px;
	width: 32px;
	height: 32px;
	z-index: 1;
	background-color: rgba(18, 18, 18, 0.6);
	border-radius: 50%;
	bottom: 6px;

	svg {
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		position: absolute;
		fill: ${palette.neutral[100]};
	}
`;

const mainImage = (element: ImageBlockElement) => {
	const containerWidth = 600;
	const image = bestFitImage(element.imageSources, containerWidth);
	const [firstImage] = element.media.allImages;

	if (!image || !firstImage) {
		return null;
	}

	const height: number = heightEstimate(firstImage, image.width);

	return (
		<figure css={figureStyle}>
			<amp-img
				src={image.src}
				alt={element.data.alt}
				attribution={element.data.credit}
				height={height.toString()}
				width={image.width.toString()}
				layout="responsive"
				srcset={scrsetStringFromImagesSources(element.imageSources)}
			/>
			{!!(
				element.data.caption ||
				(element.data.credit && element.displayCredit)
			) && (
				<>
					<input
						aria-checked={false}
						type="checkbox"
						id="show-caption"
						css={inputStyle}
					/>
					{}
					<label css={labelStyle} htmlFor="show-caption">
						<span
							css={css`
								${visuallyHidden}
							`}
						>
							Show caption
						</span>
						<InfoIcon />
					</label>
					<figcaption css={captionStyle}>
						{element.data.caption}{' '}
						{element.displayCredit && element.data.credit}
					</figcaption>
				</>
			)}
		</figure>
	);
};

// used to break out of the inner container margin
const expanded = css`
	margin: 0 -10px;
`;

const asComponent = (
	element: FEElement,
	pillar: ArticleTheme,
	adTargeting?: any,
) => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return mainImage(element);
		case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
			return (
				<YoutubeBlockComponent
					element={element}
					pillar={pillar}
					adTargeting={adTargeting}
				/>
			);
		default:
			return null;
	}
};

type Props = {
	element: FEElement;
	pillar: ArticleTheme;
	adTargeting?: any;
};

export const MainMedia = ({ element, pillar, adTargeting }: Props) => {
	return (
		<div css={expanded}>{asComponent(element, pillar, adTargeting)}</div>
	);
};
