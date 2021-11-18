// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { neutral, line, background } from "@guardian/src-foundations/palette";
import { headline } from "@guardian/src-foundations/typography";
import { remSpace } from "@guardian/src-foundations";
import { focusHalo } from "@guardian/src-foundations/accessibility";
import { SvgChevronUpSingle, SvgChevronDownSingle } from "@guardian/src-icons";
import { from } from "@guardian/src-foundations/mq";
import { darkModeCss } from "../lib";

// ----- Component ----- //

interface DropDownProps {
	children: React.ReactNode;
	supportsDarkMode: boolean;
	accordionTitle: string;
	backgroundBody: 'white' | 'grey';
}

const detailsStyles: SerializedStyles = css`
	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}
`;

const titleRowStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: ${line.primary} 1px solid;
	background-color: ${background.primary};
	padding: ${remSpace[1]} ${remSpace[2]} 0 ${remSpace[3]};

	&:focus {
		${focusHalo};
	}

	path {
		fill: ${neutral[46]};
	}

	svg {
		height: 2rem;
	}

	${darkModeCss(supportsDarkMode)`
		path {
			fill: ${neutral[60]};
		}
	`}

	${from.phablet} {
		padding: ${remSpace[1]} ${remSpace[4]} 0 ${remSpace[5]};
	}

	${from.desktop} {
		display: none;
	}
`;

const titleStyle = (supportsDarkMode: boolean): SerializedStyles => css`
	${headline.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${neutral[7]};

	${darkModeCss(supportsDarkMode)`
		color: ${neutral[86]};
	`}
`;

const backgroundColour = (backgroundBody: 'white' | 'grey'): SerializedStyles => {
	if(backgroundBody === 'white') {
		return css`
			background-color: ${background.primary};
			${from.desktop} {
				background-color: transparent;
			}
		`
	}
	return css`
		background-color: ${neutral[97]};
		${from.desktop} {
			background-color: transparent;
		}
	`;
};

const paddingBody: SerializedStyles = css`
	padding: ${remSpace[3]};

	${from.phablet} {
		padding: ${remSpace[3]} ${remSpace[5]} 0;
	}

	${from.desktop} {
		padding: 0;
	}
`;

const Accordion = ({
	children,
	supportsDarkMode,
	accordionTitle,
	backgroundBody,
}: DropDownProps) => {
	return (
		<details open css={detailsStyles}>
			<summary css={titleRowStyles(supportsDarkMode)}>
				<h2 css={titleStyle(supportsDarkMode)}>{accordionTitle}</h2>
				<span className="is-off">
					<SvgChevronDownSingle />
				</span>
				<span className="is-on">
					<SvgChevronUpSingle />
				</span>
			</summary>
			<div css={[backgroundColour(backgroundBody), paddingBody]}>{children}</div>
		</details>
	);
};

// ----- Exports ----- //

export default Accordion;
