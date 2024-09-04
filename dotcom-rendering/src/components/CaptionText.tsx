import { css } from '@emotion/react';
import { headlineMedium17, space } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import sanitise, { type IOptions } from 'sanitize-html';
import { getAttrs, parseHtml } from '../lib/domUtils';
import { palette } from '../palette';

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

const renderTextElement = (node: Node, key: number): ReactNode => {
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
					key={key}
				>
					{children}
				</strong>
			);
		case 'EM':
			return text === '' ? null : <em key={key}>{children}</em>;
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
					key={key}
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

type Props = {
	html: string;
};

export const CaptionText = ({ html }: Props) => (
	<>
		{Array.from(parseHtml(sanitise(html, sanitiserOptions)).childNodes).map(
			renderTextElement,
		)}
	</>
);
