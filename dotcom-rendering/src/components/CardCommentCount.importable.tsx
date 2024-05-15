import { css } from '@emotion/react';
import {
	between,
	visuallyHidden,
	textSans12,
} from '@guardian/source-foundations';
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
	isDynamo?: true;
	isOnwardContent?: boolean;
};

const getCommentCountColour = (
	isDynamo?: boolean,
	isOnwardContent?: boolean,
) => {
	if (isDynamo) {
		return themePalette('--card-headline-trail-text');
	} else if (isOnwardContent) {
		return themePalette('--card-footer-onwards-content');
	} else {
		return themePalette('--card-footer-text');
	}
};

const containerStyles = (isDynamo?: boolean, isOnwardContent?: boolean) => css`
	display: flex;
	flex-direction: row;
	${textSans12};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	*/
	line-height: 1.15;
	margin-top: -4px;
	padding-left: 5px;
	padding-right: 5px;
	color: ${getCommentCountColour(isDynamo, isOnwardContent)};
`;

const svgStyles = (isDynamo?: boolean, isOnwardContent?: boolean) => css`
	svg {
		margin-bottom: -5px;
		height: 14px;
		width: 14px;
		margin-right: 2px;
		fill: ${getCommentCountColour(isDynamo, isOnwardContent)};
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
	isDynamo,
	isOnwardContent,
}: Props) => {
	const count = useCommentCount(discussionApiUrl, discussionId);

	const { long, short } = formatCount(count);
	return (
		<ContainerOverrides
			containerPalette={containerPalette}
			isDynamo={!!isDynamo}
		>
			<div css={containerStyles(isDynamo, isOnwardContent)}>
				<div css={svgStyles(isDynamo, isOnwardContent)}>
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
