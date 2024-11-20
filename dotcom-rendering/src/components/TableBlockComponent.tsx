import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
import { unescapeData } from '../lib/escapeData';
import { palette } from '../palette';
import type { TableBlockElement } from '../types/content';

const tableEmbed = css`
	.table--football {
		width: 100%;
		background: ${palette('--table-block-background')};
		border-top: 0.0625rem solid ${palette('--table-block-border-top')};
		color: ${palette('--table-block-text')};
		border-collapse: inherit;
		tr:nth-child(odd) > td {
			background-color: ${palette('--table-block-stripe')};
		}
		th {
			padding: 0.5rem;
		}
		td {
			padding: 0.5rem;
		}
		tr {
			${textSans12};
		}
		thead {
			tr {
				font-weight: 800;
				text-align: left;
			}
		}
		tr > th:first-child,
		td:first-child {
			color: ${palette('--table-block-text-first-column')};
		}
		.table-column--main {
			width: 100%;
		}
	}
	margin-bottom: 16px;
`;

type Props = {
	element: TableBlockElement;
};

export const TableBlockComponent = ({ element }: Props) => {
	return (
		<div
			css={tableEmbed}
			data-testid="football-table-embed"
			dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
		/>
	);
};
