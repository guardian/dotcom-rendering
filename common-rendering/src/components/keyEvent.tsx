// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { FC, useState } from "react";
import { textSans, headline } from "@guardian/src-foundations/typography";
import { palette, remSpace } from "@guardian/src-foundations";
import { SvgChevronUpSingle, SvgChevronDownSingle } from "@guardian/src-icons";
import { Theme } from "@guardian/types";
import { from } from "@guardian/src-foundations/mq";
import { getTextColor, KeyEvent } from "../keyEvent";

// ----- Component ----- //

const keyEventWrapperStyles: SerializedStyles = css`
	width: 100%;

	${from.desktop} {
		width: 220px;
	}
`;

const titleRowStyles: SerializedStyles = css`
	position: relative;
	margin: ${remSpace[1]} ${remSpace[3]} 0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	svg {
		height: 30px;
	}

	path {
		fill: ${palette.neutral[46]};
	}

	${from.phablet} {
		margin: ${remSpace[1]} ${remSpace[5]} 0;
	}

	${from.desktop} {
		display: none;
	}
`;

const titleStyle: SerializedStyles = css`
	${headline.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${palette.neutral[7]};
`;

const authorStyles: SerializedStyles = css`
	display: none;

	${from.desktop} {
		display: block;
	}
`;

const buttonStyles: SerializedStyles = css`
	border: 0;
	background: 0;
	outline: 0;
	padding: 0;
`;

const listStyles: SerializedStyles = css`
	margin: ${remSpace[3]};

	${from.phablet} {
		margin: ${remSpace[3]} ${remSpace[5]};
	}

	${from.desktop} {
		margin: ${remSpace[1]} 0 0;
		border-top: 1px solid ${palette.neutral[86]};
	}

	li::before {
		content: "";
		border-color: transparent ${palette.neutral[7]};
		border-style: solid;
		border-width: 0.4rem 0 0.4rem 0.5rem;
		display: block;
		height: 0;
		width: 0;
		top: 0;
		position: absolute;
	}
`;

const listItemStyles: SerializedStyles = css`
	padding-bottom: ${remSpace[3]};
	border-left: 1px solid ${palette.neutral[7]};
	position: relative;

	&:last-child {
		border-left: none;
	}
`;

const timeTextWrapperStyles: SerializedStyles = css`
	margin-left: ${remSpace[4]};
`;

const textStyles = (theme: Theme): SerializedStyles => css`
	${headline.xxxsmall({ fontWeight: "regular", lineHeight: "regular" })};
	color: ${getTextColor(theme, 300)};
	text-decoration: none;
`;

const timeStyles: SerializedStyles = css`
	${textSans.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${palette.neutral[7]};
`;

interface KeyEventProps {
	events: KeyEvent[];
	theme: Theme;
}

interface ListItemProps {
	event: KeyEvent;
	theme: Theme;
}

const ListItem: FC<ListItemProps> = ({ event, theme }) => {
	return (
		<li css={listItemStyles}>
			<div css={timeTextWrapperStyles}>
				<div css={timeStyles}>{event.time}</div>
				<a css={textStyles(theme)} href={event.url}>
					{event.text}
				</a>
			</div>
		</li>
	);
};

const KeyEvent: FC<KeyEventProps> = ({ events, theme }) => {
	const [showList, setShowList] = useState(true);

	return (
		<div css={keyEventWrapperStyles}>
			<div css={authorStyles}>
				Clea Skopeliti (now), Tom Ambrose, Emma Kemp, and Helen Sullivan
				(earlier)
			</div>
			<div css={titleRowStyles}>
				<div css={titleStyle}>Key Events</div>
				<button
					css={buttonStyles}
					onClick={() => setShowList(!showList)}
				>
					{showList ? (
						<SvgChevronUpSingle />
					) : (
						<SvgChevronDownSingle />
					)}
				</button>
			</div>
			{showList && (
				<ul css={listStyles}>
					{events.map((event) => (
						<ListItem event={event} theme={theme} />
					))}
				</ul>
			)}
		</div>
	);
};

// ----- Exports ----- //

export default KeyEvent;
