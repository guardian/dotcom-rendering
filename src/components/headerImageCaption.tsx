import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgCamera } from '@guardian/src-icons';
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss, wideContentWidth } from 'styles';

const captionId = 'header-image-caption';

const HeaderImageCaptionStyles = (
	iconBackgroundColor?: string,
): SerializedStyles => css`
	summary {
		display: block;
		text-align: center;
		background-color: ${iconBackgroundColor
			? iconBackgroundColor
			: brandAlt[400]};
		width: 34px;
		height: 34px;
		position: absolute;
		bottom: 8px;
		right: 8px;
		border-radius: 100%;
		outline: none;

		&::-webkit-details-marker {
			display: none;
		}

		${darkModeCss`
			background-color: ${neutral[60]};
			opacity: .7;
		`}
	}

	details[open] {
		min-height: 44px;
		max-height: 999px;
		background-color: rgba(0, 0, 0, 0.8);
		padding: ${remSpace[3]};
		overflow: hidden;
		padding-right: ${remSpace[12]};
		z-index: 1;
		color: ${neutral[100]};
		${textSans.small()};
		box-sizing: border-box;

		${darkModeCss`
			color: ${neutral[60]};
		`}
	}

	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;

	${from.wide} {
		width: ${wideContentWidth}px;
	}
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
	pipe(
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
