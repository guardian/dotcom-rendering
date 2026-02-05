import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { between, textSans17, until } from '@guardian/source/foundations';
import { formatCount } from '../lib/formatCount';
import { useCommentCount } from '../lib/useCommentCount';
import { palette as themePalette } from '../palette';
import CommentIcon from '../static/icons/comment.svg';

type Props = {
	discussionApiUrl: string;
	shortUrlId: string;
};

const containerStyles = css`
	display: flex;
	align-self: flex-end;
	flex-direction: column;
	${textSans17};
	font-weight: bold;
	color: ${themePalette('--comment-count-fill')};

	${until.desktop} {
		color: ${themePalette('--comment-count-mobile-fill')};
	}
`;

const iconContainerStyles = css`
	height: 15px;
	margin: 0;
	text-align: right;
	margin-bottom: -2px;
	svg {
		height: 18px;
		width: 18px;
	}
`;

const iconStyles = css`
	fill: ${themePalette('--comment-count-fill')};
	${until.desktop} {
		fill: ${themePalette('--comment-count-mobile-fill')};
	}
`;

const longStyles = css`
	display: block;
	text-align: center;

	${between.leftCol.and.wide} {
		display: none;
	}
`;

const shortStyles = css`
	display: none;
	text-align: center;

	${between.leftCol.and.wide} {
		display: block;
	}
`;

const linkStyles = css`
	display: flex;
	align-items: center;
	gap: 4px;
	color: inherit;
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
	:visited {
		color: inherit;
	}
`;

/**
 * Shows the number of comments at the top of an article.
 *
 * ## Why does this need to be an Island?
 *
 * Fetches the count from the discussion API.
 *
 * ---
 *
 * [`Count` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-counts&buildNumber=2967)
 */
export const CommentCount = ({ discussionApiUrl, shortUrlId }: Props) => {
	const commentCount = useCommentCount(discussionApiUrl, shortUrlId);

	// If the comment count is 0 we still want to display it
	if (isUndefined(commentCount)) return null;

	const { short, long } = formatCount(commentCount);

	return (
		<data
			css={containerStyles}
			data-testid="comment-counts"
			value={`${long} comments on this article`}
			data-gu-name="comment-count"
		>
			<a
				href="#comments"
				css={linkStyles}
				aria-label={`${short} Comments`}
			>
				<div css={iconContainerStyles}>
					<CommentIcon css={iconStyles} />
				</div>
				<div
					data-testid="long-comment-count"
					css={longStyles}
					aria-hidden="true"
				>
					{long}
				</div>
				<div
					data-testid="short-comment-count"
					css={shortStyles}
					aria-hidden="true"
				>
					{short}
				</div>
			</a>
		</data>
	);
};
