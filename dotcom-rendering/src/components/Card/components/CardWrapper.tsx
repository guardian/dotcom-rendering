import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source-foundations';
import { decidePalette } from '../../../lib/decidePalette';
import { palette } from '../../../palette';
import type { DCRContainerPalette } from '../../../types/front';
import { ContainerOverrides } from '../../ContainerOverrides';
import { FormatBoundary } from '../../FormatBoundary';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	showTopBar?: boolean;
	/** The first card in a dynamic package is ”Dynamo” and gets special styling */
	isDynamo?: true;
	isOnwardContent?: boolean;
};

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
		background-color: ${sourcePalette.neutral[7]};
		opacity: 0.1;
	}

	/* a tag specific styles */
	color: inherit;
	text-decoration: none;
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

const containerPaletteStyles = (containerPalette: DCRContainerPalette) => css`
	:hover {
		filter: brightness(${decidePaletteBrightness(containerPalette)});
	}
`;
const hoverStyles = (format: ArticleFormat) => {
	if (
		format.theme === ArticleSpecial.SpecialReport ||
		format.theme === ArticleSpecial.SpecialReportAlt
	) {
		return css`
			:hover {
				filter: brightness(90%);
			}
		`;
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.LiveBlog:
			return css`
				:hover {
					filter: brightness(90%);
				}
			`;
		default:
			return css`
				:hover {
					background-color: ${palette('--card-background-hover')};
				}
			`;
	}
};

const cardStyles = css`
	background-color: ${palette('--card-background')};
`;

const onwardContentCardStyles = css`
	background-color: ${palette('--onward-journey-card-background')};
	border-radius: ${space[2]}px;
`;

const topBarStyles = ({
	isDynamo,
	format,
}: {
	isDynamo?: true;
	format: ArticleFormat;
}) => {
	/* Styling for top bar */
	const baseStyles = css`
		background-color: ${isDynamo
			? decidePalette(format).text.dynamoKicker
			: palette('--card-border-top')};
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
	showTopBar = true,
	isOnwardContent = false,
}: Props) => {
	return (
		<FormatBoundary format={format}>
			<ContainerOverrides
				containerPalette={containerPalette}
				isDynamo={!!isDynamo}
			>
				<div
					css={[
						baseCardStyles,
						hoverStyles(format),
						containerPalette &&
							containerPaletteStyles(containerPalette),
						isOnwardContent ? onwardContentCardStyles : cardStyles,
						showTopBar && topBarStyles({ isDynamo, format }),
					]}
				>
					{children}
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};
