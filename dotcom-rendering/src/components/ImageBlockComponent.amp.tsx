import { css } from '@emotion/react';
import { text, textSans12 } from '@guardian/source/foundations';
import { bestFitImage, heightEstimate } from '../lib/image-fit.amp';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import TriangleIcon from '../static/icons/triangle.svg';
import type { ImageBlockElement } from '../types/content';

const figureStyle = css`
	margin-top: 16px;
	margin-bottom: 8px;
`;
const captionStyle = css`
	padding-top: 8px;
	${textSans12};
	word-wrap: break-word;
	color: ${text.supporting};
`;

type Props = {
	element: ImageBlockElement;
	pillar: ArticleTheme;
};

export const ImageBlockComponent = ({ element, pillar }: Props) => {
	const containerWidth = 600;
	const image = bestFitImage(element.imageSources, containerWidth);
	const [firstImage] = element.media.allImages;
	if (!image || !firstImage) return null;

	const height: number = heightEstimate(firstImage, image.width);
	const iconStyle = css`
		fill: ${pillarPalette_DO_NOT_USE[pillar].main};
		padding-right: 3px;
	`;

	const captionLink = css`
		a {
			color: ${pillarPalette_DO_NOT_USE[pillar].main};
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
		strong {
			font-weight: bold;
		}
	`;

	return (
		<figure css={figureStyle}>
			<amp-img
				src={image.src}
				alt={element.data.alt}
				attribution={element.data.credit}
				height={height.toString()}
				width={image.width.toString()}
				layout="responsive"
			/>
			{(!!element.data.caption ||
				(element.data.credit && element.displayCredit)) && (
				<figcaption css={captionStyle}>
					<span css={iconStyle}>
						<TriangleIcon />
					</span>
					{/*
                        TODO - Move caption handling to use https://github.com/guardian/dotcom-rendering/blob/master/packages/guui/components/Caption/Caption.tsx
                        Update: 16th October (Pascal): guui has been decommissioned.
                    */}
					<span
						css={captionLink}
						dangerouslySetInnerHTML={{
							__html: element.data.caption ?? '',
						}}
						key="caption"
					/>{' '}
					{element.displayCredit && element.data.credit}
				</figcaption>
			)}
		</figure>
	);
};
