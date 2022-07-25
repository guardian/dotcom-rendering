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
import Accordion from './accordion';
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

const keyEventWrapperStyles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
	hideMobile: boolean,
): SerializedStyles => css`
	width: 100%;

	${hideMobile &&
	css`
		display: none;
	`}

	${from.desktop} {
		display: block;
		border-top: 1px solid ${neutral[86]};
		padding-top: ${remSpace[2]};
	}

	${darkModeCss(supportsDarkMode)`
		border-top-color: ${neutral[20]};
		background-color: ${background.articleContentDark(format)};
	`}
`;

const listStyles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => css`
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
		position: absolute;
		left: -0.313rem;
		height: 0.563rem;
		width: 0.563rem;
		border-radius: 50%;
		background-color: ${neutral[46]};
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
	margin-left: 0.5rem;
`;

const textStyles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => css`
	${textSans.small({ fontWeight: 'regular', lineHeight: 'regular' })};
	/* TODO update with Source value when it's added */
	${from.desktop} {
		font-size: 15px;
	}
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
	transform: translateY(-2.5px);

	${darkModeCss(supportsDarkMode)`
		color: ${neutral[60]};
	`}
`;

const ListItem = ({ keyEvent, format, supportsDarkMode }: ListItemProps) => {
	return (
		<li css={listItemStyles(supportsDarkMode)}>
			<Link
				priority="secondary"
				css={linkStyles(supportsDarkMode)}
				href={keyEvent.url}
			>
				<div css={timeTextWrapperStyles}>
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
				</div>
			</Link>
		</li>
	);
};

const KeyEvents = ({ keyEvents, format, supportsDarkMode }: KeyEventsProps) => {
	return (
		<nav
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			id="keyevents"
			css={keyEventWrapperStyles(
				format,
				supportsDarkMode,
				keyEvents.length === 0,
			)}
			aria-label="Key Events"
		>
			<Accordion
				supportsDarkMode={supportsDarkMode}
				accordionTitle="Key events"
				context="keyEvents"
			>
				<ul css={listStyles(format, supportsDarkMode)}>
					{keyEvents.slice(0, 7).map((event, index) => (
						<ListItem
							key={`${event.url}${index}`}
							keyEvent={event}
							format={format}
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
