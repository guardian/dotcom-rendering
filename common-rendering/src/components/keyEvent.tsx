// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { FC, useState } from "react";
import { textSans, headline } from "@guardian/src-foundations/typography";
import { palette, remSpace } from "@guardian/src-foundations";
import { SvgChevronUpSingle, SvgChevronDownSingle } from "@guardian/src-icons";
import { Format, Pillar } from "@guardian/types";
import { from } from "@guardian/src-foundations/mq";

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

	${from.phablet} {
		margin: ${remSpace[1]} ${remSpace[5]} 0;
	}

	${from.desktop} {
		margin: ${remSpace[1]} 0 0;
		display: none;
	}

	svg {
		height: 30px;
	}

	path {
		fill: ${palette.neutral[46]};
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

const copyStyles: SerializedStyles = css`
	margin-left: ${remSpace[3]};
`;

const getTextColor = (format: Format) => {
	switch (format.theme) {
		case Pillar.Sport:
			return palette.sport[300];
		case Pillar.Culture:
			return palette.culture[300];
		case Pillar.Lifestyle:
			return palette.lifestyle[300];
		case Pillar.Opinion:
			return palette.opinion[300];
		default:
			return palette.news[300];
	}
};

const textStyles = (format: Format): SerializedStyles => css`
	${headline.xxxsmall({ fontWeight: "regular", lineHeight: "regular" })};

	a {
		color: ${getTextColor(format)};
		text-decoration: none;
	}
`;

const timeStyles: SerializedStyles = css`
	${textSans.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${palette.neutral[7]};
`;

export interface Event {
	time: string;
	text: string;
	url: string;
}

interface KeyEventProps {
	events: Event[];
	format: Format;
}

interface ListItemProps {
	event: Event;
	format: Format;
}

const ListItem: FC<ListItemProps> = ({ event, format }) => {
	return (
		<li css={listItemStyles}>
			<div css={copyStyles}>
				<div css={timeStyles}>{event.time}</div>
				<div css={textStyles(format)}>
					<a href={event.url}>{event.text}</a>
				</div>
			</div>
		</li>
	);
};

const KeyEvent: FC<KeyEventProps> = ({ events, format }) => {
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
						<ListItem event={event} format={format} />
					))}
				</ul>
			)}
		</div>
	);
};

// ----- Exports ----- //

export default KeyEvent;
