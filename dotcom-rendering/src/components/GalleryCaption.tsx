import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	between,
	from,
	headlineMedium17,
	space,
	textSans14,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import sanitise, { type IOptions } from 'sanitize-html';
import { grid } from '../grid';
import { getAttrs, parseHtml } from '../lib/domUtils';
import { palette } from '../palette';
import { Island } from './Island';
import { ShareButton } from './ShareButton.importable';

/**
 * https://www.npmjs.com/package/sanitize-html#default-options
 */
const sanitiserOptions: IOptions = {
	// We allow all tags, which includes script & style which are potentially vulnerable
	// `allowVulnerableTags: true` suppresses this warning
	allowVulnerableTags: true,
	allowedTags: false, // Leave tags from CAPI alone
	allowedAttributes: false, // Leave attributes from CAPI alone
};

const styles = css`
	${grid.column.centre}
	color: ${palette('--caption-text')};
	${textSans14}
	padding-bottom: ${space[6]}px;

	${between.tablet.and.desktop} {
		padding-left: ${space[5]}px;
		padding-right: ${space[5]}px;
	}

	${from.desktop} {
		${grid.column.right}
	}

	${from.leftCol} {
		${grid.column.left}
	}
`;

const renderTextElement = (node: Node): ReactNode => {
	const text = node.textContent?.trim() ?? '';
	const children = Array.from(node.childNodes).map(renderTextElement);

	switch (node.nodeName) {
		case 'STRONG':
			return text === '' ? null : (
				<strong
					css={css`
						display: block;
						${headlineMedium17}
						padding: ${space[1]}px 0 ${space[3]}px;
					`}
				>
					{children}
				</strong>
			);
		case 'EM':
			return text === '' ? null : <em>{children}</em>;
		case 'A': {
			const attrs = getAttrs(node);

			return (
				<a
					css={css`
						text-decoration: none;
						color: ${palette('--caption-link')};
						border-bottom: 1px solid
							${palette('--article-link-border')};

						:hover {
							border-bottom: 1px solid
								${palette('--article-link-border-hover')};
						}
					`}
					href={attrs?.getNamedItem('href')?.value}
					target={attrs?.getNamedItem('target')?.value}
					data-link-name={
						attrs?.getNamedItem('data-link-name')?.value
					}
					data-component={
						attrs?.getNamedItem('data-component')?.value
					}
				>
					{children}
				</a>
			);
		}
		case '#text':
			return node.textContent;
		default:
			return null;
	}
};

const renderText = (doc: DocumentFragment): ReactNode =>
	Array.from(doc.childNodes).map(renderTextElement);

type Props = {
	captionHtml?: string;
	credit?: string;
	displayCredit?: boolean;
	format: ArticleFormat;
	pageId: string;
	webTitle: string;
};

export const GalleryCaption = ({
	captionHtml,
	credit,
	displayCredit,
	format,
	pageId,
	webTitle,
}: Props) => {
	const emptyCaption = captionHtml === undefined || captionHtml.trim() === '';
	const hideCredit = displayCredit === false || credit === '';

	if (emptyCaption && hideCredit) {
		return null;
	}

	return (
		<figcaption css={styles}>
			{emptyCaption
				? null
				: renderText(
						parseHtml(sanitise(captionHtml, sanitiserOptions)),
				  )}
			{hideCredit ? null : (
				<small
					css={css`
						display: block;
						padding: ${space[2]}px 0 ${space[2]}px;
					`}
				>
					{credit}
				</small>
			)}
			<Island priority="feature" defer={{ until: 'visible' }}>
				<ShareButton
					format={format}
					pageId={pageId}
					webTitle={webTitle}
					context="GalleryImage"
				/>
			</Island>
		</figcaption>
	);
};
