import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { neutral } from '@guardian/source-foundations';
import { decidePalette } from '../../../lib/decidePalette';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	transparent?: boolean;
};

const cardStyles = (
	format: ArticleFormat,
	palette?: Palette,
	containerType?: DCRContainerType,
) => {
	const cardPalette = palette ?? decidePalette(format);
	const baseCardStyles = css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		/* We absolutely position the faux link
		so this is required here */
		position: relative;

		/* Styling for top bar */
		:before {
			background-color: ${cardPalette.topBar.card};
			content: '';
			height: ${containerType === 'dynamic/package' ? '4px' : '2px'};
			z-index: 2;
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
		background-color: ${cardPalette.background.card};
	`;

	if (format.theme === ArticleSpecial.SpecialReport) {
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

export const CardWrapper = ({
	children,
	format,
	containerPalette,
	containerType,
	transparent,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<div
			css={[
				cardStyles(format, palette, containerType),
				transparent &&
					css`
						background: transparent;
					`,
			]}
		>
			{children}
		</div>
	);
};
