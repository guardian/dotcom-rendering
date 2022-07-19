import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { neutral } from '@guardian/source-foundations';
import type { DCRContainerPalette } from '../../../../types/front';
import { decidePalette } from '../../../lib/decidePalette';
import { getZIndex } from '../../../lib/getZIndex';

const fauxLinkStyles = css`
	position: absolute;
	${getZIndex('card-link')};
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	opacity: 0;
`;

const linkStyles = (format: ArticleFormat, palette: Palette) => {
	const baseLinkStyles = css`
		display: flex;
		/* a tag specific styles */
		color: inherit;
		text-decoration: none;
		background-color: ${palette.background.card};

		/* The whole card is one link so we card level styles here */
		width: 100%;

		/* Sometimes a headline contains it's own link so we use the
       approach described below to deal with nested links
       See: https://css-tricks.com/nested-links/ */
		:before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
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
	`;

	if (format.theme === ArticleSpecial.SpecialReport) {
		return css`
			${baseLinkStyles};
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
				${baseLinkStyles};
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
				${baseLinkStyles};
				:hover {
					filter: brightness(90%);
				}
			`;
		default:
			return css`
				${baseLinkStyles};
				:hover {
					background-color: ${neutral[93]};
				}
			`;
	}
};

type Props = {
	linkTo: string;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	dataLinkName?: string;
};

export const CardLink = ({
	linkTo,
	format,
	containerPalette,
	dataLinkName = 'article',
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<a
			href={linkTo}
			css={[fauxLinkStyles, linkStyles(format, palette)]}
			data-link-name={dataLinkName}
		/>
	);
};
