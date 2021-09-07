// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { FC, useState } from "react";
import { textSans, headline } from "@guardian/src-foundations/typography";
import { palette, remSpace } from "@guardian/src-foundations";
import { SvgChevronUpSingle, SvgChevronDownSingle } from "@guardian/src-icons";
import { Theme } from "@guardian/types";
import { from } from "@guardian/src-foundations/mq";
import { getColor, KeyEvent } from "../keyEvent";
import { Button } from "@guardian/src-button";

// ----- Component ----- //

const keyEventWrapperStyles: SerializedStyles = css`
	width: 100%;

	${from.desktop} {
		width: 13.75rem;
	}
`;

const titleRowStyles: SerializedStyles = css`
	position: relative;
	margin: ${remSpace[1]} ${remSpace[1]} 0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	path {
		fill: ${palette.neutral[46]};
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

const buttonStyles: SerializedStyles = css`
	background: 0;
	outline: 0;
	padding: 0;
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
	const [showList, setShowList] = useState(true);

	return (
		<div css={keyEventWrapperStyles}>
			<div css={titleRowStyles}>
				<div css={titleStyle}>Key Events</div>
				<Button
					type="button"
					size="default"
					cssOverrides={buttonStyles}
					onClick={() => setShowList(!showList)}
					hideLabel={true}
					icon={
						showList ? (
							<SvgChevronUpSingle />
						) : (
							<SvgChevronDownSingle />
						)
					}
				></Button>
			</div>
			{showList && (
				<ul css={listStyles}>
					{keyEvents.slice(0, 7).map((event) => (
						<ListItem keyEvent={event} theme={theme} />
					))}
				</ul>
			)}
		</div>
	);
};

// ----- Exports ----- //

export default KeyEvents;
