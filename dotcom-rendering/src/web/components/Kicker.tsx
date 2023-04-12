import { css } from '@emotion/react';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';
import { PulsingDot } from './PulsingDot';

// Defines a prefix to be used with a headline (e.g. 'Live /')
type Props = {
	text: string;
	color: string;
	showPulsingDot?: boolean;
	hideLineBreak?: boolean;
	isAction?: boolean;
	format: ArticleFormat;
	size?: SmallHeadlineSize;
};

const kickerStyles = (colour: string) => css`
	color: ${colour};
	font-weight: 700;
	margin-right: 4px;
`;

const actionWrapperStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'ginormous':
			return css`
				margin-top: 2px;
				overflow: hidden;
			`;
		case 'huge':
			return css`
				margin-top: 2px;
				overflow: hidden;
			`;
		case 'large':
			return css`
				margin-top: 2px;
				overflow: hidden;
			`;
		case 'medium':
		case 'small':
		case 'tiny':
			return css`
				margin-top: 1px;
				padding-top: 2px;
				overflow: hidden;
			`;
	}
};

const actionKickerPaddingStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'ginormous':
			return css`
				padding: 3px 5px 4px 5px;
			`;
		case 'huge':
			return css`
				padding: 2px 5px 3px 5px;
			`;
		case 'large':
		case 'medium':
		case 'small':
		case 'tiny':
			return css`
				padding: 2px 4px 2px 4px;
			`;
	}
};

const tagStyles = (palette: Palette) => css`
	background-color: ${palette.background.kickerLabel};
	color: ${palette.text.kickerLabel};
	-webkit-box-decoration-break: clone;
	box-decoration-break: clone;
	line-height: 1.35em;
	font-weight: 700;
	margin-right: 4px;
`;

export const Kicker = ({
	text,
	color,
	showPulsingDot,
	hideLineBreak,
	isAction,
	format,
	size = 'medium',
}: Props) => {
	const palette = decidePalette(format);

	if (isAction) {
		return (
			<div css={actionWrapperStyles(size)}>
				<span
					css={[
						[tagStyles(palette), actionKickerPaddingStyles(size)],
						hideLineBreak &&
							css`
								display: inline-block;
							`,
					]}
				>
					{showPulsingDot && <PulsingDot colour={color} />}
					{text}
				</span>
			</div>
		);
	}

	return (
		<div
			css={[
				kickerStyles(color),
				hideLineBreak &&
					css`
						display: inline-block;
					`,
			]}
		>
			{showPulsingDot && <PulsingDot colour={color} />}
			{text}
		</div>
	);
};
