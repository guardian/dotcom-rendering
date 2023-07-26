import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { from, neutral } from '@guardian/source-foundations';
import { decidePalette } from '../../../lib/decidePalette';
import type { DCRContainerPalette } from '../../../types/front';
import type { Palette } from '../../../types/palette';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	/** The first card in a dynamic package is ”Dynamo” and gets special styling */
	isDynamo?: true;
};

const cardStyles = (
	format: ArticleFormat,
	palette: Palette,
	isDynamo?: true,
	containerPalette?: DCRContainerPalette,
) => {
	const baseCardStyles = css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		/* We absolutely position the faux link
		so this is required here */
		position: relative;

		/* Target Safari 10.1 */
		/* https://www.browserstack.com/guide/create-browser-specific-css */
		@media not all and (min-resolution: 0.001dpcm) {
			@supports (-webkit-appearance: none) and
				(not (stroke-color: transparent)) {
				display: grid;
				grid-auto-rows: min-content;
				align-content: start;
			}
		}

		:hover .image-overlay {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			left: 0;
			background-color: ${neutral[7]};
			opacity: 0.1;
		}

		/* a tag specific styles */
		color: inherit;
		text-decoration: none;
		background-color: ${isDynamo ? 'transparent' : palette.background.card};
	`;

	const decidePaletteBrightness = (thePalette: DCRContainerPalette) => {
		switch (thePalette) {
			case 'EventPalette':
				return `96%`;
			case 'BreakingPalette':
				return `85%`;
			case 'EventAltPalette':
				return `95%`;
			case 'InvestigationPalette':
				return `90%`;
			case 'LongRunningPalette':
				return `84%`;
			case 'LongRunningAltPalette':
				return `95%`;
			case 'SombrePalette':
				return `90%`;
			case 'SombreAltPalette':
				return `85%`;
			case 'SpecialReportAltPalette':
				return `95%`;
			default:
				return `90%`;
		}
	};
	if (containerPalette) {
		return css`
			${baseCardStyles};
			:hover {
				filter: brightness(
					${decidePaletteBrightness(containerPalette)}
				);
			}
		`;
	}

	if (
		format.theme === ArticleSpecial.SpecialReport ||
		format.theme === ArticleSpecial.SpecialReportAlt
	) {
		return css`
			${baseCardStyles};
			:hover {
				filter: brightness(90%);
			}
		`;
	}

	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return css`
				${baseCardStyles};
				:hover {
					/* TODO: This colour is hard coded here because it does not yet
                           exist in source-foundations. Once it's been added, please
                           remove this. @siadcock is aware. */
					/* stylelint-disable-next-line color-no-hex */
					background-color: #fdf0e8;
				}
			`;
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.LiveBlog:
			return css`
				${baseCardStyles};
				:hover {
					filter: brightness(90%);
				}
			`;
		default:
			return css`
				${baseCardStyles};
				:hover {
					background-color: ${neutral[93]};
				}
			`;
	}
};

const topBarStyles = ({
	isDynamo,
	palette,
}: {
	isDynamo?: true;
	palette: Palette;
}) => {
	/* Styling for top bar */
	const baseStyles = css`
		background-color: ${isDynamo
			? palette.text.dynamoKicker
			: palette.topBar.card};
		content: '';
		height: 1px;
		z-index: 2;
		width: 100%;
	`;

	if (isDynamo) {
		return css`
			:before {
				${baseStyles}
				${from.phablet} {
					width: 25%;
				}
			}
		`;
	}
	return css`
		:before {
			${baseStyles}
		}
	`;
};

export const CardWrapper = ({
	children,
	format,
	containerPalette,
	isDynamo,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<div
			css={[
				cardStyles(format, palette, isDynamo, containerPalette),
				topBarStyles({ isDynamo, palette }),
			]}
		>
			{children}
		</div>
	);
};
