import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import {
	from,
	headlineBold24,
	headlineBold28,
	headlineLight24,
	headlineLight28,
	headlineLight34,
	headlineMedium24,
	headlineMedium28,
	space,
	textSans24,
	textSans28,
	textSans34,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { palette } from '../palette';

const fontStyles = ({
	format,
	fontWeight,
}: {
	format: ArticleFormat;
	fontWeight: 'light' | 'medium' | 'bold';
}) => css`
	${format.display === ArticleDisplay.Immersive
		? headlineLight28
		: `
			/**
			 * Typography preset styles should not be overridden.
			 * This has been done because the styles do not directly map to the new presets.
			 * Please speak to your team's designer and update this to use a more appropriate preset.
			 */
			${fontWeight === 'light' && headlineLight24};
			${fontWeight === 'medium' && headlineMedium24};
			${fontWeight === 'bold' && headlineBold24};
		`};

	${from.tablet} {
		${format.display === ArticleDisplay.Immersive
			? headlineLight34
			: `
				/**
				 * Typography preset styles should not be overridden.
				 * This has been done because the styles do not directly map to the new presets.
				 * Please speak to your team's designer and update this to use a more appropriate preset.
				 */
				${fontWeight === 'light' && headlineLight28};
				${fontWeight === 'medium' && headlineMedium28};
				${fontWeight === 'bold' && headlineBold28};
			`};
	}

	/** Labs uses sans text */
	${format.theme === ArticleSpecial.Labs &&
	css`
		${format.display === ArticleDisplay.Immersive
			? `
				/**
				 * Typography preset styles should not be overridden.
				 * This has been done because the styles do not directly map to the new presets.
				 * Please speak to your team's designer and update this to use a more appropriate preset.
				 */
				${textSans28};
				font-weight: 300;
				line-height: 1.15;
			`
			: `
				/**
				 * Typography preset styles should not be overridden.
				 * This has been done because the styles do not directly map to the new presets.
				 * Please speak to your team's designer and update this to use a more appropriate preset.
				 */
				${textSans24};
				${fontWeight === 'light' && 'font-weight: 300;'};
				${fontWeight === 'medium' && 'font-weight: 500;'};
				${fontWeight === 'bold' && 'font-weight: 700;'};
				line-height: 1.15;
			`};

		${from.tablet} {
			${format.display === ArticleDisplay.Immersive
				? `
					/**
					 * Typography preset styles should not be overridden.
					 * This has been done because the styles do not directly map to the new presets.
					 * Please speak to your team's designer and update this to use a more appropriate preset.
					 */
					${textSans34};
					font-weight: 300;
					line-height: 1.15;
				`
				: `
					/**
					 * Typography preset styles should not be overridden.
					 * This has been done because the styles do not directly map to the new presets.
					 * Please speak to your team's designer and update this to use a more appropriate preset.
					 */
					${textSans28};
					${fontWeight === 'light' && 'font-weight: 300;'};
					${fontWeight === 'medium' && 'font-weight: 500;'};
					${fontWeight === 'bold' && 'font-weight: 700;'};
					line-height: 1.15;
				`};
		}
	`}

	color: ${palette('--subheading-text')};

	/* We don't allow additional font weight inside h2 tags except for immersive articles */
	strong {
		font-weight: ${format.display === ArticleDisplay.Immersive
			? 'bold'
			: 'inherit'};
	}
`;

export const paddingStyles = (topPadding: boolean) => css`
	padding-top: ${topPadding ? space[2] : 0}px;
	padding-bottom: ${space[0]}px;
	${from.tablet} {
		padding-bottom: ${space[1]}px;
	}
`;

export const subheadingStyles = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			/** TODO !
			 * This is temporary until https://github.com/guardian/dotcom-rendering/pull/10989 has been merged.
			 * The desired font weight is "regular" */
			return fontStyles({ format, fontWeight: 'light' });

		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return fontStyles({ format, fontWeight: 'medium' });

		case ArticleDesign.Feature:
			return fontStyles({
				format,
				fontWeight: format.theme === Pillar.News ? 'medium' : 'bold',
			});
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return fontStyles({ format, fontWeight: 'bold' });

		default:
			return fontStyles({ format, fontWeight: 'medium' });
	}
};

interface Props {
	id?: string;
	format: ArticleFormat;
	topPadding: boolean;
	children: ReactNode;
}

export const Subheading = ({ id, format, topPadding, children }: Props) => {
	return (
		<h2 id={id} css={[subheadingStyles(format), paddingStyles(topPadding)]}>
			{children}
		</h2>
	);
};
