import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
import { isElement, parseHtml } from '../lib/domUtils';
import { palette } from '../palette';
import { logger } from '../server/lib/logging';
import type { TableBlockElement } from '../types/content';

const tableStyles = css`
	width: 100%;
	background: ${palette('--table-block-background')};
	border-top: 0.0625rem solid ${palette('--table-block-border-top')};
	color: ${palette('--table-block-text')};
	border-collapse: inherit;
`;

const headStyles = css`
	tr {
		font-weight: 800;
		text-align: left;
	}
`;

const rowStyles = css`
	${textSans12};
	:nth-child(odd) > td {
		background-color: ${palette('--table-block-stripe')};
	}
`;

const cellPadding = css`
	padding: 0.5rem;
`;

const tableEmbed = css`
	tr > th:first-child,
	td:first-child {
		color: ${palette('--table-block-text-first-column')};
	}
`;

type Props = {
	element: TableBlockElement;
};

const buildElementTree = (node: Node) => {
	const children = Array.from(node.childNodes).map(buildElementTree);
	switch (node.nodeName) {
		case 'TABLE': {
			return (
				<table className="table--football" css={tableStyles}>
					{children}
				</table>
			);
		}
		case 'THEAD': {
			return <thead css={headStyles}>{children}</thead>;
		}
		case 'TBODY': {
			return <tbody>{children}</tbody>;
		}
		case 'ABBR': {
			return (
				<abbr title={(node as HTMLElement).getAttribute('title') ?? ''}>
					{children}
				</abbr>
			);
		}
		case 'TR': {
			return <tr css={rowStyles}>{children}</tr>;
		}
		case 'TH': {
			return <th css={cellPadding}>{children}</th>;
		}
		case 'TD': {
			const isMainColumn = (node as HTMLElement).className.includes(
				'table-column--main',
			);
			return (
				<td
					style={isMainColumn ? { width: '100%' } : undefined}
					css={cellPadding}
				>
					{children}
				</td>
			);
		}
		case '#text': {
			return node.textContent;
		}
		default:
			logger.warn('TableBlockComponent: Unknown element received', {
				isDev: process.env.NODE_ENV !== 'production',
				element: {
					name: node.nodeName,
					html: isElement(node) ? node.outerHTML : undefined,
				},
			});
			return null;
	}
};

export const TableBlockComponent = ({ element }: Props) => {
	const fragment = parseHtml(element.html);
	return (
		<div
			css={tableEmbed}
			style={{ marginBottom: '16px' }}
			data-testid="football-table-embed"
		>
			{Array.from(fragment.childNodes).map(buildElementTree)}
		</div>
	);
};
