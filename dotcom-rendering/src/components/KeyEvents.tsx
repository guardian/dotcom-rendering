import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral, space, textSans } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';
import { Accordion } from './Accordion';
import { Island } from './Island';
import { RelativeTime } from './RelativeTime.importable';

export type KeyEvent = {
	date: Date;
	text: string;
	url: string;
};

type KeyEventsProps = {
	keyEvents: KeyEvent[];
	format: ArticleFormat;
};

type ListItemProps = {
	keyEvent: KeyEvent;
	format: ArticleFormat;
};

const keyEventWrapperStyles = (hideMobile: boolean): SerializedStyles => css`
	width: 100%;

	${hideMobile &&
	css`
		display: none;
	`}

	${from.desktop} {
		display: block;
		border-top: 1px solid ${neutral[86]};
		padding-top: ${space[2]}px;
	}
`;

const listStyles = (format: ArticleFormat) => css`
	background-color: ${decidePalette(format).background.keyEvent};

	${from.desktop} {
		background-color: ${decidePalette(format).background
			.keyEventFromDesktop};
	}
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
		left: -5px;
		height: 9px;
		width: 9px;
		border-radius: 50%;
		background-color: ${neutral[46]};
	}
`;

const listItemStyles = css`
	padding-bottom: ${space[3]}px;
	border-left: 1px solid ${neutral[86]};
	position: relative;
	transform: translateY(-1px);
	margin-left: ${space[1]}px;

	&:last-child {
		border-left-color: transparent;
	}
`;

const timeTextWrapperStyles: SerializedStyles = css`
	margin-left: 0.5rem;
`;

const textStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small({ fontWeight: 'regular', lineHeight: 'regular' })};
	color: ${decidePalette(format).text.keyEvent};
	display: block;
	text-decoration: none;
	transform: translateY(-2px);

	&:hover {
		color: currentColor;
		text-decoration: underline;
	}

	${from.desktop} {
		color: ${decidePalette(format).text.keyEventFromDesktop};

		&:hover {
			color: currentColor;
			text-decoration: underline;
		}
	}
`;

const timeStyles = css`
	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'tight' })};
	color: ${neutral[7]};
	display: block;
	transform: translateY(-4px);
`;

const ListItem = ({ keyEvent, format }: ListItemProps) => (
	<li css={listItemStyles}>
		<Link priority="secondary" css={linkStyles} href={keyEvent.url}>
			<div css={timeTextWrapperStyles}>
				<div css={timeStyles}>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<RelativeTime
							then={keyEvent.date.getTime()}
						></RelativeTime>
					</Island>
				</div>

				<span css={textStyles(format)}>{keyEvent.text}</span>
			</div>
		</Link>
	</li>
);

export const KeyEvents = ({ keyEvents, format }: KeyEventsProps) => (
	<nav
		// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- this is superior
		tabIndex={0}
		id="keyevents"
		css={keyEventWrapperStyles(keyEvents.length === 0)}
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
