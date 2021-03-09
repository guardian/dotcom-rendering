import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgCamera } from '@guardian/src-icons';
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe2 } from 'lib';
import type { FC, ReactElement } from 'react';

const captionId = 'header-image-caption';

const HeaderImageCaptionStyles = (
	iconBackgroundColor?: string,
): SerializedStyles => css`
	summary {
		display: block;
		pointer-events: auto;
		text-align: center;
		background-color: ${iconBackgroundColor
			? iconBackgroundColor
			: brandAlt[400]};
		width: 34px;
		height: 34px;
		position: absolute;
		bottom: ${remSpace[3]};
		right: ${remSpace[3]};
		border-radius: 100%;
		outline: none;

		&::-webkit-details-marker {
			display: none;
		}
	}

	details[open] {
		min-height: 44px;
		max-height: 999px;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		padding: ${remSpace[2]};
		overflow: hidden;
		padding-right: ${remSpace[12]};
		z-index: 1;
		color: ${neutral[100]};
		${textSans.small()};
		box-sizing: border-box;
	}
	pointer-events: none;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
`;

const svgStyle = (iconColor?: string): SerializedStyles => css`
	line-height: 32px;
	font-size: 0;
	svg {
		width: 75%;
		height: 75%;
		margin: 12.5%;
	}
	path {
		fill: ${iconColor ? iconColor : neutral[7]};
	}
`;

interface Props {
	caption: Option<string>;
	credit: Option<string>;
	styles?: SerializedStyles;
	iconColor?: string;
	iconBackgroundColor?: string;
}

const HeaderImageCaption: FC<Props> = ({
	caption,
	credit,
	styles,
	iconColor,
	iconBackgroundColor,
}: Props) =>
	pipe2(
		caption,
		map((cap) => (
			<figcaption
				css={[HeaderImageCaptionStyles(iconBackgroundColor), styles]}
			>
				<details>
					<summary>
						<span css={svgStyle(iconColor)}>
							<SvgCamera />
							Click to see figure caption
						</span>
					</summary>
					<span id={captionId}>
						{cap} {withDefault('')(credit)}
					</span>
				</details>
			</figcaption>
		)),
		withDefault<ReactElement | null>(null),
	);

export default HeaderImageCaption;

export { captionId };
