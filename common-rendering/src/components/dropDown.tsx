// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { neutral } from "@guardian/src-foundations/palette";
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
	margin: 0 ${remSpace[1]} 0 ${remSpace[3]};
	display: flex;
	justify-content: space-between;
	align-items: center;

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

	${from.phablet} {
		margin: ${remSpace[1]} ${remSpace[4]} 0;
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

const DropDown = ({ children, supportsDarkMode, dropDownTitle }: DropDownProps) => {
	return (
			<details open css={detailsStyles}>
				<summary css={titleRowStyles(supportsDarkMode)}>
					<h2 css={titleStyle(supportsDarkMode)}>{dropDownTitle}</h2>
					<span className="is-off">
						<SvgChevronDownSingle />
					</span>
					<span className="is-on">
						<SvgChevronUpSingle />
					</span>
				</summary>
				{children}
			</details>
	);
};

// ----- Exports ----- //

export default DropDown;
