import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { palette as schemedPalette } from '../../palette';
import { RelativeTime } from '../RelativeTime.importable';

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

	time {
		${textSans.xxsmall({ fontWeight: 'light' })}
		min-width: 0.75rem;
		margin-right: 0.3125rem;
		white-space: nowrap;
	}
`;

export const Timestamp = ({
	isoDateTime,
	webUrl,
	commentId,
	onPermalinkClick,
}: Props) => {
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
			<RelativeTime then={new Date(isoDateTime).getTime()} />
		</a>
	);
};
