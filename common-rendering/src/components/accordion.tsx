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

interface AccordionProps {
	children: React.ReactNode;
	supportsDarkMode: boolean;
	accordionTitle: string;
	context: 'keyEvents' | 'liveFeed';
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
	display: block;
	align-items: center;
	border-top: ${line.primary} 1px solid;
	background-color: ${background.primary};
	padding: ${remSpace[1]} ${remSpace[2]} ${remSpace[2]} ${remSpace[3]};
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
		background-color: ${neutral[10]};
		border-top: ${neutral[20]} 1px solid;
	`}
	${from.phablet} {
		padding: ${remSpace[1]} ${remSpace[4]} ${remSpace[2]} ${remSpace[5]};
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

const arrowPosition: SerializedStyles = css`
	position: absolute;
	right: 10px;
	top: 0;
`;

const backgroundColour = (
	context: 'keyEvents' | 'liveFeed',
	supportsDarkMode: boolean,
): SerializedStyles => {
	if(context === 'keyEvents') {
		return css`
			background-color: ${background.primary};
			${from.desktop} {
				background-color: transparent;
			}
			${darkModeCss(supportsDarkMode)`
				background-color: ${neutral[10]};
			`}
		`
	}
	return css`
		background-color: ${neutral[97]};
		${from.desktop} {
			background-color: transparent;
		}
		${darkModeCss(supportsDarkMode)`
			background-color: ${neutral[10]};
		`}
	`;

};

const paddingBody: SerializedStyles = css`
	padding: ${remSpace[3]};
	${from.phablet} {
		padding: ${remSpace[3]} ${remSpace[5]};
	}
	${from.desktop} {
		padding: 0;
	}
`;

const Accordion = ({
	children,
	supportsDarkMode,
	accordionTitle,
	context,
}: AccordionProps) => {
	return (
		<details open css={detailsStyles}>
			<summary css={titleRowStyles(supportsDarkMode)}>
				<h2 css={titleStyle(supportsDarkMode)}>{accordionTitle}</h2>
				<span className="is-off" css={arrowPosition}>
					<SvgChevronDownSingle />
				</span>
				<span className="is-on" css={arrowPosition}>
					<SvgChevronUpSingle />
				</span>
			</summary>
			<div css={[backgroundColour(context, supportsDarkMode), paddingBody]}>
				{children}
			</div>
		</details>
	);
};

// ----- Exports ----- //

export default Accordion;
