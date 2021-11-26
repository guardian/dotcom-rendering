// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { textSans, headline } from "@guardian/src-foundations/typography";
import { remSpace } from "@guardian/src-foundations";
import {
	culture,
	lifestyle,
	neutral,
	news,
	sport,
	opinion,
} from "@guardian/src-foundations/palette";
import { Link } from "@guardian/src-link";
import { ArticlePillar, ArticleTheme } from "@guardian/libs";
import { from } from "@guardian/src-foundations/mq";
import { darkModeCss } from "../lib";
import Accordion from "./accordion";

// ----- Component ----- //
type paletteId = 300 | 400 | 500;

interface KeyEvent {
	time: string;
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
		border-top: #cdcdcd 1px solid;
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
		border-color: transparent ${neutral[7]};
		border-style: solid;
		border-width: 0.4rem 0 0.4rem 0.5rem;
		display: block;
		height: 0;
		width: 0;
		top: 0;
		position: absolute;
	}

	${darkModeCss(supportsDarkMode)`
		li::before {
			border-color: transparent ${neutral[60]};
		}
	`}
`;

const listItemStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	padding-bottom: ${remSpace[3]};
	border-left: 1px solid ${neutral[7]};
	position: relative;
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

const textStyles = (
	theme: ArticleTheme,
	supportsDarkMode: boolean
): SerializedStyles => css`
	${headline.xxxsmall({ fontWeight: "regular", lineHeight: "regular" })};
	color: ${getColor(theme, 300)};
	text-decoration: none;

	&:hover {
		color: ${getColor(theme, 300)};
		text-decoration: underline;
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
				<time css={timeStyles(supportsDarkMode)}>{keyEvent.time}</time>
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
