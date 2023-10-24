import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import { headline, remSpace } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { withDefault } from '@guardian/types';
import { maybeRender } from 'lib';
import { text } from 'palette';
import type { ReactNode } from 'react';
import { getHref } from 'renderer';
import { darkModeCss } from 'styles';

export const defaultStyles = (format: ArticleFormat): SerializedStyles => css`
	${headline.xxxsmall({ fontStyle: 'italic' })}
	margin-top: ${remSpace[2]};
	margin-block-end: 1rem;
	color: ${text.byline(format)};

	${darkModeCss`
        color: ${text.bylineDark(format)};
    `}
`;

export const defaultAnchorStyles = (
	format: ArticleFormat,
): SerializedStyles => css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	font-style: normal;
	color: ${text.bylineAnchor(format)};
	text-decoration: none;

	${darkModeCss`
        color: ${text.bylineAnchorDark(format)};
    `}
`;

const titleOrLocationStyle = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.byline(format)};
	${darkModeCss`
        color: ${text.bylineDark(format)};
    `}
`;

export const hasLocationOrTitleInfo = (bylineHtml: Option<DocumentFragment>) =>
	bylineHtml.kind === 0 && bylineHtml.value.lastChild?.nodeName === '#text'
		? true
		: false;

export const toReact = (
	format: ArticleFormat,
	anchorStyles: SerializedStyles,
) => {
	return function getReactNode(node: Node, index: number): ReactNode {
		switch (node.nodeName) {
			case 'A':
				return (
					<a
						href={withDefault('')(getHref(node))}
						css={anchorStyles}
						key={`anchor-${index}`}
					>
						{node.textContent ?? ''}
					</a>
				);
			case 'SPAN':
				return Array.from(node.childNodes).map(
					toReact(format, anchorStyles),
				);
			case '#text':
				return format.design === ArticleDesign.DeadBlog ||
					format.design === ArticleDesign.LiveBlog ? (
					<span css={titleOrLocationStyle(format)}>
						{node.textContent}
					</span>
				) : (
					<div css={titleOrLocationStyle(format)}>
						{node.textContent ?? ''}
					</div>
				);
		}
	};
};

export const renderText = (
	format: ArticleFormat,
	byline: DocumentFragment,
	anchorStyles: SerializedStyles,
): ReactNode =>
	Array.from(byline.childNodes).map((node, i) => {
		return toReact(format, anchorStyles)(node, i);
	});

interface DefaultProps {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
	styles: SerializedStyles;
	anchorStyles: SerializedStyles;
}
export const DefaultByline: React.FC<DefaultProps> = ({
	bylineHtml,
	styles,
	anchorStyles,
	format,
}) => {
	return maybeRender(bylineHtml, (byline) => (
		<>
			<address css={styles}>
				{renderText(format, byline, anchorStyles)}
			</address>
		</>
	));
};
