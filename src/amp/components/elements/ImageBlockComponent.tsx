import React from 'react';
import { css } from '@emotion/react';

import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';
import { bestFitImage, heightEstimate } from '@root/src/amp/lib/image-fit';
import TriangleIcon from '@frontend/static/icons/triangle.svg';

const figureStyle = css`
	margin-top: 16px;
	margin-bottom: 8px;
`;
const captionStyle = css`
	padding-top: 8px;
	${textSans.xxsmall()};
	word-wrap: break-word;
	color: ${text.supporting};
`;

export const ImageBlockComponent: React.FC<{
	element: ImageBlockElement;
	pillar: Theme;
}> = ({ element, pillar }) => {
	const containerWidth = 600;
	const image: SrcSetItem = bestFitImage(
		element.imageSources,
		containerWidth,
	);
	const height: number = heightEstimate(
		element.media.allImages[0],
		image.width,
	);
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

	if (!image) {
		return null;
	}

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
			{(element.data.caption ||
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
							__html: element.data.caption || '',
						}}
						key="caption"
					/>{' '}
					{element.displayCredit && element.data.credit}
				</figcaption>
			)}
		</figure>
	);
};
