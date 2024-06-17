// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { ArticlePillar, timeAgo } from '@guardian/libs';
import {
	culture,
	from,
	lifestyle,
	neutral,
	news,
	opinion,
	remSpace,
	sport,
	textSans15,
	textSansBold14,
} from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import Accordion from 'components/Accordion';
import { background, text } from 'palette';
import { darkModeCss } from 'styles';

// ----- Component ----- //

type PaletteId = 300 | 400 | 500;

interface KeyEvent {
	date: Date;
	text: string;
	url: string;
}

interface KeyEventsProps {
	keyEvents: KeyEvent[];
	format: ArticleFormat;
}

interface ListItemProps {
	keyEvent: KeyEvent;
	format: ArticleFormat;
}

const getColour = (theme: ArticleTheme, paletteId: PaletteId): string => {
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

	${darkModeCss`
		border-top-color: ${neutral[20]};
		background-color: ${background.articleContentDark(format)};
	`}
`;

const listStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.keyEvents(format)};

	${from.desktop} {
		background-color: ${background.keyEventsWide(format)};
	}

	${darkModeCss`
		background-color: ${background.keyEventsDark(format)};

		${from.desktop} {
			background-color: ${background.keyEventsWideDark(format)};
		}
	`}
`;

const linkStyles = css`
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

	${darkModeCss`
		&:hover::before {
			background-color: ${neutral[100]};
		}

		&::before {
			border-color: transparent ${neutral[60]};
			background-color: ${neutral[60]};
		}
	`}
`;

const listItemStyles = css`
	padding-bottom: ${remSpace[3]};
	border-left: 1px solid ${neutral[86]};
	position: relative;
	transform: translateY(-1px);
	margin-left: ${remSpace[1]};
	${darkModeCss`
		border-left: 1px solid ${neutral[60]};
	`}
	&:last-child {
		border-left-color: transparent;
	}
`;

const timeTextWrapperStyles: SerializedStyles = css`
	margin-left: 0.5rem;
`;

const textStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans15};
	color: ${text.keyEventsInline(format)};
	display: block;
	text-decoration: none;
	transform: translateY(-2px);

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

	${darkModeCss`
		color: ${getColour(format.theme, 500)};
		&:hover {
			color: ${getColour(format.theme, 500)};
		}
	`}
`;

const timeStyles = css`
	${textSansBold14};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.15;
	color: ${neutral[7]};
	display: block;
	transform: translateY(-4px);

	${darkModeCss`
		color: ${neutral[60]};
	`}
`;

const ListItem = ({ keyEvent, format }: ListItemProps) => {
	return (
		<li css={listItemStyles}>
			<Link priority="secondary" css={linkStyles} href={keyEvent.url}>
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
						css={timeStyles}
					>
						{timeAgo(keyEvent.date.getTime())}
					</time>
					<span css={textStyles(format)}>{keyEvent.text}</span>
				</div>
			</Link>
		</li>
	);
};

const KeyEvents = ({ keyEvents, format }: KeyEventsProps) => {
	return (
		<nav
			// https://github.com/guardian/dotcom-rendering/pull/3693
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- See PR above.
			tabIndex={0}
			id="keyevents"
			css={keyEventWrapperStyles(format, keyEvents.length === 0)}
			aria-label="Key Events"
		>
			<Accordion accordionTitle="Key events" context="keyEvents">
				<ul css={listStyles(format)}>
					{keyEvents.slice(0, 7).map((event, index) => (
						<ListItem
							key={`${event.url}${index}`}
							keyEvent={event}
							format={format}
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
