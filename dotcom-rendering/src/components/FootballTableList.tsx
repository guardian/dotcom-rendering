import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	space,
	textSansBold14,
} from '@guardian/source/foundations';
import { Stack } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import type { FootballTableCompetition } from '../footballTables';
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
			${textSansBold14}
			grid-column: centre-column-start / centre-column-end;
			color: ${palette('--football-competition-text')};
			border-top: 1px solid ${palette('--football-top-border')};
			padding: ${space[2]}px;
			background-color: ${palette('--football-match-list-background')};

			${from.leftCol} {
				display: block;
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

const GroupName = ({ children }: { children: ReactNode }) => (
	<h4
		css={css`
			grid-column: centre-column-start / centre-column-end;
			padding-top: ${space[1]}px;
			padding-bottom: ${space[3]}px;
			${headlineBold17}
		`}
	>
		{children}
	</h4>
);

type Props = {
	competitions: FootballTableCompetition[];
	guardianBaseUrl: string;
};

export const FootballTableList = ({ competitions, guardianBaseUrl }: Props) => (
	<Stack space={9}>
		{competitions.map((competition) => (
			<section key={competition.name} css={footballTablesGridStyles}>
				<CompetitionName>
					<a
						href={`${guardianBaseUrl}${competition.url}`}
						css={css`
							text-decoration: none;
							color: inherit;
							:hover {
								text-decoration: underline;
							}
						`}
					>
						{competition.name}
					</a>
				</CompetitionName>
				{competition.tables.map((table) => (
					<>
						{competition.hasGroups && (
							<GroupName>{table.groupName}</GroupName>
						)}
						<div
							css={css`
								grid-column: centre-column-start /
									centre-column-end;
							`}
							key={table.groupName}
						>
							<FootballTable
								competitionName={competition.name}
								competitionUrl={competition.url}
								table={table}
								guardianBaseUrl={guardianBaseUrl}
							/>
						</div>
					</>
				))}
			</section>
		))}
	</Stack>
);
