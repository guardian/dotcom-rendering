import React from 'react';
import { css } from '@emotion/core';
import { basePx, textSans, icons, wideContentWidth } from 'styles';
import { palette, wide } from '@guardian/src-foundations';

const HeaderImageCaptionStyles = css`
    input[type=checkbox] {
        display: none;
    }

    label {
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

		&::before {
			${icons}
			content: "\\e044";
			font-size: 16px;
		}
	}

	label::selection,
	input[type=checkbox]:checked ~ div span::selection {
		background-color: transparent;
	}

	input[type=checkbox] ~ div {
		display: none
	}

	input[type=checkbox]:checked ~ div {
		display: block;
		min-height: 44px;
		max-height: 999px;
		background-color: rgba(0, 0, 0, 0.8);
		padding: ${basePx(1)};
		overflow: hidden;
		padding-right: 48px;
		z-index: 1;
		color: ${palette.neutral[100]};
		line-height: 1.6rem;
		font-size: 1.4rem;
		${textSans}
	}

	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	
	${wide} {
		width: ${wideContentWidth}px;
	}
`;

interface HeaderImageCaptionProps {
	caption: string;
	credit: string;
}

const HeaderImageCaption = ({ caption, credit }: HeaderImageCaptionProps): JSX.Element => (
	<div css={HeaderImageCaptionStyles}>
		<label htmlFor="captionToggle"></label>
		<input type="checkbox" id="captionToggle"/>
		<div>
			<span>{caption}</span>
			<span>&nbsp;</span>
			<span>{credit}</span>
		</div>
	</div>
)

export default HeaderImageCaption;
