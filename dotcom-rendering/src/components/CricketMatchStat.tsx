import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSans15,
	textSansBold14,
	textSansBold15,
	visuallyHidden,
} from '@guardian/source/foundations';
import type { Batter } from '../cricketMatchV2';
import { palette } from '../palette';

const containerCss = css`
	position: relative;
	padding: 5px 10px 10px;
	color: ${palette('--football-match-stat-text')};
	border: 1px solid ${palette('--football-match-stat-border')};
	border-radius: 6px;
`;

const desktopPaddingCss = css`
	${from.desktop} {
		padding-bottom: 14px;
	}
`;

const visuallyHiddenStyles = css`
	${visuallyHidden}
`;

const responsiveTextSans = css`
	${textSans14}
	${from.desktop} {
		${textSans15}
	}
`;

const responsiveTextSansBold = css`
	${textSansBold14}
	${from.desktop} {
		${textSansBold15}
	}
`;

const tableStyles = css`
	width: 100%;
	border-collapse: collapse;
	${responsiveTextSans}
`;

const cellBaseStyles = css`
	padding: ${space[2]}px ${space[3]}px ${space[1]}px 0;
	text-align: left;
	vertical-align: middle;
`;

const tableHeadCellStyles = css`
	${cellBaseStyles}
	${responsiveTextSansBold}
	color: ${palette('--football-match-stat-text')};
`;

const tableCellStyles = css`
	${cellBaseStyles}
	${responsiveTextSans}
`;

const tableRowHeaderStyles = css`
	${cellBaseStyles}
	display: flex;
	align-items: center;
	${responsiveTextSans}
`;

const batterNameTextStyles = css`
	display: flex;
	flex-direction: column;
`;

const tableRowStyles = css`
	border-top: 1px solid ${palette('--football-match-stat-border')};
`;

const numericCellStyles = css`
	white-space: nowrap;
	text-align: left;
`;

const howOutStyles = css`
	color: ${palette('--football-match-info-team-number')};
`;

export const CricketMatchStatNotOutBatters = ({
	notOutBatters,
}: {
	notOutBatters: Batter[];
}) => {
	const currentBatters = notOutBatters.filter(
		(batter) => batter.onStrike || batter.nonStrike,
	);
	return (
		<div css={[containerCss, desktopPaddingCss]}>
			<span css={visuallyHiddenStyles}>Current Batters</span>
			<table css={tableStyles}>
				<thead>
					<tr>
						<th css={tableHeadCellStyles}>Batter</th>
						<th css={[tableHeadCellStyles, numericCellStyles]}>
							Runs
						</th>
						<th css={[tableHeadCellStyles, numericCellStyles]}>
							Balls
						</th>
					</tr>
				</thead>
				<tbody>
					{currentBatters.map((batter) => {
						return (
							<tr key={batter.name} css={tableRowStyles}>
								<th scope="row" css={tableRowHeaderStyles}>
									<span css={visuallyHiddenStyles}>
										{batter.onStrike
											? '(on strike)'
											: '(at crease)'}
									</span>
									<div css={batterNameTextStyles}>
										{batter.name}
										<div css={[howOutStyles]}>
											{batter.howOut}
										</div>
									</div>
								</th>
								<td css={[tableCellStyles, numericCellStyles]}>
									{batter.runs}
								</td>
								<td css={[tableCellStyles, numericCellStyles]}>
									{batter.ballsFaced}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
