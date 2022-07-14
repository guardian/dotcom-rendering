import { css } from '@emotion/react';
import { between, textSans } from '@guardian/source-foundations';
import CommentIcon from '../../static/icons/comment.svg';
import type { DCRContainerPalette } from '../../types/front';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	containerPalette?: DCRContainerPalette;
	format: ArticleFormat;
	short: string;
	long: string;
	isDynamo?: true;
};

const containerStyles = (palette: Palette, isDynamo?: boolean) => css`
	display: flex;
	flex-direction: row;
	${textSans.xxsmall({ lineHeight: 'tight' })};
	margin-top: -4px;
	padding-left: 5px;
	padding-right: 5px;
	color: ${isDynamo ? palette.text.dynamoHeadline : palette.text.cardFooter};
`;

const svgStyles = (palette: Palette, isDynamo?: boolean) => css`
	svg {
		margin-bottom: -5px;
		height: 14px;
		width: 14px;
		margin-right: 2px;
		fill: ${isDynamo
			? palette.text.dynamoHeadline
			: palette.text.cardFooter};
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
	format,
	short,
	long,
	isDynamo,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<div css={containerStyles(palette, isDynamo)}>
			<div css={svgStyles(palette, isDynamo)}>
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
