import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgCamera } from '@guardian/src-icons';
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe2 } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss, wideContentWidth } from 'styles';

const captionId = 'header-image-caption';

const HeaderImageCaptionStyles = css`
	summary {
		text-align: center;
		background-color: ${brandAlt[400]};
		color: ${neutral[7]};
		width: ${remSpace[9]};
		height: ${remSpace[9]};
		position: absolute;
		bottom: ${remSpace[2]};
		right: ${remSpace[2]};
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

const svgStyle = css`
	line-height: 32px;
	font-size: 0;
	svg {
		width: 24px;
		height: 24px;
		margin: 4px;
	}
`;

interface Props {
	caption: Option<string>;
	credit: Option<string>;
}

const HeaderImageCaption: FC<Props> = ({ caption, credit }: Props) =>
	pipe2(
		caption,
		map((cap) => (
			<figcaption css={HeaderImageCaptionStyles}>
				<details>
					<summary>
						<span css={svgStyle}>
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
