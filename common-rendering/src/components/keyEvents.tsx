// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { FC } from "react";
import { textSans, headline } from "@guardian/src-foundations/typography";
import { palette, remSpace } from "@guardian/src-foundations";
import { SvgChevronUpSingle, SvgChevronDownSingle } from "@guardian/src-icons";
import { Pillar, Theme } from "@guardian/types";
import { from } from "@guardian/src-foundations/mq";

// ----- Component ----- //
export type paletteId = 300 | 400;

interface KeyEvent {
	time: string;
	text: string;
	url: string;
}

const getColor = (theme: Theme, paletteId: paletteId) => {
	switch (theme) {
		case Pillar.Sport:
			return palette.sport[paletteId];
		case Pillar.Culture:
			return palette.culture[paletteId];
		case Pillar.Lifestyle:
			return palette.lifestyle[paletteId];
		case Pillar.Opinion:
			return palette.opinion[paletteId];
		default:
			return palette.news[paletteId];
	}
};

const keyEventWrapperStyles: SerializedStyles = css`
	width: 100%;

	${from.desktop} {
		width: 13.75rem;
	}
`;

const detailsStyles: SerializedStyles = css`
	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}
`;

const titleRowStyles: SerializedStyles = css`
	position: relative;
	margin: ${remSpace[1]} ${remSpace[1]} 0 ${remSpace[3]};
	display: flex;
	justify-content: space-between;
	align-items: center;

	&:focus {
		outline: none;
	}

	path {
		fill: ${palette.neutral[46]};
	}

	svg {
		height: 2rem;
	}

	${from.phablet} {
		margin: ${remSpace[1]} ${remSpace[4]} 0;
	}

	${from.desktop} {
		display: none;
	}
`;

const titleStyle: SerializedStyles = css`
	${headline.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${palette.neutral[7]};
`;

const listStyles: SerializedStyles = css`
	margin: ${remSpace[3]};

	${from.phablet} {
		margin: ${remSpace[3]} ${remSpace[5]} 0;
	}

	${from.desktop} {
		margin: ${remSpace[1]} 0 0;
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
	color: ${getColor(theme, 300)};
	text-decoration: none;
`;

const timeStyles: SerializedStyles = css`
	${textSans.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${palette.neutral[7]};
	display: block;
`;

interface KeyEventsProps {
	keyEvents: KeyEvent[];
	theme: Theme;
}

interface ListItemProps {
	keyEvent: KeyEvent;
	theme: Theme;
}

const ListItem: FC<ListItemProps> = ({ keyEvent, theme }) => {
	return (
		<li css={listItemStyles}>
			<div css={timeTextWrapperStyles}>
				<time css={timeStyles}>{keyEvent.time}</time>
				<a css={textStyles(theme)} href={keyEvent.url}>
					{keyEvent.text}
				</a>
			</div>
		</li>
	);
};

const KeyEvents: FC<KeyEventsProps> = ({ keyEvents, theme }) => {
	return (
		<div css={keyEventWrapperStyles}>
			<details open css={detailsStyles}>
				<summary css={titleRowStyles}>
					<div css={titleStyle}>Key Events</div>
					<span className="is-off">
						<SvgChevronDownSingle />
					</span>
					<span className="is-on">
						<SvgChevronUpSingle />
					</span>
				</summary>
				<ul css={listStyles}>
					{keyEvents.slice(0, 7).map((event) => (
						<ListItem keyEvent={event} theme={theme} />
					))}
				</ul>
			</details>
		</div>
	);
};

// ----- Exports ----- //

export default KeyEvents;
export { KeyEvent };
