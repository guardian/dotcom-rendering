import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { FontWeight } from '@guardian/source/foundations';
import { from, headline, space, textSans } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { palette } from '../palette';

const fontStyles = ({
	format,
	fontWeight,
}: {
	format: ArticleFormat;
	fontWeight: FontWeight;
}) => css`
	${format.display === ArticleDisplay.Immersive
		? headline.small({ fontWeight: 'light', lineHeight: 'tight' })
		: headline.xsmall({ fontWeight, lineHeight: 'tight' })}

	${from.tablet} {
		${format.display === ArticleDisplay.Immersive
			? headline.medium({ fontWeight: 'light', lineHeight: 'tight' })
			: headline.small({ fontWeight, lineHeight: 'tight' })}
	}

	/** Labs uses sans text */
	${format.theme === ArticleSpecial.Labs &&
	css`
		${format.display === ArticleDisplay.Immersive
			? textSans.xxlarge({ fontWeight: 'light', lineHeight: 'tight' })
			: textSans.xlarge({ fontWeight, lineHeight: 'tight' })}

		${from.tablet} {
			${format.display === ArticleDisplay.Immersive
				? textSans.xxxlarge({
						fontWeight: 'light',
						lineHeight: 'tight',
				  })
				: textSans.xxlarge({ fontWeight, lineHeight: 'tight' })}
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

const paddingStyles = (topPadding: boolean) => css`
	padding-top: ${topPadding ? space[2] : 0}px;
	padding-bottom: ${space[0]}px;
	${from.tablet} {
		padding-bottom: ${space[1]}px;
	}
`;
const subheadingStyles = (format: ArticleFormat) => {
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
