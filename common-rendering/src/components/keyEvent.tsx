// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import type { FC } from "react";
import { textSans, headline } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";

// ----- Component ----- //

const textStyles: SerializedStyles = css`
	${headline.xxxsmall({ fontWeight: "bold", lineHeight: "regular" })};
	a {
		color: ${palette.news[300]};
		text-decoration: none;
	}
`;

const timeStyles: SerializedStyles = css`
	${textSans.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${palette.neutral[7]};
`;

// const listStyles: SerializedStyles = css``;

const titleStyle: SerializedStyles = css`
	${headline.xxsmall({ fontWeight: "bold", lineHeight: "tight" })};
	color: ${palette.neutral[7]};
`;

export interface Event {
	time: string;
	text: string;
	url: string;
}

interface KeyEventProps {
	events: Event[];
}

interface ListItemProps {
	event: Event;
}

const ListItem: FC<ListItemProps> = ({ event }) => {
	return (
		<li>
			<div css={timeStyles}>{event.time}</div>
			<div css={textStyles}>
				<a href={event.url}>{event.text}</a>
			</div>
		</li>
	);
};

const KeyEvent: FC<KeyEventProps> = ({ events }) => {
	return (
		<div>
			<h3 css={titleStyle}>Key Events</h3>
			<ul>
				{events.map((event) => (
					<ListItem event={event} />
				))}
			</ul>
		</div>
	);
};

// ----- Exports ----- //

export default KeyEvent;
