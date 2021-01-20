import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgCamera } from '@guardian/src-icons';
import type { Format, Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe2 } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss, wideContentWidth } from 'styles';
import { iconBackgroundColour, iconForegroundColour } from './styles';

const captionId = 'header-image-caption';

const HeaderImageCaptionStyles = (format: Format): SerializedStyles => css`
	summary {
		text-align: center;
		background-color: ${iconBackgroundColour(format)};
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
		padding: ${remSpace[2]};
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

const svgStyle = (format: Format): SerializedStyles => css`
	line-height: 32px;
	font-size: 0;
	svg {
		width: 75%;
		height: 75%;
		margin: 12.5%;
	}
	path {
		fill: ${iconForegroundColour(format)};
	}
`;

interface Props {
	caption: Option<string>;
	credit: Option<string>;
	format: Format;
	styles?: SerializedStyles;
}

const HeaderImageCaption: FC<Props> = ({
	caption,
	credit,
	styles,
	format,
}: Props) =>
	pipe2(
		caption,
		map((cap) => (
			<figcaption css={[HeaderImageCaptionStyles(format), styles]}>
				<details>
					<summary>
						<span css={svgStyle(format)}>
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
