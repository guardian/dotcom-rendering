import { css } from '@emotion/react';
import { unescapeData } from '@root/src/lib/escapeData';
import { palette, border } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

const tableEmbed = css`
	.table--football {
		width: 100%;
		background: ${palette.neutral[97]};
		border-top: 0.0625rem solid ${border.focusHalo};
		border-collapse: inherit;
		tr:nth-child(odd) > td {
			background-color: ${palette.neutral[93]};
		}
		th {
			padding: 0.5rem;
		}
		td {
			padding: 0.5rem;
		}
		tr {
			${textSans.xxsmall()};
		}
		thead {
			tr {
				font-weight: 800;
				text-align: left;
			}
		}
		tr > th:first-child,
		td:first-child {
			color: ${palette.text.supporting};
		}
		.table-column--main {
			width: 100%;
		}
	}
	margin-bottom: 16px;
`;

export const TableBlockComponent: React.FC<{
	element: TableBlockElement;
}> = ({ element }) => {
	return (
		<div
			css={tableEmbed}
			data-cy="football-table-embed"
			dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
		/>
	);
};
