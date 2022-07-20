// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import { brandAltText, neutral, text } from '@guardian/source-foundations';
import { textSans } from '@guardian/source-foundations';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import type { FC, ReactNode } from 'react';
import { fill } from '@guardian/common-rendering/src/editorialPalette';
import { darkModeCss } from '@guardian/common-rendering/src/lib';

// ----- Sub-Components ----- //

interface TriangleProps {
	format: ArticleFormat;
	supportsDarkMode: boolean;
}

const triangleStyles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => css`
	fill: ${fill.icon(format)};
	height: 0.8em;
	padding-right: ${remSpace[1]};

	${darkModeCss(supportsDarkMode)`
        fill: ${fill.iconDark(format)};
    `}
`;

const Triangle: FC<TriangleProps> = ({ format, supportsDarkMode }) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return null;
		default:
			return (
				<svg
					css={triangleStyles(format, supportsDarkMode)}
					viewBox="0 0 10 9"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polygon points="0,9 5,0 10,9" />
				</svg>
			);
	}
};

// ----- Component ----- //

type Props = {
	format: ArticleFormat;
	supportsDarkMode: boolean;
	children: Option<ReactNode>;
	className?: string;
	css?: SerializedStyles;
};

const styles = (supportsDarkMode: boolean) => css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	padding-top: ${remSpace[1]};
	color: ${text.supporting};

	${darkModeCss(supportsDarkMode)`
    color: ${brandAltText.supporting};
  `}
`;

const mediaStyles = (supportsDarkMode: boolean) => css`
	color: ${neutral[86]};

	${darkModeCss(supportsDarkMode)`
    color: ${neutral[86]};
  `}
`;

const getStyles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return css(
				styles(supportsDarkMode),
				mediaStyles(supportsDarkMode),
				css`
					h2,
					span,
					a,
					& {
						color: ${neutral[100]};
					}

					> span {
						font-size: 0.8125rem;
						line-height: 1.125rem;
					}

					> h2 {
						font-size: 1.0625rem;
					}
				`,
			);
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return css(styles(supportsDarkMode), mediaStyles(supportsDarkMode));
		default:
			return styles(supportsDarkMode);
	}
};

const FigCaption: FC<Props> = ({ format, supportsDarkMode, children }) => {
	switch (children.kind) {
		case OptionKind.Some:
			return (
				<figcaption css={getStyles(format, supportsDarkMode)}>
					<Triangle
						format={format}
						supportsDarkMode={supportsDarkMode}
					/>
					{children.value}
				</figcaption>
			);

		default:
			return null;
	}
};

// ----- Exports ----- //

export default FigCaption;
