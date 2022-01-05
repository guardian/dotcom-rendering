// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import {
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
import { darkModeCss } from 'styles';
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
	const { kicker, link, inverted } = getThemeStyles(format.theme);

	if (format.theme === ArticleSpecial.Labs) {
		return labsStyles;
	}

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return css(blogStyles, blogColor(neutral[100], link, inverted));
		case ArticleDesign.DeadBlog:
			return css(blogStyles, blogColor(link, link, neutral[93]));
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return commentStyles(kicker);
		default:
			return styles(kicker);
	}
};

const getAnchorStyles = (format: ArticleFormat): SerializedStyles => {
	const { kicker, inverted, link } = getThemeStyles(format.theme);
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
			return css(blogAnchorStyles, blogColor(link, link, inverted));
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return commentAnchorStyles(kicker, inverted);

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

const renderText = (
	format: ArticleFormat,
	byline: DocumentFragment,
): ReactNode =>
	Array.from(byline.childNodes).map((node, i) => toReact(format)(node, i));

const Byline: FC<Props> = ({ bylineHtml, ...format }) =>
	pipe(
		bylineHtml,
		map((byline) => (
			<address css={getStyles(format)}>
				{renderText(format, byline)}
			</address>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Byline;
