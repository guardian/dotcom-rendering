// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	textSans,
	sport,
	culture,
	lifestyle,
	opinion,
	news,
	neutral,
	remSpace,
	from,
} from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import {
	ArticleFormat,
	ArticlePillar,
	ArticleTheme,
	timeAgo,
} from '@guardian/libs';
import { darkModeCss } from '../lib';
import { background, text } from '../editorialPalette';

// ----- Component ----- //
type paletteId = 300 | 400 | 500;

interface KeyEvent {
	date: Date;
	text: string;
	url: string;
}

interface KeyEventsProps {
	keyEvents: KeyEvent[];
	format: ArticleFormat;
	supportsDarkMode: boolean;
}

interface ListItemProps {
	keyEvent: KeyEvent;
	format: ArticleFormat;
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

const listStyles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => css`
	padding: ${remSpace[5]};
	display: flex;
	background-color: ${background.keyEvents(format)};

	${from.desktop} {
		background-color: ${background.keyEventsWide(format)};
	}

	${darkModeCss(supportsDarkMode)`
		background-color: ${background.keyEventsDark(format)};

		${from.desktop} {
			background-color: ${background.keyEventsWideDark(format)};
		}
	`}
`;

const linkStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	position: initial;
	text-decoration: none;

	&:hover::before {
		background-color: ${neutral[0]};
	}

	&::before {
		content: '';
		display: block;
		position: relative;
		height: 13px;
		width: 13px;
		border-radius: 50%;
		background-color: ${neutral[46]};
		margin-bottom: ${remSpace[2]};
		z-index: 2;

		${from.tablet} {
			height: 15px;
			width: 15px;
		}
	}

	${darkModeCss(supportsDarkMode)`
		&:hover::before {
			background-color: ${neutral[100]};
		}

		&::before {
			border-color: transparent ${neutral[60]};
			background-color: ${neutral[60]};
		}
	`}
`;

const listItemStyles = (format: ArticleFormat): SerializedStyles => css`
	padding-bottom: ${remSpace[3]};
	position: relative;
	background-color: ${background.keyEvents(format)};
	padding-right: ${remSpace[5]};

	${from.desktop} {
		background-color: ${background.keyEventsWide(format)};
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		border-top: 1px dotted ${neutral[46]};
		left: 0;
		right: 0;
		top: 6px;

		${from.tablet} {
			top: ${remSpace[2]};
		}
	}

	&:last-child::before {
		border-top: 0;
	}
`;

const textStyles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => css`
	width: 150px;
	${textSans.small({ fontWeight: 'regular', lineHeight: 'regular' })};

	color: ${text.keyEventsInline(format)};
	display: block;
	text-decoration: none;

	&:hover {
		color: ${text.keyEventsInline(format)};
		text-decoration: underline;
	}

	${from.desktop} {
		color: ${text.keyEventsLeftColumn(format)};

		&:hover {
			color: ${text.keyEventsLeftColumn(format)};
			text-decoration: underline;
		}
	}

	${darkModeCss(supportsDarkMode)`
		color: ${getColor(format.theme, 500)};
		&:hover {
			color: ${getColor(format.theme, 500)};
		}
	`}
`;

const timeStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'tight' })};
	color: ${neutral[7]};
	display: block;

	${darkModeCss(supportsDarkMode)`
		color: ${neutral[60]};
	`}
`;

const ListItem = ({ keyEvent, format, supportsDarkMode }: ListItemProps) => {
	return (
		<li css={listItemStyles(format)}>
			<Link
				priority="secondary"
				css={linkStyles(supportsDarkMode)}
				href={keyEvent.url}
			>
				<time
					dateTime={keyEvent.date.toISOString()}
					data-relativeformat="med"
					title={`${keyEvent.date.toLocaleDateString('en-GB', {
						hour: '2-digit',
						minute: '2-digit',
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						timeZoneName: 'long',
					})}`}
					css={timeStyles(supportsDarkMode)}
				>
					{timeAgo(keyEvent.date.getTime())}
				</time>
				<span css={textStyles(format, supportsDarkMode)}>
					{keyEvent.text}
				</span>
			</Link>
		</li>
	);
};

const KeyEventsCards = ({
	keyEvents,
	format,
	supportsDarkMode,
}: KeyEventsProps) => {
	return (
		<nav id="keyevents" aria-label="Key Events">
			<ul css={listStyles(format, supportsDarkMode)}>
				{keyEvents.map((event, index) => (
					<ListItem
						key={`${event.url}${index}`}
						keyEvent={event}
						format={format}
						supportsDarkMode={supportsDarkMode}
					/>
				))}
			</ul>
		</nav>
	);
};

// ----- Exports ----- //

export default KeyEventsCards;
export type { KeyEvent };
