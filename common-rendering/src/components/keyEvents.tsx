// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { textSans, headline } from "@guardian/source-foundations";
import { remSpace } from "@guardian/source-foundations";
import {
	culture,
	lifestyle,
	neutral,
	news,
	sport,
	opinion,
} from "@guardian/source-foundations";
import { Link } from "@guardian/source-react-components";
import { ArticlePillar, ArticleTheme, timeAgo } from "@guardian/libs";
import { from } from "@guardian/source-foundations";
import { darkModeCss } from "../lib";
import Accordion from "./accordion";

// ----- Component ----- //
type paletteId = 300 | 400 | 500;

interface KeyEvent {
	date: Date;
	text: string;
	url: string;
}

interface KeyEventsProps {
	keyEvents: KeyEvent[];
	theme: ArticleTheme;
	supportsDarkMode: boolean;
}

interface ListItemProps {
	keyEvent: KeyEvent;
	theme: ArticleTheme;
	supportsDarkMode: boolean;
}

const getColor = (theme: ArticleTheme, paletteId: paletteId) => {
	switch (theme) {
		case ArticlePillar.Sport:
			return sport[paletteId];
		case ArticlePillar.Culture:
			return culture[paletteId];
		case ArticlePillar.Lifestyle:
			return lifestyle[paletteId];
		case ArticlePillar.Opinion:
			return opinion[paletteId];
		default:
			return news[paletteId];
	}
};

const keyEventWrapperStyles = (
	supportsDarkMode: boolean
): SerializedStyles => css`
	width: 100%;

	${from.desktop} {
		border-top: 1px solid ${neutral[86]};
		padding-top: ${remSpace[2]};
	}

	${darkModeCss(supportsDarkMode)`
		background-color: ${neutral[10]};
	`}
`;

const listStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	${from.desktop} {
		width: 13.75rem;
	}

	li::before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: -6px;
		height: 11px;
		width: 11px;
		border-radius: 50%;
		background-color: ${neutral[46]};
	}

	${darkModeCss(supportsDarkMode)`
		li::before {
			border-color: transparent ${neutral[60]};
		}
	`}
`;

const listItemStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	padding-bottom: ${remSpace[3]};
	border-left: 1px solid ${neutral[86]};
	position: relative;
	transform: translateY(-1px);
	margin-left: ${remSpace[1]};
	${darkModeCss(supportsDarkMode)`
		border-left: 1px solid ${neutral[60]};
	`}
	&:last-child {
		border-left: none;
	}
`;

const timeTextWrapperStyles: SerializedStyles = css`
	margin-left: ${remSpace[4]};
`;

const keyEventsTextGrayBackground = (theme: ArticleTheme): string => {
	switch (theme) {
		case ArticlePillar.News:
		case ArticlePillar.Lifestyle:
		case ArticlePillar.Sport:
			return getColor(theme, 400);
		default:
			return getColor(theme, 300);
	}
};

const textStyles = (
	theme: ArticleTheme,
	supportsDarkMode: boolean
): SerializedStyles => css`
	${headline.xxxsmall({ fontWeight: "regular", lineHeight: "regular" })};
	/* TODO update with Source value when it's added */
	${from.desktop} {
		font-size:15px;
	}
	color: ${getColor(theme, 400)};

	text-decoration: none;

	&:hover {
		color: ${getColor(theme, 400)};
		text-decoration: underline;
	}

	${from.desktop} {
		color: ${keyEventsTextGrayBackground(theme)};

		&:hover {
			color: ${keyEventsTextGrayBackground(theme)};
			text-decoration: underline;
		}
	}

	${darkModeCss(supportsDarkMode)`
		color: ${getColor(theme, 500)};
		&:hover {
			color: ${getColor(theme, 500)};
		}
	`}

`;

const timeStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	${textSans.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${neutral[7]};
	display: block;

	${darkModeCss(supportsDarkMode)`
		color: ${neutral[60]};
	`}
`;

const ListItem = ({ keyEvent, theme, supportsDarkMode }: ListItemProps) => {
	return (
		<li css={listItemStyles(supportsDarkMode)}>
			<div css={timeTextWrapperStyles}>
				<time
					dateTime={keyEvent.date.toISOString()}
					data-relativeformat="med"
					title={keyEvent.date.toLocaleTimeString()}
					css={timeStyles(supportsDarkMode)}
				>
					{timeAgo(keyEvent.date.getTime(), { verbose: true })}
				</time>
				<Link
					priority="secondary"
					css={textStyles(theme, supportsDarkMode)}
					href={keyEvent.url}
				>
					{keyEvent.text}
				</Link>
			</div>
		</li>
	);
};

const KeyEvents = ({ keyEvents, theme, supportsDarkMode }: KeyEventsProps) => {
	return (
		<nav
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			id="keyevents"
			css={keyEventWrapperStyles(supportsDarkMode)}
			aria-label="Key Events"
		>
			<Accordion
				supportsDarkMode={supportsDarkMode}
				accordionTitle="Key events"
				context="keyEvents"
			>
				<ul css={listStyles(supportsDarkMode)}>
					{keyEvents.slice(0, 7).map((event, index) => (
						<ListItem
							key={`${event.url}${index}`}
							keyEvent={event}
							theme={theme}
							supportsDarkMode={supportsDarkMode}
						/>
					))}
				</ul>
			</Accordion>
		</nav>
	);
};

// ----- Exports ----- //

export default KeyEvents;
export type { KeyEvent };
