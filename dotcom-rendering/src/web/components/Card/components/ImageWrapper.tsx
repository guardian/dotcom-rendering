import { css, SerializedStyles } from '@emotion/react';

import { between, from, until } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
	imageSize?: ImageSizeType;
	imagePosition: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
};

const flexBasisStyles = ({
	imagePosition,
	imageSize,
}: {
	imagePosition: ImagePositionType;
	imageSize: ImageSizeType;
}): SerializedStyles | null => {
	switch (imagePosition) {
		case 'top':
		case 'bottom':
			// We only specifiy an explicit width for the image when
			// we're positioning left or right, not top. Top positioned
			// images flow naturally
			return null;
		case 'left':
		case 'right':
			switch (imageSize) {
				case 'small':
					return css`
						flex-basis: 25%;
						${between.tablet.and.desktop} {
							flex-basis: 40%;
						}
						${from.desktop} {
							flex-basis: 30%;
						}
					`;
				case 'medium':
					return css`
						flex-basis: 50%;
					`;
				case 'large':
					return css`
						flex-basis: 66%;
					`;
				case 'jumbo':
					return css`
						flex-basis: 75%;
					`;
			}
		// eslint-disable-next-line no-fallthrough
		case 'none':
			return null;
	}
};

export const ImageWrapper = ({
	children,
	imageSize = 'large',
	imagePosition,
	imagePositionOnMobile,
}: Props) => {
	const notVertical =
		imagePositionOnMobile !== 'top' && imagePositionOnMobile !== 'bottom';
	return (
		<div
			css={[
				flexBasisStyles({
					imageSize,
					imagePosition,
				}),
				css`
					/* position relative is required here to bound the image overlay */
					position: relative;
					/* If no image position for mobile is provided then hide the image */
					${imagePositionOnMobile === 'none' && until.tablet} {
						display: none;
					}
					${notVertical && until.tablet} {
						/* Below tablet, we fix the size of the image and add a margin
                       around it. The corresponding content flex grows to fill the space */
						margin-left: 6px;
						width: 119px;
						flex-shrink: 0;
						margin-top: 6px;
						margin-bottom: 6px;
						flex-basis: unset;
					}

					img {
						width: 100%;
						display: block;
					}
				`,
			]}
		>
			<>
				{children}
				{/* This image overlay is styled when the CardLink is hovered */}
				<div className="image-overlay" />
			</>
		</div>
	);
};
