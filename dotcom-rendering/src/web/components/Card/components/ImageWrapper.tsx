import { css } from '@emotion/react';

import { until } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
	imagePositionOnMobile?: ImagePositionType;
	percentage?: CardPercentageType;
};

export const ImageWrapper = ({
	children,
	percentage,
	imagePositionOnMobile,
}: Props) => {
	const notVertical =
		imagePositionOnMobile !== 'top' && imagePositionOnMobile !== 'bottom';
	return (
		<div
			css={[
				css`
					/* position relative is required here to bound the image overlay */
					position: relative;
					flex-basis: ${percentage && percentage};
					// If no image position for mobile is provided then hide the image
					${!imagePositionOnMobile && until.tablet} {
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
