// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import {
	brandAlt,
	from,
	headline,
	labs,
	neutral,
	textSans,
} from '@guardian/source-foundations';
import { map, withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import { pipe } from 'lib';
import type { FC, ReactElement, ReactNode } from 'react';
import { getHref } from 'renderer';
import { articleWidthStyles, darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props extends ArticleFormat {
	bylineHtml: Option<DocumentFragment>;
}

const styles = (kicker: string): SerializedStyles => css`
	${headline.xxxsmall({ fontStyle: 'italic' })}
	color: ${kicker};

	${darkModeCss`
        color: ${neutral[60]};
    `}
`;

const anchorStyles = (
	kicker: string,
	inverted: string,
): SerializedStyles => css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	font-style: normal;
	color: ${kicker};
	text-decoration: none;

	${darkModeCss`
        color: ${inverted};
    `}
`;

const blogColor = (
	color: string,
	link: string,
	inverted: string,
): SerializedStyles => css`
	color: ${color};
	${from.desktop} {
		color: ${link};
	}

	${darkModeCss`
		color: ${neutral[93]};
		${from.desktop} {
			color: ${inverted};
		}
	`}
`;

const blogAnchorStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	font-style: normal;
	text-decoration: none;
`;

const commentStyles = (kicker: string): SerializedStyles => css`
	color: ${kicker};
	width: 75%;
	${headline.medium({ fontWeight: 'light', fontStyle: 'italic' })}
`;

const interviewStyles = (format: ArticleFormat): SerializedStyles => css`
${articleWidthStyles};
${format.theme === ArticleSpecial.Labs
	? textSans.large({ lineHeight: 'regular' })
	: headline.xxsmall({
			fontWeight: 'regular',
			lineHeight: 'loose',
	  })}
font-style: italic;
background-color: ${brandAlt[400]};
box-shadow: 4px 0 0 ${brandAlt[400]},
	-6px 0 0 ${brandAlt[400]};
display: inline-block;
box-decoration-break: clone;

a {
	color: inherit;
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
}
`;
const commentAnchorStyles = (
	kicker: string,
	inverted: string,
): SerializedStyles => css`
	color: ${kicker};
	text-decoration: none;

	${darkModeCss`
        color: ${inverted};
    `}
`;

const interviewAnchorStyles = (
	kicker: string
): SerializedStyles => css`
	color: ${kicker};
	text-decoration: none;

`;


const labsStyles = css`
	${textSans.medium({ lineHeight: 'regular', fontStyle: 'italic' })}
	color: ${labs[300]};

	${darkModeCss`
        color: ${labs[400]};
    `}
`;

const blogStyles = css`
	${headline.xxxsmall({ lineHeight: 'regular', fontStyle: 'italic' })}
`;

const labsAnchorStyles = css`
	font-weight: bold;
	color: ${labs[300]};
	font-style: normal;
	text-decoration: none;

	${darkModeCss`
        color: ${labs[400]};
    `}
`;

const getStyles = (format: ArticleFormat): SerializedStyles => {
	const bylineLeftColumn = text.bylineLeftColumn(format);
	const bylineInline = text.bylineInline(format);
	const bylineDark = text.bylineDark(format);

	if (format.theme === ArticleSpecial.Labs) {
		return labsStyles;
	}

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return css(
				blogStyles,
				blogColor(neutral[100], bylineLeftColumn, bylineDark),
				darkModeCss`
					color: ${neutral[86]};
				`,
			);
		case ArticleDesign.DeadBlog:
			return css(
				blogStyles,
				blogColor(bylineInline, bylineLeftColumn, neutral[86]),
			);
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return commentStyles(bylineLeftColumn);
		case ArticleDesign.Interview:
			return interviewStyles(format);
		default:
			return styles(bylineLeftColumn);
	}
};

const getAnchorStyles = (format: ArticleFormat): SerializedStyles => {
	const { kicker, inverted, link } = getThemeStyles(format.theme);
	const bylineLeftColumn = text.bylineLeftColumn(format);
	const bylineInline = text.bylineInline(format);
	const bylineDark = text.bylineDark(format);

	if (format.theme === ArticleSpecial.Labs) {
		return labsAnchorStyles;
	}
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return css(
				blogAnchorStyles,
				blogColor(neutral[100], link, inverted),
			);
		case ArticleDesign.DeadBlog:
			return css(
				blogAnchorStyles,
				blogColor(bylineInline, bylineLeftColumn, bylineDark),
			);
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return commentAnchorStyles(kicker, inverted);
		case ArticleDesign.Interview:
			return interviewAnchorStyles(kicker);

		default:
			return anchorStyles(kicker, inverted);
	}
};

const toReact = (format: ArticleFormat) => {
	return function getReactNode(node: Node, index: number): ReactNode {
		switch (node.nodeName) {
			case 'A':
				return (
					<a
						href={withDefault('')(getHref(node))}
						css={getAnchorStyles(format)}
						key={`anchor-${index}`}
					>
						{node.textContent ?? ''}
					</a>
				);
			case 'SPAN':
				return Array.from(node.childNodes).map(toReact(format));
			case '#text':
				return node.textContent;
		}
	};
};

export const renderText = (
	format: ArticleFormat,
	byline: DocumentFragment,
): ReactNode =>
	Array.from(byline.childNodes).map((node, i) => toReact(format)(node, i));

const Byline: FC<Props> = ({ bylineHtml, ...format }) => {
	switch (format.design) {
		case ArticleDesign.Interview:
			return null;
		default:
			return pipe(
				bylineHtml,
				map((byline) => (
					<address css={getStyles(format)}>
						{renderText(format, byline)}
					</address>
				)),
				withDefault<ReactElement | null>(null),
			);
	}

	}
// ----- Exports ----- //

export default Byline;
