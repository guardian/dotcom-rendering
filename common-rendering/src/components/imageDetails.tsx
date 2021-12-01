// ----- Imports ----- //

import type { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import { remSpace } from "@guardian/source-foundations";
import { brandAlt, neutral } from "@guardian/source-foundations";
import { textSans } from "@guardian/source-foundations";
import { SvgCamera } from "@guardian/source-react-components";
import { Option, OptionKind } from "@guardian/types";
import { withDefault } from "@guardian/types";
import { darkModeCss } from "@guardian/common-rendering/src/lib";
import type { FC } from "react";

// ----- Component ----- //

const styles = css`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
`;

const detailsStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	&[open] {
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

		${darkModeCss(supportsDarkMode)`
			color: ${neutral[60]};
		`}
	}
`;

const iconStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	display: block;
	text-align: center;
	background-color: ${brandAlt[400]};
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

	${darkModeCss(supportsDarkMode)`
		background-color: ${neutral[93]};
	`}
`;

const svgStyles: SerializedStyles = css`
	line-height: 32px;
	font-size: 0;

	svg {
		width: 75%;
		height: 75%;
		margin: 12.5%;
	}

	path {
		fill: ${neutral[7]};
	}
`;

interface Props {
	caption: Option<string>;
	credit: Option<string>;
	supportsDarkMode: boolean;
	id: string;
}

const ImageDetails: FC<Props> = ({
	caption,
	credit,
	supportsDarkMode,
	id,
}: Props) => {
	if (caption.kind === OptionKind.None && credit.kind === OptionKind.None) {
		return null;
	}

	return (
		<figcaption css={styles}>
			<details css={detailsStyles(supportsDarkMode)}>
				<summary css={iconStyles(supportsDarkMode)}>
					<span css={svgStyles}>
						<SvgCamera />
						Click to see figure caption
					</span>
				</summary>
				<span id={id}>
					{withDefault("")(caption)} {withDefault("")(credit)}
				</span>
			</details>
		</figcaption>
	);
};

// ----- Exports ----- //

export default ImageDetails;
