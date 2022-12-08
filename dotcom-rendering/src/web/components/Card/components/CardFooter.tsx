import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { space, textSans } from '@guardian/source-foundations';
import {
	SvgAudio,
	SvgCamera,
	SvgVideo,
} from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { DCRContainerPalette } from '../../../../types/front';
import type { Palette } from '../../../../types/palette';
import { decidePalette } from '../../../lib/decidePalette';
import { formatTime } from '../../../lib/formatTime';

type Props = {
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	displayLines?: boolean;
	age?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	supportingContent?: JSX.Element;
	mediaDuration?: number;
};

const spaceBetween = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const margins = css`
	margin-top: 3px;
	margin-bottom: 3px;
`;

const flexEnd = css`
	display: flex;
	justify-content: flex-end;
`;

const mediaStyles = css`
	margin-left: ${space[1]}px;

	display: flex;
	flex-direction: row;
	align-items: center;
`;

const iconStyles = (palette: Palette) => {
	return css`
		width: 1.5rem;
		height: 1.5rem;
		display: inline-block;
		background-color: ${palette.fill.cardFooterIconBackground};
		border-radius: 50%;
	`;
};

const durationStyles = (palette: Palette) => {
	return css`
		${textSans.xxsmall({ fontWeight: 'bold' })}
		color: ${palette.text.cardMediaFooter};
		margin-left: 3px;
	`;
};

const MediaMeta = ({
	format,
	containerPalette,
	mediaDuration,
}: {
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	mediaDuration?: number;
}) => {
	const palette = decidePalette(format, containerPalette);

	switch (format.design) {
		case ArticleDesign.Gallery:
			return (
				<div css={mediaStyles}>
					<span css={iconStyles(palette)}>
						<SvgCamera />
					</span>
				</div>
			);
		case ArticleDesign.Audio:
			return (
				<div css={mediaStyles}>
					<span css={iconStyles(palette)}>
						<SvgAudio />
					</span>
				</div>
			);
		case ArticleDesign.Video:
			return (
				<div css={mediaStyles}>
					<span css={iconStyles(palette)}>
						<SvgVideo />
					</span>
					{!!mediaDuration && (
						<span css={durationStyles(palette)}>
							{formatTime(mediaDuration)}
						</span>
					)}
				</div>
			);
		default:
			return null;
	}
};

export const CardFooter = ({
	format,
	containerPalette,
	displayLines,
	age,
	commentCount,
	cardBranding,
	supportingContent,
	mediaDuration,
}: Props) => {
	const palette = decidePalette(format, containerPalette);

	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer css={margins}>{cardBranding}</footer>;
	}

	const isMedia =
		format.design === ArticleDesign.Gallery ||
		format.design === ArticleDesign.Audio ||
		format.design === ArticleDesign.Video;

	if (
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter
	) {
		return (
			<footer css={margins}>
				{supportingContent}
				<div css={spaceBetween}>
					{age}
					{displayLines && (
						<StraightLines
							cssOverrides={css`
								/* Fill the space */
								flex: 1;
								align-self: flex-end;
							`}
							color={palette.border.lines}
							count={4}
						/>
					)}
					{commentCount}
				</div>
			</footer>
		);
	}

	if (age) {
		return (
			<footer css={margins}>
				{supportingContent}
				<div css={spaceBetween}>
					{age}
					{commentCount}
				</div>
			</footer>
		);
	}

	return (
		<footer css={margins}>
			{supportingContent}
			<div css={isMedia ? spaceBetween : flexEnd}>
				{isMedia && (
					<MediaMeta format={format} mediaDuration={mediaDuration} />
				)}
				<>{commentCount}</>
			</div>
		</footer>
	);
};
