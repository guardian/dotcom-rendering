import { css } from '@emotion/react';
import { between, textSans } from '@guardian/source-foundations';
import CommentIcon from '../../static/icons/comment.svg';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	containerPalette?: DCRContainerPalette;
	format: ArticleFormat;
	short: string;
	long: string;
};

const containerStyles = (palette: Palette) => css`
	display: flex;
	flex-direction: row;
	${textSans.xxsmall()};
	padding-left: 5px;
	padding-right: 5px;
	color: ${palette.text.cardFooter};
`;

const svgStyles = (palette: Palette) => css`
	svg {
		margin-bottom: -5px;
		height: 14px;
		width: 14px;
		margin-right: 2px;
		fill: ${palette.text.cardFooter};
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
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<div css={containerStyles(palette)}>
			<div css={svgStyles(palette)}>
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
