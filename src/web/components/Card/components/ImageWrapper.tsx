import React from 'react';
import { css } from 'emotion';

import { until } from '@guardian/src-foundations/mq';

type Props = {
	children: JSXElements;
	percentage?: CardPercentageType;
};

export const ImageWrapper = ({ children, percentage }: Props) => {
	return (
		<div
			className={css`
				/* position relative is required here to bound the image overlay */
				position: relative;

				flex-basis: ${percentage && percentage};
				${until.tablet} {
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
			`}
		>
			<>
				{children}
				{/* This image overlay is styled when the CardLink is hovered */}
				<div className="image-overlay" />
			</>
		</div>
	);
};
