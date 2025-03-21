import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	space,
	until,
} from '@guardian/source/foundations';
import { Stack } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import type { FootballTableData } from '../footballTables';
import { palette } from '../palette';
import { FootballTable } from './FootballTable';

const footballTablesGridStyles = css`
	display: grid;
	grid-template-columns: [centre-column-start] repeat(4, 1fr) [centre-column-end];
	column-gap: 10px;
	${from.mobileLandscape} {
		column-gap: 20px;
	}

	${from.tablet} {
		grid-template-columns: [centre-column-start] repeat(12, 40px) [centre-column-end];
	}

	${from.desktop} {
		grid-template-columns: [centre-column-start] repeat(8, 60px) [centre-column-end];
	}

	${from.leftCol} {
		grid-template-columns:
			[left-column-start] repeat(2, 60px)
			[left-column-end centre-column-start] repeat(8, 60px)
			[centre-column-end];
	}

	${from.wide} {
		grid-template-columns:
			[left-column-start] repeat(3, 60px)
			[left-column-end centre-column-start] repeat(8, 60px)
			[centre-column-end];
	}
`;

const CompetitionName = ({ children }: { children: ReactNode }) => (
	<h3
		css={css`
			${until.leftCol} {
				display: none;
			}
			${from.leftCol} {
				color: ${palette('--football-competition-text')};
				border-top: 1px solid ${palette('--football-list-border')};
				background-color: transparent;
				margin-top: 0;
				padding: ${space[1]}px 0 0;
				grid-column: left-column-start / left-column-end;
				${headlineBold17}
			}
		`}
	>
		{children}
	</h3>
);

type Props = {
	tables: FootballTableData[];
	guardianBaseUrl: string;
};

export const FootballTableList = ({ tables, guardianBaseUrl }: Props) => (
	<Stack space={9}>
		{tables.map((table) => (
			<section
				key={table.competition.name}
				css={footballTablesGridStyles}
			>
				<CompetitionName>
					<a
						href={`${guardianBaseUrl}${table.competition.url}`}
						css={css`
							text-decoration: none;
							color: inherit;
							:hover {
								text-decoration: underline;
							}
						`}
					>
						{table.competition.name}
					</a>
				</CompetitionName>
				<div
					css={css`
						grid-column: centre-column-start / centre-column-end;
					`}
				>
					<FootballTable
						table={table}
						guardianBaseUrl={guardianBaseUrl}
					/>
				</div>
			</section>
		))}
	</Stack>
);
