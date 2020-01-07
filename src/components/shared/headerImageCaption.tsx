import React from 'react';
import { css } from '@emotion/core';
import { basePx, sans, icons, wideContentWidth } from 'styles';
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const captionId = 'header-image-caption';

const HeaderImageCaptionStyles = css`
	summary {
		line-height: 30px;
        text-align: center;
        background-color: ${palette.yellow.main};
        color: ${palette.neutral[7]};
        width: ${basePx(4)};
        height: ${basePx(4)};
        display: inline-block;
        position: absolute;
        bottom: ${basePx(1)};
        right: ${basePx(1)};
        border-radius: 100%;
        z-index: 2;
		font-size: 2.8rem;
		
		span {
			font-size: 0;
		}

		&::before {
			${icons}
			content: "\\e044";
			font-size: 16px;
			position: absolute;
			right: ${basePx(1)};
		}

		&::-webkit-details-marker {
			display: none;
		}
	}

	details[open] {
		min-height: 44px;
		max-height: 999px;
		background-color: rgba(0, 0, 0, 0.8);
		padding: ${basePx(1)};
		overflow: hidden;
		padding-right: ${basePx(6)};
		z-index: 1;
		color: ${palette.neutral[100]};
		line-height: 1.6rem;
		font-size: 1.4rem;
		${sans}
	}

	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	
	${from.wide} {
		width: ${wideContentWidth}px;
	}
`;

interface HeaderImageCaptionProps {
	caption: string;
	credit: string;
}

const HeaderImageCaption = ({ caption, credit }: HeaderImageCaptionProps): JSX.Element => (
	<figcaption css={HeaderImageCaptionStyles}>
		<details>
			<summary><span>Click to see figure caption</span></summary>
			<span id={captionId}>{caption}&nbsp;{credit}</span>
		</details>
	</figcaption>
)

export default HeaderImageCaption;

export {
	captionId,
};
