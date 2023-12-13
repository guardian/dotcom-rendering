import { css } from '@emotion/react';
import { between, textSans } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { formatCount } from '../lib/formatCount';
import { useCommentCount } from '../lib/useCommentCount';
import { palette as themePalette } from '../palette';
import CommentIcon from '../static/icons/comment.svg';
import type { DCRContainerPalette } from '../types/front';
import type { Palette } from '../types/palette';

type Props = {
	containerPalette?: DCRContainerPalette;
	format: ArticleFormat;
	discussionApiUrl: string;
	discussionId: string;
	isDynamo?: true;
	isOnwardContent?: boolean;
};

const getCommentCountColour = (
	palette: Palette,
	isDynamo?: boolean,
	isOnwardContent?: boolean,
) => {
	if (isDynamo) {
		return themePalette('--card-headline-trail-text');
	} else if (isOnwardContent) {
		return themePalette('--card-footer-onwards-content');
	} else {
		return palette.text.cardFooter;
	}
};

const containerStyles = (
	palette: Palette,
	isDynamo?: boolean,
	isOnwardContent?: boolean,
) => css`
	display: flex;
	flex-direction: row;
	${textSans.xxsmall({ lineHeight: 'tight' })};
	margin-top: -4px;
	padding-left: 5px;
	padding-right: 5px;
	color: ${getCommentCountColour(palette, isDynamo, isOnwardContent)};
`;

const svgStyles = (
	palette: Palette,
	isDynamo?: boolean,
	isOnwardContent?: boolean,
) => css`
	svg {
		margin-bottom: -5px;
		height: 14px;
		width: 14px;
		margin-right: 2px;
		fill: ${getCommentCountColour(palette, isDynamo, isOnwardContent)};
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
	format,
	containerPalette,
	discussionApiUrl,
	discussionId,
	isDynamo,
	isOnwardContent,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	const count = useCommentCount(discussionApiUrl, discussionId);

	const { long, short } = formatCount(count);
	return (
		<div css={containerStyles(palette, isDynamo, isOnwardContent)}>
			<div css={svgStyles(palette, isDynamo, isOnwardContent)}>
				<CommentIcon />
			</div>
			<div css={longStyles} aria-hidden="true">
				{long}
			</div>
			<div css={shortStyles} aria-hidden="true">
				{short}
			</div>
		</div>
	);
};
