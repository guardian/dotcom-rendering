import { css } from "@emotion/react";
import { timeAgo } from "@guardian/libs";
import { neutral, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

// TODO: update this code to use shared version when it is available
const padString = (time: number) => (time < 10 ? `0${time}` : time);

const FirstPublished = ({
	firstPublished,
	blockLink,
}: {
	firstPublished: number;
	blockLink: string;
}) => {
	const publishedDate = new Date(firstPublished);
	return (
		<a
			href={blockLink}
			data-ignore="global-link-styling"
			css={css`
				${textSans.xxsmall({ fontWeight: "bold" })}
				margin-bottom: ${space[1]}px;
				padding-top: ${space[1]}px;
				display: flex;
				flex-direction: row;
				text-decoration: none;
				:hover {
					filter: brightness(30%);
				}
			`}
		>
			<time
				dateTime={publishedDate.toISOString()}
				css={css`
					color: ${neutral[46]};
					font-weight: bold;
					margin-right: ${space[2]}px;
				`}
			>
				{timeAgo(firstPublished)}
			</time>
			<span
				css={css`
					${textSans.xxsmall()};
					color: ${neutral[46]};
				`}
			>
				{`${padString(publishedDate.getHours())}:${padString(
					publishedDate.getMinutes()
				)}`}
			</span>
		</a>
	);
};

export { FirstPublished };
