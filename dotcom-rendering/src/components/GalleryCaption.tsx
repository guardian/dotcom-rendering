import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	headlineMedium17,
	space,
	textSans14,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import sanitise, { type IOptions } from 'sanitize-html';
import { grid } from '../grid';
import { parseHtml } from '../lib/domUtils';
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
	transformTags: {
		a: (tagName, attribs) => {
			if (!attribs.href) return { tagName, attribs };

			const mailto = attribs.href.startsWith('mailto:')
				? ` | ${attribs.href}`
				: '';

			return {
				tagName, // Just return anchors as is
				attribs: {
					...attribs, // Merge into the existing attributes
					...{
						'data-link-name': `in body link${mailto}`, // Add the data-link-name for Ophan to anchors
					},
				},
			};
		},
	},
};

const styles = css`
	${grid.column.centre}
	color: ${palette('--caption-text')};
	${textSans14}
	padding-bottom: ${space[6]}px;
`;

const renderTextElement = (node: Node): ReactNode => {
	switch (node.nodeName) {
		case 'STRONG': {
			const text = node.textContent?.trim() ?? '';
			const children = Array.from(node.childNodes).map(renderTextElement);

			return text === '' ? null : (
				<h2
					css={css`
						display: block;
						${headlineMedium17}
						padding: ${space[1]}px 0 ${space[3]}px;
					`}
				>
					{children}
				</h2>
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
