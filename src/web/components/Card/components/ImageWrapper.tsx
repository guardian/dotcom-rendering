import { css } from '@emotion/react';

import { from, until } from '@guardian/src-foundations/mq';

type Props = {
	children: React.ReactNode;
	alwaysVertical?: boolean;
	percentage?: CardPercentageType;
	isFullCardImage?: boolean;
};

const cardHeight = css`
	${from.wide} {
		height: 274px;
		width: 460px;
	}
	${until.wide} {
		height: 250px;
		width: 419px;
	}

	${until.tablet} {
		height: 203px;
		width: 340px;
	}

	${until.phablet} {
		height: 171px;
		width: 286px;
	}
`;

export const ImageWrapper = ({
	children,
	percentage,
	alwaysVertical,
	isFullCardImage,
}: Props) => {
	return (
		<div
			css={[
				isFullCardImage && cardHeight,
				css`
					/* position relative is required here to bound the image overlay */
					position: relative;
					flex-basis: ${percentage && percentage};
					${!alwaysVertical && until.tablet} {
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
						object-fit: ${isFullCardImage && 'cover'};
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
