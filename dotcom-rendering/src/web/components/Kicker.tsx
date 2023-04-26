import { css } from '@emotion/react';
import { between, from, until } from '@guardian/source-foundations';
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
	sizeOnMobile?: SmallHeadlineSize;
};

const kickerStyles = (colour: string) => css`
	color: ${colour};
	font-weight: 700;
	margin-right: 4px;
`;

const actionWrapperStyles = css`
	font-weight: 700;
`;

const kickerLabelStyles = (palette: Palette) => css`
	background-color: ${palette.background.kickerLabel};
	color: ${palette.text.kickerLabel};
	box-decoration-break: clone;
	line-height: 115%;
	font-weight: 700;
	margin-right: 4px;
`;

const actionKickerFontStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'ginormous':
			return css`
				margin-top: -7px;
				margin-bottom: 7px;
				span {
					padding: 3px 5px 4px 5px;
					font-size: 20px;
					${from.desktop} {
						font-size: 34px;
					}
				}
			`;
		case 'huge':
			return css`
				margin-bottom: 2.5px;
				margin-top: -3px;
				span {
					font-size: 20px;
					padding: 2px 5px 3px 5px;
				}
			`;
		case 'large':
			return css`
				margin-bottom: 2px;
				margin-top: -2px;
				span {
					font-size: 17px;
					padding: 1px 4px 2px 4px;
				}
			`;
		case 'medium':
			return css`
				margin-bottom: 1px;
				margin-top: -1px;
				span {
					font-size: 15px;
					padding: 1px 4px 2px 4px;
				}
			`;
		case 'small':
			return css`
				margin-top: -1px;
				margin-bottom: 1.5px;
				span {
					font-size: 14px;
					padding: 0 3px 1px 3px;
				}
			`;
		case 'tiny':
			return css`
				margin-top: -1px;
				margin-bottom: 1px;
				span {
					font-size: 12px;
					padding: 0px 2px 0px 2px;
				}
			`;
	}
};

const actionKickerFontStylesOnMobile = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'ginormous':
			return css`
				${until.mobileLandscape} {
					margin-top: -6px;
					margin-bottom: 6px;
					span {
						font-size: 24px;
					}
				}
				${between.mobileLandscape.and.desktop} {
					margin-top: -6px;
					margin-bottom: 6px;
					span {
						font-size: 28px;
					}
				}
			`;
		case 'huge':
			return css`
				${until.desktop} {
					margin-bottom: 2.5px;
					margin-top: -2px;
				}
				span {
					${until.desktop} {
						padding: 1px 4px 2px 4px;
						font-size: 17px;
					}
				}
			`;
		case 'large':
			return css`
				${until.desktop} {
					margin-bottom: 1px;
					margin-top: -1px;
				}
				span {
					${until.desktop} {
						padding: 1px 4px 2px 4px;
						font-size: 15px;
					}
				}
			`;
		case 'medium':
			return css`
				${until.desktop} {
					margin-top: -1px;
					margin-bottom: 1px;
				}
				span {
					${until.desktop} {
						padding: 0 3px 1px 3px;
						font-size: 14px;
					}
				}
			`;
		default:
			return undefined;
	}
};

export const Kicker = ({
	text,
	color,
	showPulsingDot,
	hideLineBreak,
	isAction,
	format,
	size = 'medium',
	sizeOnMobile,
}: Props) => {
	const palette = decidePalette(format);

	if (isAction) {
		return (
			<div
				css={[
					actionWrapperStyles,
					actionKickerFontStyles(size),
					actionKickerFontStylesOnMobile(sizeOnMobile ?? size),
				]}
			>
				<span css={[[kickerLabelStyles(palette)]]}>{text}</span>
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
