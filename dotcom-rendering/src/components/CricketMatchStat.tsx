import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import type { Batter } from '../cricketMatchV2';

export const CricketMatchStatStatus = ({
	matchStatus,
}: {
	matchStatus: string;
}) => {
	return (
		<div>
			<h2>Match Status</h2>
			<span>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					Match Status
				</span>
				{matchStatus}
			</span>
		</div>
	);
};

export const CricketMatchStatCurrentBattingTeam = ({
	currentBattingTeam,
}: {
	currentBattingTeam: string;
}) => {
	return (
		<div>
			<h2>Current Batting Team</h2>
			<span>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					Current Batting Team
				</span>
				{currentBattingTeam}
			</span>
		</div>
	);
};

export const CricketMatchStatNotOutBatters = ({
	notOutBatters,
}: {
	notOutBatters: Batter[];
}) => {
	const names = notOutBatters.map((batter) => batter.name).join(', ');
	return (
		<div>
			<h2>Not Out Batters</h2>
			<span>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					Not Out Batters
				</span>
				{names}
			</span>
		</div>
	);
};
