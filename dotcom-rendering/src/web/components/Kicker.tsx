import { css } from '@emotion/react';
import type { FontScaleArgs } from '@guardian/source-foundations';
import { between, from, headline, until } from '@guardian/source-foundations';
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

const actionWrapperStyles = () => {
	return css``;
};

const tagStyles = (palette: Palette) => css`
	background-color: ${palette.background.kickerLabel};
	color: ${palette.text.kickerLabel};
	-webkit-box-decoration-break: clone;
	box-decoration-break: clone;
	line-height: 115%;
	font-weight: 700;
	margin-right: 4px;
`;

const fontStyles = (size: SmallHeadlineSize) => {
	const options: FontScaleArgs = { fontWeight: 'bold' };
	switch (size) {
		case 'ginormous':
			return css`
				span {
					${from.desktop} {
						font-size: 50px;
						font-weight: 700;
						padding: 3px 5px 4px 5px;
					}
				}
			`;
		case 'huge':
			return css`
				span {
					${headline.xxsmall(options)};
					font-weight: 700;
					padding: 3px 5px 4px 5px;
				}
			`;
		case 'large':
			return css`
				span {
					${headline.xxxsmall(options)};
					font-weight: 700;
					padding: 2px 5px 3px 5px;
				}
			`;
		case 'medium':
			return css`
				span {
					font-size: 15px;
					font-weight: 700;
					padding: 2px 4px 2px 4px;
				}
			`;
		case 'small':
			return css`
				span {
					font-size: 14px;
					font-weight: 700;
					padding: 2px 4px 2px 4px;
				}
			`;
		case 'tiny':
			return css`
				span {
					font-size: 12px;
					font-weight: 700;
					padding: 2px 4px 2px 4px;
				}
			`;
	}
};

const fontStylesOnMobile = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'ginormous':
			return css`
				span {
					${until.mobileLandscape} {
						${headline.xsmall()};
						font-weight: 700;
					}
					${between.mobileLandscape.and.desktop} {
						${headline.small()};
						font-weight: 700;
					}
				}
			`;
		case 'huge':
			return css`
				span {
					${until.desktop} {
						${headline.xxxsmall()};
						font-weight: 700;
					}
				}
			`;
		case 'large':
			return css`
				span {
					${until.desktop} {
						font-weight: 700;
						font-size: 15px;
					}
				}
			`;
		case 'medium':
			return css`
				span {
					${until.desktop} {
						font-weight: 700;
						font-size: 15px;
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
					actionWrapperStyles(),
					fontStyles(size),
					fontStylesOnMobile(sizeOnMobile ?? size),
				]}
			>
				<span
					css={[
						[tagStyles(palette)],
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
