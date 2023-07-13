import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import {
	from,
	neutral,
	palette as sourcePalette,
} from '@guardian/source-foundations';
import type { CSSProperties } from 'react';
import { decidePalette } from '../../../lib/decidePalette';
import type {
	DCRContainerPalette,
	DCRContainerType,
} from '../../../types/front';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	/** The first card in a dynamic package is ”Dynamo” and gets special styling */
	isDynamo?: true;
};

const baseCardStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	/* We absolutely position the faux link
		so this is required here */
	position: relative;

	:hover .image-overlay {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		left: 0;
		background-color: ${neutral[7]};
		opacity: 0.1;
	}

	:hover {
		filter: brightness(var(--brightness, 100%));
		background-color: var(--color, inherit);
	}

	/* a tag specific styles */
	color: inherit;
	text-decoration: none;
`;

/* Styling for top bar */
const topBarStyles = css`
	position: absolute;
	height: calc(1px * var(--height, 1));
	background-color: var(--top-bar, transparent);
	z-index: 2;
	width: calc(100% - 20px);
`;

const decidePaletteBrightness = (palette: DCRContainerPalette) => {
	switch (palette) {
		case 'EventPalette':
			return `96%`;
		case 'EventAltPalette':
		case 'LongRunningAltPalette':
		case 'SpecialReportAltPalette':
			return `95%`;
		case 'Branded':
		case 'InvestigationPalette':
		case 'MediaPalette':
		case 'PodcastPalette':
		case 'SombrePalette':
			return `90%`;
		case 'BreakingPalette':
		case 'SombreAltPalette':
			return `85%`;
		case 'LongRunningPalette':
			return `84%`;
	}
};

const cardStyles = (
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
): CSSProperties => {
	if (containerPalette) {
		return {
			'--brightness': decidePaletteBrightness(containerPalette),
		};
	}

	if (
		format.theme === ArticleSpecial.SpecialReport ||
		format.theme === ArticleSpecial.SpecialReportAlt
	) {
		return { '--brightness': '90%' };
	}

	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			/* TODO: This colour is hard coded here because it does not yet
                           exist in source-foundations. Once it's been added, please
                           remove this. @siadcock is aware. */
			return { '--color': '#fdf0e8' };

		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.LiveBlog:
			return { '--brightness': '90%' };
		default:
			return { '--color': sourcePalette.neutral[93] };
	}
};

const dynamoStyles = css`
	${from.phablet} {
		width: 25%;
	}
`;

export const CardWrapper = ({
	children,
	format,
	containerPalette,
	containerType,
	isDynamo,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<>
			<div
				style={{
					'--top-bar': isDynamo
						? palette.text.dynamoKicker
						: palette.topBar.card,
					'--height': containerType === 'dynamic/package' ? 4 : 1,
				}}
				css={[topBarStyles, isDynamo && dynamoStyles]}
			></div>
			<div
				style={{
					...cardStyles(format, containerPalette),
					backgroundColor: isDynamo
						? 'transparent'
						: palette.background.card,
				}}
				css={baseCardStyles}
			>
				{children}
			</div>
		</>
	);
};
