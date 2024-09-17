import { css } from '@emotion/react';
import {
	between,
	textSansBold12,
	visuallyHidden,
} from '@guardian/source/foundations';
import { formatCount } from '../lib/formatCount';
import { useCommentCount } from '../lib/useCommentCount';
import { palette as themePalette } from '../palette';
import CommentIcon from '../static/icons/comment.svg';
import type { DCRContainerPalette } from '../types/front';
import { ContainerOverrides } from './ContainerOverrides';

type Props = {
	containerPalette?: DCRContainerPalette;
	discussionApiUrl: string;
	discussionId: string;
	isOnwardContent?: boolean;
};

const getCommentCountColour = (isOnwardContent?: boolean) => {
	if (isOnwardContent) {
		return themePalette('--card-footer-onwards-content');
	} else {
		return themePalette('--card-footer-text');
	}
};

const containerStyles = (isOnwardContent?: boolean) => css`
	display: flex;
	flex-direction: row;
	${textSansBold12};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.15;
	margin-top: -4px;
	color: ${getCommentCountColour(isOnwardContent)};
`;

const svgStyles = (isOnwardContent?: boolean) => css`
	svg {
		margin-bottom: -5px;
		height: 14px;
		width: 14px;
		margin-right: 2px;
		fill: ${getCommentCountColour(isOnwardContent)};
	}
`;

const longStyles = css`
	display: block;

	${between.leftCol.and.wide} {
		display: none;
	}
`;

const shortStyles = css`
	display: none;

	${between.leftCol.and.wide} {
		display: block;
	}
`;

export const CardCommentCount = ({
	containerPalette,
	discussionApiUrl,
	discussionId,
	isOnwardContent,
}: Props) => {
	const count = useCommentCount(discussionApiUrl, discussionId);

	const { long, short } = formatCount(count);
	return (
		<ContainerOverrides containerPalette={containerPalette}>
			<div css={containerStyles(isOnwardContent)}>
				<div css={svgStyles(isOnwardContent)}>
					<CommentIcon />
				</div>
				<div css={longStyles}>{long}</div>
				<div css={shortStyles} aria-hidden="true">
					{short}
				</div>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					{' '}
					comments
				</span>
			</div>
		</ContainerOverrides>
	);
};
