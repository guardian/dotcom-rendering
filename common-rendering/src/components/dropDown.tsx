// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { neutral, line } from "@guardian/src-foundations/palette";
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
	dropDownTitle: string;
	backgroundBody?: SerializedStyles;
	backgroundTitle?: SerializedStyles;
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

	&:focus {
		${focusHalo}
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

	${from.desktop} {
		display: none;
	}
`;

const titleStyle = (supportsDarkMode: boolean): SerializedStyles => css`
	${headline.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${neutral[7]};
	padding: 0 ${remSpace[1]} 0 ${remSpace[3]};

	${darkModeCss(supportsDarkMode)`
		color: ${neutral[86]};
	`}

	${from.phablet} {
		margin: ${remSpace[1]} ${remSpace[4]} 0;
	}
`;

const paddingBody: SerializedStyles = css`
	padding: ${remSpace[3]};

	${from.phablet} {
		padding: ${remSpace[3]} ${remSpace[5]} 0;
	}

	${from.desktop} {
		padding: 0;
	}
`;

const DropDown = ({
	children,
	supportsDarkMode,
	dropDownTitle,
	backgroundTitle,
	backgroundBody,
}: DropDownProps) => {
	return (
		<details open css={[detailsStyles]}>
			<summary css={[titleRowStyles(supportsDarkMode), backgroundTitle]}>
				<h2 css={titleStyle(supportsDarkMode)}>{dropDownTitle}</h2>
				<span className="is-off">
					<SvgChevronDownSingle />
				</span>
				<span className="is-on">
					<SvgChevronUpSingle />
				</span>
			</summary>
			<div css={[backgroundBody, paddingBody]}>{children}</div>
		</details>
	);
};

// ----- Exports ----- //

export default DropDown;
