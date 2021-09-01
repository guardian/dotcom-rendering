// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import type { FC } from "react";
import { textSans } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";

// ----- Component ----- //

const textStyles: SerializedStyles = css`
	${textSans.small({ fontWeight: "bold", lineHeight: "regular" })};
	a {
		color: ${palette.news[400]};
		text-decoration: none;
	}
`;

// const timeStyles: SerializedStyles = css``;

// const listStyles: SerializedStyles = css``;

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
			<div>{event.time}</div>
			<div css={textStyles}>
				<a href={event.url}>{event.text}</a>
			</div>
		</li>
	);
};

const KeyEvent: FC<KeyEventProps> = ({ events }) => {
	return (
		<ul>
			{events.map((event) => (
				<ListItem event={event} />
			))}
		</ul>
	);
};

// ----- Exports ----- //

export default KeyEvent;
