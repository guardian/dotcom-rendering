import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { useState } from 'react';
import { dateFormatter } from '../../lib/discussionDateFormatter';
import { useInterval } from '../../lib/useInterval';
import { palette as schemedPalette } from '../../palette';

type Props = {
	isoDateTime: string;
	webUrl: string;
	commentId: number;
	onPermalinkClick: (commentId: number) => void;
};

const linkStyles = css`
	color: ${schemedPalette('--discussion-subdued')};
	text-decoration: none;
	:hover,
	:focus {
		text-decoration: underline;
	}
`;
const timeStyles = css`
	${textSans.xxsmall({ fontWeight: 'light' })}
	min-width: 0.75rem;
	margin-right: 0.3125rem;
	white-space: nowrap;
`;

export const Timestamp = ({
	isoDateTime,
	webUrl,
	commentId,
	onPermalinkClick,
}: Props) => {
	const [timeAgo, setTimeAgo] = useState(dateFormatter(isoDateTime));

	useInterval(() => {
		setTimeAgo(dateFormatter(isoDateTime));
	}, 15000);

	return (
		<a
			href={webUrl}
			css={linkStyles}
			data-link-name="jump-to-comment-timestamp"
			onClick={(e) => {
				onPermalinkClick(commentId);
				e.preventDefault();
			}}
			rel="nofollow"
		>
			<time dateTime={isoDateTime.toString()} css={timeStyles}>
				{timeAgo}
			</time>
		</a>
	);
};
