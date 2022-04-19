import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import {
	background,
	headline,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';
import { adStyles, darkModeCss } from 'styles';

interface ArticleBodyProps {
	className?: SerializedStyles[];
	children: ReactNode[];
	format: ArticleFormat;
}

const shouldShowDropCap = (format: ArticleFormat): boolean => {
	if (format.display === ArticleDisplay.Immersive) {
		return true;
	} else {
		switch (format.design) {
			case ArticleDesign.Interview:
			case ArticleDesign.Comment:
			case ArticleDesign.Editorial:
			case ArticleDesign.Letter:
				return true;
			default:
				return false;
		}
	}
};

const dropCapWeight = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return css`
				font-weight: 200;
			`;
		default:
			return css`
				font-weight: 700;
			`;
	}
};

const dropCap = (format: ArticleFormat): SerializedStyles => css`
	p:first-of-type:first-letter,
	hr + p:first-letter {
		${headline.large({ fontWeight: 'bold' })}
		${dropCapWeight(format)};
		color: ${text.dropCap(format)};
		float: left;
		font-size: 7.375rem;
		line-height: 6.188rem;
		vertical-align: text-top;
		pointer-events: none;
		margin-right: ${remSpace[1]};
	}
`;

const ArticleBodyStyles = (format: ArticleFormat): SerializedStyles => {
	const baseStyles = css`
		position: relative;
		clear: both;

		iframe {
			width: 100%;
			border: none;
		}

		${adStyles(format)}

		twitter-widget,
    figure[data-atom-type="explainer"] {
			margin: ${remSpace[4]} 0;
			clear: both;
			display: inline-block;
		}
	`;

	if (shouldShowDropCap(format)) {
		return css`
			${baseStyles}
			${dropCap(format)}
		`;
	} else {
		return baseStyles;
	}
};

const ArticleBodyDarkStyles: SerializedStyles = darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    figcaption {
        color: ${neutral[60]};
    }

    p:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }
`;

const ArticleBody: FC<ArticleBodyProps> = ({ className, children, format }) => {
	const classNames = className ? className : [];
	return (
		<div
			css={[
				ArticleBodyStyles(format),
				ArticleBodyDarkStyles,
				...classNames,
			]}
		>
			{children}
		</div>
	);
};

export default ArticleBody;
